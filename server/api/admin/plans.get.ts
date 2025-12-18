import { prisma } from '../../utils/prisma'
import { requireAdmin } from '../../utils/protect'

export default defineEventHandler(async (event) => {
    requireAdmin(event)

    const plans = await prisma.plan.findMany({
        orderBy: { price: 'asc' },
        include: {
            _count: {
                select: { subscriptions: true }
            }
        }
    })

    return { success: true, plans }
})
