<template>
  <div class="app-layout">
    <aside class="sidebar glass-panel">
      <div class="sidebar-header">
        <NuxtLink to="/editor" class="brand-logo text-gradient-primary">Sextante</NuxtLink>
      </div>
      
      <div class="sidebar-nav">
        <NuxtLink to="/editor" class="nav-item" active-class="active">
          <Wand2 :size="20" /> Editor
        </NuxtLink>
        <NuxtLink to="/admin" class="nav-item" active-class="active">
          <BarChart3 :size="20" /> Dashboard
        </NuxtLink>
        <NuxtLink to="/settings" class="nav-item" active-class="active">
          <Settings :size="20" /> Settings
        </NuxtLink>
      </div>

      <div class="sidebar-footer">
        <button class="nav-item logout-btn" @click="handleLogout">
          <LogOut :size="20" /> Sign Out
        </button>
      </div>
    </aside>

    <main class="app-content">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { Wand2, BarChart3, Settings, LogOut } from 'lucide-vue-next'

const handleLogout = () => {
  localStorage.removeItem('auth_token')
  navigateTo('/auth')
}
</script>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
  background-color: var(--bg-main);
}

.sidebar {
  width: 260px;
  height: 100vh;
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  padding: var(--space-6);
}

.sidebar-header {
  margin-bottom: var(--space-8);
}

.brand-logo {
  font-weight: 700;
  font-size: 1.25rem;
  letter-spacing: -0.05em;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  flex: 1;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  color: var(--text-muted);
  font-weight: 500;
  font-size: 0.95rem;
  transition: all var(--duration-fast);
}

.nav-item:hover, .nav-item.active {
  background: var(--bg-hover);
  color: var(--text-main);
}

.nav-item.active {
  background: rgba(99, 102, 241, 0.1);
  color: var(--color-primary);
}

.icon {
  font-size: 1.2rem;
  line-height: 1;
}

.sidebar-footer {
  margin-top: auto;
  border-top: 1px solid var(--border-subtle);
  padding-top: var(--space-4);
}

.logout-btn {
  width: 100%;
  justify-content: flex-start;
  color: var(--text-dim);
}

.logout-btn:hover {
  color: var(--color-error);
  background: rgba(239, 68, 68, 0.1);
}

.app-content {
  flex: 1;
  overflow-x: hidden;
  /* padding removed for full-width editor */
}
</style>
