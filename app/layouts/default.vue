<template>
  <div class="marketing-layout">
    <nav class="navbar glass">
      <div class="container flex-between">
        <NuxtLink to="/" class="brand-logo text-gradient-primary">
          Sextante
        </NuxtLink>
        <div class="nav-links">
          <NuxtLink to="/#features">Features</NuxtLink>
          <NuxtLink to="/#pricing">Pricing</NuxtLink>
          <NuxtLink to="/auth" class="btn-primary btn-sm">Sign In</NuxtLink>
        </div>
      </div>
    </nav>

    <main class="page-content">
      <slot />
    </main>

    <footer class="footer">
      <div class="container">
        <p class="text-sm text-muted">&copy; {{ new Date().getFullYear() }} Sextante AI. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.marketing-layout {
  min-height: 100vh;
  background-color: var(--bg-main);
  background-image: radial-gradient(circle at 50% 0%, rgba(99,102,241,0.08) 0%, transparent 50%);
}

.navbar {
  position: fixed;
  top: var(--space-4);
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 1000px;
  border-radius: var(--radius-full);
  padding: 0.75rem var(--space-6);
  z-index: 100;
  transition: all var(--duration-normal);
}

.brand-logo {
  font-weight: 700;
  font-size: 1.25rem;
  letter-spacing: -0.05em;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: var(--space-6);
}

.nav-links a:not(.btn-primary) {
  font-size: 0.9rem;
  color: var(--text-muted);
  font-weight: 500;
}

.nav-links a:not(.btn-primary):hover {
  color: var(--text-main);
}

.page-content {
  padding-top: 100px; /* Space for fixed navbar */
  min-height: 80vh;
}

.footer {
  border-top: 1px solid var(--border-subtle);
  padding: var(--space-8) 0;
  text-align: center;
  margin-top: var(--space-12);
}

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
}
</style>
