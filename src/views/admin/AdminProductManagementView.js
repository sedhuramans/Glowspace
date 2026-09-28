import { store } from '../../services/storeService.js';
import { formatINR } from '../../utils/formatters.js';

export function renderAdminProductManagementView(queryParams = {}) {
  const products = store.getProducts();
  const categories = store.getCategories();

  const searchQuery = (queryParams.search || '').toLowerCase().trim();
  const categoryFilter = queryParams.category || 'all';
  const stockFilter = queryParams.stock || 'all';

  let filtered = products.filter(p => {
    if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
    if (stockFilter === 'low' && (p.stock > 10 || p.stock === 0)) return false;
    if (stockFilter === 'out' && p.stock > 0) return false;
    if (stockFilter === 'in' && p.stock <= 10) return false;

    if (searchQuery) {
      const matchName = p.name.toLowerCase().includes(searchQuery);
      const matchSku = p.sku.toLowerCase().includes(searchQuery);
      if (!matchName && !matchSku) return false;
    }
    return true;
  });

  return `
    <div class="admin-page-header">
      <div class="admin-page-title-group">
        <h1>Product Catalogue Management</h1>
        <p>Add new botanical formulations, update prices, manage inventory levels, and edit descriptions.</p>
      </div>

      <div class="admin-header-actions">
        <button class="btn btn-primary" onclick="window.openAddProductModal()">
          + Add New Product
        </button>
      </div>
    </div>

    <!-- Product Table Card -->
    <div class="admin-card">
      <!-- Controls Topbar -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 16px;">
        <div style="display: flex; gap: 12px; flex: 1; max-width: 600px; flex-wrap: wrap;">
          <input type="text" id="admin-product-search" class="form-input" style="flex: 1; min-width: 200px;" placeholder="Search by name or SKU..." value="${searchQuery}" onkeyup="window.handleProductSearch(event)">
          
          <select id="admin-product-cat-filter" class="form-select" style="width: 170px;" onchange="window.handleProductFilterChange()">
            <option value="all" ${categoryFilter === 'all' ? 'selected' : ''}>All Categories</option>
            ${categories.map(c => `
              <option value="${c.id}" ${categoryFilter === c.id ? 'selected' : ''}>${c.name}</option>
            `).join('')}
          </select>

          <select id="admin-product-stock-filter" class="form-select" style="width: 150px;" onchange="window.handleProductFilterChange()">
            <option value="all" ${stockFilter === 'all' ? 'selected' : ''}>All Stock</option>
            <option value="in" ${stockFilter === 'in' ? 'selected' : ''}>In Stock (>10)</option>
            <option value="low" ${stockFilter === 'low' ? 'selected' : ''}>Low Stock (≤10)</option>
            <option value="out" ${stockFilter === 'out' ? 'selected' : ''}>Out of Stock (0)</option>
          </select>
        </div>

        <div style="font-size: 0.875rem; color: var(--color-text-secondary);">
          Showing <strong>${filtered.length}</strong> of ${products.length} products
        </div>
      </div>

      <!-- Table View -->
      <div class="admin-table-wrapper">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Retail Price</th>
              <th>Cost Price</th>
              <th>Stock</th>
              <th>Sales</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${filtered.map(p => {
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
                        <div style="font-size: 0.75rem; color: var(--color-text-muted);">${p.subtitle || ''}</div>
                      </div>
                    </div>
                  </td>
                  <td><code>${p.sku}</code></td>
                  <td><span class="badge badge-blush">${p.categoryName}</span></td>
                  <td><strong>${formatINR(p.price)}</strong></td>
                  <td style="color: var(--color-text-secondary);">${formatINR(p.costPrice)}</td>
                  <td>
                    <strong style="color: ${isOut ? 'var(--color-danger)' : isLow ? 'var(--color-warning)' : 'inherit'};">
                      ${p.stock}
                    </strong>
                  </td>
                  <td>${p.unitsSold || 0} units</td>
                  <td><span class="badge ${statusBadge}">${statusText}</span></td>
                  <td>
                    <div style="display: flex; gap: 8px;">
                      <button class="btn btn-secondary btn-sm" onclick="window.openEditProductModal('${p.id}')" title="Edit Product">
                        ✏️ Edit
                      </button>
                      <button class="btn btn-outline btn-sm" style="color: var(--color-danger);" onclick="window.confirmDeleteProduct('${p.id}')" title="Delete Product">
                        🗑️
                      </button>
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
