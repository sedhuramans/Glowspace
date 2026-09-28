import { store } from '../../services/storeService.js';

export function renderCategoriesView() {
  const categories = store.getCategories();
  const products = store.getProducts();

  return `
    <div class="container" style="padding: 40px 20px 80px;">
      <!-- Breadcrumb & Header -->
      <div style="margin-bottom: 40px; text-align: center; max-width: 600px; margin-left: auto; margin-right: auto;">
        <span class="section-subtitle">Skincare Collections</span>
        <h1 class="text-serif" style="font-size: 2.75rem; font-weight: 700; color: var(--color-text-main); margin-bottom: 8px;">
          Explore by Category
        </h1>
        <p style="font-size: 1rem; color: var(--color-text-secondary);">
          Tailored daily rituals and concentrated treatments for face, body, hair, and daily barrier essentials.
        </p>
      </div>

      <!-- Categories Detailed Grid -->
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px;">
        ${categories.map(cat => {
          const catProducts = products.filter(p => p.category === cat.id);
          return `
            <div class="category-card" style="display: grid; grid-template-columns: 240px 1fr; overflow: hidden; border-radius: var(--radius-xl);" onclick="window.location.hash = '#shop?category=${cat.id}'">
              <div style="height: 100%; min-height: 220px; overflow: hidden; background: var(--color-blush-100);">
                <img src="${cat.image}" alt="${cat.name}" style="width: 100%; height: 100%; object-fit: cover; transition: transform var(--transition-slow);">
              </div>
              <div style="padding: 28px; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                  <span class="badge badge-blush" style="margin-bottom: 8px;">${catProducts.length} Formulations</span>
                  <h2 class="text-serif" style="font-size: 1.75rem; font-weight: 700; margin-bottom: 8px; color: var(--color-text-main);">
                    ${cat.name}
                  </h2>
                  <p style="font-size: 0.875rem; color: var(--color-text-secondary); line-height: 1.6; margin-bottom: 16px;">
                    ${cat.tagline}
                  </p>
                </div>
                <div>
                  <button class="btn btn-secondary btn-sm">
                    Browse ${cat.name} →
                  </button>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Skincare Ritual Quote Banner -->
      <div style="margin-top: 60px; background: linear-gradient(135deg, var(--color-blush-50), var(--color-blush-100)); border-radius: var(--radius-xl); padding: 40px; text-align: center; border: 1px solid var(--color-blush-200);">
        <h3 class="text-serif" style="font-size: 1.75rem; font-style: italic; color: var(--color-blush-800); margin-bottom: 10px;">
          “Skin health is not about perfection, but consistency and gentle nourishment.”
        </h3>
        <p style="font-size: 0.875rem; color: var(--color-text-secondary);">Glowspace Dermatological Philosophy</p>
      </div>
    </div>
  `;
}
