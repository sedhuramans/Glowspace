import { store } from '../../services/storeService.js';
import { formatINR, formatDate, getStatusBadge } from '../../utils/formatters.js';

export function renderAdminDashboardView() {
  const kpis = store.getKPIs();
  const lowStock = kpis.lowStockProducts || [];
  const recentOrders = store.getOrders().slice(0, 5);
  const topProducts = store.getTopSellingProducts(4);

  return `
    <!-- Page Header -->
    <div class="admin-page-header">
      <div class="admin-page-title-group">
        <h1>Retail Business Overview</h1>
        <p>Real-time analytical telemetry, financial metrics, and inventory health for Glowspace Skincare.</p>
      </div>
      <div class="admin-header-actions">
        <div class="timeframe-filter-bar">
          <button class="timeframe-btn active" onclick="window.filterDashboardTimeframe('30D', this)">30 Days</button>
          <button class="timeframe-btn" onclick="window.filterDashboardTimeframe('3M', this)">3 Months</button>
          <button class="timeframe-btn" onclick="window.filterDashboardTimeframe('1Y', this)">1 Year</button>
          <button class="timeframe-btn" onclick="window.filterDashboardTimeframe('ALL', this)">All Time</button>
        </div>
        <a href="#admin/reports" class="btn btn-secondary btn-sm">
          📑 Generate Report
        </a>
      </div>
    </div>

    <!-- Low Stock Alert Warning Banner -->
    ${lowStock.length > 0 ? `
      <div class="alert-banner">
        <div class="alert-banner-left">
          <div class="alert-banner-icon">⚠️</div>
          <div>
            <strong>Low Stock Alert:</strong> ${lowStock[0].name} is running low (Only ${lowStock[0].stock} units remaining). ${lowStock.length > 1 ? `Plus ${lowStock.length - 1} other item(s) require restock.` : ''}
          </div>
        </div>
        <a href="#admin/inventory" class="btn btn-secondary btn-sm" style="background: #ffffff; border-color: #f6d8ae; color: #8c5b1b;">
          Manage Inventory →
        </a>
      </div>
    ` : ''}

    <!-- 8 KPI Summary Cards Grid -->
    <div class="kpi-cards-grid">
      <!-- 1. Total Sales -->
      <div class="kpi-card">
        <div class="kpi-card-header">
          <div class="kpi-card-icon kpi-icon-sales">🛍️</div>
          <span class="kpi-card-badge kpi-badge-up">${kpis.growthRates.sales}</span>
        </div>
        <div class="kpi-card-title">Total Sales</div>
        <div class="kpi-card-value">${formatINR(kpis.totalSales)}</div>
        <div class="kpi-card-comparison">vs ₹2,10,000 previous period</div>
      </div>

      <!-- 2. Total Revenue -->
      <div class="kpi-card">
        <div class="kpi-card-header">
          <div class="kpi-card-icon kpi-icon-revenue">💳</div>
          <span class="kpi-card-badge kpi-badge-up">${kpis.growthRates.revenue}</span>
        </div>
        <div class="kpi-card-title">Total Revenue</div>
        <div class="kpi-card-value">${formatINR(kpis.totalRevenue)}</div>
        <div class="kpi-card-comparison">Gross retail receipts</div>
      </div>

      <!-- 3. Total Profit -->
      <div class="kpi-card">
        <div class="kpi-card-header">
          <div class="kpi-card-icon kpi-icon-profit">💰</div>
          <span class="kpi-card-badge kpi-badge-up">${kpis.growthRates.profit}</span>
        </div>
        <div class="kpi-card-title">Total Profit (${kpis.profitMargin}% Margin)</div>
        <div class="kpi-card-value" style="color: var(--color-success);">${formatINR(kpis.totalProfit)}</div>
        <div class="kpi-card-comparison">Net profit after formulation costs</div>
      </div>

      <!-- 4. Total Orders -->
      <div class="kpi-card">
        <div class="kpi-card-header">
          <div class="kpi-card-icon kpi-icon-orders">📦</div>
          <span class="kpi-card-badge kpi-badge-up">${kpis.growthRates.orders}</span>
        </div>
        <div class="kpi-card-title">Total Orders</div>
        <div class="kpi-card-value">${kpis.totalOrders}</div>
        <div class="kpi-card-comparison">AOV: ${formatINR(kpis.averageOrderValue)}</div>
      </div>

      <!-- 5. Total Customers -->
      <div class="kpi-card">
        <div class="kpi-card-header">
          <div class="kpi-card-icon kpi-icon-customers">👥</div>
          <span class="kpi-card-badge kpi-badge-up">${kpis.growthRates.customers}</span>
        </div>
        <div class="kpi-card-title">Total Customers</div>
        <div class="kpi-card-value">${kpis.totalCustomers}</div>
        <div class="kpi-card-comparison">88% Repeat buyers</div>
      </div>

      <!-- 6. Total Products -->
      <div class="kpi-card">
        <div class="kpi-card-header">
          <div class="kpi-card-icon kpi-icon-products">🧴</div>
          <span class="kpi-card-badge kpi-badge-neutral">Active</span>
        </div>
        <div class="kpi-card-title">Products Catalogue</div>
        <div class="kpi-card-value">${kpis.totalProducts}</div>
        <div class="kpi-card-comparison">Across 4 Skincare Categories</div>
      </div>

      <!-- 7. Low Stock Products -->
      <div class="kpi-card" onclick="window.location.hash = '#admin/inventory'" style="cursor: pointer;">
        <div class="kpi-card-header">
          <div class="kpi-card-icon kpi-icon-stock">⚠️</div>
          <span class="kpi-card-badge ${kpis.lowStockCount > 0 ? 'kpi-badge-warn' : 'kpi-badge-up'}">
            ${kpis.lowStockCount > 0 ? 'Action Required' : 'Optimal'}
          </span>
        </div>
        <div class="kpi-card-title">Low Stock Formulations</div>
        <div class="kpi-card-value" style="color: ${kpis.lowStockCount > 0 ? 'var(--color-danger)' : 'var(--color-text-main)'};">${kpis.lowStockCount}</div>
        <div class="kpi-card-comparison">Threshold: ≤ 10 units</div>
      </div>

      <!-- 8. Pending Orders -->
      <div class="kpi-card" onclick="window.location.hash = '#admin/orders'" style="cursor: pointer;">
        <div class="kpi-card-header">
          <div class="kpi-card-icon kpi-icon-pending">⏳</div>
          <span class="kpi-card-badge ${kpis.pendingOrdersCount > 0 ? 'kpi-badge-warn' : 'kpi-badge-up'}">
            ${kpis.pendingOrdersCount > 0 ? 'In Queue' : 'Cleared'}
          </span>
        </div>
        <div class="kpi-card-title">Pending Fulfillment</div>
        <div class="kpi-card-value" style="color: ${kpis.pendingOrdersCount > 0 ? 'var(--color-warning)' : 'var(--color-text-main)'};">${kpis.pendingOrdersCount}</div>
        <div class="kpi-card-comparison">Require dispatch packaging</div>
      </div>
    </div>

    <!-- Analytics Charts Section -->
    <div class="analytics-grid-2">
      <!-- Monthly Sales Performance Chart -->
      <div class="admin-card">
        <div class="admin-card-header">
          <div>
            <h2 class="admin-card-title">Monthly Sales, Revenue & Profit</h2>
            <div class="admin-card-subtitle">Comprehensive annual retail performance (Jan – Dec 2026)</div>
          </div>
          <a href="#admin/sales-analytics" class="btn btn-outline btn-sm">Deep Dive Analytics →</a>
        </div>
        <div class="chart-container">
          <canvas id="dashboard-sales-chart"></canvas>
        </div>
      </div>

      <!-- Order Status Distribution Donut Chart -->
      <div class="admin-card">
        <div class="admin-card-header">
          <div>
            <h2 class="admin-card-title">Order Status Distribution</h2>
            <div class="admin-card-subtitle">Fulfillment pipeline breakdown</div>
          </div>
          <a href="#admin/order-analytics" class="btn btn-outline btn-sm">View Analytics</a>
        </div>
        <div class="chart-container">
          <canvas id="dashboard-order-status-chart"></canvas>
        </div>
      </div>
    </div>

    <!-- Bottom Tables Grid: Top Selling Products & Recent Orders -->
    <div class="analytics-grid-equal">
      <!-- Top Selling Products -->
      <div class="admin-card">
        <div class="admin-card-header">
          <div>
            <h2 class="admin-card-title">Top Selling Formulations</h2>
            <div class="admin-card-subtitle">Highest volume and revenue generators</div>
          </div>
          <a href="#admin/top-products" class="btn btn-outline btn-sm">View All →</a>
        </div>

        <div class="admin-table-wrapper">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Product</th>
                <th>Units</th>
                <th>Revenue</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              ${topProducts.map((p, idx) => `
                <tr>
                  <td><strong style="color: var(--color-blush-700);">#${idx + 1}</strong></td>
                  <td>
                    <div class="table-product-info">
                      <img src="${p.image}" alt="${p.name}" class="table-thumb">
                      <div>
                        <div style="font-weight: 600; max-width: 160px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${p.name}</div>
                        <div style="font-size: 0.75rem; color: var(--color-text-muted);">${p.categoryName}</div>
                      </div>
                    </div>
                  </td>
                  <td><strong>${p.unitsSold || 0}</strong></td>
                  <td>${formatINR(p.revenueGenerated || 0)}</td>
                  <td>
                    <span class="badge ${p.stock <= 10 ? 'badge-warning' : 'badge-success'}">${p.stock}</span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Recent Orders Live Table -->
      <div class="admin-card">
        <div class="admin-card-header">
          <div>
            <h2 class="admin-card-title">Recent Retail Orders</h2>
            <div class="admin-card-subtitle">Latest customer purchase transactions</div>
          </div>
          <a href="#admin/orders" class="btn btn-outline btn-sm">Manage Orders →</a>
        </div>

        <div class="admin-table-wrapper">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${recentOrders.map(o => `
                <tr>
                  <td><strong>${o.id}</strong></td>
                  <td>
                    <div style="font-weight: 600;">${o.customerName}</div>
                    <div style="font-size: 0.75rem; color: var(--color-text-muted);">${formatDate(o.date)}</div>
                  </td>
                  <td><strong>${formatINR(o.totalAmount)}</strong></td>
                  <td>${getStatusBadge(o.orderStatus)}</td>
                  <td>
                    <button class="btn btn-secondary btn-sm" onclick="window.viewAdminOrderDetailsModal('${o.id}')">
                      Inspect
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}
