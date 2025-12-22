<template>
  <Teleport to="body">
    <div v-if="isOpen" class="modal-overlay" @click.self="close">
      <div class="glass-panel modal-content animate-in">
        <h2 class="text-xl font-bold mb-6">{{ isEdit ? 'Edit Plan' : 'Add New Plan' }}</h2>
        
        <form @submit.prevent="handleSubmit" class="modal-form">
          <!-- Name & Price Row -->
          <div class="form-row">
            <div class="form-group">
                <label class="label">Plan Name</label>
                <input v-model="form.name" type="text" class="input-field" placeholder="Pro Plus" required />
            </div>
            <div class="form-group">
                <label class="label">Price (€)</label>
                <input v-model="form.price" type="number" step="0.01" class="input-field" placeholder="19.99" min="0" required />
            </div>
          </div>

          <div class="form-group">
             <label class="label">Description</label>
             <input v-model="form.description" type="text" class="input-field" placeholder="Short description..." />
          </div>

          <!-- Interval -->
          <div class="form-group">
             <label class="label">Billing Interval</label>
             <select v-model="form.interval" class="input-field">
                 <option value="month">Monthly</option>
                 <option value="year">Yearly</option>
             </select>
          </div>

          <!-- Dynamic Features List -->
          <div class="form-group">
              <div class="flex justify-between items-center mb-2">
                  <label class="label mb-0">Features</label>
                  <button type="button" class="btn-xs btn-secondary" @click="addFeature">
                      + Add Feature
                  </button>
              </div>
              
              <div class="features-list space-y-2 max-h-48 overflow-y-auto pr-1 customer-scrollbar">
                  <div v-for="(feat, index) in form.features" :key="index" class="feature-row">
                      <input 
                        v-model="form.features[index]" 
                        type="text" 
                        class="input-field feature-input" 
                        placeholder="e.g. 50 Credits/Mo"
                        required
                      />
                      <button type="button" class="btn-icon-sm text-red-400 hover:bg-red-400/10 flex-shrink-0" @click="removeFeature(index)" title="Remove Feature">
                          <Trash2 :size="16" />
                      </button>
                  </div>
                  <div v-if="form.features.length === 0" class="text-xs text-muted italic text-center py-2">
                      No features added yet.
                  </div>
              </div>
          </div>

          <div class="modal-actions mt-6">
            <button type="button" class="btn-secondary" @click="close">Cancel</button>
            <button type="submit" class="btn-primary px-6" :disabled="loading">
              {{ loading ? 'Saving...' : 'Save Plan' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { Trash2 } from 'lucide-vue-next'

const props = defineProps<{
  modelValue: boolean
  plan?: any
}>()

const emit = defineEmits(['update:modelValue', 'save'])

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const isEdit = computed(() => !!props.plan)
const loading = ref(false)

const form = reactive({
  name: '',
  price: 0,
  interval: 'month',
  description: '',
  features: [] as string[]
})

const resetForm = () => {
    form.name = ''
    form.price = 0
    form.interval = 'month'
    form.description = ''
    form.features = [''] // Start with one empty slot
}

watch(() => props.plan, (newPlan) => {
  if (newPlan) {
    form.name = newPlan.name || ''
    // Convert cents to euro for display
    form.price = (newPlan.price || 0) / 100
    form.interval = newPlan.interval || 'month'
    form.description = newPlan.description || ''
    // Ensure deep copy of array
    form.features = Array.isArray(newPlan.features) ? [...newPlan.features] : []
  } else {
    resetForm()
  }
}, { immediate: true })

const addFeature = () => {
    form.features.push('')
}

const removeFeature = (index: number) => {
    form.features.splice(index, 1)
}

const close = () => {
  isOpen.value = false
}

const handleSubmit = async () => {
  loading.value = true
  try {
    // Filter out empty strings
    const cleanFeatures = form.features.map(f => f.trim()).filter(f => f.length > 0)
    // Convert back to cents for storage
    const priceInCents = Math.round(form.price * 100)
    
    await emit('save', { ...form, price: priceInCents, features: cleanFeatures, id: props.plan?.id })
    close()
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.modal-content {
  padding: 2rem;
  border-radius: 1rem;
  width: 100%;
  max-width: 32rem; 
  background-color: #1a1a1a;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255,255,255,0.1);
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.label {
  font-size: 0.75rem;
  color: var(--text-muted);
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  display: block;
}

.input-field {
  width: 100%;
  padding: 0.75rem 1rem;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  color: white;
  transition: all 0.2s;
}

.input-field:focus {
  outline: none;
  border-color: var(--color-primary);
  background: rgba(0, 0, 0, 0.5);
}

.btn-xs {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    height: auto;
}

.btn-icon-sm {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    border-radius: 0.375rem;
    transition: background 0.2s;
}
.btn-icon-sm:hover {
    background: rgba(255, 255, 255, 0.1);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.space-y-2 > * + * {
    margin-top: 0.5rem;
}

.mb-0 { margin-bottom: 0; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-6 { margin-bottom: 1.5rem; }

/* Custom Scrollbar */
.customer-scrollbar::-webkit-scrollbar {
    width: 6px;
}
.customer-scrollbar::-webkit-scrollbar-track {
    background: rgba(255,255,255,0.02);
}
.customer-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.1);
    border-radius: 3px;
}

.feature-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
}

.feature-input {
    flex: 1;
    min-width: 0; /* Prevent flex item from overflowing */
}

.flex-shrink-0 {
    flex-shrink: 0;
}

.animate-in {
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
</style>
