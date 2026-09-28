import { store } from '../../services/storeService.js';
import { formatINR, renderStars } from '../../utils/formatters.js';

export function renderAdminTopProductsView() {
  const topProducts = store.getTopSellingProducts(16);

  return `
    <div class="admin-page-header">
      <div class="admin-page-title-group">
        <h1>Top Selling Formulations</h1>
        <p>Ranked product performance by volume units sold, revenue output, and margin yield.</p>
      </div>

      <div class="admin-header-actions">
        <a href="#admin/products" class="btn btn-primary btn-sm">
          🧴 Manage Catalogue
        </a>
      </div>
    </div>

    <!-- Ranked Top Products Table -->
    <div class="admin-card">
      <div class="admin-card-header">
        <div>
          <h2 class="admin-card-title">Product Sales Leaderboard</h2>
          <div class="admin-card-subtitle">Real-time cumulative product sales statistics</div>
        </div>
      </div>

      <div class="admin-table-wrapper">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Product Details</th>
              <th>Category</th>
              <th>Units Sold</th>
              <th>Retail Price</th>
              <th>Gross Revenue</th>
              <th>Net Profit</th>
              <th>Current Stock</th>
            </tr>
          </thead>
          <tbody>
            ${topProducts.map((p, idx) => `
              <tr>
                <td>
                  <span style="font-size: 1.1rem; font-weight: 800; color: ${idx === 0 ? '#e5a93b' : idx === 1 ? '#9e9e9e' : idx === 2 ? '#cd7f32' : 'var(--color-text-main)'};">
                    #${idx + 1}
                  </span>
                </td>
                <td>
                  <div class="table-product-info">
                    <img src="${p.image}" alt="${p.name}" class="table-thumb">
                    <div>
                      <div style="font-weight: 700; color: var(--color-text-main);">${p.name}</div>
                      <div style="font-size: 0.75rem; color: var(--color-text-muted);">SKU: ${p.sku}</div>
                    </div>
                  </div>
                </td>
                <td><span class="badge badge-blush">${p.categoryName}</span></td>
                <td><strong style="font-size: 1rem;">${p.unitsSold || 0}</strong></td>
                <td>${formatINR(p.price)}</td>
                <td><strong>${formatINR(p.revenueGenerated || 0)}</strong></td>
                <td><strong style="color: var(--color-success);">${formatINR(p.profitGenerated || 0)}</strong></td>
                <td>
                  <span class="badge ${p.stock <= 10 ? 'badge-warning' : 'badge-success'}">
                    ${p.stock} units
                  </span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
