import { store } from '../../services/storeService.js';
import { formatINR } from '../../utils/formatters.js';

export function renderAdminOrderAnalyticsView() {
  const statusCounts = store.getOrderStatusBreakdown();
  const allOrders = store.getOrders();
  const total = allOrders.length;

  const completed = statusCounts.Delivered || 0;
  const pending = (statusCounts.Pending || 0) + (statusCounts.Processing || 0) + (statusCounts.Confirmed || 0);
  const cancelled = statusCounts.Cancelled || 0;
  const returned = statusCounts.Returned || 0;

  // Payment Breakdown
  const upiCount = allOrders.filter(o => o.paymentMethod === 'UPI').length;
  const cardCount = allOrders.filter(o => o.paymentMethod === 'Card').length;
  const codCount = allOrders.filter(o => o.paymentMethod === 'Cash on Delivery').length;

  return `
    <div class="admin-page-header">
      <div class="admin-page-title-group">
        <h1>Order Analytics & Fulfillment Telemetry</h1>
        <p>Real-time lifecycle tracking, completion rates, and payment method channels.</p>
      </div>
    </div>

    <!-- Order Status 5 Summary Cards -->
    <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 18px; margin-bottom: 32px;">
      <div class="financial-metric-card">
        <div class="financial-metric-label">Total Placed</div>
        <div class="financial-metric-val">${total}</div>
        <div style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: 4px;">100% of pipeline</div>
      </div>

      <div class="financial-metric-card">
        <div class="financial-metric-label">Completed / Delivered</div>
        <div class="financial-metric-val" style="color: var(--color-success);">${completed}</div>
        <div style="font-size: 0.75rem; color: var(--color-success); margin-top: 4px;">${total > 0 ? ((completed/total)*100).toFixed(0) : 0}% success rate</div>
      </div>

      <div class="financial-metric-card">
        <div class="financial-metric-label">Pending / Processing</div>
        <div class="financial-metric-val" style="color: var(--color-warning);">${pending}</div>
        <div style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: 4px;">In active dispatch</div>
      </div>

      <div class="financial-metric-card">
        <div class="financial-metric-label">Cancelled</div>
        <div class="financial-metric-val" style="color: var(--color-danger);">${cancelled}</div>
        <div style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: 4px;">Zero return friction</div>
      </div>

      <div class="financial-metric-card">
        <div class="financial-metric-label">Returned</div>
        <div class="financial-metric-val" style="color: var(--color-info);">${returned}</div>
        <div style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: 4px;">Quality audited</div>
      </div>
    </div>

    <!-- Analytics Charts: Status Donut & Weekly Volume Bar Chart -->
    <div class="analytics-grid-2">
      <!-- Status Donut Chart -->
      <div class="admin-card">
        <div class="admin-card-header">
          <div>
            <h2 class="admin-card-title">Order Status Composition</h2>
            <div class="admin-card-subtitle">Visual distribution of order lifecycle</div>
          </div>
        </div>
        <div class="chart-container">
          <canvas id="order-status-donut-chart"></canvas>
        </div>
      </div>

      <!-- Payment Methods & Channels -->
      <div class="admin-card">
        <div class="admin-card-header">
          <div>
            <h2 class="admin-card-title">Payment Method Preferences</h2>
            <div class="admin-card-subtitle">Channel adoption by customers</div>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 20px; margin-top: 14px;">
          <div>
            <div style="display: flex; justify-content: space-between; font-size: 0.875rem; margin-bottom: 6px;">
              <span>📱 Instant UPI (Google Pay, PhonePe, Paytm)</span>
              <strong>${upiCount} Orders (${total > 0 ? ((upiCount/total)*100).toFixed(0) : 0}%)</strong>
            </div>
            <div style="height: 10px; background: var(--color-border); border-radius: var(--radius-pill); overflow: hidden;">
              <div style="height: 100%; width: ${total > 0 ? (upiCount/total)*100 : 0}%; background: var(--color-blush-500); border-radius: var(--radius-pill);"></div>
            </div>
          </div>

          <div>
            <div style="display: flex; justify-content: space-between; font-size: 0.875rem; margin-bottom: 6px;">
              <span>💳 Credit & Debit Cards (Visa / Mastercard)</span>
              <strong>${cardCount} Orders (${total > 0 ? ((cardCount/total)*100).toFixed(0) : 0}%)</strong>
            </div>
            <div style="height: 10px; background: var(--color-border); border-radius: var(--radius-pill); overflow: hidden;">
              <div style="height: 100%; width: ${total > 0 ? (cardCount/total)*100 : 0}%; background: #467399; border-radius: var(--radius-pill);"></div>
            </div>
          </div>

          <div>
            <div style="display: flex; justify-content: space-between; font-size: 0.875rem; margin-bottom: 6px;">
              <span>💵 Cash on Delivery (COD)</span>
              <strong>${codCount} Orders (${total > 0 ? ((codCount/total)*100).toFixed(0) : 0}%)</strong>
            </div>
            <div style="height: 10px; background: var(--color-border); border-radius: var(--radius-pill); overflow: hidden;">
              <div style="height: 100%; width: ${total > 0 ? (codCount/total)*100 : 0}%; background: var(--color-warning); border-radius: var(--radius-pill);"></div>
            </div>
          </div>
        </div>

        <div style="margin-top: 30px; padding: 14px; background: var(--color-surface-soft); border-radius: var(--radius-md); border: 1px solid var(--color-border-subtle); font-size: 0.8125rem; color: var(--color-text-secondary);">
          💡 <strong>Retail Insight:</strong> UPI represents the highest converting payment channel with zero payment dropouts and instant settlement.
        </div>
      </div>
    </div>
  `;
}
