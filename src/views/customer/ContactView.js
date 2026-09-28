import { store } from '../../services/storeService.js';

export function renderContactView() {
  const settings = store.getSettings();

  return `
    <div class="container" style="padding: 40px 20px 80px;">
      <!-- Header -->
      <div style="text-align: center; max-width: 600px; margin: 0 auto 50px;">
        <span class="section-subtitle">We Are Here For You</span>
        <h1 class="text-serif" style="font-size: 2.75rem; font-weight: 700; color: var(--color-text-main); margin-bottom: 12px;">
          Contact Our Skincare Care Team
        </h1>
        <p style="font-size: 1rem; color: var(--color-text-secondary);">
          Have a question about your order, skin type matching, or ingredient formulations? We’d love to assist you.
        </p>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1.2fr; gap: 50px; align-items: flex-start;">
        <!-- Left Contact Info Card -->
        <div style="background: var(--color-surface); border: 1px solid var(--color-border-subtle); border-radius: var(--radius-xl); padding: 36px; box-shadow: var(--shadow-xs);">
          <h2 class="text-serif" style="font-size: 1.6rem; font-weight: 700; margin-bottom: 24px;">Support Channels</h2>
          
          <div style="display: flex; flex-direction: column; gap: 24px;">
            <div style="display: flex; gap: 16px;">
              <div style="width: 44px; height: 44px; border-radius: var(--radius-md); background: var(--color-blush-100); color: var(--color-blush-600); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                ✉️
              </div>
              <div>
                <div style="font-size: 0.8125rem; text-transform: uppercase; font-weight: 700; color: var(--color-text-muted);">Email Support</div>
                <div style="font-weight: 600; font-size: 0.9375rem; color: var(--color-text-main);">${settings.contactEmail}</div>
                <div style="font-size: 0.75rem; color: var(--color-text-secondary);">Responses within 4-6 business hours</div>
              </div>
            </div>

            <div style="display: flex; gap: 16px;">
              <div style="width: 44px; height: 44px; border-radius: var(--radius-md); background: var(--color-blush-100); color: var(--color-blush-600); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                📞
              </div>
              <div>
                <div style="font-size: 0.8125rem; text-transform: uppercase; font-weight: 700; color: var(--color-text-muted);">Toll-Free Helpline</div>
                <div style="font-weight: 600; font-size: 0.9375rem; color: var(--color-text-main);">${settings.contactPhone}</div>
                <div style="font-size: 0.75rem; color: var(--color-text-secondary);">${settings.supportHours}</div>
              </div>
            </div>

            <div style="display: flex; gap: 16px;">
              <div style="width: 44px; height: 44px; border-radius: var(--radius-md); background: var(--color-blush-100); color: var(--color-blush-600); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                📍
              </div>
              <div>
                <div style="font-size: 0.8125rem; text-transform: uppercase; font-weight: 700; color: var(--color-text-muted);">Flagship Retail & Laboratory</div>
                <div style="font-size: 0.875rem; color: var(--color-text-secondary); line-height: 1.5;">${settings.address}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Contact Form -->
        <div style="background: var(--color-surface); border: 1px solid var(--color-border-subtle); border-radius: var(--radius-xl); padding: 36px; box-shadow: var(--shadow-xs);">
          <h2 class="text-serif" style="font-size: 1.6rem; font-weight: 700; margin-bottom: 20px;">Send Us a Message</h2>
          <form id="contact-form" onsubmit="event.preventDefault(); window.handleContactSubmit(event);">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              <div class="form-group">
                <label class="form-label">Your Name *</label>
                <input type="text" class="form-input" id="contact-name" placeholder="Full Name" required>
              </div>
              <div class="form-group">
                <label class="form-label">Email Address *</label>
                <input type="email" class="form-input" id="contact-email" placeholder="name@example.com" required>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Subject</label>
              <select class="form-select" id="contact-subject">
                <option value="order">Order Tracking & Delivery Status</option>
                <option value="product">Product Consultation & Skin Recommendation</option>
                <option value="return">Returns, Replacements & Refunds</option>
                <option value="other">General Inquiry / Feedback</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Message *</label>
              <textarea class="form-textarea" id="contact-message" placeholder="How can we help your skincare journey?" rows="4" required></textarea>
            </div>

            <button type="submit" class="btn btn-primary btn-lg">
              Send Message →
            </button>
          </form>
        </div>
      </div>
    </div>
  `;
}
