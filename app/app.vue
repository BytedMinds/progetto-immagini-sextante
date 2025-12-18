<template>
  <div class="app-container">
    <header class="app-header">
      <div class="container">
        <h1 class="logo text-gradient">Sextante</h1>
      </div>
    </header>
    <main class="container">
      <NuxtPage />
    </main>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  height: 64px;
  border-bottom: 1px solid var(--border-subtle);
  display: flex;
  align-items: center;
  backdrop-filter: blur(12px);
  background: rgba(10, 10, 12, 0.8);
  position: sticky;
  top: 0;
  z-index: 50;
}

.logo {
  font-weight: 700;
  font-size: 1.5rem;
  letter-spacing: -0.02em;
}
</style>
