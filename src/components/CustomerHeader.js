import { store } from '../services/storeService.js';
import { formatINR } from '../utils/formatters.js';

export function renderCustomerHeader(activeRoute = 'home') {
  const cartSummary = store.getCartSummary();
  const wishlist = store.getWishlist();
  const currentCustomer = store.getCurrentCustomer();

  return `
    <header class="site-header">
      <!-- Announcement Bar -->
      <div class="header-topbar">
        <div class="container header-topbar-content">
          <div>✨ <strong>Special Offer:</strong> Get 20% OFF on first order with code <strong>WELCOME20</strong> | Free Shipping over ₹999</div>
          <div style="display: flex; gap: 16px; align-items: center;">
            <a href="#admin/dashboard" class="badge badge-blush" style="text-decoration: none; cursor: pointer;">
              👑 Owner / Admin Portal
            </a>
          </div>
        </div>
      </div>

      <!-- Main Navigation Bar -->
      <div class="container">
        <div class="header-inner">
          <!-- Logo -->
          <a href="#home" class="brand-logo">
            <div class="brand-logo-mark">G</div>
            <span class="text-serif" style="letter-spacing: -0.5px;">Glowspace</span>
          </a>

          <!-- Nav Links -->
          <nav class="nav-links">
            <a href="#home" class="nav-link ${activeRoute === 'home' ? 'active' : ''}">Home</a>
            <a href="#shop" class="nav-link ${activeRoute === 'shop' ? 'active' : ''}">Shop</a>
            <a href="#categories" class="nav-link ${activeRoute === 'categories' ? 'active' : ''}">Categories</a>
            <a href="#about" class="nav-link ${activeRoute === 'about' ? 'active' : ''}">About Us</a>
            <a href="#contact" class="nav-link ${activeRoute === 'contact' ? 'active' : ''}">Contact</a>
            <a href="#faq" class="nav-link ${activeRoute === 'faq' ? 'active' : ''}">FAQ</a>
          </nav>

          <!-- Header Actions -->
          <div class="header-actions">
            <!-- Wishlist -->
            <a href="#account/wishlist" class="icon-btn" title="Wishlist" aria-label="View Wishlist">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              </svg>
              ${wishlist.length > 0 ? `<span class="icon-badge">${wishlist.length}</span>` : ''}
            </a>

            <!-- Cart -->
            <a href="#cart" class="icon-btn" title="Cart" aria-label="View Shopping Cart">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
              </svg>
              ${cartSummary.itemCount > 0 ? `<span class="icon-badge">${cartSummary.itemCount}</span>` : ''}
            </a>

            <!-- Account / User Dropdown -->
            ${currentCustomer ? `
              <div style="position: relative;" class="user-dropdown-wrapper">
                <button class="btn btn-secondary btn-sm" id="customer-profile-btn" style="padding: 6px 14px; gap: 8px;">
                  <img src="${currentCustomer.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'}" alt="${currentCustomer.name}" style="width: 26px; height: 26px; border-radius: 50%; object-fit: cover;">
                  <span style="max-width: 100px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${currentCustomer.name.split(' ')[0]}</span>
                </button>
              </div>
            ` : `
              <button class="btn btn-primary btn-sm" id="open-auth-modal-btn">
                Sign In
              </button>
            `}

            <!-- Mobile Menu Toggle -->
            <button class="icon-btn mobile-menu-toggle" id="mobile-menu-btn" aria-label="Toggle menu">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  `;
}
