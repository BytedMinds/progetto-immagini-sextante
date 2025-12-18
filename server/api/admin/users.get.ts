import { prisma } from '../../utils/prisma';

export default defineEventHandler(async (event) => {
    // TODO: Add proper Role middleware check

    const users = await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            role: true,
            createdAt: true,
            Subscription: {
                select: {
                    status: true,
                    plan: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: 50 // Limit for now
    });

    return {
        users
    };
});
