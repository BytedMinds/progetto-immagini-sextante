<template>
  <div class="admin-page container-padded">
    <header class="mb-8 flex-between">
      <div>
        <h1 class="text-2xl font-bold mb-2">User Management</h1>
        <p class="text-muted">View and manage all registered users.</p>
      </div>
      <button class="btn-primary" @click="addUser">Add User</button>
    </header>

    <div class="users-table-wrapper glass-panel rounded-xl overflow-hidden">
      <!-- ... (Table remains the same) ... -->
      <table class="w-full text-left">
        <thead class="bg-white/5 border-b border-white/5">
          <tr>
            <th class="p-4 font-medium text-muted text-sm">User</th>
            <th class="p-4 font-medium text-muted text-sm">Role</th>
            <th class="p-4 font-medium text-muted text-sm">Status</th>
            <th class="p-4 font-medium text-muted text-sm">Joined</th>
            <th class="p-4 font-medium text-muted text-sm">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-white/5">
          <tr v-for="user in users" :key="user.id" class="hover:bg-white/5 transition-colors">
            <td class="p-4">
              <div>
                <div class="font-medium">{{ user.fullName || 'No Name' }}</div>
                <div class="text-xs text-muted">{{ user.email }}</div>
              </div>
            </td>
            <td class="p-4">
              <span class="badge" :class="user.role === 'ADMIN' ? 'badge-primary' : 'badge-secondary'">
                {{ user.role }}
              </span>
            </td>
            <td class="p-4">
              <span class="badge badge-success" v-if="user.subscription?.status === 'ACTIVE'">Active</span>
              <span class="badge badge-warning" v-else>Free</span>
            </td>
            <td class="p-4 text-sm text-muted">
              {{ new Date(user.createdAt).toLocaleDateString() }}
            </td>
            <td class="p-4">
              <button class="text-muted hover:text-white transition-colors" @click="editUser(user)">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <UserModal v-model="showModal" :user="editingUser" @save="handleSave" />
  </div>
</template>

<script setup lang="ts">
import UserModal from '~/components/admin/UserModal.vue'

definePageMeta({
  layout: 'app',
  middleware: ['auth', 'admin']
})

const { data, refresh } = await useFetch('/api/admin/users')
// @ts-ignore
const users = computed(() => data.value?.users || [])

const showModal = ref(false)
const editingUser = ref(null)

const addUser = () => {
    editingUser.value = null
    showModal.value = true
}

const editUser = (user: any) => {
    editingUser.value = user
    showModal.value = true
}

const handleSave = async (formData: any) => {
    try {
        if (formData.id) {
            // Edit
            await $fetch(`/api/admin/users/${formData.id}`, {
                method: 'PUT',
                body: formData
            })
        } else {
            // Create
            await $fetch('/api/admin/users', {
                method: 'POST',
                body: formData
            })
        }
        // Refresh list
        await refresh()
    } catch (e: any) {
        alert(e.statusMessage || 'Error saving user')
        throw e // Re-throw to keep modal open if needed, but handled inside validation usually.
                // For now, simple alert.
    }
}
</script>

<style scoped>
/* Scoped styles removed in favor of global utilities in main.css */
.badge {
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  display: inline-block;
}

.badge-primary { background: rgba(99, 102, 241, 0.2); color: #818cf8; }
.badge-secondary { background: rgba(255, 255, 255, 0.1); color: #a1a1aa; }
.badge-success { background: rgba(16, 185, 129, 0.2); color: #34d399; }
.badge-warning { background: rgba(245, 158, 11, 0.2); color: #fbbf24; }

.bg-primary\/20 { background-color: rgba(99, 102, 241, 0.2); }
.text-primary { color: var(--color-primary); }
</style>
