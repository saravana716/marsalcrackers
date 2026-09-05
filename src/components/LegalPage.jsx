import React, { useEffect } from 'react';
import './LegalPage.css';

const legalContent = {
  privacy: {
    title: 'Privacy Policy',
    lastUpdated: 'August 29, 2026',
    content: (
      <>
        <p>Sai Sparkz Hub (“we”, “us”, or “our”) respects your privacy and is committed to protecting the information you share with us.</p>
        <p>This Privacy Policy explains how we collect, use, and protect your information when you visit or interact with our website.</p>
        
        <h3>1. Information We Collect</h3>
        <p>We may collect the following information when you contact us or submit an enquiry:</p>
        <ul>
          <li>Name</li>
          <li>Mobile number</li>
          <li>WhatsApp number</li>
          <li>Email address</li>
          <li>Delivery or enquiry location</li>
          <li>Product requirements</li>
          <li>Other information voluntarily provided by you</li>
        </ul>
        <p>We may also collect basic technical information such as browser type, device information, IP address, and website usage data for security and website improvement.</p>
        
        <h3>2. How We Use Your Information</h3>
        <p>Your information may be used to:</p>
        <ul>
          <li>Respond to product enquiries</li>
          <li>Provide product details, pricing and availability</li>
          <li>Communicate through phone, WhatsApp or email</li>
          <li>Process enquiries or requests</li>
          <li>Improve our website and services</li>
          <li>Provide customer support</li>
          <li>Comply with applicable laws and regulations</li>
        </ul>
        
        <h3>3. WhatsApp and Third-Party Services</h3>
        <p>If you choose to contact us through WhatsApp, your communication may be processed through WhatsApp and is also subject to WhatsApp's own privacy policies and terms.</p>
        <p>We may use third-party services such as hosting, analytics, maps, payment or communication services where required for operating our website.</p>
        
        <h3>4. Information Security</h3>
        <p>We take reasonable measures to protect the information provided to us against unauthorized access, misuse, alteration or disclosure.</p>
        <p>However, no internet-based transmission or storage system can be guaranteed to be completely secure.</p>
        
        <h3>5. Sharing of Information</h3>
        <p>We do not sell or rent your personal information.</p>
        <p>We may share information with service providers, business partners or authorities where reasonably necessary to provide services, comply with legal requirements, prevent fraud, or protect our rights.</p>
        
        <h3>6. Cookies</h3>
        <p>Our website may use cookies or similar technologies to improve functionality, understand website usage and enhance your browsing experience.</p>
        <p>You can control cookies through your browser settings.</p>
        
        <h3>7. Children's Privacy</h3>
        <p>Our website is not intended to knowingly collect personal information from children without appropriate parental or legal consent.</p>
        
        <h3>8. Changes to This Policy</h3>
        <p>We may update this Privacy Policy from time to time. Any changes will be published on this page with the updated date.</p>
        
        <h3>9. Contact Us</h3>
        <p>For questions regarding this Privacy Policy, please contact:</p>
        <p>
          <strong>Sai Sparkz Hub</strong><br />
          Phone: +91 89400 98344<br />
          Email: saisparkzhub@gmail.com<br />
          Address: Virudhunagar to sivakasi main road, near kia show room, opposite to nayara bulk, amathur, 626005
        </p>
      </>
    )
  },
  terms: {
    title: 'Terms & Conditions',
    lastUpdated: 'August 29, 2026',
    content: (
      <>
        <p>Welcome to Sai Sparkz Hub. By accessing or using this website, you agree to the following Terms & Conditions.</p>
        
        <h3>1. Website Purpose</h3>
        <p>This website is intended to provide information about fireworks, crackers, product varieties, brands, prices and related services offered by Sai Sparkz Hub.</p>
        <p>Product information displayed on the website may be subject to availability and applicable laws and regulations.</p>
        
        <h3>2. Product Information</h3>
        <p>We make reasonable efforts to ensure that product names, images, descriptions and other information are accurate. However:</p>
        <ul>
          <li>Product images may vary from the actual product.</li>
          <li>Packaging may change depending on the manufacturer.</li>
          <li>Product availability may change without prior notice.</li>
          <li>Prices may change due to market conditions, taxes, transportation or other factors.</li>
          <li>Displayed prices should be confirmed with Sai Sparkz Hub before placing an order.</li>
        </ul>
        
        <h3>3. Enquiries and Orders</h3>
        <p>Submitting an enquiry through the website, phone or WhatsApp does not automatically constitute confirmation of an order.</p>
        <p>Orders, availability, pricing, payment, delivery and other conditions must be confirmed by Sai Sparkz Hub.</p>
        <p>We reserve the right to accept or decline an enquiry or order where required by law or business requirements.</p>
        
        <h3>4. Legal Compliance</h3>
        <p>All transactions and activities involving fireworks are subject to applicable laws, government regulations, licensing requirements and local restrictions.</p>
        <p>Customers are responsible for complying with applicable laws in their location.</p>
        
        <h3>5. Pricing</h3>
        <p>Prices displayed on the website are subject to change without prior notice.</p>
        <p>The final applicable price will be communicated and confirmed by Sai Sparkz Hub before an order is finalized.</p>
        
        <h3>6. Intellectual Property</h3>
        <p>All website content, including logos, images, graphics, text, designs and other materials, belongs to Sai Sparkz Hub or its respective owners and may not be copied, reproduced or used without permission.</p>
        
        <h3>7. Website Availability</h3>
        <p>We make reasonable efforts to keep the website available and updated. However, we do not guarantee that the website will always be available, error-free or uninterrupted.</p>
        
        <h3>8. Limitation of Liability</h3>
        <p>Sai Sparkz Hub shall not be responsible for losses arising from inaccurate third-party information, website interruptions, unauthorized access, events beyond our reasonable control, or misuse of products.</p>
        
        <h3>9. Changes to Terms</h3>
        <p>We reserve the right to modify these Terms & Conditions at any time. Updated terms will be published on this page.</p>
        
        <h3>10. Contact</h3>
        <p>For questions regarding these Terms & Conditions:</p>
        <p>
          <strong>Sai Sparkz Hub</strong><br />
          Phone: +91 89400 98344<br />
          Email: saisparkzhub@gmail.com<br />
          Address: Virudhunagar to sivakasi main road, near kia show room, opposite to nayara bulk, amathur, 626005
        </p>
      </>
    )
  },
  shipping: {
    title: 'Shipping / Delivery Policy',
    lastUpdated: 'August 29, 2026',
    content: (
      <>
        <p>Sai Sparkz Hub follows all applicable laws and regulations relating to the transportation, handling and delivery of fireworks.</p>
        
        <h3>1. Delivery Availability</h3>
        <p>Delivery availability depends on:</p>
        <ul>
          <li>Customer location</li>
          <li>Applicable government regulations</li>
          <li>Transportation restrictions</li>
          <li>Product type</li>
          <li>Availability of approved/logistically permitted delivery services</li>
          <li>Local laws and safety requirements</li>
        </ul>
        <p>We reserve the right to refuse delivery to locations where delivery is prohibited or cannot be safely and legally completed.</p>
        
        <h3>2. Delivery Confirmation</h3>
        <p>Delivery arrangements, if legally permitted, will be confirmed separately with the customer.</p>
        <p>The estimated delivery time may vary depending on location, transportation availability, weather, regulatory restrictions and other circumstances.</p>
        
        <h3>3. Delivery Charges</h3>
        <p>Applicable delivery or transportation charges, if any, will be communicated before confirmation of the order.</p>
        
        <h3>4. Customer Responsibility</h3>
        <p>Customers must provide accurate contact and delivery information.</p>
        <p>The customer may be required to provide identification, address or other information where legally required.</p>
        
        <h3>5. Delays</h3>
        <p>Sai Sparkz Hub shall not be responsible for delays caused by circumstances beyond our reasonable control, including:</p>
        <ul>
          <li>Government restrictions</li>
          <li>Transportation restrictions</li>
          <li>Weather conditions</li>
          <li>Natural disasters</li>
          <li>Road closures</li>
          <li>Regulatory inspections</li>
          <li>Supplier delays</li>
          <li>Other unforeseen circumstances</li>
        </ul>
        
        <h3>6. Damaged or Missing Products</h3>
        <p>If a legally permitted delivery is received with visible damage or missing items, the customer should contact Sai Sparkz Hub as soon as possible with relevant details and photographs where applicable.</p>
        <p>Any resolution will be subject to verification and applicable laws.</p>
        
        <h3>7. Important Fireworks Restriction</h3>
        <p>Fireworks cannot be transported or delivered through methods that are prohibited by applicable laws or safety regulations.</p>
        <p>Sai Sparkz Hub will not arrange or facilitate any delivery that violates applicable laws.</p>
        
        <h3>8. Contact Us</h3>
        <p>For delivery-related enquiries:</p>
        <p>
          <strong>Sai Sparkz Hub</strong><br />
          Phone: +91 89400 98344<br />
          Email: saisparkzhub@gmail.com
        </p>
      </>
    )
  },
  cancellation: {
    title: 'Cancellation & Refund Policy',
    lastUpdated: 'August 29, 2026',
    content: (
      <>
        <p>Sai Sparkz Hub aims to provide a clear and transparent enquiry and order process.</p>
        
        <h3>1. Cancellation of Enquiry</h3>
        <p>Product enquiries submitted through the website, phone or WhatsApp may be cancelled at any time before an order is confirmed.</p>
        
        <h3>2. Cancellation of Confirmed Orders</h3>
        <p>Cancellation of a confirmed order is subject to the order status, product availability, applicable laws and the terms communicated at the time of confirmation.</p>
        <p>Customers should contact Sai Sparkz Hub as soon as possible if they wish to request cancellation.</p>
        
        <h3>3. Refunds</h3>
        <p>Where a refund is legally applicable and approved, the refund amount and method will be communicated to the customer.</p>
        <p>Refund processing time may vary depending on the payment method and financial institution.</p>
        
        <h3>4. Non-Refundable Situations</h3>
        <p>Refunds may not be available in situations where:</p>
        <ul>
          <li>The order has already been processed or dispatched, where applicable.</li>
          <li>Cancellation is prohibited by applicable law.</li>
          <li>Products have been damaged or altered after receipt due to customer handling.</li>
          <li>The customer has provided incorrect information.</li>
          <li>The request does not meet the agreed cancellation conditions.</li>
        </ul>
        
        <h3>5. Damaged Products</h3>
        <p>If a product is received damaged, the customer should contact Sai Sparkz Hub promptly with photographs and order details.</p>
        <p>The issue will be reviewed and handled according to applicable law and the circumstances of the case.</p>
        
        <h3>6. Regulatory Restrictions</h3>
        <p>Because fireworks are regulated products, cancellation, return, refund and transportation arrangements may be subject to applicable government regulations.</p>
        
        <h3>7. Contact Us</h3>
        <p>For cancellation or refund enquiries:</p>
        <p>
          <strong>Sai Sparkz Hub</strong><br />
          Phone: +91 89400 98344<br />
          Email: saisparkzhub@gmail.com
        </p>
      </>
    )
  },
  disclaimer: {
    title: 'Disclaimer',
    lastUpdated: 'August 29, 2026',
    content: (
      <>
        <p>The information provided on the Sai Sparkz Hub website is intended for general informational and product enquiry purposes.</p>
        
        <h3>1. Product Information</h3>
        <p>We make reasonable efforts to keep product names, descriptions, images and prices accurate. However, product packaging, appearance, specifications, availability and pricing may change without prior notice.</p>
        <p>Actual products may differ slightly from images displayed on the website.</p>
        
        <h3>2. Prices</h3>
        <p>Prices displayed on the website are indicative unless specifically stated otherwise.</p>
        <p>Customers should confirm the latest price, availability and applicable charges with Sai Sparkz Hub before placing an order.</p>
        
        <h3>3. Fireworks Safety</h3>
        <p>Fireworks must always be handled and used responsibly and in accordance with the manufacturer's instructions and applicable laws.</p>
        <p>Users should follow all safety instructions, age restrictions, usage restrictions, local regulations and government guidelines.</p>
        
        <h3>4. Legal Restrictions</h3>
        <p>The availability, sale, purchase, transportation, storage and use of fireworks may be subject to restrictions under applicable laws and regulations.</p>
        <p>Sai Sparkz Hub does not encourage or facilitate any activity that violates applicable law.</p>
        
        <h3>5. Website Links</h3>
        <p>Our website may contain links to third-party websites or services. Sai Sparkz Hub is not responsible for the content, availability, privacy practices or policies of third-party websites.</p>
        
        <h3>6. No Guarantee</h3>
        <p>Although we make reasonable efforts to maintain accurate information, Sai Sparkz Hub does not guarantee that all website content will always be complete, accurate, current or free from errors.</p>
        
        <h3>7. Customer Responsibility</h3>
        <p>Customers are responsible for verifying applicable laws and regulations in their location before purchasing, transporting, storing or using fireworks.</p>
        
        <h3>8. Contact</h3>
        <p>For any clarification regarding products or website information:</p>
        <p>
          <strong>Sai Sparkz Hub</strong><br />
          Phone: +91 89400 98344<br />
          Email: saisparkzhub@gmail.com<br />
          Address: Virudhunagar to sivakasi main road, near kia show room, opposite to nayara bulk, amathur, 626005
        </p>
      </>
    )
  }
};

export default function LegalPage({ pageType }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageType]);

  const data = legalContent[pageType];

  if (!data) return <div style={{ padding: '100px 20px', textAlign: 'center' }}>Page not found.</div>;

  return (
    <div className="legal-page-container">
      <div className="legal-page-header">
        <h1>{data.title}</h1>
      </div>
      <div className="legal-page-content">
        {data.content}
      </div>
    </div>
  );
}
