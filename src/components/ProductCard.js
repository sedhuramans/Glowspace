import { formatINR, renderStars } from '../utils/formatters.js';
import { store } from '../services/storeService.js';

export function renderProductCard(product) {
  const isWishlisted = store.isInWishlist(product.id);
  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const isLowStock = product.stock <= (product.minStockThreshold || 10) && product.stock > 0;
  const isOutOfStock = product.stock === 0;

  return `
    <div class="product-card" data-product-id="${product.id}">
      <div class="product-card-thumb" onclick="window.location.hash = '#product/${product.id}'">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        
        <div class="product-tag-container">
          ${product.isBestSeller ? `<span class="badge badge-blush">Bestseller</span>` : ''}
          ${product.isNew ? `<span class="badge badge-info">New</span>` : ''}
          ${discountPercent > 0 ? `<span class="badge badge-success">-${discountPercent}%</span>` : ''}
          ${isLowStock ? `<span class="badge badge-warning">Only ${product.stock} left</span>` : ''}
          ${isOutOfStock ? `<span class="badge badge-danger">Out of Stock</span>` : ''}
        </div>

        <div class="product-card-actions" onclick="event.stopPropagation()">
          <button class="wishlist-toggle-btn ${isWishlisted ? 'active' : ''}" 
                  data-wishlist-id="${product.id}" 
                  title="${isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}"
                  aria-label="Toggle Wishlist">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="product-card-body">
        <div class="product-card-category">${product.categoryName || 'Face Care'}</div>
        <h3 class="product-card-title" onclick="window.location.hash = '#product/${product.id}'">
          ${product.name}
        </h3>
        
        <div class="product-rating">
          ${renderStars(product.rating || 5)}
          <span class="rating-count">(${product.reviewCount || 0})</span>
        </div>

        <div class="product-card-footer">
          <div class="product-price-box">
            <span class="product-price">${formatINR(product.price)}</span>
            ${product.originalPrice > product.price ? `
              <span class="product-original-price">${formatINR(product.originalPrice)}</span>
            ` : ''}
          </div>

          <button class="btn btn-primary btn-sm add-to-cart-btn" 
                  data-add-to-cart="${product.id}" 
                  ${isOutOfStock ? 'disabled' : ''}>
            ${isOutOfStock ? 'Out of Stock' : '+ Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  `;
}
