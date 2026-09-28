export function renderAboutView() {
  return `
    <div class="container" style="padding: 40px 20px 80px;">
      <!-- Hero Header -->
      <div style="text-align: center; max-width: 720px; margin: 0 auto 50px;">
        <span class="section-subtitle">Our Clean Philosophy</span>
        <h1 class="text-serif" style="font-size: 3rem; font-weight: 700; color: var(--color-text-main); margin-bottom: 16px;">
          The Glowspace Story
        </h1>
        <p style="font-size: 1.125rem; color: var(--color-text-secondary); line-height: 1.7;">
          We believe effective skincare should be transparent, gentle on the dermal barrier, and deeply grounding. No 12-step confusions—just pure science and botanical balance.
        </p>
      </div>

      <!-- Story Section with Image -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 50px; align-items: center; margin-bottom: 70px;">
        <div style="border-radius: var(--radius-xl); overflow: hidden; box-shadow: var(--shadow-md);">
          <img src="https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1000&auto=format&fit=crop" alt="Botanical laboratory formulation" style="width: 100%; height: 440px; object-fit: cover;">
        </div>
        <div>
          <span class="badge badge-blush" style="margin-bottom: 12px;">Founded with Purpose</span>
          <h2 class="text-serif" style="font-size: 2.2rem; margin-bottom: 16px;">Formulated for Real Skin, Not Trends</h2>
          <p style="font-size: 0.9375rem; color: var(--color-text-secondary); line-height: 1.7; margin-bottom: 16px;">
            Glowspace was created to counter excessive exfoliating trends and harsh fragrance-laden formulations that deplete the skin’s natural lipid barrier.
          </p>
          <p style="font-size: 0.9375rem; color: var(--color-text-secondary); line-height: 1.7; margin-bottom: 24px;">
            Every single serum, cleanser, and sunscreen is crafted with physiological pH levels, pure bio-compatible ceramides, and multi-molecular hydration actives that deliver visible results without sensitization.
          </p>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div style="background: var(--color-surface-soft); padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--color-border-subtle);">
              <div style="font-size: 1.5rem; font-weight: 800; color: var(--color-blush-700); margin-bottom: 4px;">100%</div>
              <div style="font-size: 0.8125rem; color: var(--color-text-secondary);">Cruelty-Free & Dermatologically Tested</div>
            </div>
            <div style="background: var(--color-surface-soft); padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--color-border-subtle);">
              <div style="font-size: 1.5rem; font-weight: 800; color: var(--color-blush-700); margin-bottom: 4px;">0%</div>
              <div style="font-size: 0.8125rem; color: var(--color-text-secondary);">Sulfates, Parabens or Harsh Alcohols</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Core Pillars -->
      <div style="background: var(--color-surface); border-radius: var(--radius-xl); border: 1px solid var(--color-border-subtle); padding: 50px 40px; margin-bottom: 60px;">
        <div class="section-header" style="margin-bottom: 40px;">
          <span class="section-subtitle">Our Standards</span>
          <h2 class="section-title">The Glowspace Pillars</h2>
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px;">
          <div>
            <div style="font-size: 2rem; margin-bottom: 12px;">🌿</div>
            <h3 class="text-serif" style="font-size: 1.35rem; font-weight: 700; margin-bottom: 8px;">Bio-Compatible Actives</h3>
            <p style="font-size: 0.875rem; color: var(--color-text-secondary); line-height: 1.6;">
              We pair gold-standard active ingredients (Hyaluronic Acid, Vitamin C, Niacinamide, Peptides) with soothing adaptogens.
            </p>
          </div>
          <div>
            <div style="font-size: 2rem; margin-bottom: 12px;">♻️</div>
            <h3 class="text-serif" style="font-size: 1.35rem; font-weight: 700; margin-bottom: 8px;">Sustainable Packaging</h3>
            <p style="font-size: 0.875rem; color: var(--color-text-secondary); line-height: 1.6;">
              Recyclable glass bottles, post-consumer resin pumps, and biodegradable soy-ink outer boxes.
            </p>
          </div>
          <div>
            <div style="font-size: 2rem; margin-bottom: 12px;">🔬</div>
            <h3 class="text-serif" style="font-size: 1.35rem; font-weight: 700; margin-bottom: 8px;">Clinical Transparency</h3>
            <p style="font-size: 0.875rem; color: var(--color-text-secondary); line-height: 1.6;">
              Complete disclosure of active percentages and ingredient provenance on every packaging bottle.
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
}
