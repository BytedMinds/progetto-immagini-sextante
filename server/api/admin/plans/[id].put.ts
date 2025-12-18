import { prisma } from '../../../utils/prisma'
import { requireAdmin } from '../../../utils/protect'

export default defineEventHandler(async (event) => {
    requireAdmin(event)
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)

    const { name, price, interval, features, description } = body

    try {
        const plan = await prisma.plan.update({
            where: { id },
            data: {
                name,
                price: price !== undefined ? Number(price) : undefined,
                interval,
                features,
                description
            }
        })
        return { success: true, plan }
    } catch (e) {
        throw createError({ statusCode: 500, statusMessage: 'Failed to update plan' })
    }
})
