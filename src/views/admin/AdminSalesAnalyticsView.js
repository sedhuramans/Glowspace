import { store } from '../../services/storeService.js';
import { formatINR } from '../../utils/formatters.js';

export function renderAdminSalesAnalyticsView(timeframe = '1Y') {
  const kpis = store.getKPIs(timeframe);
  const monthlyData = store.getMonthlySalesData();

  const totalAnnualSales = monthlyData.sales.reduce((a, b) => a + b, 0);
  const avgMonthlySales = Math.round(totalAnnualSales / 12);
  const peakMonthIndex = monthlyData.sales.indexOf(Math.max(...monthlyData.sales));
  const peakMonthName = monthlyData.labels[peakMonthIndex];

  return `
    <div class="admin-page-header">
      <div class="admin-page-title-group">
        <h1>Sales & Growth Analytics</h1>
        <p>Annual sales trajectories, revenue trends, and comparative seasonal demand.</p>
      </div>

      <div class="admin-header-actions">
        <!-- Interactive Date Range Filter -->
        <div class="timeframe-filter-bar">
          <button class="timeframe-btn ${timeframe === '7D' ? 'active' : ''}" onclick="window.switchSalesTimeframe('7D')">7 Days</button>
          <button class="timeframe-btn ${timeframe === '30D' ? 'active' : ''}" onclick="window.switchSalesTimeframe('30D')">30 Days</button>
          <button class="timeframe-btn ${timeframe === '3M' ? 'active' : ''}" onclick="window.switchSalesTimeframe('3M')">3 Months</button>
          <button class="timeframe-btn ${timeframe === '6M' ? 'active' : ''}" onclick="window.switchSalesTimeframe('6M')">6 Months</button>
          <button class="timeframe-btn ${timeframe === '1Y' ? 'active' : ''}" onclick="window.switchSalesTimeframe('1Y')">1 Year</button>
          <button class="timeframe-btn ${timeframe === 'custom' ? 'active' : ''}" onclick="window.openCustomDateFilterModal()">Custom Range</button>
        </div>
      </div>
    </div>

    <!-- Analytics KPI Highlights -->
    <div class="financial-metrics-row">
      <div class="financial-metric-card">
        <div class="financial-metric-label">Aggregated Sales (${timeframe})</div>
        <div class="financial-metric-val">${formatINR(totalAnnualSales)}</div>
        <div style="font-size: 0.75rem; color: var(--color-success); margin-top: 4px;">↑ +18.4% vs Previous Cycle</div>
      </div>

      <div class="financial-metric-card">
        <div class="financial-metric-label">Average Monthly Sales</div>
        <div class="financial-metric-val">${formatINR(avgMonthlySales)}</div>
        <div style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: 4px;">Consistent upward trend</div>
      </div>

      <div class="financial-metric-card">
        <div class="financial-metric-label">Peak Demand Month</div>
        <div class="financial-metric-val" style="color: var(--color-blush-700);">${peakMonthName} 2026</div>
        <div style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: 4px;">${formatINR(Math.max(...monthlyData.sales))} in retail volume</div>
      </div>

      <div class="financial-metric-card">
        <div class="financial-metric-label">Average Order Value</div>
        <div class="financial-metric-val">${formatINR(kpis.averageOrderValue)}</div>
        <div style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: 4px;">~ 2.3 formulations / cart</div>
      </div>
    </div>

    <!-- Main Interactive 12-Month Sales Chart -->
    <div class="admin-card" style="margin-bottom: 32px;">
      <div class="admin-card-header">
        <div>
          <h2 class="admin-card-title">12-Month Sales, Revenue & Net Profit Trajectory</h2>
          <div class="admin-card-subtitle">Detailed line chart spanning January to December 2026</div>
        </div>
        <div style="display: flex; gap: 10px;">
          <button class="btn btn-secondary btn-sm" onclick="window.toggleChartDataset(0)">Toggle Sales</button>
          <button class="btn btn-secondary btn-sm" onclick="window.toggleChartDataset(1)">Toggle Cost</button>
          <button class="btn btn-secondary btn-sm" onclick="window.toggleChartDataset(2)">Toggle Profit</button>
        </div>
      </div>
      <div class="chart-container" style="height: 380px;">
        <canvas id="sales-analytics-full-chart"></canvas>
      </div>
    </div>

    <!-- Monthly Breakdown Data Table -->
    <div class="admin-card">
      <div class="admin-card-header">
        <div>
          <h2 class="admin-card-title">Monthly Performance Breakdown (Jan – Dec 2026)</h2>
          <div class="admin-card-subtitle">Itemized financial table for business reporting</div>
        </div>
        <button class="btn btn-outline btn-sm" onclick="window.exportSalesTableCSV()">
          📥 Export CSV
        </button>
      </div>

      <div class="admin-table-wrapper">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Gross Sales (₹)</th>
              <th>Formulation Cost (₹)</th>
              <th>Net Profit (₹)</th>
              <th>Profit Margin %</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${monthlyData.labels.map((m, idx) => {
              const sales = monthlyData.sales[idx];
              const cost = monthlyData.cost[idx];
              const profit = monthlyData.profit[idx];
              const margin = ((profit / sales) * 100).toFixed(1);
              return `
                <tr>
                  <td><strong>${m} 2026</strong></td>
                  <td>${formatINR(sales)}</td>
                  <td style="color: var(--color-text-secondary);">${formatINR(cost)}</td>
                  <td><strong style="color: var(--color-success);">${formatINR(profit)}</strong></td>
                  <td><span class="badge badge-blush">${margin}%</span></td>
                  <td><span class="badge badge-success">Closed</span></td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
