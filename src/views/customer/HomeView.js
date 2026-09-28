import { store } from '../../services/storeService.js';
import { renderProductCard } from '../../components/ProductCard.js';

export function renderHomeView() {
  const products = store.getProducts();
  const categories = store.getCategories();
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);

  return `
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-grid">
          <!-- Hero Text -->
          <div class="hero-content">
            <div class="hero-pill">
              <span>🌿 Pure & Dermatologically Tested</span>
            </div>
            <h1 class="hero-title">
              Simple Skincare. <br>
              <span>Healthier Looking Skin.</span>
            </h1>
            <p class="hero-description">
              Formulated with clinical-grade actives, botanical hydration elixirs, and zero harsh chemicals. Nourish your skin barrier with everyday minimalist luxury.
            </p>
            <div class="hero-ctas">
              <a href="#shop" class="btn btn-primary btn-lg">
                Shop Now →
              </a>
              <a href="#categories" class="btn btn-secondary btn-lg">
                Explore Categories
              </a>
            </div>
          </div>

          <!-- Hero Image & Floating Badge -->
          <div class="hero-image-wrapper">
            <div class="hero-image-card">
              <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop" alt="Glowspace Skincare Essence">
            </div>
            <div class="hero-floating-badge">
              <div class="hero-badge-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <div>
                <div style="font-weight: 700; font-size: 0.9375rem; color: var(--color-text-main);">100% Clean Actives</div>
                <div style="font-size: 0.75rem; color: var(--color-text-muted);">Dermatologist Approved</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Glowspace (Value Props) -->
    <section class="features-section">
      <div class="container">
        <div class="features-grid">
          <div class="feature-item">
            <div class="feature-icon-box">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div>
              <h3 class="feature-title">Quality Products</h3>
              <p class="feature-desc">Formulated with pure botanical ingredients and certified safe actives.</p>
            </div>
          </div>

          <div class="feature-item">
            <div class="feature-icon-box">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
            </div>
            <div>
              <h3 class="feature-title">Easy Online Shopping</h3>
              <p class="feature-desc">Seamless browsing, instant filters, and intuitive cart management.</p>
            </div>
          </div>

          <div class="feature-item">
            <div class="feature-icon-box">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>
              </svg>
            </div>
            <div>
              <h3 class="feature-title">Secure Payments</h3>
              <p class="feature-desc">100% encrypted UPI, Cards, NetBanking, and Cash on Delivery.</p>
            </div>
          </div>

          <div class="feature-item">
            <div class="feature-icon-box">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11"/><path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>
              </svg>
            </div>
            <div>
              <h3 class="feature-title">Fast Delivery</h3>
              <p class="feature-desc">Dispatched within 24 hours with real-time tracking to your doorstep.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Categories Section -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-subtitle">Curated Rituals</span>
          <h2 class="section-title">Featured Categories</h2>
          <p class="section-description">Targeted skincare formulations crafted for specific skin and body needs.</p>
        </div>

        <div class="category-grid">
          ${categories.map(cat => `
            <div class="category-card" onclick="window.location.hash = '#shop?category=${cat.id}'">
              <div class="category-card-image">
                <img src="${cat.image}" alt="${cat.name}" loading="lazy">
              </div>
              <div class="category-card-body">
                <h3 class="category-card-title">${cat.name}</h3>
                <p style="font-size: 0.8125rem; color: var(--color-text-secondary); margin-bottom: 8px;">${cat.tagline}</p>
                <div style="margin-top: auto; display: flex; align-items: center; justify-content: space-between;">
                  <span class="category-card-count">${cat.itemCount} Formulations</span>
                  <span style="font-size: 0.875rem; font-weight: 700; color: var(--color-blush-700);">Explore →</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Best Selling Products Section -->
    <section class="section" style="background: var(--color-blush-50);">
      <div class="container">
        <div class="section-header">
          <span class="section-subtitle">Customer Favorites</span>
          <h2 class="section-title">Best Selling Products</h2>
          <p class="section-description">Our most celebrated daily skincare essentials loved by thousands.</p>
        </div>

        <div class="product-grid">
          ${bestSellers.map(p => renderProductCard(p)).join('')}
        </div>

        <div style="text-align: center; margin-top: 48px;">
          <a href="#shop" class="btn btn-secondary btn-lg">
            View All Products (${products.length}) →
          </a>
        </div>
      </div>
    </section>

    <!-- Customer Reviews Section -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-subtitle">Real Results</span>
          <h2 class="section-title">Loved by Our Community</h2>
          <p class="section-description">Read what our verified skincare enthusiasts have to say about Glowspace.</p>
        </div>

        <div class="reviews-grid">
          <div class="review-card">
            <div class="review-card-stars">★★★★★</div>
            <h3 class="review-card-title">“My skin texture has never looked better!”</h3>
            <p class="review-card-text">
              “The Hydrating Face Serum is lightweight, soothing, and leaves my skin supple without any stickiness. My morning makeup goes on so seamlessly now!”
            </p>
            <div class="review-card-author">
              <div class="author-avatar">AS</div>
              <div>
                <div class="author-name">Ananya Sharma</div>
                <div class="author-meta">Verified Buyer • Mumbai</div>
              </div>
            </div>
          </div>

          <div class="review-card">
            <div class="review-card-stars">★★★★★</div>
            <h3 class="review-card-title">“The Vitamin C serum works wonders”</h3>
            <p class="review-card-text">
              “Faded my persistent sun marks in less than 3 weeks. It feels so gentle on sensitive skin and smells crisp and refreshing. Highly recommend!”
            </p>
            <div class="review-card-author">
              <div class="author-avatar">RP</div>
              <div>
                <div class="author-name">Riya Patel</div>
                <div class="author-meta">Verified Buyer • Ahmedabad</div>
              </div>
            </div>
          </div>

          <div class="review-card">
            <div class="review-card-stars">★★★★★</div>
            <h3 class="review-card-title">“Zero white cast mineral sunscreen!”</h3>
            <p class="review-card-text">
              “Finally found a mineral sunscreen SPF 50 that absorbs instantly without any heavy chalky cast. Perfect for everyday sun defense.”
            </p>
            <div class="review-card-author">
              <div class="author-avatar">PM</div>
              <div>
                <div class="author-name">Priya Mehta</div>
                <div class="author-meta">Verified Buyer • New Delhi</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <div class="container">
      <div class="newsletter-section">
        <div class="newsletter-content">
          <span class="badge badge-blush" style="margin-bottom: 12px;">Get 15% OFF</span>
          <h2 class="newsletter-title">Join the Glowspace Circle</h2>
          <p class="newsletter-desc">
            Subscribe for exclusive skincare tips, early access to new botanical launches, and seasonal discounts.
          </p>
          <form class="newsletter-form" id="home-newsletter-form" onsubmit="event.preventDefault(); window.handleNewsletterSubmit(event);">
            <input type="email" class="newsletter-input" placeholder="Enter your email address" required>
            <button type="submit" class="btn btn-primary">Subscribe</button>
          </form>
        </div>
      </div>
    </div>
  `;
}
