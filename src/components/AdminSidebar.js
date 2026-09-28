import { store } from '../services/storeService.js';

export function renderAdminSidebar(activeSection = 'dashboard') {
  const kpis = store.getKPIs();
  const products = store.getProducts();

  return `
    <aside class="admin-sidebar" id="admin-sidebar">
      <!-- Sidebar Header -->
      <div class="admin-sidebar-header">
        <a href="#admin/dashboard" class="admin-brand">
          <div class="brand-logo-mark" style="width: 34px; height: 34px; font-size: 1rem;">G</div>
          <div>
            <div style="line-height: 1.1;">Glowspace</div>
            <span class="admin-brand-tag">Owner Portal</span>
          </div>
        </a>
      </div>

      <!-- Navigation Links -->
      <div class="admin-nav-section">
        <div class="admin-nav-group-title">Analytics & Overview</div>
        
        <a href="#admin/dashboard" class="admin-nav-link ${activeSection === 'dashboard' ? 'active' : ''}">
          <div class="admin-nav-link-content">
            <span>📊</span> <span>Dashboard</span>
          </div>
        </a>

        <a href="#admin/sales-analytics" class="admin-nav-link ${activeSection === 'sales-analytics' ? 'active' : ''}">
          <div class="admin-nav-link-content">
            <span>📈</span> <span>Sales Analytics</span>
          </div>
        </a>

        <a href="#admin/profit-revenue" class="admin-nav-link ${activeSection === 'profit-revenue' ? 'active' : ''}">
          <div class="admin-nav-link-content">
            <span>💰</span> <span>Profit & Revenue</span>
          </div>
        </a>

        <a href="#admin/order-analytics" class="admin-nav-link ${activeSection === 'order-analytics' ? 'active' : ''}">
          <div class="admin-nav-link-content">
            <span>📉</span> <span>Order Analytics</span>
          </div>
        </a>

        <a href="#admin/top-products" class="admin-nav-link ${activeSection === 'top-products' ? 'active' : ''}">
          <div class="admin-nav-link-content">
            <span>🏆</span> <span>Top Selling</span>
          </div>
        </a>

        <div class="admin-nav-group-title">Retail Operations</div>

        <a href="#admin/orders" class="admin-nav-link ${activeSection === 'orders' ? 'active' : ''}">
          <div class="admin-nav-link-content">
            <span>📦</span> <span>Orders</span>
          </div>
          ${kpis.pendingOrdersCount > 0 ? `
            <span class="admin-nav-badge badge-warning">${kpis.pendingOrdersCount}</span>
          ` : ''}
        </a>

        <a href="#admin/products" class="admin-nav-link ${activeSection === 'products' ? 'active' : ''}">
          <div class="admin-nav-link-content">
            <span>🧴</span> <span>Products</span>
          </div>
          <span style="font-size: 0.75rem; color: var(--color-text-muted);">${products.length}</span>
        </a>

        <a href="#admin/inventory" class="admin-nav-link ${activeSection === 'inventory' ? 'active' : ''}">
          <div class="admin-nav-link-content">
            <span>📋</span> <span>Inventory</span>
          </div>
          ${kpis.lowStockCount > 0 ? `
            <span class="admin-nav-badge badge-danger">${kpis.lowStockCount} Low</span>
          ` : ''}
        </a>

        <a href="#admin/customers" class="admin-nav-link ${activeSection === 'customers' ? 'active' : ''}">
          <div class="admin-nav-link-content">
            <span>👥</span> <span>Customers</span>
          </div>
        </a>

        <div class="admin-nav-group-title">Financials & Config</div>

        <a href="#admin/reports" class="admin-nav-link ${activeSection === 'reports' ? 'active' : ''}">
          <div class="admin-nav-link-content">
            <span>📑</span> <span>Sales Reports</span>
          </div>
        </a>

        <a href="#admin/settings" class="admin-nav-link ${activeSection === 'settings' ? 'active' : ''}">
          <div class="admin-nav-link-content">
            <span>⚙️</span> <span>Store Settings</span>
          </div>
        </a>
      </div>

      <!-- Sidebar Footer -->
      <div class="admin-sidebar-footer">
        <a href="#home" class="btn btn-outline btn-sm" style="font-size: 0.8125rem; width: 100%;">
          🛍️ Switch to Store
        </a>
      </div>
    </aside>
  `;
}
