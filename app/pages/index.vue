<template>
  <div class="landing-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container flex-center flex-column text-center">
        <div class="badge-pill mb-6">
          <span class="badge-dot"></span>
          <span>v1.0 Now Available</span>
        </div>
        
        <h1 class="hero-title">
          Master your photos with <br/>
          <span class="text-gradient-primary">AI-Powered Precision</span>
        </h1>
        
        <p class="hero-subtitle">
          Enhance, upscale, and transform your images in seconds. 
          Professional grade tools, strictly locally processed privacy.
        </p>

        <div class="hero-cta">
          <NuxtLink to="/auth" class="btn-primary btn-lg">Start Editing Free</NuxtLink>
          <button class="btn-secondary btn-lg">View Demo</button>
        </div>

        <!-- Hero Image / Visual -->
        <div class="hero-visual glass">
          <div class="visual-content">
            <img src="https://placehold.co/1200x800/18181b/6366f1?text=Sextante+Interface+Preview" alt="Interface Preview" />
            <div class="visual-glow"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Grid -->
    <section class="features" id="features">
      <div class="container">
        <div class="section-header text-center">
          <h2 class="section-title">Everything you need</h2>
          <p class="section-desc">Powerful tools wrapped in a beautiful interface.</p>
        </div>

        <div class="features-grid">
          <div class="feature-card glass">
            <div class="feature-icon"><Wand2 :size="40" color="var(--color-primary)" /></div>
            <h3>AI Enhance</h3>
            <p>Automatically correct color, exposure, and lighting in one click.</p>
          </div>
          <div class="feature-card glass">
             <div class="feature-icon"><ScanSearch :size="40" color="var(--color-primary)" /></div>
            <h3>Super Upscale</h3>
            <p>Increase resolution by 4x without losing quality.</p>
          </div>
          <div class="feature-card glass">
             <div class="feature-icon"><Eraser :size="40" color="var(--color-primary)" /></div>
            <h3>Smart Remove</h3>
            <p>Remove backgrounds and unwanted objects instantly.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Wand2, ScanSearch, Eraser } from 'lucide-vue-next'
</script>

<style scoped>
.hero {
  padding: 8rem 0 4rem;
  position: relative;
  overflow: hidden;
}

.flex-column {
  flex-direction: column;
}

.badge-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.85rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-full);
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: var(--space-6);
}

.badge-dot {
  width: 6px;
  height: 6px;
  background: var(--color-success);
  border-radius: 50%;
  box-shadow: 0 0 8px var(--color-success);
}

.hero-title {
  font-size: 4rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  margin-bottom: var(--space-6);
  line-height: 1.1;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--text-muted);
  max-width: 640px;
  margin-bottom: var(--space-8);
  line-height: 1.6;
}

.hero-cta {
  display: flex;
  gap: var(--space-4);
  margin-bottom: var(--space-12);
}

.btn-lg {
  padding: 1rem 2rem;
  font-size: 1.05rem;
}

.hero-visual {
  width: 100%;
  max-width: 1000px;
  border-radius: var(--radius-xl);
  padding: var(--space-2);
  position: relative;
  overflow: hidden;
  margin-top: var(--space-8);
  box-shadow: var(--shadow-2xl);
}

.visual-content img {
  width: 100%;
  height: auto;
  border-radius: var(--radius-lg);
  display: block;
}

.visual-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  height: 60%;
  background: var(--color-primary);
  filter: blur(120px);
  opacity: 0.2;
  pointer-events: none;
}

.features {
  padding: 8rem 0;
}

.section-title {
  font-size: 2.5rem;
  margin-bottom: var(--space-4);
}

.section-desc {
  font-size: 1.125rem;
  color: var(--text-muted);
  margin-bottom: var(--space-12);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-6);
}

.feature-card {
  padding: var(--space-8);
  border-radius: var(--radius-lg);
  transition: transform var(--duration-normal);
}

.feature-card:hover {
  transform: translateY(-4px);
  border-color: var(--border-hover);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: var(--space-4);
}

.feature-card h3 {
  font-size: 1.25rem;
  margin-bottom: var(--space-2);
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
}
</style>
