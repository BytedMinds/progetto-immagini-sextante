<template>
  <div class="auth-page">
    <div class="auth-card glass">
      <div class="auth-header">
        <h1 class="text-gradient-primary brand-title">Sextante</h1>
        <p>{{ isLogin ? 'Welcome back' : 'Create your account' }}</p>
      </div>

      <form @submit.prevent="handleSubmit" class="auth-form">
        <div class="form-group">
          <label>Email</label>
          <input 
            type="email" 
            v-model="email" 
            placeholder="name@example.com"
            required 
            class="input-field"
          />
        </div>

        <div class="form-group">
          <label>Password</label>
          <input 
            type="password" 
            v-model="password" 
            placeholder="••••••••"
            required 
            class="input-field"
          />
        </div>

        <button type="submit" class="btn-primary full-width" :disabled="loading">
          {{ loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up') }}
        </button>
      </form>

      <div class="auth-footer">
        <p v-if="isLogin">
          Don't have an account? 
          <a href="#" @click.prevent="isLogin = false">Sign up</a>
        </p>
        <p v-else>
          Already have an account? 
          <a href="#" @click.prevent="isLogin = true">Sign in</a>
        </p>
      </div>
      
      <!-- Developer Quality of Life -->
      <div class="dev-tools mt-8 pt-4 border-t border-white/5" v-if="isLogin">
        <p class="text-xs text-muted mb-2 text-center">Dev Shortcuts</p>
        <div class="flex gap-2 justify-center">
           <button class="btn-xs btn-secondary" @click.prevent="fillCreds('admin@sextante.app', 'password123')">
             Admin
           </button>
           <button class="btn-xs btn-secondary" @click.prevent="fillCreds('user@sextante.app', 'password123')">
             Pro User
           </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Logic remains mostly the same, updated styles
const isLogin = ref(true)
const email = ref('')
const password = ref('')
const loading = ref(false)

const fillCreds = (e: string, p: string) => {
  email.value = e
  password.value = p
}

const handleSubmit = async () => {
  loading.value = true
  try {
    const endpoint = isLogin.value ? '/api/auth/login' : '/api/auth/register'
    const data: any = await $fetch(endpoint, {
      method: 'POST',
      body: { email: email.value, password: password.value },
    })

    if (data && data.token) {
      // @ts-ignore
      const token = useCookie('auth_token')
      token.value = data.token
              // Check both local role and fetch fresh user to be sure
         useAuth().fetchUser().then(() => {
             const user = useAuth().user.value
             if (user?.role === 'ADMIN') {
                 navigateTo('/admin')
             } else {
                 navigateTo('/editor')
             }
         })
    }
  } catch (e: any) {
    console.error(e)
    alert(e.statusMessage || 'An error occurred')
  } finally {
    loading.value = false
  }
}

definePageMeta({
  middleware: ['guest']
})
</script>

<style scoped>
.auth-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh; /* Navbar handles top padding */
}

.auth-card {
  width: 100%;
  max-width: 400px;
  padding: 2.5rem;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-2xl);
}

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
}

.brand-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  letter-spacing: -0.03em;
}

.auth-header p {
  color: var(--text-muted);
  font-size: 0.95rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group label {
  display: block;
  font-size: 0.85rem;
  color: var(--text-dim);
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.input-field {
  width: 100%;
  padding: 0.75rem 1rem;
  background: var(--bg-input);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  color: var(--text-main);
  transition: all var(--duration-fast);
}

.input-field:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
}

.full-width {
  width: 100%;
  margin-top: 1rem;
  padding: 0.875rem;
  font-size: 1rem;
}

.auth-footer {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.auth-footer a {
  color: var(--color-primary);
  font-weight: 500;
}

.auth-footer a:hover {
  text-decoration: underline;
}

.dev-tools {
  text-align: center;
}

.btn-xs {
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  height: auto;
}

.border-t { border-top-width: 1px; }
.border-white\/5 { border-color: rgba(255,255,255,0.05); }
.mt-8 { margin-top: 2rem; }
.pt-4 { padding-top: 1rem; }
.text-xs { font-size: 0.75rem; }
.text-center { text-align: center; }
.flex { display: flex; }
.gap-2 { gap: 0.5rem; }
.justify-center { justify-content: center; }
</style>
