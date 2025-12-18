import { verifyToken } from '../../utils/jwt'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const authHeader = getRequestHeader(event, 'Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }

    const token = authHeader.split(' ')[1]

    try {
        const payload = verifyToken(token)
        if (!payload || !payload.id) {
            throw createError({ statusCode: 401, statusMessage: 'Invalid Token Payload' })
        }

        // Fetch fresh user data to ensure role/status is current
        const user = await prisma.user.findUnique({
            where: { id: payload.id },
            select: {
                id: true,
                email: true,
                role: true,
                fullName: true,
                credits: true,
                subscription: {
                    select: {
                        status: true,
                        plan: true
                    }
                }
            }
        })

        if (!user) {
            throw createError({ statusCode: 401, statusMessage: 'User not found' })
        }

        return { user }
    } catch (err) {
        throw createError({ statusCode: 401, statusMessage: 'Invalid Token' })
    }
})
