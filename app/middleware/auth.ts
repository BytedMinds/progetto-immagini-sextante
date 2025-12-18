export default defineNuxtRouteMiddleware(async (to, from) => {
    const { user, fetchUser } = useAuth()
    const token = useCookie('auth_token')

    if (!token.value) {
        return navigateTo('/auth')
    }

    // If token exists but user is not loaded, fetch it
    if (!user.value) {
        await fetchUser()
    }

    if (!user.value) {
        // If still no user after fetch (invalid token), redirect
        return navigateTo('/auth')
    }
})
