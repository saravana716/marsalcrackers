import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Download, CheckCircle, ArrowLeft, Copy, CheckCheck, Upload, Image as ImageIcon, X } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import logoImg from '../assets/lo.png';
import { supabase } from '../lib/supabase';
import './PaymentPage.css';
import payment from "../assets/payment.jpeg";
// Replaced flip cards with direct QR code layout

// --- Main PaymentPage Component ---
export default function PaymentModal({ orderData, onNavigate, clearCart }) {
  const [paymentStatus, setPaymentStatus] = useState('pending'); // pending, verifying, success
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [screenshotPreview, setScreenshotPreview] = useState(null);
  const invoiceRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Test mode active if no orderData is passed
  if (!orderData) {
    orderData = {
      isTest: true,
      orderId: 'TEST-12345',
      customer: {
        fullName: 'Test Customer',
        address: '123 Test Street',
        city: 'Test City',
        pincode: '123456',
        phone: '9876543210',
        email: 'test@example.com'
      },
      items: [
        { product: { id: 1, name: 'Premium Chakkar', price: 100, originalPrice: 150, quantity: 1, type: 'Box' }, quantity: 2 },
        { product: { id: 2, name: 'Flower Pots Special', price: 200, originalPrice: 250, quantity: 1, type: 'Box' }, quantity: 1 },
        { product: { id: 3, name: 'Sparklers 15cm', price: 50, originalPrice: 75, quantity: 1, type: 'Box' }, quantity: 5 }
      ],
      originalTotal: 925,
      savings: 275,
      subTotal: 650,
      netTotal: 650
    };
  } 
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert("File is too large. Please upload an image smaller than 5MB.");
        return;
      }
      setPaymentScreenshot(file);
      setScreenshotPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveScreenshot = () => {
    setPaymentScreenshot(null);
    setScreenshotPreview(null);
  };
  
  const handlePlaceOrder = async () => {
    if (!paymentScreenshot) {
      alert("Please upload the payment screenshot before proceeding.");
      return;
    }

    setPaymentStatus('verifying');
    setIsGeneratingPdf(true);

    try {
      // 1. Wait a tick for React to render the invoice container off-screen
      await new Promise(resolve => setTimeout(resolve, 500));

      // 2. Capture the invoice DOM element wrapper
      const element = invoiceRef.current;
      if (!element) throw new Error("Invoice element not found");

      const pages = element.querySelectorAll('.premium-invoice-page');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();

      // 3. Generate PDF (A4 Multi-page Support via precise DOM chunking)
      for (let i = 0; i < pages.length; i++) {
        if (i > 0) pdf.addPage();

        // Hide all pages except the current one to prevent html2canvas coordinate shifting bug
        pages.forEach((p, idx) => {
          p.style.display = idx === i ? 'flex' : 'none';
        });

        const pageEl = pages[i];
        const canvas = await html2canvas(pageEl, {
          scale: 2,
          useCORS: true,
          logging: false
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.98);
        const imgHeightInPdf = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, imgHeightInPdf);
      }

      // Restore all pages
      pages.forEach(p => p.style.display = 'flex');

      // Force PDF viewers to fit the entire page on screen by default
      pdf.setDisplayMode('fullpage');

      const pdfBlob = pdf.output('blob');

      // 4. Upload PDF to Supabase Storage
      const fileName = `invoice_${orderData.orderId}_${Date.now()}.pdf`;
      const { error: uploadError } = await supabase.storage
        .from('order-receipts')
        .upload(fileName, pdfBlob, {
          contentType: 'application/pdf',
          upsert: true
        });

      if (uploadError) throw new Error(`Invoice Upload Failed: ${uploadError.message}`);

      // 5. Get Public URL
      const { data: urlData } = supabase.storage
        .from('order-receipts')
        .getPublicUrl(fileName);

      const publicUrl = urlData.publicUrl;

      // 6. Find or insert customer
      let customerId;
      let existingCustomer = null;

      if (orderData.customer.email) {
        const { data } = await supabase.from('customers').select('id').eq('email', orderData.customer.email).maybeSingle();
        existingCustomer = data;
      }
      if (!existingCustomer && orderData.customer.phone) {
        const { data } = await supabase.from('customers').select('id').eq('phone', orderData.customer.phone).maybeSingle();
        existingCustomer = data;
      }

      if (existingCustomer) {
        customerId = existingCustomer.id;
      } else {
        const { data: newCustomer, error: customerError } = await supabase.from('customers').insert({
          name: orderData.customer.fullName,
          email: orderData.customer.email || null,
          phone: orderData.customer.phone,
          address: `${orderData.customer.address}, ${orderData.customer.city} - ${orderData.customer.pincode}`
        }).select('id').single();
        if (customerError) throw customerError;
        customerId = newCustomer.id;
      }

      // 6.5. Upload Payment Screenshot
      let uploadedScreenshotUrl = null;
      if (paymentScreenshot) {
        const screenshotName = `screenshot_${orderData.orderId}_${Date.now()}_${paymentScreenshot.name}`;
        const { error: screenshotUploadError } = await supabase.storage
          .from('order-receipts')
          .upload(screenshotName, paymentScreenshot);

        if (screenshotUploadError) {
           console.error("Screenshot upload error:", screenshotUploadError);
           throw new Error(`Screenshot Upload Failed: ${screenshotUploadError.message}`);
        }

        const { data: screenshotUrlData } = supabase.storage
          .from('order-receipts')
          .getPublicUrl(screenshotName);
          
        uploadedScreenshotUrl = screenshotUrlData.publicUrl;
      }

      // 7. Insert Order (including invoice_url and payment_screenshot_url)
      const { data: order, error: orderError } = await supabase.from('orders').insert({
        customer_id: customerId,
        total_amount: orderData.netTotal,
        status: 'Pending',
        invoice_url: publicUrl,
        payment_screenshot_url: uploadedScreenshotUrl,
        notes: `App Order ID: ${orderData.orderId}`
      }).select('id').single();

      if (orderError) throw orderError;

      // 8. Insert Order Items
      const orderItemsData = orderData.items.map(item => ({
        order_id: order.id,
        product_id: item.product.id,
        product_name: item.product.name,
        quantity: item.quantity,
        unit_price: item.product.price
      }));

      const { error: itemsError } = await supabase.from('order_items').insert(orderItemsData);
      if (itemsError) throw itemsError;

      // 8.5. Deduct stock from products
      for (const item of orderData.items) {
        // Fetch current stock
        const { data: productData, error: fetchError } = await supabase
          .from('products')
          .select('stock')
          .eq('id', item.product.id)
          .single();

        if (fetchError) {
          console.error(`Failed to fetch stock for product ${item.product.id}:`, fetchError);
          continue; // Skip if we can't fetch stock
        }

        const currentStock = productData.stock || 0;
        const newStock = Math.max(0, currentStock - item.quantity);

        // Update with new stock
        const { error: updateError } = await supabase
          .from('products')
          .update({ stock: newStock })
          .eq('id', item.product.id);

        if (updateError) {
          console.error(`Failed to update stock for product ${item.product.id}:`, updateError);
        }
      }

      // 9. Success!
      setDownloadUrl(publicUrl);
      setPaymentStatus('success');
      clearCart();
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
      console.error("Error processing order:", error);
      alert(`Order processing failed: ${error.message}\n\nPlease check that the 'order-receipts' storage bucket has an INSERT policy.`);
      setPaymentStatus('pending');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleDownloadInvoice = () => {
    if (downloadUrl) {
      window.open(downloadUrl, '_blank');
    } else {
      window.print();
    }
  };

  const formattedDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  });

  // --- INVOICE PAGINATION LOGIC ---
  const getInvoicePages = () => {
    if (!orderData || !orderData.items) return [];
    const items = [...orderData.items];
    const pages = [];
    let currentIndex = 0;

    const MAX_SINGLE = 6;
    const MAX_FIRST = 11;
    const MAX_MIDDLE = 18;
    const MAX_LAST = 9;

    // Single page
    if (items.length <= MAX_SINGLE) {
      pages.push({ isFirst: true, isLast: true, items: items.splice(0, items.length), startIndex: 0 });
      return pages;
    }

    // Page 1
    const takeFirst = Math.min(MAX_FIRST, items.length - 1);
    const firstChunk = items.splice(0, takeFirst);
    pages.push({ isFirst: true, isLast: false, items: firstChunk, startIndex: currentIndex });
    currentIndex += takeFirst;

    // Middle pages
    while (items.length > MAX_LAST) {
      const takeMiddle = Math.min(MAX_MIDDLE, items.length - 1);
      const chunk = items.splice(0, takeMiddle);
      pages.push({ isFirst: false, isLast: false, items: chunk, startIndex: currentIndex });
      currentIndex += takeMiddle;
    }

    // Last page
    if (items.length > 0) {
      pages.push({ isFirst: false, isLast: true, items: items.splice(0, items.length), startIndex: currentIndex });
    }

    return pages;
  };

  const invoicePages = getInvoicePages();

  return (
    <>
      <div className="payment-page-container">
        {/* --- VERIFYING OVERLAY --- */}
        {paymentStatus === 'verifying' && (
          <div className="pay-verifying-fullscreen">
            <div className="pay-spinner" />
            <h3>Processing Order & Generating Invoice...</h3>
            <p>Please do not refresh the page or navigate away.</p>
          </div>
        )}

        {/* --- SUCCESS SCREEN --- */}
        {paymentStatus === 'success' ? (
          <div className="pay-success-card">
            <div className="pay-success-icon">
              <CheckCircle size={52} />
            </div>
            <h1 className="pay-success-title">Order Confirmed!</h1>
            <p className="pay-success-sub">
              Thank you for your order! Your Order ID is <strong>{orderData.orderId}</strong>
            </p>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '24px', marginTop: '-15px' }}>
              For any enquiries or support, please contact our team via WhatsApp.
            </p>
            <div className="pay-invoice-actions">
              <button className="pay-dl-btn" onClick={handleDownloadInvoice}>
                <Download size={18} /> Download Invoice
              </button>
              <button className="pay-back-btn" onClick={() => onNavigate('products')}>
                <ArrowLeft size={18} /> Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Full-width Gold Hero Banner */}
            <div className="pay-modal-header">
              <img src={payment} alt="" />
            </div>

            {/* Constrained content below banner */}
            <div className="pay-main-modal qr-layout">
              <div className="qr-split-container">
                {/* Left side: Order Instructions & Amount */}
                <div className="pay-left-panel">
                  <div className="pay-amount-box">
                    <span className="pay-amount-label">Amount to Pay</span>
                    <span className="pay-amount-value">₹{orderData.netTotal.toFixed(2)}</span>
                  </div>
                  <div className="pay-instructions">
                    <h3>How to Pay</h3>
                    <ol>
                      <li>Open your preferred UPI App (GPay, PhonePe, Paytm).</li>
                      <li>Scan the QR code on the right or copy the UPI ID.</li>
                      <li>Enter the exact amount shown above.</li>
                      <li>Once successful, click the "I have made the payment" button below.</li>
                    </ol>
                  </div>
                </div>

                {/* Right side: QR Code Scanner */}
                <div className="pay-right-panel">
                  <div className="qr-container">
                    <h3 className="qr-title">Scan to Pay</h3>
                    <div className="qr-box">
                      <svg viewBox="0 0 100 100" width="180" height="180">
                        {/* A simple placeholder QR pattern */}
                        <rect width="100" height="100" fill="#FFFFFF" rx="8" />
                        <path d="M10,10 h25 v25 h-25 z M15,15 h15 v15 h-15 z M10,65 h25 v25 h-25 z M15,70 h15 v15 h-15 z M65,10 h25 v25 h-25 z M70,15 h15 v15 h-15 z M45,45 h10 v10 h-10 z M30,40 h10 v10 h-10 z M60,60 h10 v10 h-10 z M40,75 h20 v5 h-20 z M75,40 h15 v20 h-15 z M75,75 h15 v15 h-15 z M80,80 h5 v5 h-5 z M20,20 h5 v5 h-5 z M20,75 h5 v5 h-5 z M75,20 h5 v5 h-5 z M35,20 h5 v10 h-5 z M45,15 h10 v5 h-10 z M55,30 h10 v5 h-10 z M15,45 h10 v5 h-10 z M30,55 h15 v5 h-15 z" fill="#0a0e17" />
                        <rect x="42" y="20" width="15" height="5" fill="#0a0e17" />
                        <rect x="42" y="30" width="5" height="10" fill="#0a0e17" />
                        <rect x="20" y="45" width="5" height="15" fill="#0a0e17" />
                      </svg>
                    </div>
                    <div className="upi-id-box">
                      <div className="upi-id-text">
                        <span className="upi-label">UPI ID:</span>
                        <strong className="upi-value">8525858075@ybl</strong>
                      </div>
                      <button className="qr-copy-btn" onClick={(e) => {
                        navigator.clipboard.writeText('8525858075@ybl');
                      }}>
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="bank-transfer-alternative">
                    <details className="bank-details-accordion">
                      <summary>Alternatively, pay via Bank Transfer</summary>
                      <div className="bank-details-content">
                        <div className="bank-row"><strong>Bank:</strong> State Bank of India</div>
                        <div className="bank-row"><strong>A/C Name:</strong> DHINESHKANNAN.T</div>
                        <div className="bank-row"><strong>A/C No:</strong> 33946548414</div>
                        <div className="bank-row"><strong>IFSC:</strong> SBINOO12767</div>
                      </div>
                    </details>
                  </div>
                </div>
              </div>

              {/* Verify Button & File Upload */}
              <div className="pay-action-bottom" style={{ flexDirection: 'column', alignItems: 'center', marginTop: '40px', gap: '24px', width: '100%', borderTop: '1px solid #E2E8F0', paddingTop: '40px' }}>
                <div className="screenshot-upload-container" style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
                  <label style={{ display: 'block', marginBottom: '16px', fontSize: '1.1rem', fontWeight: '800', color: '#0a0e17', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Upload Payment Screenshot <span style={{color: '#ef4444'}}>*</span>
                  </label>
                  
                  {!screenshotPreview ? (
                    <div className="upload-box" style={{ 
                      border: '2px dashed #cbd5e1', borderRadius: '16px', padding: '35px 20px', 
                      cursor: 'pointer', background: '#F8FAFC', display: 'flex', 
                      flexDirection: 'column', alignItems: 'center', gap: '12px',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.02)'
                    }} 
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#ffc107'; e.currentTarget.style.background = '#fffbeb'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.background = '#F8FAFC'; }}
                    onClick={() => document.getElementById('screenshot-upload').click()}>
                      <div style={{ background: '#e2e8f0', padding: '14px', borderRadius: '50%' }}>
                        <Upload size={32} color="#475569" />
                      </div>
                      <span style={{ fontSize: '1rem', color: '#334155', fontWeight: '700' }}>Click to browse images</span>
                      <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Supports JPG, PNG (Max 5MB)</span>
                      <input 
                        id="screenshot-upload" 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                        style={{ display: 'none' }} 
                      />
                    </div>
                  ) : (
                    <div className="screenshot-preview-box" style={{ position: 'relative', display: 'inline-block', width: '100%', maxWidth: '320px' }}>
                      <img 
                        src={screenshotPreview} 
                        alt="Payment Screenshot" 
                        style={{ width: '100%', height: 'auto', maxHeight: '300px', objectFit: 'contain', borderRadius: '12px', border: '2px solid #e2e8f0', boxShadow: '0 10px 25px rgba(0,0,0,0.08)' }} 
                      />
                      <button 
                        type="button"
                        onClick={handleRemoveScreenshot}
                        style={{
                          position: 'absolute', top: '-14px', right: '-14px', 
                          background: '#ef4444', color: 'white', border: '2px solid white', 
                          borderRadius: '50%', width: '36px', height: '36px', 
                          display: 'flex', alignItems: 'center', justifyContent: 'center', 
                          cursor: 'pointer', boxShadow: '0 4px 10px rgba(239, 68, 68, 0.3)',
                          transition: 'transform 0.2s',
                          padding: 0
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      >
                        <X size={20} strokeWidth={3} />
                      </button>
                    </div>
                  )}
                </div>

                <button 
                  className="pay-verify-btn new-theme-btn" 
                  onClick={handlePlaceOrder} 
                  disabled={paymentStatus === 'verifying' || !paymentScreenshot}
                  style={{ 
                    width: '100%', maxWidth: '400px', marginTop: '10px',
                    opacity: (!paymentScreenshot || paymentStatus === 'verifying') ? 0.6 : 1, 
                    cursor: (!paymentScreenshot || paymentStatus === 'verifying') ? 'not-allowed' : 'pointer',
                    transform: (!paymentScreenshot || paymentStatus === 'verifying') ? 'none' : '',
                    boxShadow: (!paymentScreenshot || paymentStatus === 'verifying') ? 'none' : ''
                  }}
                >
                  <ShieldCheck size={24} /> I have made the payment
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Premium Print Invoice (Multi-page DOM Chunks) */}
      <div
        ref={invoiceRef}
        className={`premium-invoice-wrapper`}
        style={{ position: 'absolute', top: '-9999px', left: '-9999px', opacity: 0, pointerEvents: 'none' }}
      >
        {orderData && invoicePages.map((page, pageIndex) => (
          <div key={pageIndex} className="premium-invoice-page">

            {page.isFirst && (
              <>
                {/* Header Strip with Angled Ribbon (Always show on first page) */}
                <div className="pi-header">
                  <div className="pi-logo-section">
                    <img src={logoImg} alt="Marsal Traders Logo" className="pi-logo-img" />
                    <div className="pi-tagline">LIGHTING HAPPINESS, IGNITING CELEBRATIONS</div>
                  </div>
                  <div className="pi-ribbon-wrapper">
                    <div className="pi-contact-info-top">
                      <div className="pi-contact-item">
                        <span className="pi-contact-icon">📞</span>+91 8903033626, +91 8525858075
                      </div>
                      <div className="pi-contact-item">
                        <span className="pi-contact-icon">✉️</span>marseltraders2026@gmail.com
                      </div>
                      <div className="pi-contact-item">
                        <span className="pi-contact-icon">📍</span>
                        <div className="pi-address-text">
                          8P4M+GQ, Appayanaickenpatti,<br />Sevalpatti, Tamil Nadu 626140
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Top Info Columns */}
                <div className="pi-top-info">
                  <div className="pi-bill-to">
                    <div className="pi-section-title"><span className="pi-icon">👤</span> BILL TO</div>
                    <div className="pi-customer-details">
                      <strong>{orderData.customer.fullName}</strong>
                      <p>{orderData.customer.address}</p>
                      <p>{orderData.customer.city} - {orderData.customer.pincode}</p>
                      <p>Phone: {orderData.customer.phone}</p>
                      {orderData.customer.email && <p>Email: {orderData.customer.email}</p>}
                    </div>
                  </div>

                  <div className="pi-separator-star">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5L12 2Z" fill="#C8860A" />
                      <circle cx="12" cy="11" r="2" fill="#fff" />
                    </svg>
                  </div>

                  <div className="pi-invoice-details">
                    <div className="pi-section-title"><span className="pi-icon">📄</span> INVOICE DETAILS</div>
                    <table className="pi-details-table">
                      <tbody>
                        <tr><td>Invoice No.</td><td>:</td><td>{orderData.orderId}</td></tr>
                        <tr><td>Invoice Date</td><td>:</td><td>{formattedDate}</td></tr>
                        <tr><td>Due Date</td><td>:</td><td>Upon Receipt</td></tr>
                        <tr><td>Payment Terms</td><td>:</td><td>Immediate</td></tr>
                        <tr><td>Place of Supply</td><td>:</td><td>Tamil Nadu (33)</td></tr>
                      </tbody>
                    </table>
                  </div>


                </div>
              </>
            )}

            {/* Invoice Table */}
            <table className="pi-main-table" style={{ marginTop: page.isFirst ? '0' : '40px', marginBottom: '30px' }}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>DESCRIPTION</th>
                  <th className="text-center">QTY</th>
                  <th className="text-right">MRP (₹)</th>
                  <th className="text-right">NET PRICE (₹)</th>
                  <th className="text-right">TOTAL (₹)</th>
                </tr>
              </thead>
              <tbody>
                {page.items.map((item, localIndex) => {
                  const index = page.startIndex + localIndex;
                  const mrp = item.product.originalPrice || item.product.price;
                  const netPrice = item.product.price;
                  const total = netPrice * item.quantity;
                  return (
                    <tr key={index}>
                      <td className="text-center" style={{ color: '#D4AF37', fontWeight: 'bold' }}>{index + 1}</td>
                      <td>
                        <strong>{item.product.name}</strong>
                        {item.product.quantity && item.product.type && (
                          <span style={{ marginLeft: '4px', fontSize: '11px', color: '#666', fontWeight: 'normal' }}>
                            ({item.product.quantity} {item.product.type})
                          </span>
                        )}<br />
                        <span className="pi-premium-qty">Premium Quality</span>
                      </td>
                      <td className="text-center" style={{ fontWeight: 'bold', fontSize: '12px' }}>{item.quantity}</td>
                      <td className="text-right" style={{ color: '#888', textDecoration: 'line-through', fontSize: '12px' }}>{mrp.toFixed(2)}</td>
                      <td className="text-right" style={{ fontWeight: '800', fontSize: '13px', color: '#001A3A' }}>{netPrice.toFixed(2)}</td>
                      <td className="text-right" style={{ fontWeight: '800', fontSize: '13px', color: '#001A3A' }}>{total.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {page.isLast && (
              <div className="pi-bottom-split">
                <div className="pi-notes-section">
                  <div className="pi-thank-you-block">
                    <div className="pi-ty-script">Thank You!</div>
                    <div className="pi-ty-divider">
                      <span className="pi-ty-line"></span>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z" fill="#C8860A" />
                      </svg>
                      <span className="pi-ty-line"></span>
                    </div>
                    <div className="pi-ty-text">Thank you for shopping with<br /><strong>Marsal Traders!</strong></div>
                    <div className="pi-ty-subtext">This is a computer generated invoice<br />and does not require a physical signature.</div>
                  </div>
                </div>

                <div className="pi-summary-section">
                  <table className="pi-summary-table">
                    <tbody>
                      <tr>
                        <td className="pi-sum-label">Total MRP:</td>
                        <td className="text-right">₹{(orderData.originalTotal).toFixed(2)}</td>
                      </tr>
                      <tr className="pi-sum-savings">
                        <td className="pi-sum-label">Total Savings:</td>
                        <td className="text-right">- ₹{orderData.savings.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td className="pi-sum-label">Subtotal:</td>
                        <td className="text-right">₹{(orderData.subTotal).toFixed(2)}</td>
                      </tr>
                      <tr className="pi-sum-divider">
                        <td colSpan="2"><hr /></td>
                      </tr>
                      <tr className="pi-grand-total">
                        <td className="pi-sum-label">Net Amount Payable:</td>
                        <td className="text-right">₹{orderData.netTotal.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Footer Wrapper - no longer pushed to absolute bottom, stacks naturally */}

            {/* Page Number (Repeats on every page, absolutely positioned at the bottom) */}
            <div style={{ position: 'absolute', bottom: '10px', left: '0', width: '100%', textAlign: 'center', fontSize: '10px', color: '#888' }}>
              Page {pageIndex + 1} of {invoicePages.length}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

