import { store } from '../../services/storeService.js';
import { formatINR, formatDate, getStatusBadge } from '../../utils/formatters.js';

export function renderOrderConfirmationView(orderId) {
  const order = store.getOrderById(orderId);

  if (!order) {
    return `
      <div class="container" style="padding: 80px 20px; text-align: center;">
        <h2 class="text-serif" style="font-size: 2rem; margin-bottom: 12px;">Order Not Found</h2>
        <p style="color: var(--color-text-secondary); margin-bottom: 24px;">We couldn't locate the specified order reference.</p>
        <a href="#shop" class="btn btn-primary">Return to Shop</a>
      </div>
    `;
  }

  const address = order.shippingAddress || {};

  return `
    <div class="container">
      <div class="confirmation-container">
        <!-- Success Animation Icon -->
        <div class="success-icon-badge">
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>

        <span class="badge badge-success" style="font-size: 0.8125rem; margin-bottom: 12px;">Order Successfully Placed</span>
        <h1 class="text-serif" style="font-size: 2.75rem; font-weight: 700; color: var(--color-text-main); margin-bottom: 8px;">
          Thank you for your order!
        </h1>
        <p style="font-size: 1rem; color: var(--color-text-secondary); max-width: 500px; margin: 0 auto 30px;">
          Your order confirmation and tracking details have been sent to <strong>${order.customerEmail}</strong>.
        </p>

        <!-- Tracking Timeline -->
        <div class="tracking-timeline">
          <div class="timeline-step completed">
            <div class="timeline-dot">✓</div>
            <span class="timeline-label">Placed</span>
          </div>
          <div class="timeline-step active">
            <div class="timeline-dot">2</div>
            <span class="timeline-label">Confirmed</span>
          </div>
          <div class="timeline-step">
            <div class="timeline-dot">3</div>
            <span class="timeline-label">Processing</span>
          </div>
          <div class="timeline-step">
            <div class="timeline-dot">4</div>
            <span class="timeline-label">Shipped</span>
          </div>
          <div class="timeline-step">
            <div class="timeline-dot">5</div>
            <span class="timeline-label">Delivered</span>
          </div>
        </div>

        <!-- Receipt Card -->
        <div class="confirmation-receipt-card" id="printable-receipt">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; padding-bottom: 20px; border-bottom: 1px solid var(--color-border); margin-bottom: 20px; flex-wrap: wrap; gap: 14px;">
            <div>
              <div style="font-size: 0.8125rem; color: var(--color-text-muted); text-transform: uppercase; font-weight: 700;">Order Reference</div>
              <div style="font-size: 1.4rem; font-weight: 800; color: var(--color-text-main);">${order.id}</div>
              <div style="font-size: 0.8125rem; color: var(--color-text-secondary);">Placed on ${formatDate(order.date)}</div>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 0.8125rem; color: var(--color-text-muted); text-transform: uppercase; font-weight: 700;">Status</div>
              <div style="margin-top: 4px;">${getStatusBadge(order.orderStatus)}</div>
              <div style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: 4px;">Tracking: ${order.trackingNumber || 'TRK-GLW-01'}</div>
            </div>
          </div>

          <!-- Items Ordered -->
          <div style="margin-bottom: 24px;">
            <div style="font-weight: 700; font-size: 0.875rem; text-transform: uppercase; color: var(--color-text-muted); margin-bottom: 12px;">Items Ordered</div>
            <div style="display: flex; flex-direction: column; gap: 12px;">
              ${order.items.map(item => `
                <div style="display: flex; align-items: center; justify-content: space-between; gap: 14px; padding-bottom: 12px; border-bottom: 1px solid var(--color-border-subtle);">
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <img src="${item.image}" alt="${item.name}" style="width: 48px; height: 48px; border-radius: var(--radius-sm); object-fit: cover;">
                    <div>
                      <div style="font-weight: 600; font-size: 0.9375rem;">${item.name}</div>
                      <div style="font-size: 0.8125rem; color: var(--color-text-muted);">Qty: ${item.quantity} × ${formatINR(item.price)}</div>
                    </div>
                  </div>
                  <span style="font-weight: 700; font-size: 0.9375rem;">${formatINR(item.price * item.quantity)}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Address & Payment Grid -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; padding-bottom: 20px; border-bottom: 1px solid var(--color-border); margin-bottom: 20px;">
            <div>
              <div style="font-weight: 700; font-size: 0.8125rem; text-transform: uppercase; color: var(--color-text-muted); margin-bottom: 6px;">Delivery To</div>
              <div style="font-weight: 600; font-size: 0.9375rem;">${order.customerName}</div>
              <div style="font-size: 0.875rem; color: var(--color-text-secondary); line-height: 1.5;">
                ${address.street || ''}<br>
                ${address.city || ''}, ${address.state || ''} - ${address.pincode || ''}<br>
                Phone: ${order.customerPhone}
              </div>
            </div>

            <div>
              <div style="font-weight: 700; font-size: 0.8125rem; text-transform: uppercase; color: var(--color-text-muted); margin-bottom: 6px;">Payment Summary</div>
              <div style="font-size: 0.875rem; color: var(--color-text-secondary); line-height: 1.6;">
                Method: <strong>${order.paymentMethod}</strong><br>
                Payment Status: <span style="font-weight: 600; color: ${order.paymentStatus === 'Paid' ? 'var(--color-success)' : 'var(--color-warning)'}">${order.paymentStatus}</span><br>
                Dispatched by: <strong>Glowspace Express Logistics</strong>
              </div>
            </div>
          </div>

          <!-- Total Calculation -->
          <div style="display: flex; flex-direction: column; gap: 8px; font-size: 0.9375rem;">
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--color-text-secondary);">Subtotal:</span>
              <span>${formatINR(order.subtotal)}</span>
            </div>
            ${order.discount > 0 ? `
              <div style="display: flex; justify-content: space-between; color: var(--color-success);">
                <span>Discount:</span>
                <span>-${formatINR(order.discount)}</span>
              </div>
            ` : ''}
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--color-text-secondary);">Shipping:</span>
              <span>${order.shipping === 0 ? 'FREE' : formatINR(order.shipping)}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--color-text-secondary);">Taxes (GST):</span>
              <span>${formatINR(order.tax)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 1.3rem; font-weight: 800; color: var(--color-text-main); border-top: 1px solid var(--color-border); padding-top: 12px; margin-top: 6px;">
              <span>Total Paid:</span>
              <span style="color: var(--color-blush-800);">${formatINR(order.totalAmount)}</span>
            </div>
          </div>
        </div>

        <!-- Action CTAs -->
        <div style="display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;">
          <button class="btn btn-outline" onclick="window.print()">
            🖨️ Print Invoice Receipt
          </button>
          <a href="#account/orders" class="btn btn-secondary">
            View in My Orders →
          </a>
          <a href="#shop" class="btn btn-primary">
            Continue Shopping
          </a>
        </div>
      </div>
    </div>
  `;
}
