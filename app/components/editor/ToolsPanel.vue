<template>
  <div class="tools-panel glass-panel">
    <div class="panel-header">
      <h2>Adjustments</h2>
    </div>
    
    <div class="tools-list">
      <div 
        v-for="tool in tools" 
        :key="tool.id" 
        class="tool-item" 
        :class="{ active: selectedTool === tool.id }"
        @click="selectTool(tool.id)"
      >
        <div class="tool-icon flex-center">
           <component :is="tool.icon" :size="20" stroke-width="1.5" />
        </div>
        <div class="tool-info">
          <span class="tool-name">{{ tool.name }}</span>
          <span class="tool-desc">{{ tool.description }}</span>
        </div>
        <div class="tool-arrow"><ChevronRight :size="16" /></div>
      </div>
    </div>

    <!-- Active Tool Controls (Floating or expanded) -->
    <transition name="slide-up">
      <div v-if="selectedTool" class="tool-controls glass">
         <div class="control-header flex-between mb-4">
           <h3 class="text-gradient-primary">{{ getSelectedTool()?.name }}</h3>
           <button class="close-btn" @click="selectedTool = null"><X :size="20" /></button>
         </div>
         
         <div class="controls-body">
           <div v-if="getSelectedTool()?.hasIntensity" class="control-group">
              <div class="flex-between mb-2">
                <label>Intensity</label>
                <span class="text-xs text-muted">{{ intensity }}%</span>
              </div>
              <input type="range" min="0" max="100" v-model="intensity" class="range-slider" />
           </div>
           
           <button 
             class="btn-primary full-width" 
             :disabled="isProcessing"
             @click="applyCurrentTool"
           >
             <Wand2 :size="16" class="mr-2" v-if="!isProcessing" />
             <Loader2 :size="16" class="mr-2 animate-spin" v-else />
             {{ isProcessing ? 'Processing AI...' : 'Apply Effect' }}
           </button>
         </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { 
  Wand2, 
  ScanSearch, 
  Eraser, 
  Scissors, 
  Zap,
  ChevronRight,
  X,
  Loader2
} from 'lucide-vue-next'

const props = defineProps<{
  isProcessing: boolean
}>()

const emit = defineEmits<{
  (e: 'apply-tool', action: string, params: any): void
}>()

const selectedTool = ref<string | null>(null)
const intensity = ref(50)

const tools = [
  { id: 'enhance', name: 'Magic Enhance', description: 'Auto-correct lighting & color', action: 'enhance', hasIntensity: true, icon: Wand2 },
  { id: 'upscale', name: 'Super Upscale', description: '4x Resolution boost', action: 'upscale', hasIntensity: false, icon: ScanSearch },
  { id: 'denoise', name: 'Denoise AI', description: 'Remove grain & artifacts', action: 'denoise', hasIntensity: true, icon: Eraser },
  { id: 'sharpen', name: 'Smart Sharpen', description: 'Recover lost details', action: 'sharpen', hasIntensity: true, icon: Zap },
  { id: 'remove-bg', name: 'Remove BG', description: 'Transparent background', action: 'remove-bg', hasIntensity: false, icon: Scissors },
]

const selectTool = (id: string) => {
  selectedTool.value = id
}

const getSelectedTool = () => tools.find(t => t.id === selectedTool.value)

const applyCurrentTool = () => {
  const tool = getSelectedTool()
  if (tool) {
    emit('apply-tool', tool.action, { 
      intensity: tool.hasIntensity ? intensity.value / 100 : undefined 
    })
  }
}
</script>

<style scoped>
.tools-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  border-left: 1px solid var(--border-subtle);
  background: var(--bg-panel);
}

.panel-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-subtle);
}

.panel-header h2 {
  font-size: 0.95rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted);
}

.tools-list {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.tool-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: var(--radius-lg);
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: all var(--duration-fast);
  border: 1px solid transparent;
  position: relative;
  overflow: hidden;
}

.tool-item:hover {
  background: var(--bg-hover);
  border-color: var(--border-hover);
}

.tool-item.active {
  background: rgba(99, 102, 241, 0.1);
  border-color: var(--color-primary);
}

.tool-icon {
  width: 40px;
  height: 40px;
  background: var(--bg-card);
  border-radius: 10px;
  font-size: 1.25rem;
  border: 1px solid var(--border-subtle);
  transition: all var(--duration-fast);
}

.tool-item.active .tool-icon {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.tool-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.tool-name {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--text-main);
}

.tool-desc {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-top: 2px;
}

.tool-arrow {
  color: var(--text-dim);
  font-size: 1.2rem;
  opacity: 0;
  transform: translateX(-5px);
  transition: all var(--duration-fast);
}

.tool-item:hover .tool-arrow {
  opacity: 1;
  transform: translateX(0);
}

.tool-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  border-top: 1px solid var(--border-subtle);
  background: rgba(24, 24, 27, 0.95); /* Opaque enough */
  z-index: 20;
}

.control-header h3 {
  font-size: 1.1rem;
  margin: 0;
}

.close-btn {
  font-size: 1.5rem;
  line-height: 1;
  color: var(--text-muted);
}

.close-btn:hover {
  color: var(--text-main);
}

.range-slider {
  width: 100%;
  height: 6px;
  background: var(--bg-hover);
  border-radius: var(--radius-full);
  appearance: none;
  cursor: pointer;
}

.range-slider::-webkit-slider-thumb {
  appearance: none;
  width: 18px;
  height: 18px;
  background: var(--color-primary);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--color-primary-glow);
  cursor: grab;
}

.full-width {
  width: 100%;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}
</style>
