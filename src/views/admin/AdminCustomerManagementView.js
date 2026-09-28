import { store } from '../../services/storeService.js';
import { formatINR, formatDate } from '../../utils/formatters.js';

export function renderAdminCustomerManagementView(queryParams = {}) {
  const customers = store.getCustomers();
  const searchQuery = (queryParams.search || '').toLowerCase().trim();

  let filtered = customers.filter(c => {
    if (searchQuery) {
      const matchName = c.name.toLowerCase().includes(searchQuery);
      const matchEmail = c.email.toLowerCase().includes(searchQuery);
      const matchPhone = (c.phone || '').toLowerCase().includes(searchQuery);
      if (!matchName && !matchEmail && !matchPhone) return false;
    }
    return true;
  });

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => (c.totalOrders || 0) > 0).length;
  const returningCustomers = customers.filter(c => (c.totalOrders || 0) > 1).length;
  const newCustomers = customers.filter(c => (c.totalOrders || 0) <= 1).length;

  return `
    <div class="admin-page-header">
      <div class="admin-page-title-group">
        <h1>Customer Relationship Management (CRM)</h1>
        <p>Buyer profiles, lifetime customer value (LTV), repeat purchase rates, and order histories.</p>
      </div>
    </div>

    <!-- Customer CRM 4 Summary Cards -->
    <div class="financial-metrics-row">
      <div class="financial-metric-card">
        <div class="financial-metric-label">Total Registered Customers</div>
        <div class="financial-metric-val">${totalCustomers}</div>
        <div style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: 4px;">Verified skincare profiles</div>
      </div>

      <div class="financial-metric-card">
        <div class="financial-metric-label">Active Buyers</div>
        <div class="financial-metric-val" style="color: var(--color-success);">${activeCustomers}</div>
        <div style="font-size: 0.75rem; color: var(--color-success); margin-top: 4px;">Placed at least 1 order</div>
      </div>

      <div class="financial-metric-card">
        <div class="financial-metric-label">Returning Loyal Customers</div>
        <div class="financial-metric-val" style="color: var(--color-blush-700);">${returningCustomers}</div>
        <div style="font-size: 0.75rem; color: var(--color-blush-700); margin-top: 4px;">${totalCustomers > 0 ? ((returningCustomers/totalCustomers)*100).toFixed(0) : 0}% retention rate</div>
      </div>

      <div class="financial-metric-card">
        <div class="financial-metric-label">New Acquision Customers</div>
        <div class="financial-metric-val">${newCustomers}</div>
        <div style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: 4px;">Joined this quarter</div>
      </div>
    </div>

    <!-- Customers Table Card -->
    <div class="admin-card">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 14px;">
        <div style="max-width: 400px; flex: 1;">
          <input type="text" id="admin-customer-search" class="form-input" placeholder="Search customer name, email, phone..." value="${searchQuery}" onkeyup="window.handleCustomerSearch(event)">
        </div>

        <div style="font-size: 0.875rem; color: var(--color-text-secondary);">
          Showing <strong>${filtered.length}</strong> customers
        </div>
      </div>

      <div class="admin-table-wrapper">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Email & Contact</th>
              <th>Location</th>
              <th>Orders Placed</th>
              <th>Lifetime Spent</th>
              <th>Member Since</th>
              <th>Customer Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${filtered.map(cust => `
              <tr>
                <td>
                  <div class="table-product-info">
                    <img src="${cust.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'}" alt="${cust.name}" class="table-thumb" style="border-radius: 50%;">
                    <div>
                      <div style="font-weight: 700;">${cust.name}</div>
                      <div style="font-size: 0.75rem; color: var(--color-text-muted);">ID: ${cust.id}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div>${cust.email}</div>
                  <div style="font-size: 0.75rem; color: var(--color-text-muted);">${cust.phone || '+91 98765 00000'}</div>
                </td>
                <td>
                  <span style="font-size: 0.8125rem;">${cust.address ? `${cust.address.city}, ${cust.address.state}` : 'India'}</span>
                </td>
                <td>
                  <strong>${cust.totalOrders || 0} orders</strong>
                </td>
                <td>
                  <strong style="color: var(--color-blush-800);">${formatINR(cust.totalSpent || 0)}</strong>
                </td>
                <td>
                  <span style="font-size: 0.8125rem;">${formatDate(cust.joinedDate)}</span>
                </td>
                <td>
                  <span class="badge ${cust.status === 'Active' ? 'badge-success' : 'badge-blush'}">${cust.status || 'Active'}</span>
                </td>
                <td>
                  <button class="btn btn-secondary btn-sm" onclick="window.viewCustomerHistoryModal('${cust.email}')">
                    Orders History
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
