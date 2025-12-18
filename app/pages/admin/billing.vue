<template>
  <div class="billing-page container-padded">
    <header class="mb-8">
      <h1 class="text-2xl font-bold mb-2">Billing & Invoices</h1>
      <p class="text-muted">Manage platform revenue and billing settings.</p>
    </header>

    <div class="grid-cols-2">
      <div class="glass-panel p-6 rounded-xl">
        <h3 class="font-bold mb-4">Revenue Overview</h3>
        <p class="text-4xl font-bold text-gradient-primary">$12,450.00</p>
        <p class="text-sm text-muted mt-2">+15% from last month</p>
      </div>
      
      <div class="glass-panel p-6 rounded-xl">
        <h3 class="font-bold mb-4">Active Subscriptions</h3>
        <p class="text-4xl font-bold">142</p>
        <p class="text-sm text-muted mt-2">12 new this week</p>
      </div>
    </div>

    <div class="mt-8 glass-panel p-6 rounded-xl">
      <h3 class="font-bold mb-4">Recent Transactions</h3>
      <p class="text-muted text-sm italic">Stripe integration pending...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'app',
  middleware: ['auth', 'admin']
})
</script>

<style scoped>
.container-padded {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
.p-6 { padding: 1.5rem; }
.rounded-xl { border-radius: 0.75rem; }
.mt-8 { margin-top: 2rem; }
</style>
