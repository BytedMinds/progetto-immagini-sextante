export interface PipelineStepConfig {
    id: string;
    provider: string; // 'replicate', 'openai', 'mock'
    action: string; // 'enhance', 'upscale', 'denoise', 'remove-bg'
    params?: Record<string, any>;
}

export interface IPipelineStep {
    execute(inputUrl: string, config: PipelineStepConfig): Promise<string>;
}

export class MockPipelineStep implements IPipelineStep {
    async execute(inputUrl: string, config: PipelineStepConfig): Promise<string> {
        console.log('[MockAI] Processing ' + config.action + ' on ' + inputUrl + ' with params:', config.params);
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        // Return a dummy result URL
        return 'https://placehold.co/1024x1024?text=Processed+' + config.action;
    }
}

export class PipelineOrchestrator {
    private steps: Map<string, IPipelineStep>;

    constructor() {
        this.steps = new Map();
        // Register adapters
        this.steps.set('mock', new MockPipelineStep());
    }

    async process(inputUrl: string, pipeline: PipelineStepConfig[]): Promise<string> {
        let currentUrl = inputUrl;

        for (const stepConfig of pipeline) {
            const adapter = this.steps.get(stepConfig.provider);
            if (!adapter) {
                throw new Error('Provider ' + stepConfig.provider + ' not found');
            }

            console.log('[Pipeline] Starting step: ' + stepConfig.action);
            currentUrl = await adapter.execute(currentUrl, stepConfig);
            console.log('[Pipeline] Step completed. Result: ' + currentUrl);
        }

        return currentUrl;
    }
}

// Singleton instance
export const pipelineOrchestrator = new PipelineOrchestrator();
