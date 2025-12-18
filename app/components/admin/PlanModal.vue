<template>
  <Teleport to="body">
    <div v-if="isOpen" class="modal-overlay" @click.self="close">
      <div class="glass-panel modal-content animate-in">
        <h2 class="text-xl font-bold mb-4">{{ isEdit ? 'Edit Plan' : 'Add New Plan' }}</h2>
        
        <form @submit.prevent="handleSubmit" class="modal-form">
          <!-- Name & Price Row -->
          <div class="form-row">
            <div class="form-group">
                <label class="label">Plan Name</label>
                <input v-model="form.name" type="text" class="input-field" placeholder="Pro Plus" required />
            </div>
            <div class="form-group">
                <label class="label">Price (Cents)</label>
                <input v-model="form.price" type="number" class="input-field" placeholder="1999" min="0" required />
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

          <!-- Features -->
          <div class="form-group">
              <label class="label">Features (Comma separated)</label>
              <textarea v-model="featuresInput" class="input-field h-24" placeholder="50 Credits, No Watermark, API Access"></textarea>
          </div>

          <div class="modal-actions">
            <button type="button" class="btn-secondary" @click="close">Cancel</button>
            <button type="submit" class="btn-primary" :disabled="loading">
              {{ loading ? 'Saving...' : 'Save Plan' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
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
const featuresInput = ref('')

const form = reactive({
  name: '',
  price: 0,
  interval: 'month',
  description: ''
})

watch(() => props.plan, (newPlan) => {
  if (newPlan) {
    form.name = newPlan.name || ''
    form.price = newPlan.price || 0
    form.interval = newPlan.interval || 'month'
    form.description = newPlan.description || ''
    featuresInput.value = Array.isArray(newPlan.features) ? newPlan.features.join(', ') : ''
  } else {
    form.name = ''
    form.price = 0
    form.interval = 'month'
    form.description = ''
    featuresInput.value = ''
  }
}, { immediate: true })

const close = () => {
  isOpen.value = false
}

const handleSubmit = async () => {
  loading.value = true
  try {
    const features = featuresInput.value.split(',').map(f => f.trim()).filter(f => f.length > 0)
    await emit('save', { ...form, features, id: props.plan?.id })
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
  padding: 1.5rem;
  border-radius: 0.75rem;
  width: 100%;
  max-width: 32rem; 
  background-color: #1a1a1a;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
  margin-bottom: 0.25rem;
  display: block;
}

.input-field {
  width: 100%;
  padding: 0.75rem;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  color: white;
  transition: border-color 0.2s;
}

.input-field:focus {
  outline: none;
  border-color: var(--color-primary);
}

.h-24 { height: 6rem; }

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.animate-in {
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
</style>
