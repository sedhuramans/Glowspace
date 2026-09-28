import { store } from '../../services/storeService.js';
import { formatINR, formatDate, getStatusBadge } from '../../utils/formatters.js';

export function renderAdminOrderManagementView(queryParams = {}) {
  const orders = store.getOrders();
  const statusFilter = queryParams.status || 'all';
  const searchQuery = (queryParams.search || '').toLowerCase().trim();

  let filtered = orders.filter(o => {
    if (statusFilter !== 'all' && o.orderStatus !== statusFilter) return false;
    if (searchQuery) {
      const matchId = o.id.toLowerCase().includes(searchQuery);
      const matchCustomer = (o.customerName || '').toLowerCase().includes(searchQuery);
      const matchEmail = (o.customerEmail || '').toLowerCase().includes(searchQuery);
      if (!matchId && !matchCustomer && !matchEmail) return false;
    }
    return true;
  });

  return `
    <div class="admin-page-header">
      <div class="admin-page-title-group">
        <h1>Orders & Retail Fulfillment</h1>
        <p>Manage customer orders, update tracking statuses, inspect payment receipts, and print invoices.</p>
      </div>
    </div>

    <!-- Orders Filter & Table Card -->
    <div class="admin-card">
      <!-- Top Filters -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 14px;">
        <div style="display: flex; gap: 12px; flex: 1; max-width: 500px;">
          <input type="text" id="admin-order-search" class="form-input" placeholder="Search Order ID, Customer, Email..." value="${searchQuery}" onkeyup="window.handleOrderSearch(event)">
          
          <select id="admin-order-status-filter" class="form-select" style="width: 180px;" onchange="window.handleOrderStatusFilterChange()">
            <option value="all" ${statusFilter === 'all' ? 'selected' : ''}>All Statuses</option>
            <option value="Pending" ${statusFilter === 'Pending' ? 'selected' : ''}>Pending</option>
            <option value="Confirmed" ${statusFilter === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
            <option value="Processing" ${statusFilter === 'Processing' ? 'selected' : ''}>Processing</option>
            <option value="Shipped" ${statusFilter === 'Shipped' ? 'selected' : ''}>Shipped</option>
            <option value="Delivered" ${statusFilter === 'Delivered' ? 'selected' : ''}>Delivered</option>
            <option value="Cancelled" ${statusFilter === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
            <option value="Returned" ${statusFilter === 'Returned' ? 'selected' : ''}>Returned</option>
          </select>
        </div>

        <div style="font-size: 0.875rem; color: var(--color-text-secondary);">
          Showing <strong>${filtered.length}</strong> of ${orders.length} total orders
        </div>
      </div>

      <!-- Orders Table -->
      <div class="admin-table-wrapper">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Formulations Ordered</th>
              <th>Order Date</th>
              <th>Amount</th>
              <th>Payment Channel</th>
              <th>Order Status</th>
              <th>Update Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            ${filtered.map(order => `
              <tr>
                <td><strong>${order.id}</strong></td>
                <td>
                  <div style="font-weight: 700;">${order.customerName}</div>
                  <div style="font-size: 0.75rem; color: var(--color-text-muted);">${order.customerEmail}</div>
                </td>
                <td>
                  <div style="font-size: 0.8125rem;">
                    ${order.items.map(i => `${i.name} (×${i.quantity})`).join(', ')}
                  </div>
                </td>
                <td>
                  <span style="font-size: 0.8125rem;">${formatDate(order.date)}</span>
                </td>
                <td><strong>${formatINR(order.totalAmount)}</strong></td>
                <td>
                  <span style="font-size: 0.8125rem;">${order.paymentMethod} • <strong style="color: ${order.paymentStatus === 'Paid' ? 'var(--color-success)' : 'var(--color-warning)'}">${order.paymentStatus}</strong></span>
                </td>
                <td>${getStatusBadge(order.orderStatus)}</td>
                <td>
                  <select class="form-select" style="padding: 6px 10px; font-size: 0.8125rem; width: 130px;" onchange="window.handleAdminUpdateOrderStatus('${order.id}', this.value)">
                    <option value="Pending" ${order.orderStatus === 'Pending' ? 'selected' : ''}>Pending</option>
                    <option value="Confirmed" ${order.orderStatus === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
                    <option value="Processing" ${order.orderStatus === 'Processing' ? 'selected' : ''}>Processing</option>
                    <option value="Shipped" ${order.orderStatus === 'Shipped' ? 'selected' : ''}>Shipped</option>
                    <option value="Delivered" ${order.orderStatus === 'Delivered' ? 'selected' : ''}>Delivered</option>
                    <option value="Cancelled" ${order.orderStatus === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                    <option value="Returned" ${order.orderStatus === 'Returned' ? 'selected' : ''}>Returned</option>
                  </select>
                </td>
                <td>
                  <button class="btn btn-secondary btn-sm" onclick="window.viewAdminOrderDetailsModal('${order.id}')">
                    Inspect
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
