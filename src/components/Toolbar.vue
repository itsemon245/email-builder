<script setup lang="ts">
import { ref } from 'vue'
import { useEmailStore } from '../stores/email'

const emailStore = useEmailStore()
const previewSize = ref<'mobile' | 'tablet' | 'desktop'>('desktop')

const setPreviewSize = (size: 'mobile' | 'tablet' | 'desktop') => {
  previewSize.value = size
}

const exportTemplate = () => {
  emailStore.exportHTML()
}
</script>

<template>
  <div class="h-16 bg-white border-b border-gray-200 flex items-center px-4 justify-between">
    <div class="flex items-center space-x-4">
      <button
        v-for="size in ['mobile', 'tablet', 'desktop']"
        :key="size"
        class="p-2 rounded-lg hover:bg-gray-100"
        :class="{ 'bg-gray-100': previewSize === size }"
        @click="setPreviewSize(size as 'mobile' | 'tablet' | 'desktop')"
      >
        <i :class="`pi pi-${size === 'mobile' ? 'mobile' : size === 'tablet' ? 'tablet' : 'desktop'}`"></i>
      </button>
    </div>
    <div class="flex items-center space-x-4">
      <button
        class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        @click="exportTemplate"
      >
        Export Template
      </button>
    </div>
  </div>
</template>