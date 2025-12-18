<template>
  <div class="landing-page">
    <div class="hero-section">
      <h1 class="hero-title">
        The Ultimate <span class="text-gradient">AI Photo Editor</span>
      </h1>
      <p class="hero-subtitle">
        Enhance, upscale, and transform your images with professional-grade AI tools. No installation required.
      </p>
      
      <div class="cta-group">
        <NuxtLink to="/auth" class="btn-primary cta-btn">Get Started</NuxtLink>
        <button class="btn-secondary cta-btn">Explore Features</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.landing-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 64px);
  text-align: center;
  padding: 2rem;
}

.hero-title {
  font-size: 3.5rem;
  line-height: 1.1;
  font-weight: 800;
  margin-bottom: 1.5rem;
  letter-spacing: -0.03em;
}

.hero-subtitle {
  font-size: 1.125rem;
  color: var(--text-muted);
  max-width: 600px;
  margin-bottom: 2.5rem;
  line-height: 1.6;
}

.cta-group {
  display: flex;
  gap: 1rem;
}

.cta-btn {
  padding: 0.875rem 2rem;
  font-size: 1rem;
  border-radius: var(--radius-full);
  font-weight: 600;
  transition: all var(--duration-fast);
}

.btn-primary {
  background: var(--color-primary);
  color: white;
  box-shadow: 0 4px 12px var(--color-primary-glow);
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px var(--color-primary-glow);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-subtle);
  color: var(--text-main);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--text-muted);
}
</style>
