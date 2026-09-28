import Chart from 'chart.js/auto';
import { store } from './services/storeService.js';
import { formatINR, formatDate, getStatusBadge } from './utils/formatters.js';
import { showToast, openModal, closeModal, triggerConfetti } from './utils/ui.js';

// Components
import { renderCustomerHeader } from './components/CustomerHeader.js';
import { renderCustomerFooter } from './components/CustomerFooter.js';
import { renderAdminSidebar } from './components/AdminSidebar.js';
import { renderAdminTopBar } from './components/AdminTopBar.js';

// Customer Views
import { renderHomeView } from './views/customer/HomeView.js';
import { renderShopView } from './views/customer/ShopView.js';
import { renderProductDetailView } from './views/customer/ProductDetailView.js';
import { renderCategoriesView } from './views/customer/CategoriesView.js';
import { renderCartView } from './views/customer/CartView.js';
import { renderCheckoutView } from './views/customer/CheckoutView.js';
import { renderOrderConfirmationView } from './views/customer/OrderConfirmationView.js';
import { renderCustomerAccountView } from './views/customer/CustomerAccountView.js';
import { renderCustomerAuthModal } from './views/customer/AuthModal.js';
import { renderAboutView } from './views/customer/AboutView.js';
import { renderContactView } from './views/customer/ContactView.js';
import { renderFAQView } from './views/customer/FAQView.js';

// Admin Views
import { renderAdminLoginView } from './views/admin/AdminLoginView.js';
import { renderAdminDashboardView } from './views/admin/AdminDashboardView.js';
import { renderAdminSalesAnalyticsView } from './views/admin/AdminSalesAnalyticsView.js';
import { renderAdminProfitRevenueView } from './views/admin/AdminProfitRevenueView.js';
import { renderAdminOrderAnalyticsView } from './views/admin/AdminOrderAnalyticsView.js';
import { renderAdminTopProductsView } from './views/admin/AdminTopProductsView.js';
import { renderAdminProductManagementView } from './views/admin/AdminProductManagementView.js';
import { renderAdminInventoryView } from './views/admin/AdminInventoryView.js';
import { renderAdminOrderManagementView } from './views/admin/AdminOrderManagementView.js';
import { renderAdminCustomerManagementView } from './views/admin/AdminCustomerManagementView.js';
import { renderAdminReportsView } from './views/admin/AdminReportsView.js';
import { renderAdminSettingsView } from './views/admin/AdminSettingsView.js';

// Chart instances registry
let activeCharts = {};

function destroyActiveCharts() {
  Object.keys(activeCharts).forEach(key => {
    if (activeCharts[key]) {
      activeCharts[key].destroy();
      delete activeCharts[key];
    }
  });
}

// Router
function router() {
  const hash = window.location.hash.slice(1) || 'home';
  const [routePath, queryString] = hash.split('?');
  const params = new URLSearchParams(queryString || '');
  const queryParams = Object.fromEntries(params.entries());

  const app = document.getElementById('app');
  destroyActiveCharts();
  window.scrollTo(0, 0);

  // Check Admin Routes
  if (routePath.startsWith('admin/')) {
    const adminSection = routePath.split('/')[1] || 'dashboard';

    if (adminSection === 'login') {
      app.innerHTML = renderAdminLoginView();
      return;
    }

    // Protected Admin Route Check
    if (!store.isAdminAuthenticated()) {
      window.location.hash = '#admin/login';
      return;
    }

    // Admin Layout
    app.innerHTML = `
      <div class="admin-app-layout">
        ${renderAdminSidebar(adminSection)}
        <div class="admin-main">
          ${renderAdminTopBar()}
          <div class="admin-content-area" id="admin-content-area">
            ${getAdminContent(adminSection, queryParams)}
          </div>
        </div>
      </div>
    `;

    // Initialize Admin Charts where appropriate
    setTimeout(() => {
      initAdminCharts(adminSection);
    }, 50);
    return;
  }

  // Customer Routes
  let mainContent = '';
  let activeNav = 'home';

  if (routePath === 'home' || routePath === '') {
    activeNav = 'home';
    mainContent = renderHomeView();
  } else if (routePath === 'shop') {
    activeNav = 'shop';
    mainContent = renderShopView(queryParams);
  } else if (routePath.startsWith('product/')) {
    activeNav = 'shop';
    const productId = routePath.split('/')[1];
    mainContent = renderProductDetailView(productId);
  } else if (routePath === 'categories') {
    activeNav = 'categories';
    mainContent = renderCategoriesView();
  } else if (routePath === 'cart') {
    activeNav = 'cart';
    mainContent = renderCartView();
  } else if (routePath === 'checkout') {
    activeNav = 'cart';
    mainContent = renderCheckoutView();
  } else if (routePath.startsWith('order-confirmation/')) {
    activeNav = '';
    const orderId = routePath.split('/')[1];
    mainContent = renderOrderConfirmationView(orderId);
  } else if (routePath.startsWith('account')) {
    activeNav = 'account';
    const tab = routePath.split('/')[1] || 'overview';
    mainContent = renderCustomerAccountView(tab);
  } else if (routePath === 'about') {
    activeNav = 'about';
    mainContent = renderAboutView();
  } else if (routePath === 'contact') {
    activeNav = 'contact';
    mainContent = renderContactView();
  } else if (routePath === 'faq') {
    activeNav = 'faq';
    mainContent = renderFAQView();
  } else {
    activeNav = 'home';
    mainContent = renderHomeView();
  }

  app.innerHTML = `
    ${renderCustomerHeader(activeNav)}
    <main>${mainContent}</main>
    ${renderCustomerFooter()}
  `;

  attachCustomerEventListeners();
}

function getAdminContent(section, queryParams) {
  switch (section) {
    case 'dashboard':
      return renderAdminDashboardView();
    case 'sales-analytics':
      return renderAdminSalesAnalyticsView(queryParams.timeframe || '1Y');
    case 'profit-revenue':
      return renderAdminProfitRevenueView(queryParams.timeframe || '30D');
    case 'order-analytics':
      return renderAdminOrderAnalyticsView();
    case 'top-products':
      return renderAdminTopProductsView();
    case 'products':
      return renderAdminProductManagementView(queryParams);
    case 'inventory':
      return renderAdminInventoryView();
    case 'orders':
      return renderAdminOrderManagementView(queryParams);
    case 'customers':
      return renderAdminCustomerManagementView(queryParams);
    case 'reports':
      return renderAdminReportsView(queryParams);
    case 'settings':
      return renderAdminSettingsView();
    default:
      return renderAdminDashboardView();
  }
}

// ==========================================
// CHART.JS INITIALIZERS
// ==========================================
function initAdminCharts(section) {
  const monthly = store.getMonthlySalesData();
  const statusCounts = store.getOrderStatusBreakdown();

  if (section === 'dashboard') {
    // 1. Dashboard Sales Line Chart
    const salesCanvas = document.getElementById('dashboard-sales-chart');
    if (salesCanvas) {
      activeCharts.dashboardSales = new Chart(salesCanvas, {
        type: 'line',
        data: {
          labels: monthly.labels,
          datasets: [
            {
              label: 'Gross Sales (₹)',
              data: monthly.sales,
              borderColor: '#cf9592',
              backgroundColor: 'rgba(207, 149, 146, 0.15)',
              tension: 0.4,
              fill: true,
              borderWidth: 3
            },
            {
              label: 'Net Profit (₹)',
              data: monthly.profit,
              borderColor: '#43805f',
              backgroundColor: 'rgba(67, 128, 95, 0.1)',
              tension: 0.4,
              fill: true,
              borderWidth: 2
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'top' }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { callback: v => '₹' + Number(v).toLocaleString('en-IN') }
            }
          }
        }
      });
    }

    // 2. Dashboard Order Status Donut Chart
    const orderCanvas = document.getElementById('dashboard-order-status-chart');
    if (orderCanvas) {
      activeCharts.dashboardOrder = new Chart(orderCanvas, {
        type: 'doughnut',
        data: {
          labels: ['Delivered', 'Shipped', 'Processing', 'Pending', 'Cancelled', 'Returned'],
          datasets: [{
            data: [
              statusCounts.Delivered || 0,
              statusCounts.Shipped || 0,
              statusCounts.Processing || 0,
              statusCounts.Pending || 0,
              statusCounts.Cancelled || 0,
              statusCounts.Returned || 0
            ],
            backgroundColor: ['#43805f', '#467399', '#deb4b1', '#be8438', '#b54747', '#9c9295']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: 'bottom' } }
        }
      });
    }
  }

  if (section === 'sales-analytics') {
    const fullChartCanvas = document.getElementById('sales-analytics-full-chart');
    if (fullChartCanvas) {
      activeCharts.fullSales = new Chart(fullChartCanvas, {
        type: 'line',
        data: {
          labels: monthly.labels,
          datasets: [
            {
              label: 'Sales (₹)',
              data: monthly.sales,
              borderColor: '#cf9592',
              backgroundColor: 'rgba(207, 149, 146, 0.2)',
              borderWidth: 3,
              tension: 0.35,
              fill: true
            },
            {
              label: 'Formulation Cost (₹)',
              data: monthly.cost,
              borderColor: '#9c9295',
              borderDash: [5, 5],
              borderWidth: 2,
              tension: 0.35
            },
            {
              label: 'Net Profit (₹)',
              data: monthly.profit,
              borderColor: '#43805f',
              backgroundColor: 'rgba(67, 128, 95, 0.15)',
              borderWidth: 3,
              tension: 0.35,
              fill: true
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'top' },
            tooltip: {
              callbacks: {
                label: ctx => `${ctx.dataset.label}: ₹${Number(ctx.raw).toLocaleString('en-IN')}`
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { callback: v => '₹' + Number(v).toLocaleString('en-IN') }
            }
          }
        }
      });
    }
  }

  if (section === 'profit-revenue') {
    const compCanvas = document.getElementById('profit-comparison-bar-chart');
    if (compCanvas) {
      activeCharts.profitComp = new Chart(compCanvas, {
        type: 'bar',
        data: {
          labels: monthly.labels.slice(0, 8),
          datasets: [
            { label: 'Revenue (₹)', data: monthly.sales.slice(0, 8), backgroundColor: '#cf9592' },
            { label: 'Cost (₹)', data: monthly.cost.slice(0, 8), backgroundColor: '#deb4b1' },
            { label: 'Profit (₹)', data: monthly.profit.slice(0, 8), backgroundColor: '#43805f' }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: 'top' } },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { callback: v => '₹' + Number(v).toLocaleString('en-IN') }
            }
          }
        }
      });
    }
  }

  if (section === 'order-analytics') {
    const donutCanvas = document.getElementById('order-status-donut-chart');
    if (donutCanvas) {
      activeCharts.orderDonut = new Chart(donutCanvas, {
        type: 'doughnut',
        data: {
          labels: ['Delivered', 'Shipped', 'Processing', 'Pending', 'Cancelled', 'Returned'],
          datasets: [{
            data: [
              statusCounts.Delivered || 0,
              statusCounts.Shipped || 0,
              statusCounts.Processing || 0,
              statusCounts.Pending || 0,
              statusCounts.Cancelled || 0,
              statusCounts.Returned || 0
            ],
            backgroundColor: ['#43805f', '#467399', '#deb4b1', '#be8438', '#b54747', '#9c9295']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: 'bottom' } }
        }
      });
    }
  }
}

// ==========================================
// EVENT LISTENERS & GLOBAL WINDOW HANDLERS
// ==========================================
function attachCustomerEventListeners() {
  // Wishlist toggle buttons
  document.querySelectorAll('.wishlist-toggle-btn').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const prodId = btn.getAttribute('data-wishlist-id');
      const isAdded = store.toggleWishlist(prodId);
      if (isAdded) {
        showToast('Saved to your skincare wishlist ❤️', 'success');
      } else {
        showToast('Removed from wishlist', 'info');
      }
    };
  });

  // Add to Cart buttons
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const prodId = btn.getAttribute('data-add-to-cart');
      const success = store.addToCart(prodId, 1);
      if (success) {
        showToast('Product added to bag successfully ✨', 'success');
      }
    };
  });

  // Open Auth modal button
  const authBtn = document.getElementById('open-auth-modal-btn');
  if (authBtn) {
    authBtn.onclick = () => window.openCustomerAuthModal();
  }

  // Profile dropdown button
  const profBtn = document.getElementById('customer-profile-btn');
  if (profBtn) {
    profBtn.onclick = () => {
      window.location.hash = '#account/overview';
    };
  }

  // Shop page interactive search & filters
  const shopSearch = document.getElementById('shop-search-input');
  if (shopSearch) {
    shopSearch.onkeyup = (e) => {
      if (e.key === 'Enter') {
        window.updateShopFilters();
      }
    };
  }

  const shopSort = document.getElementById('shop-sort-select');
  if (shopSort) {
    shopSort.onchange = () => window.updateShopFilters();
  }

  document.querySelectorAll('input[name="shop-category"], input[name="shop-price"], input[name="shop-rating"], #shop-instock').forEach(el => {
    el.onchange = () => window.updateShopFilters();
  });

  const resetFiltersBtn = document.getElementById('reset-filters-btn');
  if (resetFiltersBtn) {
    resetFiltersBtn.onclick = () => {
      window.location.hash = '#shop';
    };
  }
}

// Global Window Handlers for App Navigation & UX
window.openCustomerAuthModal = (mode = 'login') => {
  openModal(renderCustomerAuthModal(mode), { maxWidth: '440px' });
};

window.switchAuthModalMode = (mode) => {
  openModal(renderCustomerAuthModal(mode), { maxWidth: '440px' });
};

window.quickDemoLogin = (email) => {
  store.customerLogin(email, 'demo123');
  closeModal();
  showToast(`Welcome back, ${email.split('@')[0]}!`, 'success');
  router();
};

window.handleCustomerLoginSubmit = (e) => {
  const email = document.getElementById('auth-email').value;
  const pass = document.getElementById('auth-password').value;
  store.customerLogin(email, pass);
  closeModal();
  showToast('Logged in successfully!', 'success');
  router();
};

window.handleCustomerRegisterSubmit = (e) => {
  const name = document.getElementById('reg-name').value;
  const email = document.getElementById('reg-email').value;
  const phone = document.getElementById('reg-phone').value;
  store.customerRegister({ name, email, phone });
  closeModal();
  showToast('Account created! Welcome to Glowspace ✨', 'success');
  router();
};

window.handleCustomerLogout = () => {
  store.customerLogout();
  showToast('Signed out successfully', 'info');
  window.location.hash = '#home';
};

window.quickFillAdminCredentials = () => {
  document.getElementById('admin-login-email').value = 'admin@glowspace.in';
  document.getElementById('admin-login-password').value = 'admin123';
  window.handleAdminLoginSubmit();
};

window.handleAdminLoginSubmit = () => {
  const email = document.getElementById('admin-login-email').value;
  const pass = document.getElementById('admin-login-password').value;
  store.adminLogin(email, pass);
  showToast('Welcome to Owner Portal Dashboard 👑', 'success');
  window.location.hash = '#admin/dashboard';
};

window.handleAdminLogout = () => {
  store.adminLogout();
  showToast('Admin signed out', 'info');
  window.location.hash = '#admin/login';
};

window.toggleAdminNotifications = () => {
  const dropdown = document.getElementById('admin-notifications-dropdown');
  if (dropdown) {
    dropdown.classList.toggle('active');
  }
};

window.updateShopFilters = () => {
  const search = document.getElementById('shop-search-input')?.value || '';
  const sort = document.getElementById('shop-sort-select')?.value || 'popular';
  const category = document.querySelector('input[name="shop-category"]:checked')?.value || 'all';
  const price = document.querySelector('input[name="shop-price"]:checked')?.value || 'all';
  const rating = document.querySelector('input[name="shop-rating"]:checked')?.value || '0';
  const inStock = document.getElementById('shop-instock')?.checked ? 'true' : 'false';

  const params = new URLSearchParams();
  if (category !== 'all') params.set('category', category);
  if (search) params.set('search', search);
  if (sort !== 'popular') params.set('sort', sort);
  if (price !== 'all') params.set('price', price);
  if (rating !== '0') params.set('rating', rating);
  if (inStock === 'true') params.set('inStock', inStock);

  window.location.hash = `#shop?${params.toString()}`;
};

// Cart & Details Handlers
window.updateCartQty = (prodId, newQty) => {
  store.updateCartQuantity(prodId, newQty);
  router();
};

window.removeFromCart = (prodId) => {
  store.removeFromCart(prodId);
  showToast('Item removed from shopping bag', 'info');
  router();
};

window.clearEntireCart = () => {
  if (confirm('Are you sure you want to clear your cart?')) {
    store.clearCart();
    showToast('Cart cleared', 'info');
    router();
  }
};

window.handleApplyCoupon = (e) => {
  const input = document.getElementById('cart-coupon-input');
  if (input && input.value) {
    const res = store.applyCoupon(input.value);
    showToast(res.message, res.success ? 'success' : 'error');
    if (res.success) router();
  }
};

window.removeAppliedCoupon = () => {
  store.removeCoupon();
  showToast('Coupon removed', 'info');
  router();
};

window.switchDetailImage = (url, btn) => {
  const mainImg = document.getElementById('detail-main-image');
  if (mainImg) mainImg.src = url;
  document.querySelectorAll('.gallery-thumb-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
};

window.updateDetailQty = (delta) => {
  const valEl = document.getElementById('detail-qty-value');
  if (valEl) {
    let current = parseInt(valEl.innerText) || 1;
    valEl.innerText = Math.max(1, current + delta);
  }
};

window.switchTab = (tabId, btn) => {
  document.querySelectorAll('.tab-pane').forEach(p => p.style.display = 'none');
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  const target = document.getElementById(tabId);
  if (target) target.style.display = 'block';
  btn.classList.add('active');
};

window.handleReviewSubmit = (e, prodId) => {
  const author = document.getElementById('review-author').value;
  const rating = document.getElementById('review-rating').value;
  const title = document.getElementById('review-title').value;
  const comment = document.getElementById('review-comment').value;

  store.addReview({ productId: prodId, author, rating, title, comment });
  showToast('Thank you! Your verified review has been published ✨', 'success');
  router();
};

// Checkout & Order Placement
window.switchPaymentMethod = (method) => {
  document.querySelectorAll('.payment-option-card').forEach(c => c.classList.remove('active'));
  const el = document.getElementById(`pay-opt-${method === 'UPI' ? 'upi' : method === 'Card' ? 'card' : 'cod'}`);
  if (el) el.classList.add('active');

  const upiView = document.getElementById('pay-upi-view');
  const cardView = document.getElementById('pay-card-view');
  const codView = document.getElementById('pay-cod-view');

  if (upiView) upiView.style.display = method === 'UPI' ? 'block' : 'none';
  if (cardView) cardView.style.display = method === 'Card' ? 'block' : 'none';
  if (codView) codView.style.display = method === 'Cash on Delivery' ? 'block' : 'none';
};

window.handlePlaceOrder = (e) => {
  const fullName = document.getElementById('checkout-fullname').value;
  const email = document.getElementById('checkout-email').value;
  const phone = document.getElementById('checkout-phone').value;
  const street = document.getElementById('checkout-street').value;
  const city = document.getElementById('checkout-city').value;
  const state = document.getElementById('checkout-state').value;
  const pincode = document.getElementById('checkout-pincode').value;

  const paymentMethodEl = document.querySelector('input[name="payment-method"]:checked');
  const paymentMethod = paymentMethodEl ? paymentMethodEl.value : 'UPI';

  const summary = store.getCartSummary();

  const newOrder = store.placeOrder({
    customerInfo: { fullName, email, phone },
    shippingAddress: { street, city, state, pincode },
    paymentMethod,
    discount: summary.discount,
    shipping: summary.shipping,
    tax: summary.tax
  });

  triggerConfetti();
  showToast('Order placed successfully! 🎉', 'success');
  window.location.hash = `#order-confirmation/${newOrder.id}`;
};

// Admin Interactive Handlers
window.handleAdminUpdateOrderStatus = (orderId, newStatus) => {
  store.updateOrderStatus(orderId, newStatus);
  showToast(`Order ${orderId} updated to ${newStatus}`, 'success');
  router();
};

window.quickRestockProduct = (prodId, newStock) => {
  store.updateStock(prodId, newStock);
  showToast('Inventory updated successfully 📦', 'success');
  router();
};

window.promptCustomRestock = (prodId, current) => {
  const val = prompt('Enter new stock count for this SKU:', current);
  if (val !== null && !isNaN(val)) {
    store.updateStock(prodId, Number(val));
    showToast('Stock level updated', 'success');
    router();
  }
};

window.confirmDeleteProduct = (prodId) => {
  const prod = store.getProductById(prodId);
  if (confirm(`Are you sure you want to permanently delete "${prod?.name}" from catalogue?`)) {
    store.deleteProduct(prodId);
    showToast('Product deleted from inventory', 'info');
    router();
  }
};

window.openAddProductModal = () => {
  const categories = store.getCategories();
  const html = `
    <h2 class="text-serif" style="font-size: 1.75rem; margin-bottom: 20px;">Add New Botanical Formulation</h2>
    <form id="add-product-form" onsubmit="event.preventDefault(); window.handleSaveNewProduct(event);">
      <div class="form-group">
        <label class="form-label">Product Name *</label>
        <input type="text" class="form-input" id="new-prod-name" placeholder="e.g. Ceramide Barrier Restoring Mist" required>
      </div>
      <div class="form-group">
        <label class="form-label">Subtitle / Key Actives</label>
        <input type="text" class="form-input" id="new-prod-subtitle" placeholder="e.g. 3 Essential Ceramides + Hyaluronic Acid">
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
        <div class="form-group">
          <label class="form-label">Category *</label>
          <select class="form-select" id="new-prod-category">
            ${categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">SKU Code</label>
          <input type="text" class="form-input" id="new-prod-sku" placeholder="GLW-FC-99">
        </div>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px;">
        <div class="form-group">
          <label class="form-label">Selling Price (₹) *</label>
          <input type="number" class="form-input" id="new-prod-price" placeholder="799" required>
        </div>
        <div class="form-group">
          <label class="form-label">Cost Price (₹)</label>
          <input type="number" class="form-input" id="new-prod-cost" placeholder="280">
        </div>
        <div class="form-group">
          <label class="form-label">Initial Stock *</label>
          <input type="number" class="form-input" id="new-prod-stock" value="40" required>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Product Image URL</label>
        <input type="url" class="form-input" id="new-prod-image" value="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop">
      </div>
      <div class="form-group">
        <label class="form-label">Description</label>
        <textarea class="form-textarea" id="new-prod-desc" placeholder="Dermatological summary of the formulation..."></textarea>
      </div>
      <button type="submit" class="btn btn-primary btn-lg btn-full">+ Create & Publish Product</button>
    </form>
  `;
  openModal(html, { maxWidth: '560px' });
};

window.handleSaveNewProduct = (e) => {
  const name = document.getElementById('new-prod-name').value;
  const subtitle = document.getElementById('new-prod-subtitle').value;
  const category = document.getElementById('new-prod-category').value;
  const sku = document.getElementById('new-prod-sku').value;
  const price = document.getElementById('new-prod-price').value;
  const costPrice = document.getElementById('new-prod-cost').value;
  const stock = document.getElementById('new-prod-stock').value;
  const image = document.getElementById('new-prod-image').value;
  const description = document.getElementById('new-prod-desc').value;

  store.addProduct({ name, subtitle, category, sku, price, costPrice, stock, image, description });
  closeModal();
  showToast('New formulation added to catalogue! ✨', 'success');
  router();
};

window.openEditProductModal = (prodId) => {
  const prod = store.getProductById(prodId);
  if (!prod) return;
  const categories = store.getCategories();

  const html = `
    <h2 class="text-serif" style="font-size: 1.75rem; margin-bottom: 20px;">Edit Formulation: ${prod.name}</h2>
    <form id="edit-product-form" onsubmit="event.preventDefault(); window.handleSaveEditProduct(event, '${prod.id}');">
      <div class="form-group">
        <label class="form-label">Product Name *</label>
        <input type="text" class="form-input" id="edit-prod-name" value="${prod.name}" required>
      </div>
      <div class="form-group">
        <label class="form-label">Subtitle / Key Actives</label>
        <input type="text" class="form-input" id="edit-prod-subtitle" value="${prod.subtitle || ''}">
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
        <div class="form-group">
          <label class="form-label">Category</label>
          <select class="form-select" id="edit-prod-category">
            ${categories.map(c => `<option value="${c.id}" ${prod.category === c.id ? 'selected' : ''}>${c.name}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">SKU Code</label>
          <input type="text" class="form-input" id="edit-prod-sku" value="${prod.sku}">
        </div>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px;">
        <div class="form-group">
          <label class="form-label">Selling Price (₹)</label>
          <input type="number" class="form-input" id="edit-prod-price" value="${prod.price}" required>
        </div>
        <div class="form-group">
          <label class="form-label">Cost Price (₹)</label>
          <input type="number" class="form-input" id="edit-prod-cost" value="${prod.costPrice}">
        </div>
        <div class="form-group">
          <label class="form-label">Stock Units</label>
          <input type="number" class="form-input" id="edit-prod-stock" value="${prod.stock}" required>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Image URL</label>
        <input type="url" class="form-input" id="edit-prod-image" value="${prod.image}">
      </div>
      <button type="submit" class="btn btn-primary btn-lg btn-full">Save Changes</button>
    </form>
  `;
  openModal(html, { maxWidth: '560px' });
};

window.handleSaveEditProduct = (e, prodId) => {
  const name = document.getElementById('edit-prod-name').value;
  const subtitle = document.getElementById('edit-prod-subtitle').value;
  const category = document.getElementById('edit-prod-category').value;
  const sku = document.getElementById('edit-prod-sku').value;
  const price = document.getElementById('edit-prod-price').value;
  const costPrice = document.getElementById('edit-prod-cost').value;
  const stock = document.getElementById('edit-prod-stock').value;
  const image = document.getElementById('edit-prod-image').value;

  store.updateProduct(prodId, { name, subtitle, category, sku, price, costPrice, stock, image });
  closeModal();
  showToast('Product updated successfully 🧴', 'success');
  router();
};

window.viewOrderDetailsModal = (orderId) => {
  const order = store.getOrderById(orderId);
  if (!order) return;
  const address = order.shippingAddress || {};

  const html = `
    <h2 class="text-serif" style="font-size: 1.75rem; margin-bottom: 14px;">Order Manifest: ${order.id}</h2>
    <div style="margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center;">
      <div>Placed: <strong>${formatDate(order.date)}</strong></div>
      <div>${getStatusBadge(order.orderStatus)}</div>
    </div>
    <div style="background: var(--color-surface-soft); padding: 14px; border-radius: var(--radius-md); margin-bottom: 18px; font-size: 0.875rem;">
      <div><strong>Shipping To:</strong> ${order.customerName} (${order.customerPhone})</div>
      <div style="color: var(--color-text-secondary);">${address.street || ''}, ${address.city || ''}, ${address.state || ''} - ${address.pincode || ''}</div>
    </div>
    <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px;">
      ${order.items.map(i => `
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.875rem; border-bottom: 1px solid var(--color-border-subtle); padding-bottom: 8px;">
          <span>${i.name} (×${i.quantity})</span>
          <strong>${formatINR(i.price * i.quantity)}</strong>
        </div>
      `).join('')}
    </div>
    <div style="display: flex; justify-content: space-between; font-size: 1.25rem; font-weight: 800; border-top: 1px solid var(--color-border); padding-top: 12px; margin-bottom: 20px;">
      <span>Total Amount:</span>
      <span style="color: var(--color-blush-800);">${formatINR(order.totalAmount)}</span>
    </div>
    <button class="btn btn-secondary btn-full" onclick="closeModal()">Close Receipt</button>
  `;
  openModal(html, { maxWidth: '520px' });
};

window.viewAdminOrderDetailsModal = (orderId) => window.viewOrderDetailsModal(orderId);

window.viewCustomerHistoryModal = (email) => {
  const customerOrders = store.getCustomerOrders(email);
  const html = `
    <h2 class="text-serif" style="font-size: 1.75rem; margin-bottom: 14px;">Customer Orders: ${email}</h2>
    <div style="max-height: 360px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px;">
      ${customerOrders.map(o => `
        <div style="background: var(--color-surface-soft); padding: 14px; border-radius: var(--radius-md); border: 1px solid var(--color-border-subtle);">
          <div style="display: flex; justify-content: space-between; font-weight: 700; margin-bottom: 4px;">
            <span>${o.id}</span>
            <span>${formatINR(o.totalAmount)}</span>
          </div>
          <div style="font-size: 0.8125rem; color: var(--color-text-muted);">${formatDate(o.date)} • ${o.paymentMethod} • ${getStatusBadge(o.orderStatus)}</div>
        </div>
      `).join('')}
    </div>
  `;
  openModal(html, { maxWidth: '500px' });
};

window.downloadReportCSV = () => {
  const orders = store.getOrders();
  const csv = store.generateCSV(orders);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Glowspace_Sales_Report_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('CSV Report downloaded successfully 📥', 'success');
};

window.exportSalesTableCSV = window.downloadReportCSV;

window.handleResetDemoDatabase = () => {
  if (confirm('Restore the seed products, orders, and customer analytics for college demonstration?')) {
    store.resetDemoDatabase();
    showToast('Database reset to initial demo state 🌿', 'success');
    window.location.hash = '#admin/dashboard';
  }
};

window.handleSaveSettings = (e) => {
  const storeName = document.getElementById('setting-storeName').value;
  const tagline = document.getElementById('setting-tagline').value;
  const taxRate = Number(document.getElementById('setting-taxRate').value);
  const shippingFee = Number(document.getElementById('setting-shippingFee').value);
  const freeShippingThreshold = Number(document.getElementById('setting-freeShippingThreshold').value);
  const lowStockThreshold = Number(document.getElementById('setting-lowStockThreshold').value);
  const contactEmail = document.getElementById('setting-contactEmail').value;
  const contactPhone = document.getElementById('setting-contactPhone').value;

  store.updateSettings({
    storeName, tagline, taxRate, shippingFee, freeShippingThreshold, lowStockThreshold, contactEmail, contactPhone
  });
  showToast('Store settings saved successfully ⚙️', 'success');
  router();
};

window.handleNewsletterSubmit = (e) => {
  showToast('Thank you for subscribing! Check your inbox for your 15% discount code ✨', 'success');
};

window.handleContactSubmit = (e) => {
  showToast('Thank you! Your message has been routed to our skincare support team ✉️', 'success');
  document.getElementById('contact-form')?.reset();
};

// Router event bindings
window.addEventListener('hashchange', router);
window.addEventListener('load', router);

// Subscribe store changes to live-update current view
store.subscribe('*', () => {
  // Only re-route if not in modal
  const modal = document.getElementById('modal-container');
  if (modal && modal.classList.contains('hidden')) {
    router();
  }
});
