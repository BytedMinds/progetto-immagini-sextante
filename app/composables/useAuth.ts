export const useAuth = () => {
    const user = useState<any | null>('auth_user', () => null)
    const loading = useState('auth_loading', () => true)

    const token = useCookie('auth_token', {
        maxAge: 60 * 60 * 24 * 7, // 1 week
        sameSite: 'lax'
    })

    // Computed helper for Admin check
    const isAdmin = computed(() => user.value?.role === 'ADMIN')

    // Fetch current user logic
    const fetchUser = async () => {
        if (!token.value) {
            user.value = null
            loading.value = false
            return
        }

        try {
            const data: any = await $fetch('/api/auth/me', {
                headers: { Authorization: `Bearer ${token.value}` }
            })
            if (data && data.user) {
                user.value = data.user
            } else {
                token.value = null // Invalid token
                user.value = null
            }
        } catch (e) {
            token.value = null
            user.value = null
        } finally {
            loading.value = false
        }
    }

    // Login Function
    const login = async (email: string, pass: string) => {
        try {
            const data: any = await $fetch('/api/auth/login', {
                method: 'POST',
                body: { email, password: pass }
            })

            if (data && data.token) {
                token.value = data.token
                // Manually set token locally for immediate subsequent calls if needed
                await fetchUser()

                // Redirect based on role
                if (isAdmin.value) {
                    navigateTo('/admin')
                } else {
                    navigateTo('/editor')
                }
            }
        } catch (error) {
            throw error
        }
    }

    // Logout Function
    const logout = () => {
        token.value = null
        user.value = null
        navigateTo('/auth')
    }

    return {
        user,
        loading,
        isAdmin,
        fetchUser,
        login,
        logout
    }
}
