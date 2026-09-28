import { store } from '../services/storeService.js';

export function renderAdminTopBar() {
  const kpis = store.getKPIs();
  const lowStock = kpis.lowStockProducts || [];
  const pendingOrders = kpis.pendingOrders || [];

  return `
    <header class="admin-topbar">
      <!-- Left: Mobile Menu Toggle & Global Search -->
      <div class="admin-topbar-left">
        <button class="icon-btn" id="admin-sidebar-toggle" style="display: none;" aria-label="Toggle Sidebar">
          ☰
        </button>

        <div class="admin-topbar-search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input type="text" id="admin-global-search" placeholder="Search orders, products, customers..." onkeyup="window.handleAdminGlobalSearch(event)">
        </div>
      </div>

      <!-- Right: Live Notifications, Date, Profile -->
      <div class="admin-topbar-right">
        <!-- Live Notifications Bell -->
        <div style="position: relative;">
          <button class="icon-btn" id="admin-notification-bell" onclick="window.toggleAdminNotifications()" aria-label="Notifications">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
            </svg>
            ${(lowStock.length + pendingOrders.length) > 0 ? `
              <span class="icon-badge" style="background: var(--color-danger);">${lowStock.length + pendingOrders.length}</span>
            ` : ''}
          </button>

          <!-- Notifications Dropdown -->
          <div class="notifications-dropdown" id="admin-notifications-dropdown">
            <div style="font-weight: 700; font-size: 0.9375rem; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid var(--color-border-subtle); display: flex; justify-content: space-between;">
              <span>Live Store Alerts</span>
              <span class="badge badge-blush">${lowStock.length + pendingOrders.length} New</span>
            </div>

            <div style="max-height: 280px; overflow-y: auto;">
              ${lowStock.map(p => `
                <div class="notification-item" onclick="window.location.hash = '#admin/inventory'">
                  <div style="color: var(--color-danger); font-size: 1.1rem;">⚠️</div>
                  <div>
                    <div style="font-weight: 600;">Low Stock: ${p.name}</div>
                    <div style="color: var(--color-text-muted); font-size: 0.75rem;">Only ${p.stock} units remaining in inventory.</div>
                  </div>
                </div>
              `).join('')}

              ${pendingOrders.map(o => `
                <div class="notification-item" onclick="window.location.hash = '#admin/orders'">
                  <div style="color: var(--color-warning); font-size: 1.1rem;">📦</div>
                  <div>
                    <div style="font-weight: 600;">Pending Order: ${o.id}</div>
                    <div style="color: var(--color-text-muted); font-size: 0.75rem;">${o.customerName} • ${o.totalAmount ? '₹' + o.totalAmount : ''}</div>
                  </div>
                </div>
              `).join('')}

              ${lowStock.length === 0 && pendingOrders.length === 0 ? `
                <div style="text-align: center; padding: 20px; color: var(--color-text-muted);">
                  ✓ Everything is running smoothly!
                </div>
              ` : ''}
            </div>
          </div>
        </div>

        <!-- Date Indicator -->
        <div style="font-size: 0.8125rem; color: var(--color-text-secondary); background: var(--color-surface-soft); padding: 6px 12px; border-radius: var(--radius-pill); border: 1px solid var(--color-border-subtle);">
          📅 ${new Date().toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
        </div>

        <!-- Owner Profile Pill -->
        <div class="admin-user-pill" onclick="window.toggleAdminProfileMenu()">
          <div class="admin-user-avatar">GS</div>
          <div>
            <div style="font-weight: 700; font-size: 0.8125rem; line-height: 1.1;">Owner / Admin</div>
            <div style="font-size: 0.6875rem; color: var(--color-text-muted);">store.owner@glowspace.in</div>
          </div>
          <button style="border: none; background: none; color: var(--color-danger); font-size: 0.75rem; margin-left: 8px; cursor: pointer; text-decoration: underline;" onclick="event.stopPropagation(); window.handleAdminLogout()">
            Sign Out
          </button>
        </div>
      </div>
    </header>
  `;
}
