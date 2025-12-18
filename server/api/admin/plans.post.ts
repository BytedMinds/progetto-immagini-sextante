import { prisma } from '../../utils/prisma'
import { requireAdmin } from '../../utils/protect'

export default defineEventHandler(async (event) => {
    requireAdmin(event)
    const body = await readBody(event)

    const { name, price, interval, features, description } = body

    if (!name) {
        throw createError({ statusCode: 400, statusMessage: 'Name is required' })
    }

    const existing = await prisma.plan.findUnique({ where: { name } })
    if (existing) {
        throw createError({ statusCode: 409, statusMessage: 'Plan name already exists' })
    }

    const plan = await prisma.plan.create({
        data: {
            name,
            price: Number(price) || 0,
            interval: interval || 'month',
            features: Array.isArray(features) ? features : [],
            description: description || ''
        }
    })

    return { success: true, plan }
})
