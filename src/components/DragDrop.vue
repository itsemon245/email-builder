<script setup lang="ts">
import { ref } from 'vue'
import { useDraggable } from '@vueuse/core'

const draggedElement = ref<HTMLElement | null>(null)
const dropZone = ref<HTMLElement | null>(null)

const { isDragging, style } = useDraggable(draggedElement, {
  initialValue: { x: 0, y: 0 },
})

const onDrop = (event: DragEvent) => {
  event.preventDefault()
  const componentType = event.dataTransfer?.getData('componentType')
  if (componentType) {
    emit('component-dropped', componentType)
  }
}

const onDragOver = (event: DragEvent) => {
  event.preventDefault()
}

const emit = defineEmits<{
  (e: 'component-dropped', type: string): void
}>()
</script>

<template>
  <div 
    ref="dropZone"
    class="h-full w-full bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg"
    @drop="onDrop"
    @dragover="onDragOver"
  >
    <slot></slot>
  </div>
</template>