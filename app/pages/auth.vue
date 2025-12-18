<template>
  <div class="auth-page">
    <div class="auth-card">
      <h2 class="auth-title">{{ isLogin ? 'Welcome Back' : 'Create Account' }}</h2>
      <p class="auth-subtitle">{{ isLogin ? 'Enter your details to access your workspace.' : 'Start your creative journey properly.' }}</p>
      
      <form @submit.prevent="handleSubmit" class="auth-form">
        <div v-if="!isLogin" class="form-group">
          <label>Full Name</label>
          <input v-model="form.fullName" type="text" placeholder="John Doe" required />
        </div>
        
        <div class="form-group">
          <label>Email</label>
          <input v-model="form.email" type="email" placeholder="name@example.com" required />
        </div>
        
        <div class="form-group">
          <label>Password</label>
          <input v-model="form.password" type="password" placeholder="••••••••" required />
        </div>

        <button type="submit" class="btn-primary" :disabled="loading">
          {{ loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up') }}
        </button>
      </form>

      <div class="auth-footer">
        <p>
          {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
          <button @click="toggleMode" class="link-btn">{{ isLogin ? 'Sign Up' : 'Sign In' }}</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const isLogin = ref(true)
const loading = ref(false)
const form = reactive({
  email: '',
  password: '',
  fullName: ''
})

const toggleMode = () => {
  isLogin.value = !isLogin.value
}

const handleSubmit = async () => {
  loading.value = true
  try {
    const endpoint = isLogin.value ? '/api/auth/login' : '/api/auth/register'
    const { data, error } = await useFetch(endpoint, {
      method: 'POST',
      body: form
    })
    
    if (error.value) {
      alert(error.value.statusMessage || 'An error occurred')
    } else {
      // Store token (in real app use a composable or pinia)
      const token = data.value.token
      localStorage.setItem('auth_token', token)
      alert('Success! ' + (isLogin.value ? 'Logged in' : 'Registered'))
      navigateTo('/')
    }
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 64px); 
}

.auth-card {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background: var(--bg-card);
  border-radius: var(--radius-xl);
  border: 1px solid var(--border-subtle);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
}

.auth-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-align: center;
}

.auth-subtitle {
  color: var(--text-muted);
  text-align: center;
  margin-bottom: 2rem;
  font-size: 0.9rem;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: var(--text-dim);
}

.form-group input {
  width: 100%;
  background: var(--bg-input);
  border: 1px solid var(--border-subtle);
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  color: var(--text-main);
  transition: all var(--duration-fast);
}

.form-group input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-primary-glow);
}

.btn-primary {
  width: 100%;
  padding: 0.75rem;
  background: var(--color-primary);
  color: white; /* HSL 250 is usually dark blue/purple, but let's assume valid contrast or update variables */
  /* Actually standard HSL might need white text. */
  border-radius: var(--radius-md);
  font-weight: 600;
  margin-top: 1rem;
  transition: opacity var(--duration-fast);
}

.btn-primary:hover {
  opacity: 0.9;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.auth-footer {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.link-btn {
  color: var(--color-primary);
  font-weight: 500;
  margin-left: 0.25rem;
}

.link-btn:hover {
  text-decoration: underline;
}
</style>
