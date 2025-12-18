import { prisma } from '../../utils/prisma';
import { requireAdmin } from '../../utils/protect';

export default defineEventHandler(async (event) => {
    requireAdmin(event);

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
