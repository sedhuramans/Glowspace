export function renderFAQView() {
  const faqs = [
    {
      q: 'Are Glowspace products suitable for sensitive and acne-prone skin?',
      a: 'Yes, absolutely. All our formulations are dermatologist-tested, hypoallergenic, and non-comedogenic. We avoid harsh fragrances, parabens, and drying alcohols to support delicate skin barriers.'
    },
    {
      q: 'How long does shipping take across India?',
      a: 'Standard orders are dispatched within 24 business hours from our central temperature-controlled warehouse in Bengaluru. Delivery typically takes 2-4 business days depending on your postal pincode.'
    },
    {
      q: 'What is your return and refund policy?',
      a: 'We offer a 7-day hassle-free return policy on unopened products in their original protective packaging. If you received a damaged item, we issue an immediate replacement or full refund upon photo verification.'
    },
    {
      q: 'How should I layer multiple Glowspace serums in my daily routine?',
      a: 'A good rule of thumb is applying from thinnest to thickest consistency: 1) Gentle Cleanser → 2) Balancing Toner → 3) Water-based Serums (Hyaluronic Acid / Niacinamide) → 4) Antioxidant Serums (Vitamin C in AM) → 5) Barrier Moisturizer → 6) Sunscreen (AM) or Facial Oil (PM).'
    },
    {
      q: 'Can I use Vitamin C serum every morning?',
      a: 'Yes, our 15% Vitamin C serum is stabilized with Ferulic Acid and Vitamin E, making it ideal for daily morning use to neutralize daytime free radicals and UV oxidative stress. Always follow with our Mineral Dew SPF 50.'
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept all major UPI applications (Google Pay, PhonePe, Paytm, BHIM), Credit/Debit Cards (Visa, Mastercard, RuPay), Net Banking, and Cash on Delivery (COD).'
    }
  ];

  return `
    <div class="container" style="padding: 40px 20px 80px;">
      <!-- Header -->
      <div style="text-align: center; max-width: 600px; margin: 0 auto 50px;">
        <span class="section-subtitle">Got Questions?</span>
        <h1 class="text-serif" style="font-size: 2.75rem; font-weight: 700; color: var(--color-text-main); margin-bottom: 12px;">
          Frequently Asked Questions
        </h1>
        <p style="font-size: 1rem; color: var(--color-text-secondary);">
          Everything you need to know about our products, ingredients, orders, and delivery.
        </p>
      </div>

      <!-- FAQ Accordion List -->
      <div style="max-width: 760px; margin: 0 auto; display: flex; flex-direction: column; gap: 16px;">
        ${faqs.map((faq, idx) => `
          <div style="background: var(--color-surface); border-radius: var(--radius-lg); border: 1px solid var(--color-border-subtle); padding: 24px; box-shadow: var(--shadow-xs);">
            <h3 class="text-serif" style="font-size: 1.25rem; font-weight: 700; color: var(--color-text-main); margin-bottom: 10px; display: flex; align-items: flex-start; gap: 10px;">
              <span style="color: var(--color-blush-600); font-family: var(--font-sans); font-size: 1rem;">Q.</span>
              <span>${faq.q}</span>
            </h3>
            <p style="font-size: 0.9375rem; color: var(--color-text-secondary); line-height: 1.7; padding-left: 24px;">
              ${faq.a}
            </p>
          </div>
        `).join('')}
      </div>

      <div style="text-align: center; margin-top: 50px;">
        <p style="color: var(--color-text-secondary); margin-bottom: 16px;">Still have questions about your skincare routine?</p>
        <a href="#contact" class="btn btn-secondary">Get in Touch with Our Team →</a>
      </div>
    </div>
  `;
}
