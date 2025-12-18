import { verifyToken } from './jwt'
import { H3Event } from 'h3'

export const getUserFromToken = (event: H3Event) => {
    let token: string | undefined | null = null
    const authHeader = getRequestHeader(event, 'Authorization')
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1]
    } else {
        token = getCookie(event, 'auth_token')
    }

    if (!token) return null
    const payload = verifyToken(token)

    if (!payload || !payload.id) return null
    return payload
}

export const requireUser = (event: H3Event) => {
    const user = getUserFromToken(event)
    if (!user) {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }
    return user
}

export const requireAdmin = (event: H3Event) => {
    const user = requireUser(event)
    if (user.role !== 'ADMIN') {
        throw createError({ statusCode: 403, statusMessage: 'Forbidden: Admin access only' })
    }
    return user
}
