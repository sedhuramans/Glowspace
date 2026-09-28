import { store } from '../../services/storeService.js';
import { formatINR } from '../../utils/formatters.js';

export function renderCartView() {
  const cart = store.getCart();
  const summary = store.getCartSummary();

  if (cart.length === 0) {
    return `
      <div class="container" style="padding: 80px 20px; text-align: center;">
        <div style="width: 80px; height: 80px; border-radius: 50%; background: var(--color-blush-100); color: var(--color-blush-600); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
          </svg>
        </div>
        <h2 class="text-serif" style="font-size: 2.2rem; margin-bottom: 8px;">Your Shopping Bag is Empty</h2>
        <p style="color: var(--color-text-secondary); margin-bottom: 28px; max-width: 420px; margin-left: auto; margin-right: auto;">
          Explore our gentle, dermatologist-formulated skincare serums, cleansers, and essentials to give your skin everyday radiance.
        </p>
        <a href="#shop" class="btn btn-primary btn-lg">Explore Formulations →</a>
      </div>
    `;
  }

  const freeShippingPct = Math.min(100, Math.round((summary.subtotal / summary.freeShippingThreshold) * 100));

  return `
    <div class="container">
      <!-- Breadcrumb & Header -->
      <div style="padding: 30px 0 10px;">
        <div style="font-size: 0.8125rem; color: var(--color-text-muted); margin-bottom: 6px;">
          <a href="#home">Home</a> / <span style="color: var(--color-text-main);">Shopping Bag</span>
        </div>
        <h1 class="text-serif" style="font-size: 2.25rem; font-weight: 700; color: var(--color-text-main);">
          Your Skincare Bag (${summary.itemCount} items)
        </h1>
      </div>

      <div class="cart-layout">
        <!-- Cart Items List Card -->
        <div class="cart-table-card">
          <!-- Free Shipping Progress -->
          <div style="background: var(--color-surface-soft); padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--color-border-subtle); margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; font-size: 0.8125rem; font-weight: 600;">
              ${summary.remainingForFreeShipping === 0 ? `
                <span style="color: var(--color-success);">🎉 Congratulations! You have unlocked Free Express Shipping!</span>
              ` : `
                <span>Add <strong>${formatINR(summary.remainingForFreeShipping)}</strong> more to get <strong>Free Express Shipping</strong>!</span>
              `}
              <span>${freeShippingPct}%</span>
            </div>
            <div class="free-shipping-bar">
              <div class="free-shipping-progress" style="width: ${freeShippingPct}%;"></div>
            </div>
          </div>

          <!-- Items Table -->
          <div>
            ${cart.map(item => `
              <div class="cart-item-row" data-cart-product-id="${item.productId}">
                <img src="${item.image}" alt="${item.name}" class="cart-item-thumb">
                
                <div>
                  <h3 class="cart-item-title">
                    <a href="#product/${item.productId}">${item.name}</a>
                  </h3>
                  <div class="cart-item-price">${formatINR(item.price)} each</div>
                </div>

                <div class="quantity-selector">
                  <button class="qty-btn" onclick="window.updateCartQty('${item.productId}', ${item.quantity - 1})">-</button>
                  <span class="qty-value">${item.quantity}</span>
                  <button class="qty-btn" onclick="window.updateCartQty('${item.productId}', ${item.quantity + 1})">+</button>
                </div>

                <div style="text-align: right; display: flex; flex-direction: column; align-items: flex-end; gap: 8px;">
                  <span style="font-size: 1.125rem; font-weight: 700; color: var(--color-text-main);">
                    ${formatINR(item.price * item.quantity)}
                  </span>
                  <button style="color: var(--color-danger); font-size: 0.8125rem; background: none; border: none; cursor: pointer; text-decoration: underline;" onclick="window.removeFromCart('${item.productId}')">
                    Remove
                  </button>
                </div>
              </div>
            `).join('')}
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 24px; padding-top: 20px; border-top: 1px solid var(--color-border-subtle);">
            <a href="#shop" class="btn btn-outline btn-sm">
              ← Continue Shopping
            </a>
            <button class="btn btn-outline btn-sm" style="color: var(--color-danger);" onclick="window.clearEntireCart()">
              Clear Cart
            </button>
          </div>
        </div>

        <!-- Order Summary Card -->
        <div class="cart-summary-card">
          <h2 class="summary-title">Order Summary</h2>

          <!-- Promo Code Form -->
          <div style="margin-bottom: 20px;">
            <label class="form-label">Have a Discount Code?</label>
            ${summary.appliedCoupon ? `
              <div style="background: var(--color-success-bg); border: 1px solid #c2e2ce; padding: 10px 14px; border-radius: var(--radius-md); display: flex; justify-content: space-between; align-items: center; font-size: 0.875rem;">
                <div>
                  <strong style="color: var(--color-success);">${summary.appliedCoupon.code}</strong>
                  <div style="font-size: 0.75rem; color: #43805f;">${summary.appliedCoupon.description}</div>
                </div>
                <button onclick="window.removeAppliedCoupon()" style="background: none; border: none; color: var(--color-danger); cursor: pointer; font-size: 0.8125rem; font-weight: bold;">Remove</button>
              </div>
            ` : `
              <form style="display: flex; gap: 8px;" onsubmit="event.preventDefault(); window.handleApplyCoupon(event);">
                <input type="text" id="cart-coupon-input" class="form-input" placeholder="e.g. WELCOME20" style="text-transform: uppercase;">
                <button type="submit" class="btn btn-secondary btn-sm">Apply</button>
              </form>
              <div style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: 6px;">Try <strong>WELCOME20</strong> or <strong>GLOW10</strong></div>
            `}
          </div>

          <!-- Price Calculations -->
          <div class="summary-row">
            <span>Subtotal</span>
            <span style="font-weight: 600;">${formatINR(summary.subtotal)}</span>
          </div>

          ${summary.discount > 0 ? `
            <div class="summary-row" style="color: var(--color-success);">
              <span>Discount</span>
              <span>-${formatINR(summary.discount)}</span>
            </div>
          ` : ''}

          <div class="summary-row">
            <span>Estimated Shipping</span>
            <span>${summary.shipping === 0 ? '<strong style="color: var(--color-success);">FREE</strong>' : formatINR(summary.shipping)}</span>
          </div>

          <div class="summary-row">
            <span>Estimated GST (5%)</span>
            <span>${formatINR(summary.tax)}</span>
          </div>

          <div class="summary-row total">
            <span>Grand Total</span>
            <span style="color: var(--color-blush-800);">${formatINR(summary.grandTotal)}</span>
          </div>

          <div style="margin-top: 24px;">
            <a href="#checkout" class="btn btn-primary btn-lg btn-full">
              Proceed to Checkout →
            </a>
          </div>

          <!-- Trust Badges -->
          <div style="margin-top: 20px; font-size: 0.75rem; color: var(--color-text-muted); display: flex; flex-direction: column; gap: 6px;">
            <div>🔒 100% Encrypted & Safe Checkout</div>
            <div>🚚 Express Dispatch in 24 Hours</div>
          </div>
        </div>
      </div>
    </div>
  `;
}
