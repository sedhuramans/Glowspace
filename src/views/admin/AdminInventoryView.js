import { store } from '../../services/storeService.js';
import { formatINR } from '../../utils/formatters.js';

export function renderAdminInventoryView() {
  const products = store.getProducts();

  const totalProducts = products.length;
  const inStock = products.filter(p => p.stock > (p.minStockThreshold || 10)).length;
  const lowStock = products.filter(p => p.stock <= (p.minStockThreshold || 10) && p.stock > 0);
  const outOfStock = products.filter(p => p.stock === 0);

  return `
    <div class="admin-page-header">
      <div class="admin-page-title-group">
        <h1>Inventory & Stock Replenishment</h1>
        <p>Monitor warehouse supply, SKU thresholds, restock triggers, and safety buffers.</p>
      </div>
    </div>

    <!-- Inventory 4 Metric Cards -->
    <div class="financial-metrics-row">
      <div class="financial-metric-card">
        <div class="financial-metric-label">Total SKUs in Inventory</div>
        <div class="financial-metric-val">${totalProducts}</div>
        <div style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: 4px;">Active cosmetic formulations</div>
      </div>

      <div class="financial-metric-card">
        <div class="financial-metric-label">Healthy Stock (>10 units)</div>
        <div class="financial-metric-val" style="color: var(--color-success);">${inStock}</div>
        <div style="font-size: 0.75rem; color: var(--color-success); margin-top: 4px;">Optimal distribution levels</div>
      </div>

      <div class="financial-metric-card">
        <div class="financial-metric-label">Low Stock Alerts (≤10 units)</div>
        <div class="financial-metric-val" style="color: var(--color-warning);">${lowStock.length}</div>
        <div style="font-size: 0.75rem; color: var(--color-warning); margin-top: 4px;">Reorder trigger reached</div>
      </div>

      <div class="financial-metric-card">
        <div class="financial-metric-label">Out of Stock (0 units)</div>
        <div class="financial-metric-val" style="color: var(--color-danger);">${outOfStock.length}</div>
        <div style="font-size: 0.75rem; color: var(--color-danger); margin-top: 4px;">Immediate batch required</div>
      </div>
    </div>

    <!-- Low Stock Warning Banners -->
    ${lowStock.length > 0 ? `
      <div style="background: #fdf5ea; border: 1px solid #f6d8ae; border-radius: var(--radius-lg); padding: 20px; margin-bottom: 28px;">
        <div style="font-weight: 700; color: #8c5b1b; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
          <span>⚠️</span> <span>Low Stock Warehouse Alerts (${lowStock.length} items require attention)</span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 6px;">
          ${lowStock.map(p => `
            <div style="font-size: 0.875rem; color: #6d4411; display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.6); padding: 8px 12px; border-radius: var(--radius-sm);">
              <span><strong>${p.name}</strong> (SKU: ${p.sku}) is running low. Only <strong>${p.stock} units</strong> remaining in batch.</span>
              <button class="btn btn-secondary btn-sm" style="padding: 4px 10px; font-size: 0.75rem;" onclick="window.quickRestockProduct('${p.id}', 30)">
                + Quick Restock 30 Units
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}

    <!-- Inventory Table -->
    <div class="admin-card">
      <div class="admin-card-header">
        <div>
          <h2 class="admin-card-title">Live Warehouse Stock Manifest</h2>
          <div class="admin-card-subtitle">Adjust inventory numbers inline to trigger live updates</div>
        </div>
      </div>

      <div class="admin-table-wrapper">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Product Details</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Current Stock</th>
              <th>Min Threshold</th>
              <th>Stock Status</th>
              <th>Quick Stock Adjustment</th>
            </tr>
          </thead>
          <tbody>
            ${products.map(p => {
              const isLow = p.stock <= (p.minStockThreshold || 10) && p.stock > 0;
              const isOut = p.stock === 0;
              const statusText = isOut ? 'Out of Stock' : isLow ? 'Low Stock' : 'In Stock';
              const statusBadge = isOut ? 'badge-danger' : isLow ? 'badge-warning' : 'badge-success';

              return `
                <tr>
                  <td>
                    <div class="table-product-info">
                      <img src="${p.image}" alt="${p.name}" class="table-thumb">
                      <div>
                        <div style="font-weight: 700;">${p.name}</div>
                        <div style="font-size: 0.75rem; color: var(--color-text-muted);">${formatINR(p.price)}</div>
                      </div>
                    </div>
                  </td>
                  <td><code>${p.sku}</code></td>
                  <td><span class="badge badge-blush">${p.categoryName}</span></td>
                  <td>
                    <strong style="font-size: 1.1rem; color: ${isOut ? 'var(--color-danger)' : isLow ? 'var(--color-warning)' : 'inherit'};">
                      ${p.stock}
                    </strong>
                  </td>
                  <td>${p.minStockThreshold || 10} units</td>
                  <td><span class="badge ${statusBadge}">${statusText}</span></td>
                  <td>
                    <div style="display: inline-flex; align-items: center; gap: 6px;">
                      <button class="btn btn-outline btn-sm" style="padding: 4px 8px;" onclick="window.quickRestockProduct('${p.id}', ${Math.max(0, p.stock - 5)})" title="Decrease by 5">-5</button>
                      <button class="btn btn-outline btn-sm" style="padding: 4px 8px;" onclick="window.quickRestockProduct('${p.id}', ${p.stock + 10})" title="Add 10 units">+10</button>
                      <button class="btn btn-secondary btn-sm" style="padding: 4px 10px;" onclick="window.promptCustomRestock('${p.id}', ${p.stock})">Set Stock</button>
                    </div>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
