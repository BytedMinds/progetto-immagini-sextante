import { prisma } from '../../../utils/prisma'
import { requireAdmin } from '../../../utils/protect'

export default defineEventHandler(async (event) => {
    requireAdmin(event)
    const id = getRouterParam(event, 'id')

    // Check if plan has active subscriptions
    const plan = await prisma.plan.findUnique({
        where: { id },
        include: { _count: { select: { subscriptions: true } } }
    })

    if (!plan) throw createError({ statusCode: 404, statusMessage: 'Plan not found' })

    if (plan._count.subscriptions > 0) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Cannot delete plan with active subscriptions'
        })
    }

    await prisma.plan.delete({ where: { id } })

    return { success: true }
})
