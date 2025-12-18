<template>
  <Teleport to="body">
    <div v-if="isOpen" class="modal-overlay" @click.self="close">
      <div class="glass-panel modal-content animate-in">
        <h2 class="text-xl font-bold mb-4">{{ isEdit ? 'Edit User' : 'Add New User' }}</h2>
        
        <form @submit.prevent="handleSubmit" class="modal-form">
          <!-- Full Name -->
          <div class="form-group">
            <label class="label">Full Name</label>
            <input v-model="form.fullName" type="text" class="input-field" placeholder="John Doe" required />
          </div>

          <!-- Email -->
          <div class="form-group">
            <label class="label">Email</label>
            <input v-model="form.email" type="email" class="input-field" placeholder="john@example.com" required />
          </div>

          <!-- Password (New Only) -->
          <div v-if="!isEdit" class="form-group">
            <label class="label">Password</label>
            <input v-model="form.password" type="password" class="input-field" placeholder="••••••••" required />
          </div>

          <!-- Role & Credits Row -->
          <div class="form-row">
            <div class="form-group">
              <label class="label">Role</label>
              <select v-model="form.role" class="input-field">
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
            <div class="form-group">
              <label class="label">Credits</label>
              <input v-model="form.credits" type="number" class="input-field" min="0" />
            </div>
          </div>

          <div class="modal-actions">
            <button type="button" class="btn-secondary" @click="close">Cancel</button>
            <button type="submit" class="btn-primary" :disabled="loading">
              {{ loading ? 'Saving...' : 'Save User' }}
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
  user?: any
}>()

const emit = defineEmits(['update:modelValue', 'save'])

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const isEdit = computed(() => !!props.user)
const loading = ref(false)

const form = reactive({
  fullName: '',
  email: '',
  password: '',
  role: 'USER',
  credits: 10
})

watch(() => props.user, (newUser) => {
  if (newUser) {
    form.fullName = newUser.fullName || ''
    form.email = newUser.email || ''
    form.role = newUser.role || 'USER'
    form.credits = newUser.credits || 0
    form.password = ''
  } else {
    form.fullName = ''
    form.email = ''
    form.role = 'USER'
    form.credits = 10
    form.password = ''
  }
}, { immediate: true })

const close = () => {
  isOpen.value = false
}

const handleSubmit = async () => {
  loading.value = true
  try {
    await emit('save', { ...form, id: props.user?.id })
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
  max-width: 28rem; /* max-w-md */
  background-color: #1a1a1a; /* fallback if glass fails */
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
