import { prisma } from '../../utils/prisma'
import { requireAdmin } from '../../utils/protect'
import { hashPassword } from '../../utils/password'

export default defineEventHandler(async (event) => {
    requireAdmin(event)

    const body = await readBody(event)
    const { email, password, fullName, role, credits } = body

    if (!email || !password) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Email and password are required'
        })
    }

    // Check if user exists
    const existing = await prisma.user.findUnique({
        where: { email }
    })

    if (existing) {
        throw createError({
            statusCode: 409,
            statusMessage: 'User already exists'
        })
    }

    const hashedPassword = await hashPassword(password)

    const user = await prisma.user.create({
        data: {
            email,
            passwordHash: hashedPassword,
            fullName,
            role: role || 'USER',
            credits: credits || 10
        }
    })

    return {
        success: true,
        user: {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            role: user.role
        }
    }
})
