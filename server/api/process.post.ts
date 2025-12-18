import { pipelineOrchestrator } from '../core/pipeline';
import { prisma } from '../utils/prisma';

export default defineEventHandler(async (event) => {
    // 1. Auth Check (TODO: Middleware should handle this, but checking context here)
    // const user = event.context.user; if ( !user ) ...

    const body = await readBody(event);
    const { imageUrl, steps } = body;

    if (!imageUrl || !steps || !Array.isArray(steps)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid body: imageUrl and steps array required'
        });
    }

    try {
        // 2. Execute Pipeline
        const resultUrl = await pipelineOrchestrator.process(imageUrl, steps);

        // 3. Log Usage (Fire and forget or await)
        // await prisma.usageLog.create({ ... }) - Skipping for mock simplicity or add if Prisma ready

        return {
            success: true,
            originalUrl: imageUrl,
            resultUrl
        };

    } catch (error: any) {
        console.error('Pipeline error:', error);
        throw createError({
            statusCode: 500,
            statusMessage: error.message || 'Processing failed'
        });
    }
});
