export default defineNuxtRouteMiddleware((to, from) => {
    const { user, isAdmin } = useAuth()

    // If user is logged in (auth middleware handles checking existence usually, but safe to check)
    if (user.value && isAdmin.value) {
        return navigateTo('/admin')
    }
})
