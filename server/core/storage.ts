import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

export interface IStorageProvider {
    upload(file: Buffer, filename: string): Promise<string>;
    getSignedUrl(key: string): Promise<string>;
}

export class MockStorageProvider implements IStorageProvider {
    async upload(file: Buffer, filename: string): Promise<string> {
        // For local dev, save to public/temp to visualize
        const fileName = `${Date.now()}-${filename}`;
        const path = resolve(process.cwd(), 'public/temp', fileName);

        await writeFile(path, file);

        console.log(`[Storage] Saved to ${path}`);
        // Return relative URL for Nuxt to serve
        return `/temp/${fileName}`;
    }

    async getSignedUrl(key: string): Promise<string> {
        return key;
    }
}

// Factory/Singleton
export const storageProvider = new MockStorageProvider();
