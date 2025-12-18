<template>
  <div class="settings-page">
    <header class="settings-header">
      <div class="header-content">
        <h1>Settings</h1>
      </div>
    </header>

    <div class="settings-container">
      <div class="settings-section">
        <h2>Profile</h2>
        <div class="form-group">
          <label>Email Address</label>
          <input type="text" value="user@example.com" disabled />
          <p class="help-text">Your email address cannot be changed.</p>
        </div>
      </div>

       <div class="settings-section">
        <h2>Appearance</h2>
        <div class="toggle-row">
           <span>Dark Mode</span>
           <!-- Placeholder toggle -->
           <button class="toggle-btn active"></button>
        </div>
      </div>

       <div class="settings-section danger-zone">
        <h2>Danger Zone</h2>
        <button class="btn-danger">Delete Account</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'app'
})
</script>

<style scoped>
.settings-page {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.settings-header {
  margin-bottom: 3rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.settings-section {
  background: var(--bg-card);
  padding: 2rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-subtle);
  margin-bottom: 2rem;
}

.settings-section h2 {
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
  background: var(--bg-input);
  color: var(--text-main);
}

.help-text {
  font-size: 0.875rem;
  color: var(--text-muted);
  margin-top: 0.5rem;
}

.danger-zone {
  border-color: rgba(239, 68, 68, 0.3);
}

.btn-danger {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-md);
  font-weight: 600;
  transition: all var(--duration-fast);
}

.btn-danger:hover {
  background: #ef4444;
  color: white;
}
</style>
