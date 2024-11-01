<script setup lang="ts">
import { ref, computed } from 'vue'
import { useEmailStore } from '../stores/email'
import { useDraggable } from '@vueuse/core'

const props = defineProps<{
  component: {
    id: string
    type: string
    content: string
    settings: Record<string, any>
  }
  index: number
}>()

const emailStore = useEmailStore()
const blockRef = ref<HTMLElement | null>(null)

const { isDragging, style } = useDraggable(blockRef, {
  initialValue: { x: 0, y: 0 },
  onEnd: (position) => {
    // Calculate new position in the list based on final coordinates
    emailStore.reorderComponent(props.index, position)
  }
})

const removeBlock = () => {
  emailStore.removeComponent(props.index)
}

const selectBlock = () => {
  emailStore.setSelectedComponent(props.component)
}
</script>

<template>
  <div 
    ref="blockRef"
    class="relative group border border-gray-200 rounded-lg mb-4 hover:border-blue-500 cursor-move"
    :class="{ 'border-blue-500': emailStore.selectedComponent?.id === component.id }"
    @click.stop="selectBlock"
    :style="isDragging ? style : undefined"
  >
    <div class="p-4" v-html="component.content" />
    
    <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <button 
        class="p-2 bg-gray-100 rounded hover:bg-gray-200 mr-2"
        @click.stop="emailStore.moveComponent(index, index - 1)"
        :disabled="index === 0"
      >
        <i class="pi pi-arrow-up"></i>
      </button>
      <button 
        class="p-2 bg-gray-100 rounded hover:bg-gray-200 mr-2"
        @click.stop="emailStore.moveComponent(index, index + 1)"
        :disabled="index === emailStore.components.length - 1"
      >
        <i class="pi pi-arrow-down"></i>
      </button>
      <button 
        class="p-2 bg-red-100 rounded hover:bg-red-200"
        @click.stop="removeBlock"
      >
        <i class="pi pi-trash"></i>
      </button>
    </div>
  </div>
</template>