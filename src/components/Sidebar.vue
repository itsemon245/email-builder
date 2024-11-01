<script setup lang="ts">
import { ref, computed } from 'vue'
import { useEmailStore } from '../stores/email'
import { emailComponents } from '../data/components'
import ComponentSettings from './ComponentSettings.vue'

const activeTab = ref('components')
const emailStore = useEmailStore()

const showSettings = computed(() => {
  return activeTab.value === 'settings' && emailStore.selectedComponent !== null
})

const onDragStart = (event: DragEvent, component: any) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData('componentType', JSON.stringify(component))
  }
}
</script>

<template>
  <aside class="w-80 bg-white border-l border-gray-200 flex flex-col">
    <div class="border-b border-gray-200">
      <div class="flex">
        <button 
          class="flex-1 px-4 py-3 text-sm font-medium"
          :class="activeTab === 'components' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'"
          @click="activeTab = 'components'"
        >
          Components
        </button>
        <button 
          class="flex-1 px-4 py-3 text-sm font-medium"
          :class="activeTab === 'settings' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'"
          @click="activeTab = 'settings'"
        >
          Settings
        </button>
      </div>
    </div>

    <div class="flex-1 overflow-y-auto p-4">
      <!-- Components Tab -->
      <template v-if="activeTab === 'components'">
        <div v-for="category in emailComponents" :key="category.name" class="mb-6">
          <h3 class="text-sm font-medium text-gray-900 mb-2">{{ category.name }}</h3>
          <div class="space-y-2">
            <div
              v-for="component in category.items"
              :key="component.id"
              class="p-3 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 transition-colors"
              draggable="true"
              @dragstart="(e) => onDragStart(e, component)"
            >
              <i :class="component.icon" class="mr-2"></i>
              {{ component.name }}
            </div>
          </div>
        </div>
      </template>

      <!-- Settings Tab -->
      <template v-if="activeTab === 'settings'">
        <ComponentSettings 
          v-if="emailStore.selectedComponent"
          :component="emailStore.selectedComponent"
          @update="emailStore.updateComponentSettings"
        />
        <div v-else class="text-center text-gray-500 py-8">
          Select a component to edit its settings
        </div>
      </template>
    </div>
  </aside>
</template>