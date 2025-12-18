import { prisma } from '../../utils/prisma';

export default defineEventHandler(async (event) => {
    // TODO: Add proper Role middleware check
    // For now, we assume the frontend handles visibility, but backend should ideally verify JWT role.
    // const user = event.context.user; if (user.role !== 'ADMIN') ...

    const [userCount, users] = await Promise.all([
        prisma.user.count(),
        prisma.user.findMany({ select: { createdAt: true } }) // For simple graph data
    ]);

    const totalProcessed = await prisma.usageLog.count();

    // Mock revenue calculation
    const totalRevenue = userCount * 19.99;

    return {
        totalUsers: userCount,
        totalProcessed,
        totalRevenue,
        activeSubs: Math.floor(userCount * 0.8) // Mock active subs
    };
});
