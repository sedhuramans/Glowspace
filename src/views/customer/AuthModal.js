export function renderCustomerAuthModal(mode = 'login') {
  return `
    <div style="padding: 10px 0;">
      <div style="text-align: center; margin-bottom: 24px;">
        <div class="brand-logo-mark" style="margin: 0 auto 12px; width: 44px; height: 44px; font-size: 1.25rem;">G</div>
        <h2 class="text-serif" style="font-size: 2rem; font-weight: 700; color: var(--color-text-main);">
          ${mode === 'login' ? 'Welcome Back to Glowspace' : 'Create Your Skincare Account'}
        </h2>
        <p style="font-size: 0.875rem; color: var(--color-text-secondary);">
          ${mode === 'login' ? 'Sign in to access your orders, track deliveries, and view wishlist.' : 'Join Glowspace for special member discounts and tailored routine tips.'}
        </p>
      </div>

      ${mode === 'login' ? `
        <!-- Quick Demo One-Click Login -->
        <div style="background: var(--color-blush-50); border: 1px dashed var(--color-blush-300); padding: 12px 16px; border-radius: var(--radius-md); margin-bottom: 20px; text-align: center;">
          <div style="font-size: 0.8125rem; font-weight: 600; color: var(--color-blush-800); margin-bottom: 6px;">💡 College Presentation Quick Login:</div>
          <button type="button" class="btn btn-secondary btn-sm" onclick="window.quickDemoLogin('ananya.sharma@example.com')">
            Login as Demo Customer (Ananya Sharma)
          </button>
        </div>

        <form id="customer-login-form" onsubmit="event.preventDefault(); window.handleCustomerLoginSubmit(event);">
          <div class="form-group">
            <label class="form-label">Email Address</label>
            <input type="email" class="form-input" id="auth-email" placeholder="name@example.com" value="ananya.sharma@example.com" required>
          </div>
          <div class="form-group">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <label class="form-label" style="margin-bottom: 0;">Password</label>
              <a href="javascript:void(0)" style="font-size: 0.75rem; color: var(--color-blush-600);" onclick="alert('Demo password is: password123')">Forgot password?</a>
            </div>
            <input type="password" class="form-input" id="auth-password" placeholder="••••••••" value="password123" required>
          </div>
          
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 20px; font-size: 0.8125rem;">
            <input type="checkbox" id="auth-remember" checked>
            <label for="auth-remember">Remember me on this browser</label>
          </div>

          <button type="submit" class="btn btn-primary btn-lg btn-full" style="margin-bottom: 16px;">
            Sign In
          </button>
        </form>

        <div style="text-align: center; font-size: 0.875rem; color: var(--color-text-secondary);">
          Don't have an account yet? 
          <a href="javascript:void(0)" onclick="window.switchAuthModalMode('register')" style="color: var(--color-blush-700); font-weight: 700;">Create Account</a>
        </div>
      ` : `
        <form id="customer-register-form" onsubmit="event.preventDefault(); window.handleCustomerRegisterSubmit(event);">
          <div class="form-group">
            <label class="form-label">Full Name *</label>
            <input type="text" class="form-input" id="reg-name" placeholder="e.g. Diya Sengupta" required>
          </div>
          <div class="form-group">
            <label class="form-label">Email Address *</label>
            <input type="email" class="form-input" id="reg-email" placeholder="name@example.com" required>
          </div>
          <div class="form-group">
            <label class="form-label">Phone Number</label>
            <input type="tel" class="form-input" id="reg-phone" placeholder="+91 98765 00000">
          </div>
          <div class="form-group">
            <label class="form-label">Create Password *</label>
            <input type="password" class="form-input" id="reg-password" placeholder="Minimum 6 characters" required>
          </div>

          <button type="submit" class="btn btn-primary btn-lg btn-full" style="margin-bottom: 16px;">
            Create My Account
          </button>
        </form>

        <div style="text-align: center; font-size: 0.875rem; color: var(--color-text-secondary);">
          Already have an account? 
          <a href="javascript:void(0)" onclick="window.switchAuthModalMode('login')" style="color: var(--color-blush-700); font-weight: 700;">Sign In</a>
        </div>
      `}
    </div>
  `;
}
