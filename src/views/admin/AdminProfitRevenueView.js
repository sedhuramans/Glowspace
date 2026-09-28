import { store } from '../../services/storeService.js';
import { formatINR } from '../../utils/formatters.js';

export function renderAdminProfitRevenueView(timeframe = '30D') {
  const analysis = store.getRevenueProfitAnalysis(timeframe);

  return `
    <div class="admin-page-header">
      <div class="admin-page-title-group">
        <h1>Revenue & Profit Financial Analytics</h1>
        <p>Operational cost dissection, gross margins, and category-level retail profitability.</p>
      </div>

      <div class="admin-header-actions">
        <div class="timeframe-filter-bar">
          <button class="timeframe-btn ${timeframe === '7D' ? 'active' : ''}" onclick="window.switchProfitTimeframe('7D')">7 Days</button>
          <button class="timeframe-btn ${timeframe === '30D' ? 'active' : ''}" onclick="window.switchProfitTimeframe('30D')">30 Days</button>
          <button class="timeframe-btn ${timeframe === '3M' ? 'active' : ''}" onclick="window.switchProfitTimeframe('3M')">3 Months</button>
          <button class="timeframe-btn ${timeframe === '1Y' ? 'active' : ''}" onclick="window.switchProfitTimeframe('1Y')">1 Year</button>
        </div>
      </div>
    </div>

    <!-- 4 Financial Summary Cards -->
    <div class="financial-metrics-row">
      <div class="financial-metric-card">
        <div class="financial-metric-label">Total Revenue</div>
        <div class="financial-metric-val" style="color: #2b70b0;">${formatINR(analysis.revenue)}</div>
        <div style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: 4px;">Gross online retail orders</div>
      </div>

      <div class="financial-metric-card">
        <div class="financial-metric-label">Cost of Goods & Operations</div>
        <div class="financial-metric-val" style="color: var(--color-danger);">${formatINR(analysis.cost)}</div>
        <div style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: 4px;">Formulations + Cold Logistics</div>
      </div>

      <div class="financial-metric-card">
        <div class="financial-metric-label">Net Gross Profit</div>
        <div class="financial-metric-val" style="color: var(--color-success);">${formatINR(analysis.profit)}</div>
        <div style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: 4px;">Retained retail earnings</div>
      </div>

      <div class="financial-metric-card">
        <div class="financial-metric-label">Profit Margin</div>
        <div class="financial-metric-val" style="color: var(--color-blush-700);">${analysis.margin}%</div>
        <div class="margin-gauge-bar">
          <div class="margin-gauge-fill" style="width: ${Math.min(100, analysis.margin * 2)}%;"></div>
        </div>
      </div>
    </div>

    <!-- Charts Grid: Revenue vs Cost Comparison Bar Chart & Expense Breakdown -->
    <div class="analytics-grid-2">
      <!-- Comparative Bar Chart -->
      <div class="admin-card">
        <div class="admin-card-header">
          <div>
            <h2 class="admin-card-title">Revenue vs Formulation Cost vs Profit Comparison</h2>
            <div class="admin-card-subtitle">Monthly visual variance analysis</div>
          </div>
        </div>
        <div class="chart-container">
          <canvas id="profit-comparison-bar-chart"></canvas>
        </div>
      </div>

      <!-- Expense Allocation Breakdown -->
      <div class="admin-card">
        <div class="admin-card-header">
          <div>
            <h2 class="admin-card-title">Operating Expense Breakdown</h2>
            <div class="admin-card-subtitle">Cost allocation by department</div>
          </div>
        </div>
        <div style="display: flex; flex-direction: column; gap: 16px; margin-top: 10px;">
          ${analysis.expenses.map(exp => `
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.875rem; margin-bottom: 4px;">
                <span style="font-weight: 600;">${exp.name}</span>
                <span><strong>${formatINR(exp.amount)}</strong> (${exp.percentage}%)</span>
              </div>
              <div style="height: 8px; background: var(--color-border); border-radius: var(--radius-pill); overflow: hidden;">
                <div style="height: 100%; width: ${exp.percentage}%; background: ${exp.color}; border-radius: var(--radius-pill);"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- Category Profitability Table -->
    <div class="admin-card">
      <div class="admin-card-header">
        <div>
          <h2 class="admin-card-title">Category Profitability Breakdown</h2>
          <div class="admin-card-subtitle">Margin efficiency across skincare categories</div>
        </div>
      </div>

      <div class="admin-table-wrapper">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Skincare Category</th>
              <th>Units Sold</th>
              <th>Total Revenue</th>
              <th>Net Profit</th>
              <th>Profit Margin %</th>
              <th>Health</th>
            </tr>
          </thead>
          <tbody>
            ${analysis.categoryBreakdown.map(cat => `
              <tr>
                <td><strong>${cat.name}</strong></td>
                <td>${cat.unitsSold} units</td>
                <td>${formatINR(cat.revenue)}</td>
                <td><strong style="color: var(--color-success);">${formatINR(cat.profit)}</strong></td>
                <td><span class="badge badge-blush">${cat.margin}%</span></td>
                <td>
                  <span class="badge badge-success">High Margin</span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
