export function renderCustomerFooter() {
  return `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <!-- Brand Column -->
          <div class="footer-brand">
            <a href="#home" class="brand-logo" style="color: #ffffff;">
              <div class="brand-logo-mark">G</div>
              <span class="text-serif">Glowspace</span>
            </a>
            <p>
              Simple skincare formulated with clean, clinically proven actives and gentle botanical extracts. Dermatologically tested for glowing, healthier skin.
            </p>
            <div class="footer-socials">
              <a href="javascript:void(0)" class="social-icon" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="javascript:void(0)" class="social-icon" aria-label="Pinterest">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/><circle cx="12" cy="12" r="10"/></svg>
              </a>
              <a href="javascript:void(0)" class="social-icon" aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h4 class="footer-heading">Shop by Care</h4>
            <ul class="footer-links">
              <li><a href="#shop?category=face-care">Face Care Serums</a></li>
              <li><a href="#shop?category=face-care">Ceramide Cleansers</a></li>
              <li><a href="#shop?category=body-care">Velvet Body Creams</a></li>
              <li><a href="#shop?category=hair-care">Scalp & Hair Oils</a></li>
              <li><a href="#shop?category=skin-essentials">Mineral Sunscreens</a></li>
            </ul>
          </div>

          <!-- Customer Service -->
          <div>
            <h4 class="footer-heading">Customer Care</h4>
            <ul class="footer-links">
              <li><a href="#account/orders">Track Your Order</a></li>
              <li><a href="#faq">Shipping & Returns</a></li>
              <li><a href="#contact">Contact Support</a></li>
              <li><a href="#faq">Frequently Asked Questions</a></li>
              <li><a href="#about">Our Clean Standard</a></li>
            </ul>
          </div>

          <!-- Owner Portal & Academic Badge -->
          <div>
            <h4 class="footer-heading">Owner Portal</h4>
            <p style="font-size: 0.8125rem; color: #9f9498; margin-bottom: 14px;">
              Manage business analytics, live sales, profit, orders, and inventory from the Owner Dashboard.
            </p>
            <a href="#admin/dashboard" class="btn btn-secondary btn-sm" style="background: rgba(255,255,255,0.1); color: #ffffff; border-color: rgba(255,255,255,0.2); width: 100%;">
              Access Owner Dashboard →
            </a>
          </div>
        </div>

        <div class="footer-bottom">
          <div>© 2026 Glowspace Retail Inc. All rights reserved. • BSc Computer Science College Project</div>
          <div style="display: flex; gap: 20px;">
            <a href="#faq" style="color: inherit;">Privacy Policy</a>
            <a href="#faq" style="color: inherit;">Terms of Service</a>
            <a href="#contact" style="color: inherit;">Help Center</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}
