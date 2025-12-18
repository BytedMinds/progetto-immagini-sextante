import { storageProvider } from '../core/storage';
import { requireUser } from '../utils/protect';

export default defineEventHandler(async (event) => {
    requireUser(event);

    // Use H3's readMultipartFormData
    const files = await readMultipartFormData(event);

    if (!files || files.length === 0) {
        throw createError({
            statusCode: 400,
            statusMessage: 'No file uploaded'
        });
    }

    const file = files[0];
    if (!file.filename || !file.data) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid file'
        });
    }

    // Basic validation
    if (!file.type?.startsWith('image/')) {
        throw createError({
            statusCode: 400,
            statusMessage: 'File must be an image'
        });
    }

    try {
        const url = await storageProvider.upload(file.data, file.filename);
        return {
            success: true,
            url,
            filename: file.filename
        };
    } catch (error) {
        console.error('Upload error:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Upload failed'
        });
    }
});
