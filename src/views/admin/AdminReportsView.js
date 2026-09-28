import { store } from '../../services/storeService.js';
import { formatINR, formatDate, getStatusBadge } from '../../utils/formatters.js';

export function renderAdminReportsView(filters = {}) {
  const report = store.generateReport(filters);
  const categories = store.getCategories();
  const summary = report.summary;

  return `
    <div class="admin-page-header">
      <div class="admin-page-title-group">
        <h1>Sales & Financial Reports Generator</h1>
        <p>Generate filtered business performance summaries, calculate profit margins, and export official CSV / PDF records.</p>
      </div>

      <div class="admin-header-actions">
        <button class="btn btn-outline btn-sm" onclick="window.print()">
          🖨️ Print / Save PDF
        </button>
        <button class="btn btn-primary btn-sm" onclick="window.downloadReportCSV()">
          📥 Export CSV Dataset
        </button>
      </div>
    </div>

    <!-- Filter Form Card -->
    <div class="admin-card" style="margin-bottom: 28px;">
      <h3 class="text-serif" style="font-size: 1.25rem; margin-bottom: 16px;">Report Filters</h3>
      <form id="report-filter-form" onsubmit="event.preventDefault(); window.applyReportFilters(event);">
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;">
          <div class="form-group">
            <label class="form-label">Start Date</label>
            <input type="date" class="form-input" id="report-start-date" value="${filters.startDate || '2026-01-01'}">
          </div>

          <div class="form-group">
            <label class="form-label">End Date</label>
            <input type="date" class="form-input" id="report-end-date" value="${filters.endDate || '2026-12-31'}">
          </div>

          <div class="form-group">
            <label class="form-label">Order Status</label>
            <select class="form-select" id="report-status">
              <option value="all" ${filters.status === 'all' ? 'selected' : ''}>All Statuses</option>
              <option value="Delivered" ${filters.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
              <option value="Shipped" ${filters.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
              <option value="Processing" ${filters.status === 'Processing' ? 'selected' : ''}>Processing</option>
              <option value="Pending" ${filters.status === 'Pending' ? 'selected' : ''}>Pending</option>
              <option value="Cancelled" ${filters.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
            </select>
          </div>

          <div class="form-group" style="display: flex; align-items: flex-end;">
            <button type="submit" class="btn btn-primary" style="width: 100%;">Apply Filters</button>
          </div>
        </div>
      </form>
    </div>

    <!-- 6 Summary Financial Metrics from Report -->
    <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 16px; margin-bottom: 28px;">
      <div class="financial-metric-card">
        <div class="financial-metric-label">Total Sales</div>
        <div class="financial-metric-val" style="font-size: 1.35rem;">${formatINR(summary.totalSales)}</div>
      </div>

      <div class="financial-metric-card">
        <div class="financial-metric-label">Total Revenue</div>
        <div class="financial-metric-val" style="font-size: 1.35rem; color: #2b70b0;">${formatINR(summary.totalRevenue)}</div>
      </div>

      <div class="financial-metric-card">
        <div class="financial-metric-label">Product Cost</div>
        <div class="financial-metric-val" style="font-size: 1.35rem; color: var(--color-danger);">${formatINR(summary.totalCost)}</div>
      </div>

      <div class="financial-metric-card">
        <div class="financial-metric-label">Net Profit</div>
        <div class="financial-metric-val" style="font-size: 1.35rem; color: var(--color-success);">${formatINR(summary.totalProfit)}</div>
      </div>

      <div class="financial-metric-card">
        <div class="financial-metric-label">Total Orders</div>
        <div class="financial-metric-val" style="font-size: 1.35rem;">${summary.totalOrders}</div>
      </div>

      <div class="financial-metric-card">
        <div class="financial-metric-label">Avg Order Value</div>
        <div class="financial-metric-val" style="font-size: 1.35rem; color: var(--color-blush-800);">${formatINR(summary.averageOrderValue)}</div>
      </div>
    </div>

    <!-- Generated Report Data Table -->
    <div class="admin-card" id="printable-report-area">
      <div class="admin-card-header">
        <div>
          <h2 class="admin-card-title">Generated Retail Order Manifest (${report.orders.length} Records)</h2>
          <div class="admin-card-subtitle">Generated on ${new Date().toLocaleDateString('en-IN')} for Glowspace Management</div>
        </div>
      </div>

      <div class="admin-table-wrapper">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Items Count</th>
              <th>Payment Method</th>
              <th>Order Status</th>
              <th>Gross Amount (₹)</th>
              <th>Cost (₹)</th>
              <th>Net Profit (₹)</th>
            </tr>
          </thead>
          <tbody>
            ${report.orders.map(o => `
              <tr>
                <td><strong>${o.id}</strong></td>
                <td>${formatDate(o.date)}</td>
                <td>${o.customerName}</td>
                <td>${o.items.reduce((s, i) => s + i.quantity, 0)} items</td>
                <td>${o.paymentMethod}</td>
                <td>${getStatusBadge(o.orderStatus)}</td>
                <td><strong>${formatINR(o.totalAmount)}</strong></td>
                <td style="color: var(--color-text-secondary);">${formatINR(o.totalCost)}</td>
                <td><strong style="color: var(--color-success);">${formatINR(o.profit)}</strong></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
