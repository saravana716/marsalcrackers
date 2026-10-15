import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Download, CheckCircle, ArrowLeft, Copy, CheckCheck } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import logoImg from '../assets/lo.png';
import { firebase, uploadImage } from '../lib/firebase';
import './PaymentPage.css';
import payment from "../assets/bay.png";
import qrCodeImg from "../assets/qr.jpeg";
// Replaced flip cards with direct QR code layout

// --- Main PaymentPage Component ---
export default function PaymentModal({ orderData, onNavigate, clearCart }) {
  const [paymentStatus, setPaymentStatus] = useState('pending'); // pending, verifying, success
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
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



  const generateAndUploadInvoiceAsync = async (orderId, orderData) => {
    try {
      setIsGeneratingPdf(true);
      // Wait for React to render invoice container
      await new Promise(resolve => setTimeout(resolve, 300));

      const element = invoiceRef.current;
      if (!element) return;

      const pages = element.querySelectorAll('.premium-invoice-page');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();

      for (let i = 0; i < pages.length; i++) {
        if (i > 0) pdf.addPage();
        pages.forEach((p, idx) => {
          p.style.display = idx === i ? 'flex' : 'none';
        });

        const pageEl = pages[i];
        const canvas = await html2canvas(pageEl, {
          scale: 1.5,
          useCORS: true,
          logging: false
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        const imgHeightInPdf = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, imgHeightInPdf);
      }

      pages.forEach(p => p.style.display = 'flex');
      pdf.setDisplayMode('fullpage');

      const pdfBlob = pdf.output('blob');
      const pdfFile = new File([pdfBlob], `invoice_${orderData.orderId}_${Date.now()}.pdf`, { type: 'application/pdf' });
      const publicUrl = await uploadImage(pdfFile, 'order-receipts');

      if (publicUrl) {
        setDownloadUrl(publicUrl);
        // Update order in database with invoice_url in background
        await firebase.from('orders').update({ invoice_url: publicUrl }).eq('id', orderId);
      }
    } catch (err) {
      console.warn("Background invoice generation skipped or failed:", err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handlePlaceOrder = async () => {
    setPaymentStatus('verifying');

    try {
      // 1. Find or insert customer
      let customerId;
      let existingCustomer = null;

      if (orderData.customer.email) {
        const { data } = await firebase.from('customers').select('id').eq('email', orderData.customer.email).single();
        existingCustomer = data;
      }
      if (!existingCustomer && orderData.customer.phone) {
        const { data } = await firebase.from('customers').select('id').eq('phone', orderData.customer.phone).single();
        existingCustomer = data;
      }

      if (existingCustomer) {
        customerId = existingCustomer.id;
      } else {
        const { data: newCustomer, error: customerError } = await firebase.from('customers').insert({
          name: orderData.customer.fullName,
          email: orderData.customer.email || null,
          phone: orderData.customer.phone,
          address: `${orderData.customer.address}, ${orderData.customer.city} - ${orderData.customer.pincode}`
        });
        if (customerError) throw customerError;
        customerId = newCustomer.id;
      }

      // 2. Insert Order immediately (no waiting for 2 minutes of PDF rendering & uploading!)
      const { data: order, error: orderError } = await firebase.from('orders').insert({
        customer_id: customerId,
        total_amount: orderData.netTotal,
        status: 'Pending',
        invoice_url: null,
        payment_screenshot_url: null,
        notes: `App Order ID: ${orderData.orderId}`
      });

      if (orderError) throw orderError;

      // 3. Insert Order Items in batch
      const orderItemsData = orderData.items.map(item => ({
        order_id: order.id,
        product_id: item.product.id,
        product_name: item.product.name,
        quantity: item.quantity,
        unit_price: item.product.price
      }));

      const { error: itemsError } = await firebase.from('order_items').insert(orderItemsData);
      if (itemsError) throw itemsError;

      // 4. Update stock in parallel in the background or concurrently
      Promise.all(orderData.items.map(async (item) => {
        try {
          const { data: productData, error: fetchError } = await firebase
            .from('products')
            .select('stock')
            .eq('id', item.product.id)
            .single();

          if (!fetchError && productData) {
            const currentStock = productData.stock || 0;
            const newStock = Math.max(0, currentStock - item.quantity);
            await firebase.from('products').update({ stock: newStock }).eq('id', item.product.id);
          }
        } catch (stockErr) {
          console.error(`Stock update error for item ${item.product.id}:`, stockErr);
        }
      })).catch(err => console.error("Stock reduction error:", err));

      // 5. Show Success immediately to user!
      setPaymentStatus('success');
      clearCart();
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // 6. Trigger PDF generation & upload in background without blocking order confirmation
      generateAndUploadInvoiceAsync(order.id, orderData);

    } catch (error) {
      console.error("Error processing order:", error);
      alert(`Order processing failed: ${error.message}`);
      setPaymentStatus('pending');
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
              <button 
                className="pay-dl-btn" 
                onClick={handleDownloadInvoice}
                title={isGeneratingPdf ? "Invoice is generating in background... Click to print directly or wait a moment" : "Download PDF invoice"}
              >
                <Download size={18} /> {isGeneratingPdf ? 'Download Invoice (Ready soon / Print)' : 'Download Invoice'}
              </button>
              <button className="pay-back-btn" onClick={() => onNavigate('products')}>
                <ArrowLeft size={18} /> Continue Shopping
              </button>
            </div>

            <div style={{ marginTop: '24px', padding: '16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#0f172a', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                Enjoying Marsel Traders?
              </h4>
              <p style={{ margin: '0 0 12px 0', color: '#475569', fontSize: '0.85rem' }}>
                Your feedback helps us grow! Please take a moment to review us on Google.
              </p>
              <a
                href="https://g.page/r/CbZUIUWn2dYDEBM/review"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#1a73e8',
                  color: 'white',
                  textDecoration: 'none',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#1557b0'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#1a73e8'}
              >
                Write a Review
              </a>
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
                      <img src={qrCodeImg} alt="UPI QR Code" style={{ width: '240px', height: '240px', objectFit: 'contain' }} />
                    </div>
                    <div className="upi-id-box">
                      <div className="upi-id-text">
                        <span className="upi-label">UPI ID:</span>
                        <strong className="upi-value">vigneshelangovansk-3@oksbi</strong>
                      </div>
                      <button className="qr-copy-btn" onClick={(e) => {
                        navigator.clipboard.writeText('vigneshelangovansk-3@oksbi');
                      }}>
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="bank-transfer-alternative">
                    <details className="bank-details-accordion">
                      <summary>Alternatively, pay via Bank Transfer</summary>
                      <div className="bank-details-content">
                        <div className="bank-row"><strong>Bank:</strong> STATE BANK OF INDIA</div>
                        <div className="bank-row"><strong>A/C Name:</strong> vignesh E</div>
                        <div className="bank-row"><strong>A/C No:</strong> 45274222733</div>
                        <div className="bank-row"><strong>IFSC:</strong> SBIN0012767</div>
                        <div className="bank-row"><strong>Branch:</strong> Thiruthangal</div>
                      </div>
                    </details>
                  </div>
                </div>
              </div>

              {/* Verify Button & File Upload */}
              {/* Verify Button */}
              <div className="pay-action-bottom" style={{ flexDirection: 'column', alignItems: 'center', marginTop: '30px', gap: '16px', width: '100%', borderTop: '1px solid #E2E8F0', paddingTop: '30px' }}>
                <p style={{ color: '#64748b', fontSize: '0.95rem', margin: '0 0 10px 0', textAlign: 'center' }}>
                  Completed payment in UPI/Bank? Click below to confirm your order immediately.
                </p>
                <button
                  className="pay-verify-btn new-theme-btn"
                  onClick={handlePlaceOrder}
                  disabled={paymentStatus === 'verifying'}
                  style={{
                    width: '100%', maxWidth: '400px',
                    opacity: paymentStatus === 'verifying' ? 0.7 : 1,
                    cursor: paymentStatus === 'verifying' ? 'not-allowed' : 'pointer'
                  }}
                >
                  <ShieldCheck size={24} /> {paymentStatus === 'verifying' ? 'Confirming Order...' : 'I have made the payment / Confirm Order'}
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
                    <img src={logoImg} alt="Marsel Traders Logo" className="pi-logo-img" />
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
                    <div className="pi-ty-text">Thank you for shopping with<br /><strong>Marsel Traders!</strong></div>
                    <div className="pi-ty-subtext">This is a computer generated invoice<br />and does not require a physical signature.</div>

                    <div style={{ marginTop: '15px', padding: '10px', border: '1px dashed #ccc', borderRadius: '8px', textAlign: 'center' }}>
                      <strong style={{ fontSize: '12px', color: '#333' }}>⭐ Please Review Us on Google ⭐</strong><br />
                      <span style={{ fontSize: '10px', color: '#666' }}>https://g.page/r/CbZUIUWn2dYDEBM/review</span>
                    </div>
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

