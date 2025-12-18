export default defineNuxtRouteMiddleware((to, from) => {
    const { user, isAdmin } = useAuth()
    const token = useCookie('auth_token')

    if (token.value) {
        if (isAdmin.value) {
            return navigateTo('/admin')
        } else {
            return navigateTo('/editor')
        }
    }
})
