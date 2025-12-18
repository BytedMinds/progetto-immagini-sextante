import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { email, password } = body

    if (!email || !password) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Email and password are required'
        })
    }

    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (!user) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Invalid credentials' // Generic message
        })
    }

    const isValid = await verifyPassword(password, user.passwordHash)

    if (!isValid) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Invalid credentials'
        })
    }

    const token = generateToken({ id: user.id, role: user.role })

    return {
        token,
        user: {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            role: user.role,
            credits: user.credits
        }
    }
})
