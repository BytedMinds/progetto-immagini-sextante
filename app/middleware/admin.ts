export default defineNuxtRouteMiddleware((to, from) => {
    const { user, isAdmin } = useAuth()

    // Assuming auth middleware runs first or we check token
    if (!user.value) {
        return navigateTo('/auth')
    }

    if (!isAdmin.value) {
        // User trying to access admin area
        return navigateTo('/editor')
    }
})
