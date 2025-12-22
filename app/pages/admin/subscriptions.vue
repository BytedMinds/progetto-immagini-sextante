<template>
  <div class="subscriptions-page container-padded">
    <header class="page-header mb-8">
      <div>
        <h1 class="text-3xl font-bold mb-2">Subscription Plans</h1>
        <p class="text-muted text-lg">Manage features and pricing tiers.</p>
      </div>
      <button @click="addPlan" class="btn-primary flex items-center gap-2">
         <Plus :size="20" />
         <span>Create Plan</span>
      </button>
    </header>

    <div class="plans-grid">
      <div v-for="plan in plans" :key="plan.id" class="plan-card glass-panel group relative">
        <!-- Top Right Actions -->
        <div class="card-actions-overlay">
            <button @click="editPlan(plan)" class="btn-icon bg-glass" title="Edit Plan">
                <Pencil :size="16" />
            </button>
            <button @click="deletePlan(plan.id)" class="btn-icon btn-delete bg-glass" title="Delete Plan">
                <Trash2 :size="16" />
            </button>
        </div>

        <div class="card-header">
            <div class="title-row">
                <h3 class="plan-title text-gradient-primary">{{ plan.name }}</h3>
                <span class="badge-subtle" v-if="(plan._count?.subscriptions || 0) > 0">
                    {{ plan._count?.subscriptions }} Active
                </span>
            </div>
            <p class="text-sm text-muted">{{ plan.description || 'No description provided.' }}</p>
        </div>
        
        <div class="pricing">
            <span class="currency">€</span>
            <span class="amount">{{ (plan.price / 100).toFixed(2) }}</span>
            <span class="interval">/ {{ plan.interval }}</span>
        </div>

        <div class="features-list">
            <ul class="features-ul">
                <li v-for="feature in (plan.features || [])" :key="feature" class="feature-item">
                    <div class="icon-wrapper">
                         <Check :size="16" class="text-primary" />
                    </div>
                    <span class="feature-text">{{ feature }}</span>
                </li>
                 <li v-if="!plan.features || plan.features.length === 0" class="no-features">
                    No active features listed.
                </li>
            </ul>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="plans.length === 0" class="empty-state glass-panel p-12 text-center rounded-xl border-dashed border-2 border-white/10">
        <Package :size="48" class="mx-auto text-muted mb-4" />
        <h3 class="text-xl font-bold mb-2">No Plans Created</h3>
        <p class="text-muted mb-6">Get started by defining your first subscription tier.</p>
        <button @click="addPlan" class="btn-primary">Create First Plan</button>
    </div>

    <PlanModal v-model="showModal" :plan="editingPlan" @save="handleSave" />
  </div>
</template>

<script setup lang="ts">
import { Plus, Check, Pencil, Trash2, Package } from 'lucide-vue-next'
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
    if (!confirm('Are you sure you want to delete this plan? This action cannot be undone.')) return
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
  padding: 3rem 2rem;
}

.page-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}

.plans-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 2rem;
}

.plan-card {
    padding: 2rem;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    height: 100%;
    transition: all 0.3s ease;
    border: 1px solid rgba(255,255,255,0.05);
    background: linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%);
}

/* Layout & Positioning */
.relative { position: relative; }
.text-gradient-primary {
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.card-actions-overlay {
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: flex;
    gap: 0.5rem;
    /* Always visible */
    opacity: 1; 
}

.card-header {
    margin-bottom: 1.5rem;
    padding-right: 4rem; /* space for actions */
}

.title-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.5rem;
}

.plan-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
}

.pricing {
    margin-bottom: 2rem;
    display: flex;
    align-items: baseline;
    gap: 0.25rem;
}

.currency {
    font-size: 1.5rem;
    color: var(--text-muted);
    line-height: 1;
}

.amount {
    font-size: 3rem;
    font-weight: 700;
    color: white;
    line-height: 1;
}

.interval {
    font-size: 1rem;
    color: var(--text-muted);
    font-weight: 500;
}

.features-list {
    flex-grow: 1;
}

.features-ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.feature-item {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
}

.feature-text {
    font-size: 0.875rem;
    color: #d1d5db; /* gray-300 */
}

.no-features {
    font-size: 0.875rem;
    color: var(--text-muted);
    font-style: italic;
}

/* UI Elements */
.bg-glass {
    background: rgba(0,0,0,0.3);
}

.btn-delete {
    color: #f87171;
}
.btn-delete:hover {
    background: rgba(248, 113, 113, 0.1);
}

.icon-wrapper {
    background: rgba(99, 102, 241, 0.1);
    border-radius: 50%;
    padding: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2px;
    flex-shrink: 0;
}

.text-primary { color: var(--color-primary); }

.badge-subtle {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--text-muted);
    background: rgba(255,255,255,0.05);
    padding: 0.25rem 0.6rem;
    border-radius: 999px;
    white-space: nowrap;
}

.btn-icon {
    width: 2.25rem;
    height: 2.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    color: var(--text-muted);
    transition: all 0.2s;
    cursor: pointer;
}

.btn-icon:hover {
    color: white;
    background: rgba(255,255,255,0.1);
}

.empty-state {
    grid-column: 1 / -1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 300px;
}
</style>
