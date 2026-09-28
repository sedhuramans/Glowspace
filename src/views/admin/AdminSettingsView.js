import { store } from '../../services/storeService.js';
import { formatINR } from '../../utils/formatters.js';

export function renderAdminSettingsView() {
  const settings = store.getSettings();

  return `
    <div class="admin-page-header">
      <div class="admin-page-title-group">
        <h1>Retail Store Settings & Controls</h1>
        <p>Manage tax rates, delivery fees, low-stock threshold triggers, promo coupons, and database state.</p>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 32px; align-items: flex-start;">
      <!-- Store Configuration Form -->
      <div class="admin-card">
        <h2 class="admin-card-title" style="margin-bottom: 20px;">General Retail Configuration</h2>
        
        <form id="store-settings-form" onsubmit="event.preventDefault(); window.handleSaveSettings(event);">
          <div class="form-group">
            <label class="form-label">Brand Store Name</label>
            <input type="text" class="form-input" id="setting-storeName" value="${settings.storeName}" required>
          </div>

          <div class="form-group">
            <label class="form-label">Store Tagline</label>
            <input type="text" class="form-input" id="setting-tagline" value="${settings.tagline}">
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div class="form-group">
              <label class="form-label">GST Tax Rate (%)</label>
              <input type="number" class="form-input" id="setting-taxRate" value="${settings.taxRate}" required>
            </div>

            <div class="form-group">
              <label class="form-label">Standard Shipping Fee (₹)</label>
              <input type="number" class="form-input" id="setting-shippingFee" value="${settings.shippingFee}" required>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div class="form-group">
              <label class="form-label">Free Shipping Threshold (₹)</label>
              <input type="number" class="form-input" id="setting-freeShippingThreshold" value="${settings.freeShippingThreshold}" required>
            </div>

            <div class="form-group">
              <label class="form-label">Low Stock Alert Threshold (Units)</label>
              <input type="number" class="form-input" id="setting-lowStockThreshold" value="${settings.lowStockThreshold}" required>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Support Email Address</label>
            <input type="email" class="form-input" id="setting-contactEmail" value="${settings.contactEmail}" required>
          </div>

          <div class="form-group">
            <label class="form-label">Support Helpline</label>
            <input type="text" class="form-input" id="setting-contactPhone" value="${settings.contactPhone}" required>
          </div>

          <div style="margin-top: 24px;">
            <button type="submit" class="btn btn-primary">
              💾 Save Store Configuration
            </button>
          </div>
        </form>
      </div>

      <!-- Right Column: Active Discount Coupons & Reset Database -->
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <!-- Coupons Card -->
        <div class="admin-card">
          <h2 class="admin-card-title" style="margin-bottom: 16px;">Active Promotional Coupons</h2>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${(settings.coupons || []).map(c => `
              <div style="background: var(--color-surface-soft); border: 1px solid var(--color-border-subtle); padding: 14px; border-radius: var(--radius-md); display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <div style="font-weight: 700; color: var(--color-blush-800);">${c.code}</div>
                  <div style="font-size: 0.75rem; color: var(--color-text-secondary);">${c.description}</div>
                </div>
                <span class="badge badge-success">${c.discountPercent ? `${c.discountPercent}% OFF` : 'Free Shipping'}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Academic Presentation Helper & Reset -->
        <div class="admin-card" style="border-left: 4px solid var(--color-warning);">
          <h2 class="admin-card-title" style="margin-bottom: 8px;">Demo Data Management</h2>
          <p style="font-size: 0.8125rem; color: var(--color-text-secondary); margin-bottom: 16px; line-height: 1.5;">
            Need to reset your college demo presentations? Restore the original curated skincare product dataset, orders, and customer analytics.
          </p>
          <button class="btn btn-secondary" onclick="window.handleResetDemoDatabase()">
            🔄 Reset Seed Demo Database
          </button>
        </div>
      </div>
    </div>
  `;
}
