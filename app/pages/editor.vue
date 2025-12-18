<template>
  <div class="editor-layout">
    <ClientOnly>
      <div class="editor-main">
        <PhotoCanvas 
          :imageUrl="currentImage" 
          :isProcessing="isProcessing" 
          @upload-success="(url) => currentImage = url"
        />
      </div>
      <aside class="editor-sidebar">
        <ToolsPanel @apply-tool="handleToolApply" :isProcessing="isProcessing" />
      </aside>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import PhotoCanvas from '../components/editor/PhotoCanvas.vue'
import ToolsPanel from '../components/editor/ToolsPanel.vue'

const currentImage = ref<string | null>(null)
const isProcessing = ref(false)

// Check for uploaded image in query or state
const route = useRoute()
onMounted(() => {
  // meaningful init if needed
  // For now, if no image, maybe show upload prompt (handled in canvas potentially)
})

const handleToolApply = async (toolAction: string, params: any) => {
  if (!currentImage.value) return
  
  isProcessing.value = true
  try {
    const { data, error } = await useFetch('/api/process', {
      method: 'POST',
      body: {
        imageUrl: currentImage.value,
        steps: [{
          id: Date.now().toString(),
          provider: 'mock', 
          action: toolAction,
          params
        }]
      }
    })

    if (data.value && data.value.success) {
      currentImage.value = data.value.resultUrl
    }
  } catch (e) {
    console.error(e)
  } finally {
    isProcessing.value = false
  }
}

definePageMeta({
  layout: 'app'
})
</script>

<style scoped>
.editor-layout {
  display: flex;
  height: 100%;
  width: 100%;
  gap: var(--space-4);
}

.editor-main {
  flex: 1;
  background-color: #050505;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.editor-sidebar {
  width: 320px;
  background-color: var(--bg-panel);
  border-left: 1px solid var(--border-subtle);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
</style>
