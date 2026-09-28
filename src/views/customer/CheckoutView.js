import { store } from '../../services/storeService.js';
import { formatINR } from '../../utils/formatters.js';

export function renderCheckoutView() {
  const cart = store.getCart();
  const summary = store.getCartSummary();
  const currentCustomer = store.getCurrentCustomer() || {};

  if (cart.length === 0) {
    return `
      <div class="container" style="padding: 80px 20px; text-align: center;">
        <h2 class="text-serif" style="font-size: 2rem; margin-bottom: 12px;">Your Cart is Empty</h2>
        <p style="color: var(--color-text-secondary); margin-bottom: 24px;">Please add items to your cart before proceeding to checkout.</p>
        <a href="#shop" class="btn btn-primary">Browse Shop</a>
      </div>
    `;
  }

  const defaultAddress = currentCustomer.address || {};

  return `
    <div class="container">
      <!-- Breadcrumb & Header -->
      <div style="padding: 30px 0 10px;">
        <div style="font-size: 0.8125rem; color: var(--color-text-muted); margin-bottom: 6px;">
          <a href="#home">Home</a> / <a href="#cart">Cart</a> / <span style="color: var(--color-text-main);">Checkout</span>
        </div>
        <h1 class="text-serif" style="font-size: 2.25rem; font-weight: 700; color: var(--color-text-main);">
          Secure Skincare Checkout
        </h1>
      </div>

      <form id="checkout-form" onsubmit="event.preventDefault(); window.handlePlaceOrder(event);">
        <div class="checkout-layout">
          <!-- Left Column: Customer Details, Address, Payment -->
          <div>
            <!-- 1. Customer Info -->
            <div class="checkout-card">
              <h2 class="checkout-step-title">
                <span class="step-number">1</span>
                <span>Customer Information</span>
              </h2>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                <div class="form-group" style="grid-column: span 2;">
                  <label class="form-label">Full Name *</label>
                  <input type="text" class="form-input" id="checkout-fullname" required value="${currentCustomer.name || 'Ananya Sharma'}">
                </div>
                <div class="form-group">
                  <label class="form-label">Email Address *</label>
                  <input type="email" class="form-input" id="checkout-email" required value="${currentCustomer.email || 'ananya.sharma@example.com'}">
                </div>
                <div class="form-group">
                  <label class="form-label">Phone Number *</label>
                  <input type="tel" class="form-input" id="checkout-phone" required value="${currentCustomer.phone || '+91 98765 43210'}">
                </div>
              </div>
            </div>

            <!-- 2. Shipping Address -->
            <div class="checkout-card">
              <h2 class="checkout-step-title">
                <span class="step-number">2</span>
                <span>Shipping Address</span>
              </h2>
              <div class="form-group">
                <label class="form-label">Street Address / Apartment *</label>
                <input type="text" class="form-input" id="checkout-street" required placeholder="Flat No., House, Building, Road" value="${defaultAddress.street || '42, Lotus Boulevard, Sector 100'}">
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px;">
                <div class="form-group">
                  <label class="form-label">City *</label>
                  <input type="text" class="form-input" id="checkout-city" required value="${defaultAddress.city || 'Noida'}">
                </div>
                <div class="form-group">
                  <label class="form-label">State *</label>
                  <input type="text" class="form-input" id="checkout-state" required value="${defaultAddress.state || 'Uttar Pradesh'}">
                </div>
                <div class="form-group">
                  <label class="form-label">PIN Code *</label>
                  <input type="text" class="form-input" id="checkout-pincode" required value="${defaultAddress.pincode || '201304'}">
                </div>
              </div>
            </div>

            <!-- 3. Payment Method -->
            <div class="checkout-card">
              <h2 class="checkout-step-title">
                <span class="step-number">3</span>
                <span>Payment Method</span>
              </h2>
              <div class="payment-options-grid">
                <label class="payment-option-card active" id="pay-opt-upi" onclick="window.switchPaymentMethod('UPI')">
                  <input type="radio" name="payment-method" value="UPI" checked style="display: none;">
                  <span style="font-size: 1.5rem;">📱</span>
                  <strong style="font-size: 0.875rem;">Instant UPI</strong>
                  <span style="font-size: 0.75rem; color: var(--color-text-muted);">GPay, PhonePe, Paytm</span>
                </label>

                <label class="payment-option-card" id="pay-opt-card" onclick="window.switchPaymentMethod('Card')">
                  <input type="radio" name="payment-method" value="Card" style="display: none;">
                  <span style="font-size: 1.5rem;">💳</span>
                  <strong style="font-size: 0.875rem;">Credit / Debit Card</strong>
                  <span style="font-size: 0.75rem; color: var(--color-text-muted);">Visa, Mastercard, RuPay</span>
                </label>

                <label class="payment-option-card" id="pay-opt-cod" onclick="window.switchPaymentMethod('Cash on Delivery')">
                  <input type="radio" name="payment-method" value="Cash on Delivery" style="display: none;">
                  <span style="font-size: 1.5rem;">💵</span>
                  <strong style="font-size: 0.875rem;">Cash on Delivery</strong>
                  <span style="font-size: 0.75rem; color: var(--color-text-muted);">Pay cash upon arrival</span>
                </label>
              </div>

              <!-- Interactive Payment Details Simulator -->
              <div id="payment-details-simulator" style="background: var(--color-surface-soft); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--color-border);">
                <div id="pay-upi-view">
                  <div style="font-size: 0.875rem; font-weight: 600; margin-bottom: 6px;">Enter UPI ID or Scan QR:</div>
                  <div style="display: flex; gap: 8px;">
                    <input type="text" class="form-input" id="upi-id-input" placeholder="e.g. yourname@okhdfcbank" value="ananya@oksbi">
                    <span class="badge badge-success" style="height: 42px; display: inline-flex; align-items: center;">Verified ✓</span>
                  </div>
                </div>

                <div id="pay-card-view" style="display: none;">
                  <div style="display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 10px;">
                    <input type="text" class="form-input" placeholder="Card Number" value="4532 •••• •••• 8829">
                    <input type="text" class="form-input" placeholder="MM/YY" value="08/29">
                    <input type="password" class="form-input" placeholder="CVV" value="•••">
                  </div>
                </div>

                <div id="pay-cod-view" style="display: none;">
                  <p style="font-size: 0.875rem; color: var(--color-text-secondary);">
                    You can pay in cash or via mobile UPI QR code to the courier delivery agent upon arrival.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Order Review & Place Order -->
          <div>
            <div class="cart-summary-card">
              <h2 class="summary-title">Order Items (${summary.itemCount})</h2>

              <!-- Items Mini List -->
              <div style="max-height: 240px; overflow-y: auto; margin-bottom: 18px; padding-right: 6px;">
                ${cart.map(item => `
                  <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 12px; font-size: 0.875rem;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                      <img src="${item.image}" alt="${item.name}" style="width: 44px; height: 44px; border-radius: var(--radius-sm); object-fit: cover;">
                      <div>
                        <div style="font-weight: 600; max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${item.name}</div>
                        <div style="color: var(--color-text-muted); font-size: 0.75rem;">Qty: ${item.quantity}</div>
                      </div>
                    </div>
                    <span style="font-weight: 700;">${formatINR(item.price * item.quantity)}</span>
                  </div>
                `).join('')}
              </div>

              <div class="summary-row">
                <span>Subtotal</span>
                <span>${formatINR(summary.subtotal)}</span>
              </div>

              ${summary.discount > 0 ? `
                <div class="summary-row" style="color: var(--color-success);">
                  <span>Discount</span>
                  <span>-${formatINR(summary.discount)}</span>
                </div>
              ` : ''}

              <div class="summary-row">
                <span>Shipping</span>
                <span>${summary.shipping === 0 ? '<strong style="color: var(--color-success);">FREE</strong>' : formatINR(summary.shipping)}</span>
              </div>

              <div class="summary-row">
                <span>GST (5%)</span>
                <span>${formatINR(summary.tax)}</span>
              </div>

              <div class="summary-row total">
                <span>Total Payable</span>
                <span style="color: var(--color-blush-800);">${formatINR(summary.grandTotal)}</span>
              </div>

              <div style="margin-top: 24px;">
                <button type="submit" class="btn btn-primary btn-lg btn-full" id="place-order-btn">
                  Place Order (${formatINR(summary.grandTotal)}) →
                </button>
              </div>

              <div style="margin-top: 16px; font-size: 0.75rem; text-align: center; color: var(--color-text-muted);">
                By placing this order, you agree to Glowspace’s Terms of Retail and Privacy Policy.
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  `;
}
