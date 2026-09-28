import { store } from '../../services/storeService.js';
import { formatINR, renderStars } from '../../utils/formatters.js';
import { renderProductCard } from '../../components/ProductCard.js';

export function renderProductDetailView(productId) {
  const product = store.getProductById(productId);
  if (!product) {
    return `
      <div class="container" style="padding: 80px 20px; text-align: center;">
        <h2 class="text-serif" style="font-size: 2rem; margin-bottom: 12px;">Product Not Found</h2>
        <p style="color: var(--color-text-secondary); margin-bottom: 24px;">The skincare formulation you are looking for does not exist or has been retired.</p>
        <a href="#shop" class="btn btn-primary">Return to Shop</a>
      </div>
    `;
  }

  const allProducts = store.getProducts();
  const relatedProducts = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const reviews = store.getProductReviews(product.id);
  const isWishlisted = store.isInWishlist(product.id);

  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const isLowStock = product.stock <= (product.minStockThreshold || 10) && product.stock > 0;
  const isOutOfStock = product.stock === 0;

  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  return `
    <div class="container">
      <!-- Breadcrumb -->
      <div style="padding: 24px 0 10px; font-size: 0.8125rem; color: var(--color-text-muted);">
        <a href="#home">Home</a> / <a href="#shop">Shop</a> / <a href="#shop?category=${product.category}">${product.categoryName}</a> / <span style="color: var(--color-text-main);">${product.name}</span>
      </div>

      <!-- Main Product Details Grid -->
      <div class="product-detail-layout">
        <!-- Left: Image Gallery -->
        <div class="product-gallery">
          <div class="main-image-wrapper">
            <img id="detail-main-image" src="${gallery[0]}" alt="${product.name}">
          </div>
          ${gallery.length > 1 ? `
            <div class="gallery-thumbs">
              ${gallery.map((imgUrl, idx) => `
                <button class="gallery-thumb-btn ${idx === 0 ? 'active' : ''}" onclick="window.switchDetailImage('${imgUrl}', this)">
                  <img src="${imgUrl}" alt="${product.name} thumbnail ${idx + 1}">
                </button>
              `).join('')}
            </div>
          ` : ''}
        </div>

        <!-- Right: Info Panel -->
        <div class="product-info-panel">
          <span class="product-info-category">${product.categoryName}</span>
          <h1 class="product-info-title">${product.name}</h1>
          ${product.subtitle ? `<div class="product-info-subtitle">${product.subtitle}</div>` : ''}

          <!-- Rating & Reviews -->
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 18px;">
            <div class="product-rating" style="margin-bottom: 0;">
              ${renderStars(product.rating || 5)}
              <span style="font-weight: 700; color: var(--color-text-main);">${product.rating || 5.0}</span>
              <span class="rating-count">(${product.reviewCount || reviews.length} customer reviews)</span>
            </div>
            <span style="color: var(--color-border);">|</span>
            <span style="font-size: 0.8125rem; color: var(--color-text-muted);">SKU: ${product.sku}</span>
          </div>

          <!-- Price Row -->
          <div class="product-info-pricing">
            <span class="price-current">${formatINR(product.price)}</span>
            ${product.originalPrice > product.price ? `
              <span class="price-original">${formatINR(product.originalPrice)}</span>
              <span class="price-save-badge">Save ${discountPercent}%</span>
            ` : ''}
          </div>

          <!-- Stock Status Badge -->
          <div style="margin-bottom: 20px;">
            ${isOutOfStock ? `
              <span class="badge badge-danger">Out of Stock</span>
            ` : isLowStock ? `
              <span class="badge badge-warning">Low Stock Alert: Only ${product.stock} units remaining</span>
            ` : `
              <span class="badge badge-success">✓ In Stock (${product.stock} units available)</span>
            `}
          </div>

          <!-- Short Description -->
          <p style="font-size: 0.9375rem; color: var(--color-text-secondary); line-height: 1.7; margin-bottom: 24px;">
            ${product.description}
          </p>

          <!-- Quantity and Action Buttons -->
          <div class="product-action-row" style="align-items: center;">
            <div class="quantity-selector">
              <button class="qty-btn" onclick="window.updateDetailQty(-1)" ${isOutOfStock ? 'disabled' : ''}>-</button>
              <span class="qty-value" id="detail-qty-value">1</span>
              <button class="qty-btn" onclick="window.updateDetailQty(1)" ${isOutOfStock ? 'disabled' : ''}>+</button>
            </div>

            <button class="btn btn-primary btn-lg" id="detail-add-to-cart-btn" data-product-id="${product.id}" ${isOutOfStock ? 'disabled' : ''} style="flex: 1; min-width: 180px;">
              ${isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
            </button>

            <button class="btn btn-dark btn-lg" id="detail-buy-now-btn" data-product-id="${product.id}" ${isOutOfStock ? 'disabled' : ''}>
              Buy Now
            </button>

            <button class="wishlist-toggle-btn ${isWishlisted ? 'active' : ''}" 
                    data-wishlist-id="${product.id}" 
                    style="width: 48px; height: 48px;" 
                    title="Add to wishlist" aria-label="Toggle Wishlist">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              </svg>
            </button>
          </div>

          <!-- Highlight Value Props List -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; padding: 18px; background: var(--color-surface-soft); border-radius: var(--radius-md); border: 1px solid var(--color-border-subtle); margin-top: 10px;">
            <div style="font-size: 0.8125rem; display: flex; align-items: center; gap: 8px;">
              <span style="color: var(--color-success); font-weight: bold;">✓</span> 100% Cruelty Free & Vegan
            </div>
            <div style="font-size: 0.8125rem; display: flex; align-items: center; gap: 8px;">
              <span style="color: var(--color-success); font-weight: bold;">✓</span> Dermatologist Formulated
            </div>
            <div style="font-size: 0.8125rem; display: flex; align-items: center; gap: 8px;">
              <span style="color: var(--color-success); font-weight: bold;">✓</span> Free Shipping over ₹999
            </div>
            <div style="font-size: 0.8125rem; display: flex; align-items: center; gap: 8px;">
              <span style="color: var(--color-success); font-weight: bold;">✓</span> 7-Day Easy Returns
            </div>
          </div>
        </div>
      </div>

      <!-- Tabbed Product Information Section -->
      <div class="tabs-container">
        <div class="tabs-header">
          <button class="tab-btn active" data-tab="tab-desc" onclick="window.switchTab('tab-desc', this)">Detailed Description</button>
          <button class="tab-btn" data-tab="tab-ingredients" onclick="window.switchTab('tab-ingredients', this)">Ingredients List</button>
          <button class="tab-btn" data-tab="tab-how-to-use" onclick="window.switchTab('tab-how-to-use', this)">How to Use</button>
          <button class="tab-btn" data-tab="tab-benefits" onclick="window.switchTab('tab-benefits', this)">Benefits & Suitability</button>
          <button class="tab-btn" data-tab="tab-shipping" onclick="window.switchTab('tab-shipping', this)">Shipping & Delivery</button>
          <button class="tab-btn" data-tab="tab-reviews" onclick="window.switchTab('tab-reviews', this)">Customer Reviews (${reviews.length})</button>
        </div>

        <!-- Description Tab -->
        <div class="tab-pane" id="tab-desc">
          <p style="margin-bottom: 14px;">${product.description}</p>
          <p>Each batch is cold-formulated in state-of-the-art facilities with dermatological oversight. Formulated without parabens, sulfates, artificial fragrances, or drying alcohols.</p>
        </div>

        <!-- Ingredients Tab -->
        <div class="tab-pane" id="tab-ingredients" style="display: none;">
          <h4 style="font-weight: 700; margin-bottom: 8px; color: var(--color-text-main);">Full Key Formulation:</h4>
          <p style="background: var(--color-surface-soft); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--color-border); font-family: monospace; font-size: 0.875rem;">
            ${product.ingredients || 'Aqua, Glycerin, Niacinamide, Sodium Hyaluronate, Panthenol, Centella Asiatica Extract, Allantoin.'}
          </p>
        </div>

        <!-- How to Use Tab -->
        <div class="tab-pane" id="tab-how-to-use" style="display: none;">
          <h4 style="font-weight: 700; margin-bottom: 8px; color: var(--color-text-main);">Application Ritual:</h4>
          <p style="margin-bottom: 12px;">${product.howToUse || 'Dispense onto clean hands. Gently press into facial skin and neck until fully absorbed.'}</p>
          <p style="color: var(--color-text-muted); font-size: 0.875rem;"><em>Tip: For optimal absorption, apply onto slightly damp skin immediately after cleansing or toning.</em></p>
        </div>

        <!-- Benefits & Suitability -->
        <div class="tab-pane" id="tab-benefits" style="display: none;">
          <div style="margin-bottom: 16px;">
            <h4 style="font-weight: 700; margin-bottom: 6px; color: var(--color-text-main);">Key Benefits:</h4>
            <p>${product.benefits || 'Restores moisture barrier and boosts youthful dermal glow.'}</p>
          </div>
          <div>
            <h4 style="font-weight: 700; margin-bottom: 6px; color: var(--color-text-main);">Suitable Skin Types:</h4>
            <p>${product.suitableFor || 'All skin types, safe for sensitive skin.'}</p>
          </div>
        </div>

        <!-- Shipping Tab -->
        <div class="tab-pane" id="tab-shipping" style="display: none;">
          <p style="margin-bottom: 10px;">• Standard Delivery: 2-4 business days across India.</p>
          <p style="margin-bottom: 10px;">• Free Express Delivery on all orders above ₹999.</p>
          <p style="margin-bottom: 10px;">• Temperature-controlled and sustainable recyclable packaging.</p>
          <p>• 7-Day Hassle-Free Returns on unopened items.</p>
        </div>

        <!-- Customer Reviews Tab -->
        <div class="tab-pane" id="tab-reviews" style="display: none;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px;">
            <!-- Review List -->
            <div>
              <h3 class="text-serif" style="font-size: 1.35rem; margin-bottom: 16px;">Verified Customer Feedback</h3>
              ${reviews.length > 0 ? `
                <div style="display: flex; flex-direction: column; gap: 16px;">
                  ${reviews.map(r => `
                    <div style="background: var(--color-surface); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--color-border-subtle);">
                      <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                        <span style="font-weight: 700; font-size: 0.9375rem;">${r.author}</span>
                        <span style="font-size: 0.75rem; color: var(--color-text-muted);">${r.date}</span>
                      </div>
                      <div style="color: #e5a93b; margin-bottom: 6px;">${'★'.repeat(r.rating)}</div>
                      <div style="font-weight: 600; font-size: 0.875rem; margin-bottom: 4px;">${r.title}</div>
                      <p style="font-size: 0.875rem; color: var(--color-text-secondary);">${r.comment}</p>
                    </div>
                  `).join('')}
                </div>
              ` : `
                <p style="color: var(--color-text-muted);">No reviews written yet. Be the first to review this formulation!</p>
              `}
            </div>

            <!-- Review Form -->
            <div>
              <h3 class="text-serif" style="font-size: 1.35rem; margin-bottom: 16px;">Write a Review</h3>
              <form id="product-review-form" data-product-id="${product.id}" onsubmit="event.preventDefault(); window.handleReviewSubmit(event, '${product.id}');">
                <div class="form-group">
                  <label class="form-label">Your Name</label>
                  <input type="text" class="form-input" id="review-author" placeholder="e.g. Maya S." required>
                </div>
                <div class="form-group">
                  <label class="form-label">Rating</label>
                  <select class="form-select" id="review-rating">
                    <option value="5">★★★★★ (5 - Excellent)</option>
                    <option value="4">★★★★☆ (4 - Very Good)</option>
                    <option value="3">★★★☆☆ (3 - Good)</option>
                    <option value="2">★★☆☆☆ (2 - Fair)</option>
                    <option value="1">★☆☆☆☆ (1 - Poor)</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Review Headline</label>
                  <input type="text" class="form-input" id="review-title" placeholder="e.g. My new favorite serum!" required>
                </div>
                <div class="form-group">
                  <label class="form-label">Your Feedback</label>
                  <textarea class="form-textarea" id="review-comment" placeholder="Tell us how this formulation worked for your skin..." required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Submit Review</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Products Section -->
      ${relatedProducts.length > 0 ? `
        <div style="margin-top: 80px; margin-bottom: 80px;">
          <div class="section-header" style="margin-bottom: 36px; text-align: left;">
            <span class="section-subtitle">Complete Your Routine</span>
            <h2 class="section-title">Related Formulations</h2>
          </div>
          <div class="product-grid">
            ${relatedProducts.map(p => renderProductCard(p)).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;
}
