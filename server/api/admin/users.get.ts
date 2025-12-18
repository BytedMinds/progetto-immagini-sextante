import { prisma } from '../../utils/prisma';
import { requireAdmin } from '../../utils/protect';

export default defineEventHandler(async (event) => {
    requireAdmin(event);

    const users = await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            role: true,
            createdAt: true,
            subscription: {
                select: {
                    status: true,
                    plan: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return {
        users
    };
});
