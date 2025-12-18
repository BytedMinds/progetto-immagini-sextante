import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../../utils/password'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    // Only allow in dev mode or if explicitly enabled
    // if (process.env.NODE_ENV === 'production') return { error: 'Not allowed in production' }

    const password = await hashPassword('password123')

    // 0. Seed Plans
    const freePlan = await prisma.plan.upsert({
        where: { name: 'Free' },
        update: {},
        create: {
            name: 'Free',
            price: 0,
            features: ['Basic Tools', '5 Credits/Mo', 'Standard Support']
        }
    })

    const proPlan = await prisma.plan.upsert({
        where: { name: 'Pro' },
        update: {},
        create: {
            name: 'Pro',
            price: 1999, // $19.99
            features: ['All Tools', '50 Credits/Mo', 'Priority Support', 'No Watermark']
        }
    })

    const entPlan = await prisma.plan.upsert({
        where: { name: 'Enterprise' },
        update: {},
        create: {
            name: 'Enterprise',
            price: 9900,
            features: ['Unlimited', 'API Access', 'Dedicated Account Manager']
        }
    })

    // 1. Create Admin
    const admin = await prisma.user.upsert({
        where: { email: 'admin@sextante.app' },
        update: {},
        create: {
            email: 'admin@sextante.app',
            passwordHash: password,
            role: 'ADMIN',
            fullName: 'Dev Admin'
        }
    })

    // 2. Create Pro User
    const user = await prisma.user.upsert({
        where: { email: 'user@sextante.app' },
        update: {},
        create: {
            email: 'user@sextante.app',
            passwordHash: password,
            role: 'USER',
            fullName: 'Dev User',
            subscription: {
                create: {
                    status: 'ACTIVE',
                    planId: proPlan.id,
                    stripeSubId: 'dev_mock_sub_001',
                    currentPeriodEnd: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
                }
            }
        }
    })

    return { success: true, admin, user, plans: [freePlan, proPlan, entPlan] }
})
