<template>
  <div class="admin-dashboard container-padded">
    <header class="mb-8">
      <h1 class="text-2xl font-bold mb-2">Admin Dashboard</h1>
      <div class="actions">
        <NuxtLink to="/editor" class="btn-text">Back to Editor</NuxtLink>
      </div>
    </header>

    <div class="stats-grid">
      <div class="stat-card">
        <h3 class="stat-label">Total Users</h3>
        <p class="stat-value">{{ stats?.totalUsers || 0 }}</p>
      </div>
       <div class="stat-card">
        <h3 class="stat-label">Processed Images</h3>
        <p class="stat-value">{{ stats?.totalProcessed || 0 }}</p>
      </div>
       <div class="stat-card">
        <h3 class="stat-label">Revenue (Est.)</h3>
        <p class="stat-value">${{ stats?.totalRevenue?.toFixed(2) || '0.00' }}</p>
      </div>
       <div class="stat-card">
        <h3 class="stat-label">Active Subs</h3>
        <p class="stat-value">{{ stats?.activeSubs || 0 }}</p>
      </div>
    </div>

    <div class="section-users">
      <h2>Recent Users</h2>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.email }}</td>
              <td>
                <span :class="['badge', user.role === 'ADMIN' ? 'badge-primary' : 'badge-secondary']">
                  {{ user.role }}
                </span>
              </td>
              <td>
                <span class="status-indicator" :class="user.Subscription?.[0]?.status || 'inactive'">
                  {{ user.Subscription?.[0]?.status || 'Free' }}
                </span>
              </td>
              <td>{{ new Date(user.createdAt).toLocaleDateString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Fetch stats
const { data: stats } = await useFetch('/api/admin/stats')
const { data: userData } = await useFetch('/api/admin/users')
const users = computed(() => userData.value?.users || [])
// Use mock values for now if totalUsers missing
const totalUsers = computed(() => users.value.length || 0)
const totalSubs = computed(() => users.value.filter((u:any) => u.subscription?.status === 'ACTIVE').length || 0)

definePageMeta({
  layout: 'app',
  middleware: ['auth', 'admin']
})
</script>

<style scoped>
.container-padded {
  padding: 2rem;
}

.admin-dashboard {
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.dashboard-header h1 {
  font-size: 2rem;
  font-weight: 700;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  background: var(--bg-card);
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-subtle);
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-main);
}

.section-users h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.table-container {
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-subtle);
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid var(--border-subtle);
}

th {
  background: rgba(255,255,255,0.02);
  font-weight: 600;
  color: var(--text-muted);
}

tr:last-child td {
  border-bottom: none;
}

.badge {
  padding: 0.25rem 0.625rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.badge-primary {
  background: var(--color-primary);
  color: white;
}

.badge-secondary {
  background: rgba(255,255,255,0.1);
  color: var(--text-muted);
}
</style>
