import { store } from '../../services/storeService.js';
import { renderProductCard } from '../../components/ProductCard.js';

export function renderShopView(queryParams = {}) {
  const allProducts = store.getProducts();
  const categories = store.getCategories();

  // Extract filters from queryParams
  const selectedCategory = queryParams.category || 'all';
  const searchQuery = (queryParams.search || '').toLowerCase().trim();
  const sortBy = queryParams.sort || 'popular';
  const priceRange = queryParams.price || 'all';
  const minRating = Number(queryParams.rating) || 0;
  const inStockOnly = queryParams.inStock === 'true';

  // Apply filtering
  let filtered = allProducts.filter(product => {
    // Category filter
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }

    // Search query
    if (searchQuery) {
      const matchName = product.name.toLowerCase().includes(searchQuery);
      const matchSubtitle = (product.subtitle || '').toLowerCase().includes(searchQuery);
      const matchCategory = (product.categoryName || '').toLowerCase().includes(searchQuery);
      const matchIngredients = (product.ingredients || '').toLowerCase().includes(searchQuery);
      if (!matchName && !matchSubtitle && !matchCategory && !matchIngredients) {
        return false;
      }
    }

    // Price filter
    if (priceRange === 'under-500' && product.price >= 500) return false;
    if (priceRange === '500-800' && (product.price < 500 || product.price > 800)) return false;
    if (priceRange === 'above-800' && product.price <= 800) return false;

    // Rating filter
    if (minRating > 0 && product.rating < minRating) return false;

    // Stock availability
    if (inStockOnly && product.stock <= 0) return false;

    return true;
  });

  // Apply Sorting
  filtered.sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    // Default 'popular'
    return (b.unitsSold || 0) - (a.unitsSold || 0);
  });

  return `
    <div class="container">
      <!-- Breadcrumb & Header -->
      <div style="padding: 30px 0 10px;">
        <div style="font-size: 0.8125rem; color: var(--color-text-muted); margin-bottom: 8px;">
          <a href="#home">Home</a> / <span style="color: var(--color-text-main);">Shop</span>
        </div>
        <h1 class="text-serif" style="font-size: 2.5rem; font-weight: 700; color: var(--color-text-main);">
          All Skincare Formulations
        </h1>
        <p style="font-size: 0.9375rem; color: var(--color-text-secondary);">
          Discover clean, dermatologically backed skincare crafted for maximum radiance and hydration.
        </p>
      </div>

      <div class="shop-layout">
        <!-- Filter Sidebar -->
        <aside class="filter-sidebar">
          <div class="filter-header">
            <span class="filter-title">Filter By</span>
            <button class="btn btn-outline btn-sm" id="reset-filters-btn" style="padding: 4px 10px; font-size: 0.75rem;">
              Reset
            </button>
          </div>

          <!-- Category Filter -->
          <div class="filter-group">
            <div class="filter-group-title">Categories</div>
            <div class="filter-checkbox-list">
              <label class="filter-checkbox-label">
                <input type="radio" name="shop-category" value="all" ${selectedCategory === 'all' ? 'checked' : ''}>
                <span>All Categories (${allProducts.length})</span>
              </label>
              ${categories.map(cat => {
                const count = allProducts.filter(p => p.category === cat.id).length;
                return `
                  <label class="filter-checkbox-label">
                    <input type="radio" name="shop-category" value="${cat.id}" ${selectedCategory === cat.id ? 'checked' : ''}>
                    <span>${cat.name} (${count})</span>
                  </label>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Price Range Filter -->
          <div class="filter-group">
            <div class="filter-group-title">Price Range</div>
            <div class="filter-checkbox-list">
              <label class="filter-checkbox-label">
                <input type="radio" name="shop-price" value="all" ${priceRange === 'all' ? 'checked' : ''}>
                <span>All Prices</span>
              </label>
              <label class="filter-checkbox-label">
                <input type="radio" name="shop-price" value="under-500" ${priceRange === 'under-500' ? 'checked' : ''}>
                <span>Under ₹500</span>
              </label>
              <label class="filter-checkbox-label">
                <input type="radio" name="shop-price" value="500-800" ${priceRange === '500-800' ? 'checked' : ''}>
                <span>₹500 – ₹800</span>
              </label>
              <label class="filter-checkbox-label">
                <input type="radio" name="shop-price" value="above-800" ${priceRange === 'above-800' ? 'checked' : ''}>
                <span>Above ₹800</span>
              </label>
            </div>
          </div>

          <!-- Rating Filter -->
          <div class="filter-group">
            <div class="filter-group-title">Customer Rating</div>
            <div class="filter-checkbox-list">
              <label class="filter-checkbox-label">
                <input type="radio" name="shop-rating" value="0" ${minRating === 0 ? 'checked' : ''}>
                <span>All Ratings</span>
              </label>
              <label class="filter-checkbox-label">
                <input type="radio" name="shop-rating" value="4.8" ${minRating === 4.8 ? 'checked' : ''}>
                <span>★ 4.8 & above</span>
              </label>
              <label class="filter-checkbox-label">
                <input type="radio" name="shop-rating" value="4.5" ${minRating === 4.5 ? 'checked' : ''}>
                <span>★ 4.5 & above</span>
              </label>
            </div>
          </div>

          <!-- Availability Filter -->
          <div class="filter-group">
            <div class="filter-group-title">Availability</div>
            <div class="filter-checkbox-list">
              <label class="filter-checkbox-label">
                <input type="checkbox" name="shop-instock" id="shop-instock" ${inStockOnly ? 'checked' : ''}>
                <span>In Stock Only</span>
              </label>
            </div>
          </div>
        </aside>

        <!-- Main Product Grid Area -->
        <main>
          <!-- Topbar Controls -->
          <div class="shop-topbar">
            <!-- Search Input -->
            <div class="shop-search-bar">
              <svg class="shop-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input type="text" id="shop-search-input" class="shop-search-input" placeholder="Search serums, cleansers, ingredients..." value="${searchQuery}">
            </div>

            <!-- Sort Select & Results Count -->
            <div style="display: flex; align-items: center; gap: 14px;">
              <span style="font-size: 0.875rem; color: var(--color-text-secondary); white-space: nowrap;">
                Showing <strong>${filtered.length}</strong> products
              </span>

              <select id="shop-sort-select" class="shop-sort-select">
                <option value="popular" ${sortBy === 'popular' ? 'selected' : ''}>Sort by: Popular</option>
                <option value="price-asc" ${sortBy === 'price-asc' ? 'selected' : ''}>Price: Low to High</option>
                <option value="price-desc" ${sortBy === 'price-desc' ? 'selected' : ''}>Price: High to Low</option>
                <option value="rating" ${sortBy === 'rating' ? 'selected' : ''}>Best Rated</option>
                <option value="newest" ${sortBy === 'newest' ? 'selected' : ''}>Newest Arrivals</option>
              </select>
            </div>
          </div>

          <!-- Products Grid -->
          ${filtered.length > 0 ? `
            <div class="product-grid">
              ${filtered.map(product => renderProductCard(product)).join('')}
            </div>
          ` : `
            <div style="text-align: center; padding: 60px 20px; background: var(--color-surface); border-radius: var(--radius-lg); border: 1px solid var(--color-border-subtle);">
              <div style="font-size: 2.5rem; margin-bottom: 12px;">🌿</div>
              <h3 class="text-serif" style="font-size: 1.5rem; margin-bottom: 8px;">No products match your criteria</h3>
              <p style="color: var(--color-text-secondary); margin-bottom: 20px;">Try adjusting your search terms or clearing the selected filters.</p>
              <button class="btn btn-secondary" onclick="window.location.hash = '#shop'">Reset All Filters</button>
            </div>
          `}
        </main>
      </div>
    </div>
  `;
}
