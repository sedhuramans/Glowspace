import { store } from '../../services/storeService.js';
import { formatINR, formatDate, getStatusBadge } from '../../utils/formatters.js';
import { renderProductCard } from '../../components/ProductCard.js';

export function renderCustomerAccountView(activeTab = 'overview') {
  const currentCustomer = store.getCurrentCustomer();

  if (!currentCustomer) {
    return `
      <div class="container" style="padding: 80px 20px; text-align: center;">
        <h2 class="text-serif" style="font-size: 2.2rem; margin-bottom: 12px;">Sign in to Your Account</h2>
        <p style="color: var(--color-text-secondary); margin-bottom: 24px;">Please sign in or create an account to view your past orders and personal skincare profile.</p>
        <button class="btn btn-primary btn-lg" onclick="window.openCustomerAuthModal()">Sign In to Glowspace</button>
      </div>
    `;
  }

  const allOrders = store.getCustomerOrders(currentCustomer.email);
  const wishlistIds = store.getWishlist();
  const allProducts = store.getProducts();
  const wishlistedProducts = allProducts.filter(p => wishlistIds.includes(p.id));

  const totalSpent = allOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const pendingOrders = allOrders.filter(o => o.orderStatus === 'Pending' || o.orderStatus === 'Processing' || o.orderStatus === 'Shipped');
  const deliveredOrders = allOrders.filter(o => o.orderStatus === 'Delivered');

  return `
    <div class="container">
      <!-- Breadcrumb & Header -->
      <div style="padding: 30px 0 10px;">
        <div style="font-size: 0.8125rem; color: var(--color-text-muted); margin-bottom: 6px;">
          <a href="#home">Home</a> / <span style="color: var(--color-text-main);">My Account</span>
        </div>
        <h1 class="text-serif" style="font-size: 2.25rem; font-weight: 700; color: var(--color-text-main);">
          Customer Dashboard
        </h1>
      </div>

      <div class="account-layout">
        <!-- Sidebar Navigation -->
        <aside class="account-sidebar-card">
          <div class="account-user-header">
            <img src="${currentCustomer.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'}" alt="${currentCustomer.name}" class="account-avatar">
            <div>
              <div style="font-weight: 700; font-size: 1.0625rem; color: var(--color-text-main);">${currentCustomer.name}</div>
              <div style="font-size: 0.75rem; color: var(--color-text-muted);">${currentCustomer.email}</div>
            </div>
          </div>

          <nav class="account-nav-list">
            <a href="#account/overview" class="account-nav-btn ${activeTab === 'overview' ? 'active' : ''}">
              <span>📊</span> <span>Account Overview</span>
            </a>
            <a href="#account/orders" class="account-nav-btn ${activeTab === 'orders' ? 'active' : ''}">
              <span>📦</span> <span>My Orders (${allOrders.length})</span>
            </a>
            <a href="#account/wishlist" class="account-nav-btn ${activeTab === 'wishlist' ? 'active' : ''}">
              <span>❤️</span> <span>Wishlist (${wishlistIds.length})</span>
            </a>
            <a href="#account/profile" class="account-nav-btn ${activeTab === 'profile' ? 'active' : ''}">
              <span>👤</span> <span>Profile Details</span>
            </a>
            <a href="#account/addresses" class="account-nav-btn ${activeTab === 'addresses' ? 'active' : ''}">
              <span>📍</span> <span>Saved Addresses</span>
            </a>
            <button class="account-nav-btn" onclick="window.handleCustomerLogout()" style="color: var(--color-danger); margin-top: 12px; border-top: 1px solid var(--color-border-subtle); padding-top: 16px;">
              <span>🚪</span> <span>Sign Out</span>
            </button>
          </nav>
        </aside>

        <!-- Main Account Content Card -->
        <main class="account-content-card">
          <!-- 1. OVERVIEW TAB -->
          ${activeTab === 'overview' ? `
            <div>
              <h2 class="text-serif" style="font-size: 1.6rem; font-weight: 700; margin-bottom: 20px;">Account Summary</h2>
              
              <div class="overview-metrics-grid">
                <div class="metric-mini-card">
                  <div class="metric-mini-val">${allOrders.length}</div>
                  <div class="metric-mini-label">Total Orders</div>
                </div>
                <div class="metric-mini-card">
                  <div class="metric-mini-val">${formatINR(totalSpent)}</div>
                  <div class="metric-mini-label">Total Amount Spent</div>
                </div>
                <div class="metric-mini-card">
                  <div class="metric-mini-val" style="color: var(--color-warning);">${pendingOrders.length}</div>
                  <div class="metric-mini-label">Active / Pending</div>
                </div>
                <div class="metric-mini-card">
                  <div class="metric-mini-val" style="color: var(--color-success);">${deliveredOrders.length}</div>
                  <div class="metric-mini-label">Delivered Orders</div>
                </div>
              </div>

              <!-- Recent Orders Snippet -->
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; margin-top: 30px;">
                <h3 class="text-serif" style="font-size: 1.3rem;">Recent Order Activity</h3>
                <a href="#account/orders" class="btn btn-outline btn-sm">View All Orders →</a>
              </div>

              ${allOrders.length > 0 ? `
                <div style="display: flex; flex-direction: column; gap: 14px;">
                  ${allOrders.slice(0, 3).map(order => `
                    <div style="background: var(--color-surface-soft); border: 1px solid var(--color-border-subtle); border-radius: var(--radius-md); padding: 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: gap; gap: 14px;">
                      <div>
                        <div style="display: flex; align-items: center; gap: 10px;">
                          <strong>${order.id}</strong>
                          ${getStatusBadge(order.orderStatus)}
                        </div>
                        <div style="font-size: 0.8125rem; color: var(--color-text-muted); margin-top: 4px;">
                          ${formatDate(order.date)} • ${order.items.length} item(s) • ${formatINR(order.totalAmount)} (${order.paymentMethod})
                        </div>
                      </div>
                      <button class="btn btn-secondary btn-sm" onclick="window.viewOrderDetailsModal('${order.id}')">
                        View Details
                      </button>
                    </div>
                  `).join('')}
                </div>
              ` : `
                <p style="color: var(--color-text-muted);">No orders placed yet. Start shopping to build your skincare routine!</p>
              `}
            </div>
          ` : ''}

          <!-- 2. MY ORDERS TAB -->
          ${activeTab === 'orders' ? `
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <h2 class="text-serif" style="font-size: 1.6rem; font-weight: 700;">My Orders History</h2>
                <span class="badge badge-blush">${allOrders.length} Total Orders</span>
              </div>

              ${allOrders.length > 0 ? `
                <div style="display: flex; flex-direction: column; gap: 18px;">
                  ${allOrders.map(order => `
                    <div style="border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 22px; background: var(--color-surface);">
                      <div style="display: flex; justify-content: space-between; align-items: flex-start; padding-bottom: 14px; border-bottom: 1px solid var(--color-border-subtle); margin-bottom: 16px; flex-wrap: wrap; gap: 12px;">
                        <div>
                          <div style="font-size: 1.15rem; font-weight: 700;">Order ${order.id}</div>
                          <div style="font-size: 0.8125rem; color: var(--color-text-muted);">Placed on ${formatDate(order.date)}</div>
                        </div>
                        <div style="text-align: right;">
                          <div>${getStatusBadge(order.orderStatus)}</div>
                          <div style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: 4px;">${order.paymentMethod} • ${order.paymentStatus}</div>
                        </div>
                      </div>

                      <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 16px;">
                        ${order.items.map(item => `
                          <div style="display: flex; align-items: center; justify-content: space-between;">
                            <div style="display: flex; align-items: center; gap: 12px;">
                              <img src="${item.image}" alt="${item.name}" style="width: 44px; height: 44px; border-radius: var(--radius-sm); object-fit: cover;">
                              <div>
                                <div style="font-weight: 600; font-size: 0.9375rem;">${item.name}</div>
                                <div style="font-size: 0.75rem; color: var(--color-text-muted);">Qty: ${item.quantity} × ${formatINR(item.price)}</div>
                              </div>
                            </div>
                            <span style="font-weight: 700;">${formatINR(item.price * item.quantity)}</span>
                          </div>
                        `).join('')}
                      </div>

                      <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 14px; border-top: 1px solid var(--color-border-subtle); flex-wrap: wrap; gap: 12px;">
                        <div style="font-size: 1.1rem; font-weight: 800; color: var(--color-text-main);">
                          Total: <span style="color: var(--color-blush-800);">${formatINR(order.totalAmount)}</span>
                        </div>
                        <div style="display: flex; gap: 10px;">
                          <button class="btn btn-outline btn-sm" onclick="window.viewOrderDetailsModal('${order.id}')">
                            View Receipt & Tracking
                          </button>
                        </div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              ` : `
                <div style="text-align: center; padding: 40px 0;">
                  <p style="color: var(--color-text-muted); margin-bottom: 16px;">You have not placed any orders yet.</p>
                  <a href="#shop" class="btn btn-primary">Start Shopping</a>
                </div>
              `}
            </div>
          ` : ''}

          <!-- 3. WISHLIST TAB -->
          ${activeTab === 'wishlist' ? `
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <h2 class="text-serif" style="font-size: 1.6rem; font-weight: 700;">Saved Skincare Wishlist</h2>
                <span class="badge badge-blush">${wishlistedProducts.length} Saved Items</span>
              </div>

              ${wishlistedProducts.length > 0 ? `
                <div class="product-grid product-grid-3">
                  ${wishlistedProducts.map(p => renderProductCard(p)).join('')}
                </div>
              ` : `
                <div style="text-align: center; padding: 50px 0;">
                  <div style="font-size: 2.5rem; margin-bottom: 12px;">❤️</div>
                  <h3 class="text-serif" style="font-size: 1.5rem; margin-bottom: 8px;">Your Wishlist is Empty</h3>
                  <p style="color: var(--color-text-secondary); margin-bottom: 20px;">Save your favorite skincare treatments here for quick future ordering.</p>
                  <a href="#shop" class="btn btn-primary">Explore Formulations</a>
                </div>
              `}
            </div>
          ` : ''}

          <!-- 4. PROFILE TAB -->
          ${activeTab === 'profile' ? `
            <div>
              <h2 class="text-serif" style="font-size: 1.6rem; font-weight: 700; margin-bottom: 20px;">Personal Details</h2>
              
              <form id="customer-profile-form" onsubmit="event.preventDefault(); window.handleProfileUpdate(event);">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                  <div class="form-group">
                    <label class="form-label">Full Name</label>
                    <input type="text" class="form-input" id="prof-name" value="${currentCustomer.name}" required>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Email Address</label>
                    <input type="email" class="form-input" id="prof-email" value="${currentCustomer.email}" required>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Phone Number</label>
                    <input type="tel" class="form-input" id="prof-phone" value="${currentCustomer.phone || '+91 98765 43210'}" required>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Customer Member Since</label>
                    <input type="text" class="form-input" value="${formatDate(currentCustomer.joinedDate)}" disabled style="background: var(--color-surface-soft);">
                  </div>
                </div>

                <div style="margin-top: 24px;">
                  <button type="submit" class="btn btn-primary">Save Profile Changes</button>
                </div>
              </form>
            </div>
          ` : ''}

          <!-- 5. ADDRESSES TAB -->
          ${activeTab === 'addresses' ? `
            <div>
              <h2 class="text-serif" style="font-size: 1.6rem; font-weight: 700; margin-bottom: 20px;">Saved Delivery Address</h2>
              
              <form id="customer-address-form" onsubmit="event.preventDefault(); window.handleAddressUpdate(event);">
                <div class="form-group">
                  <label class="form-label">Street / Apartment / Locality</label>
                  <input type="text" class="form-input" id="addr-street" value="${currentCustomer.address ? currentCustomer.address.street : '42, Lotus Boulevard, Sector 100'}" required>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px;">
                  <div class="form-group">
                    <label class="form-label">City</label>
                    <input type="text" class="form-input" id="addr-city" value="${currentCustomer.address ? currentCustomer.address.city : 'Noida'}" required>
                  </div>
                  <div class="form-group">
                    <label class="form-label">State</label>
                    <input type="text" class="form-input" id="addr-state" value="${currentCustomer.address ? currentCustomer.address.state : 'Uttar Pradesh'}" required>
                  </div>
                  <div class="form-group">
                    <label class="form-label">PIN Code</label>
                    <input type="text" class="form-input" id="addr-pincode" value="${currentCustomer.address ? currentCustomer.address.pincode : '201304'}" required>
                  </div>
                </div>
                <div style="margin-top: 20px;">
                  <button type="submit" class="btn btn-primary">Update Delivery Address</button>
                </div>
              </form>
            </div>
          ` : ''}
        </main>
      </div>
    </div>
  `;
}
