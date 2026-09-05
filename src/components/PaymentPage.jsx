import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Download, CheckCircle, ArrowLeft, Copy, CheckCheck } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import logoImg from '../assets/mylogo.png';
import { supabase } from '../lib/supabase';
import './PaymentPage.css';
import payment from "../assets/payment.jpeg";
// --- Payment Methods Data ---
const paymentMethods = [
  {
    id: 'sbi',
    type: 'bank',
    label: 'Official Bank Account',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="54" height="54">
        <rect width="48" height="48" rx="14" fill="#001A3A" />
        <path d="M24 8L8 17H40L24 8Z" fill="#F5B51B" />
        <rect x="11" y="19" width="4" height="14" fill="#F5B51B" />
        <rect x="18" y="19" width="4" height="14" fill="#F5B51B" />
        <rect x="25" y="19" width="4" height="14" fill="#F5B51B" />
        <rect x="32" y="19" width="4" height="14" fill="#F5B51B" />
        <rect x="8" y="35" width="32" height="3" rx="1.5" fill="#F5B51B" />
      </svg>
    ),
    frontTitle: 'State Bank of India',
    frontSub: 'NEFT / RTGS / IMPS',
    frontHint: 'Tap / Hover to View Account Info',
    backTitle: 'BANK ACCOUNT',
    backFields: [
      { label: 'Bank Name', value: 'State Bank of India' },
      { label: 'Account Holder', value: 'DHINESHKANNAN.T' },
      { label: 'Account Number', value: '33946548414' },
      { label: 'IFSC Code', value: 'SBINOO12767' },
      { label: 'Branch', value: 'Thiruthangal' },
    ],
    backNote: 'After transfer, share screenshot on WhatsApp for confirmation.',
    backBadge: 'VERIFIED ACCOUNT',
  },
  {
    id: 'gpay',
    type: 'upi',
    label: 'Instant UPI Transfer',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="54" height="54">
        <rect width="48" height="48" rx="14" fill="#4285F4" />
        <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fontSize="11" fontWeight="bold" fill="white" fontFamily="sans-serif">G Pay</text>
      </svg>
    ),
    frontTitle: 'Google Pay',
    frontSub: 'MOBILE UPI PAYMENT',
    frontHint: 'Tap / Hover to View GPay Mobile No',
    backTitle: 'GOOGLE PAY UPI',
    backFields: [
      { label: 'UPI Mobile Number', value: '8940098342' },
    ],
    backNote: 'Send payment & share transfer screenshot on WhatsApp for instant confirmation.',
    backBadge: 'INSTANT TRANSFER',
  },
  {
    id: 'phonepe',
    type: 'upi',
    label: 'Instant UPI Transfer',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="54" height="54">
        <rect width="48" height="48" rx="14" fill="#5f259f" />
        <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fontSize="8" fontWeight="bold" fill="white" fontFamily="sans-serif">PhonePe</text>
      </svg>
    ),
    frontTitle: 'PhonePe',
    frontSub: 'MOBILE UPI PAYMENT',
    frontHint: 'Tap / Hover to View PhonePe No',
    backTitle: 'PHONEPE UPI',
    backFields: [
      { label: 'UPI Mobile Number', value: '8940098342' },
    ],
    backNote: 'Send payment & share transfer screenshot on WhatsApp for instant confirmation.',
    backBadge: 'INSTANT CONFIRMATION',
  },
];

// --- Single Flip Card Component ---
function PaymentFlipCard({ method }) {
  const [flipped, setFlipped] = useState(false);
  const [copied, setCopied] = useState(null);

  const handleCopy = (e, value, id) => {
    e.stopPropagation();
    navigator.clipboard.writeText(value).catch(() => { });
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div
      className={`pay-flip-card ${flipped ? 'pay-flipped' : ''}`}
      onClick={() => setFlipped((f) => !f)}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && setFlipped((f) => !f)}
      aria-label={`Payment card for ${method.frontTitle}`}
    >
      <div className="pay-flip-inner">
        {/* FRONT */}
        <div className="pay-flip-front">
          {/* Top row: label left, small icon right */}
          <div className="pay-card-top-row">
            <span className="pay-card-label">{method.label}</span>
            <span className="pay-card-icon-small">{method.icon}</span>
          </div>
          {/* Large centered icon */}
          <div className="pay-card-icon-large">{method.icon}</div>
          <h3 className="pay-card-title">{method.frontTitle}</h3>
          <p className="pay-card-sub">{method.frontSub}</p>
          <div className="pay-card-hint">
            <span>↻</span> {method.frontHint}
          </div>
        </div>

        {/* BACK */}
        <div className="pay-flip-back">
          <div className="pay-back-badge-top">{method.backTitle}</div>
          <div className="pay-back-fields">
            {method.backFields.map((field, i) => (
              <div key={i} className="pay-back-field">
                <span className="pay-back-field-label">{field.label}</span>
                <div className="pay-back-field-value-row">
                  <span className="pay-back-field-value">{field.value}</span>
                  <button
                    className={`pay-copy-btn ${copied === `${method.id}-${i}` ? 'copied' : ''}`}
                    onClick={(e) => handleCopy(e, field.value, `${method.id}-${i}`)}
                    title="Copy"
                  >
                    {copied === `${method.id}-${i}` ? <CheckCheck size={13} /> : <Copy size={13} />}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="pay-back-note">
            <span>ℹ</span> {method.backNote}
          </div>
          <div className="pay-back-footer">
            <span className="pay-back-status">{method.backBadge}</span>
            <span className="pay-back-brand">Sai Sparkz Hub</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Main PaymentPage Component ---
export default function PaymentModal({ orderData, onNavigate, clearCart }) {
  const [paymentStatus, setPaymentStatus] = useState('pending'); // pending, verifying, success
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const invoiceRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!orderData) {
    return (
      <div className="payment-page-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="pay-success-card" style={{ marginTop: '0' }}>
          <h3 style={{ color: '#001A3A', marginBottom: '12px', fontSize: '1.5rem', fontWeight: '800' }}>No Order Found</h3>
          <p style={{ color: '#555', marginBottom: '24px' }}>Please go back and complete your checkout to view the invoice.</p>
          <button className="pay-verify-btn" onClick={() => onNavigate('products')}>
            Back to Shop
          </button>
        </div>
      </div>
    );
  } const handlePlaceOrder = async () => {
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
        .from('invoices')
        .upload(fileName, pdfBlob, {
          contentType: 'application/pdf',
          upsert: true
        });

      if (uploadError) throw new Error(`Upload Failed: ${uploadError.message}`);

      // 5. Get Public URL
      const { data: urlData } = supabase.storage
        .from('invoices')
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

      // 7. Insert Order (including invoice_url)
      const { data: order, error: orderError } = await supabase.from('orders').insert({
        customer_id: customerId,
        total_amount: orderData.netTotal,
        status: 'Pending',
        invoice_url: publicUrl,
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
      alert(`Order processing failed: ${error.message}\n\nPlease check that the 'invoices' storage bucket exists and allows public uploads.`);
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
            <h3>Processing Order & Generating Invoice…</h3>
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
            <div className="pay-main-modal">
              {/* Amount */}
              <div className="pay-amount-row">
                <span className="pay-amount-label">Amount to Pay</span>
                <span className="pay-amount-value">₹{orderData.netTotal.toFixed(2)}</span>
              </div>

              {/* Section heading */}
              <div className="pay-section-label">
                <span className="pay-section-tag">EASY &amp; SAFE PAYMENTS</span>
                <h2 className="pay-section-title">Official Payment Options</h2>
                <div className="pay-section-divider" />
                <p className="pay-section-hint">Hover or tap on any card to flip and view complete account &amp; UPI transfer details.</p>
              </div>

              {/* Flip Cards */}
              <div className="pay-cards-grid">
                {paymentMethods.map((m) => (
                  <PaymentFlipCard key={m.id} method={m} />
                ))}
              </div>

              {/* Verify Button */}
              <button className="pay-verify-btn" onClick={handlePlaceOrder} disabled={paymentStatus === 'verifying'}>
                <ShieldCheck size={20} /> Place Order (₹{orderData.netTotal.toFixed(2)})
              </button>
            </div>
          </>
        )}
      </div>

      {/* Premium Print Invoice (Multi-page DOM Chunks) */}
      <div
        ref={invoiceRef}
        className={`premium-invoice-wrapper ${isGeneratingPdf ? 'generating-pdf' : 'hidden-invoice'}`}
      >
        {orderData && invoicePages.map((page, pageIndex) => (
          <div key={pageIndex} className="premium-invoice-page">

            {page.isFirst && (
              <>
                {/* Header Strip with Angled Ribbon (Always show on first page) */}
                <div className="pi-header">
                  <div className="pi-logo-section">
                    <img src={logoImg} alt="Sai Sparkz Hub Logo" className="pi-logo-img" />
                    <div className="pi-tagline">LIGHTING HAPPINESS, IGNITING CELEBRATIONS</div>
                  </div>
                  <div className="pi-ribbon-wrapper">
                    <div className="pi-ribbon-bg"></div>
                    <div className="pi-ribbon-text">
                      <h1 className="pi-title">INVOICE</h1>
                      <p className="pi-thankyou">Thank you for your business!</p>
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

                  <div className="pi-discount-badge">
                    <div className="pi-discount-title">FLAT</div>
                    <div className="pi-discount-value">
                      <div>90%</div>
                      <div>OFF</div>
                    </div>
                    <div className="pi-discount-subtitle">
                      <div>ON ALL</div>
                      <div>PRODUCTS</div>
                    </div>
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
                    <div className="pi-ty-text">Thank you for shopping with<br /><strong>Sai Sparkz Hub!</strong></div>
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
            <div>
              {/* Footer Section & Bottom Strip (Only show on last page) */}
              {page.isLast && (
                <>
                  <div className="pi-footer-area">
                    <div className="pi-bank-details">
                      <div className="pi-section-title"><span className="pi-icon">🏛️</span> BANK DETAILS</div>
                      <table className="pi-bank-table">
                        <tbody>
                          <tr><td>Bank Name</td><td>:</td><td>State Bank of India</td></tr>
                          <tr><td>A/C Name</td><td>:</td><td>DHINESHKANNAN.T</td></tr>
                          <tr><td>A/C Number</td><td>:</td><td>33946548414</td></tr>
                          <tr><td>IFSC Code</td><td>:</td><td>SBINOO12767</td></tr>
                          <tr><td>Branch</td><td>:</td><td>thiruthangal</td></tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="pi-payment-methods">
                      <div className="pi-section-title"><span className="pi-icon">⚡</span> PAYMENT METHOD</div>
                      <ul className="pi-methods-list">
                        <li><span className="pi-method-icon">📱</span> UPI / QR Code</li>
                        <li><span className="pi-method-icon">🏦</span> Bank Transfer</li>
                        <li><span className="pi-method-icon">💵</span> Cash / Cheque</li>
                      </ul>
                    </div>

                    <div className="pi-notes-footer">
                      <div className="pi-section-title"><span className="pi-icon">📝</span> NOTES</div>
                      <ul className="pi-notes-list-footer">
                        <li>Goods once sold will not be taken back.</li>
                        <li>Please check the items before purchase.</li>
                        <li>Keep fireworks away from children and flammable materials.</li>
                        <li>Use fireworks safely and follow safety instructions.</li>
                        <li>Subject to Sivakasi jurisdiction.</li>
                      </ul>
                    </div>
                  </div>

                  {/* Bottom Dark Strip */}
                  <div className="pi-bottom-strip">
                    <div>📞 +91 89400 98344</div>
                    <div>✉️ saisparkzhub@gmail.com</div>
                    <div>📍 Sivakasi, Tamil Nadu - 626123</div>
                  </div>
                </>
              )}
            </div>

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
