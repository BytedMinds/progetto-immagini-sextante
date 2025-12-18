import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { email, password, fullName } = body

    if (!email || !password) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Email and password are required'
        })
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
        where: { email }
    })

    if (existingUser) {
        throw createError({
            statusCode: 409,
            statusMessage: 'User already exists'
        })
    }

    // Hash password
    const passwordHash = await hashPassword(password)

    // Create user
    const user = await prisma.user.create({
        data: {
            email,
            passwordHash,
            fullName
        }
    })

    // Generate token
    const token = generateToken({ id: user.id, role: user.role })

    return {
        token,
        user: {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            role: user.role
        }
    }
})
