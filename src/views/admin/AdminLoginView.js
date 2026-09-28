export function renderAdminLoginView() {
  return `
    <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, var(--color-blush-50) 0%, var(--color-blush-100) 100%); padding: 20px;">
      <div style="background: var(--color-surface); border-radius: var(--radius-xl); box-shadow: var(--shadow-xl); border: 1px solid var(--color-border); max-width: 440px; width: 100%; padding: 40px 36px;">
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 28px;">
          <div class="brand-logo-mark" style="margin: 0 auto 12px; width: 48px; height: 48px; font-size: 1.4rem;">G</div>
          <h1 class="text-serif" style="font-size: 2.2rem; font-weight: 700; color: var(--color-text-main); margin-bottom: 6px;">
            Glowspace Owner Portal
          </h1>
          <p style="font-size: 0.875rem; color: var(--color-text-secondary);">
            Sign in with your store administrator credentials to view retail sales analytics, profit metrics, and inventory.
          </p>
        </div>

        <!-- Quick 1-Click College Demo Fill -->
        <div style="background: var(--color-blush-50); border: 1px dashed var(--color-blush-300); padding: 12px; border-radius: var(--radius-md); margin-bottom: 24px; text-align: center;">
          <div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--color-blush-800); margin-bottom: 6px;">🎓 College Presentation Quick Login</div>
          <button type="button" class="btn btn-secondary btn-sm" onclick="window.quickFillAdminCredentials()">
            1-Click Demo Login as Owner
          </button>
        </div>

        <!-- Login Form -->
        <form id="admin-login-form" onsubmit="event.preventDefault(); window.handleAdminLoginSubmit(event);">
          <div class="form-group">
            <label class="form-label">Admin Email</label>
            <input type="email" class="form-input" id="admin-login-email" placeholder="admin@glowspace.in" value="admin@glowspace.in" required>
          </div>

          <div class="form-group">
            <label class="form-label">Password</label>
            <input type="password" class="form-input" id="admin-login-password" placeholder="••••••••" value="admin123" required>
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; font-size: 0.8125rem;">
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
              <input type="checkbox" id="admin-remember" checked>
              <span>Remember me</span>
            </label>
            <span class="badge badge-success">Encrypted SSL</span>
          </div>

          <button type="submit" class="btn btn-primary btn-lg btn-full" style="margin-bottom: 16px;">
            Enter Owner Dashboard →
          </button>

          <div style="text-align: center;">
            <a href="#home" style="font-size: 0.8125rem; color: var(--color-text-secondary); text-decoration: underline;">
              ← Back to Customer Website
            </a>
          </div>
        </form>
      </div>
    </div>
  `;
}
