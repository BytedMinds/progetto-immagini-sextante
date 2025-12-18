<template>
  <div class="subscriptions-page container-padded">
    <header class="mb-8 flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold mb-2">Subscription Plans</h1>
        <p class="text-muted">Manage available pricing tiers.</p>
      </div>
      <button @click="addPlan" class="btn-primary">
         Add New Plan
      </button>
    </header>

    <div class="plans-grid">
      <div v-for="plan in plans" :key="plan.id" class="glass-panel p-6 rounded-xl flex flex-col h-full">
        <div class="mb-4">
            <h3 class="text-xl font-bold mb-1">{{ plan.name }}</h3>
            <p class="text-sm text-muted">{{ plan.description || 'No description' }}</p>
        </div>
        
        <div class="mb-6">
            <span class="text-2xl font-bold">${{ (plan.price / 100).toFixed(2) }}</span>
            <span class="text-muted text-sm">/ {{ plan.interval }}</span>
        </div>

        <ul class="mb-6 flex-grow space-y-2 text-sm text-muted">
            <li v-for="feature in (plan.features || [])" :key="feature" class="flex items-center gap-2">
                <span class="text-green-400">✓</span> {{ feature }}
            </li>
        </ul>

        <div class="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
            <span class="text-xs text-muted">{{ plan._count?.subscriptions || 0 }} Active Subs</span>
            <div class="flex gap-2">
                <button @click="editPlan(plan)" class="btn-text hover:text-white">Edit</button>
                <button @click="deletePlan(plan.id)" class="btn-text text-red-400 hover:text-red-300">Delete</button>
            </div>
        </div>
      </div>
    </div>

    <PlanModal v-model="showModal" :plan="editingPlan" @save="handleSave" />
  </div>
</template>

<script setup lang="ts">
import PlanModal from '~/components/admin/PlanModal.vue'

definePageMeta({
  layout: 'app',
  middleware: ['auth', 'admin']
})

const { data, refresh } = await useFetch('/api/admin/plans')
// @ts-ignore
const plans = computed(() => data.value?.plans || [])

const showModal = ref(false)
const editingPlan = ref(null)

const addPlan = () => {
    editingPlan.value = null
    showModal.value = true
}

const editPlan = (plan: any) => {
    editingPlan.value = plan
    showModal.value = true
}

const deletePlan = async (id: string) => {
    if (!confirm('Are you sure you want to delete this plan?')) return
    try {
        await $fetch(`/api/admin/plans/${id}`, { method: 'DELETE' })
        await refresh()
    } catch (e: any) {
        alert(e.statusMessage || 'Failed to delete plan')
    }
}

const handleSave = async (formData: any) => {
    try {
        if (formData.id) {
            await $fetch(`/api/admin/plans/${formData.id}`, {
                method: 'PUT',
                body: formData
            })
        } else {
            await $fetch('/api/admin/plans', {
                method: 'POST',
                body: formData
            })
        }
        await refresh()
    } catch (e: any) {
        alert(e.statusMessage || 'Error saving plan')
    }
}
</script>

<style scoped>
.container-padded {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}
.plans-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
}
.space-y-2 > * + * {
    margin-top: 0.5rem;
}
</style>
