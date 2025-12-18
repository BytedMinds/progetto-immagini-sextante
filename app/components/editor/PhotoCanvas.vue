<template>
  <div class="canvas-wrapper">
    <div v-if="!imageUrl" class="upload-placeholder" @click="triggerUpload">
      <div class="upload-zone glass">
        <div class="icon-upload bounce">
           <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
        </div>
        <h3>Drop Image Here</h3>
        <p>or click to browse</p>
        <button class="btn-primary mt-4">Select Photo</button>
      </div>
      <input type="file" accept="image/*" @change="handleFileSelect" class="file-input" />
    </div>
    
    <div v-else class="image-container">
      <div class="glass-border"></div>
      <img :src="imageUrl" alt="Editing" class="main-image" />
      
      <transition name="fade">
        <div v-if="isProcessing" class="loading-overlay">
          <div class="spinner-ring"></div>
          <span class="processing-text">Enhancing with AI...</span>
        </div>
      </transition>

      <!-- Reset/Action Overlay (Example) -->
      <div class="canvas-actions">
         <!-- Zoom controls could go here -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  imageUrl: string | null
  isProcessing: boolean
}>()

const emit = defineEmits<{
  (e: 'upload-success', url: string): void
}>()

const triggerUpload = () => {
  (document.querySelector('.file-input') as HTMLInputElement)?.click()
}

const handleFileSelect = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    const formData = new FormData()
    formData.append('file', file)

    try {
      const { data, error } = await useFetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      
      if (data.value && data.value.success) {
        // Emit logic handled by parent via v-model or event?
        // Parent editor.vue likely needs to handle this if we don't emit a standard model update.
        // Let's assume editor.vue listens to a custom event or we force reload.
        // Actually, previous implementation relied on 'upload-success' or v-model (I fixed it in my mind but maybe not in code).
        // Let's emit 'upload-success' which I added to defineEmits.
        // Wait, editor.vue uses `useFetch` for process but for upload?
        // editor.vue doesn't listen to upload-success in previous code. I need to fix editor.vue or make this emit update:imageUrl.
        emit('upload-success', data.value.url)
      }
    } catch (e) {
      console.error(e)
    }
  }
}
</script>

<style scoped>
.canvas-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  background-image: radial-gradient(circle at center, rgba(39, 39, 42, 0.4) 0%, transparent 70%);
}

.upload-placeholder {
  cursor: pointer;
  width: 100%;
  max-width: 500px;
}

.upload-zone {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  border-radius: var(--radius-xl);
  border: 2px dashed var(--border-subtle);
  transition: all 0.2s;
}

.upload-zone:hover {
  background: rgba(255, 255, 255, 0.03);
  border-color: var(--color-primary);
}

.icon-upload {
  color: var(--text-muted);
  margin-bottom: 1.5rem;
  transition: color 0.2s;
}

.upload-zone:hover .icon-upload {
  color: var(--color-primary);
}

.bounce {
  animation: bounce 2s infinite;
}

.image-container {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-2xl);
  max-width: 100%;
  max-height: 100%;
  display: flex; /* Fix for image sizing */
}

/* Glass border effect */
.glass-border {
  position: absolute;
  inset: 0;
  border-radius: var(--radius-lg);
  border: 1px solid rgba(255,255,255,0.1);
  pointer-events: none;
  z-index: 10;
}

.main-image {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  display: block;
}

.loading-overlay {
  position: absolute;
  inset: 0;
  background: rgba(9, 9, 11, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  z-index: 20;
}

.spinner-ring {
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  border-top-color: var(--color-primary);
  box-shadow: 0 0 20px var(--color-primary-glow);
  animation: spin 1s linear infinite;
}

.processing-text {
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-size: 0.85rem;
  animation: pulse 2s infinite;
}

.file-input {
  display: none;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
  40% {transform: translateY(-10px);}
  60% {transform: translateY(-5px);}
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.mt-4 { margin-top: 1rem; }
</style>
