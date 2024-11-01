<script setup lang="ts">
import { ref } from 'vue'
import { useEmailStore } from './stores/email'
import Toolbar from './components/Toolbar.vue'
import Sidebar from './components/Sidebar.vue'
import DragDrop from './components/DragDrop.vue'

const emailStore = useEmailStore()

const handleComponentDrop = (componentType: string) => {
  emailStore.addComponent({
    type: componentType,
    content: '',
    defaultContent: getDefaultContent(componentType)
  })
}

const getDefaultContent = (type: string): string => {
  const defaults: Record<string, string> = {
    header: `<header style="padding: 20px; background-color: #f8f9fa;">
      <h1 style="margin: 0; color: #333;">Your Company</h1>
    </header>`,
    hero: `<div style="padding: 40px; text-align: center; background-color: #e9ecef;">
      <h2 style="margin-bottom: 20px;">Welcome to Our Newsletter</h2>
      <p>Your main message goes here</p>
    </div>`,
    text: `<div style="padding: 20px;">
      <p style="color: #666;">Your content here</p>
    </div>`,
    button: `<div style="padding: 20px; text-align: center;">
      <a href="#" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Click Here</a>
    </div>`,
    image: `<div style="padding: 20px; text-align: center;">
      <img src="https://via.placeholder.com/600x300" alt="placeholder" style="max-width: 100%; height: auto;">
    </div>`,
    social: `<div style="padding: 20px; text-align: center;">
      <a href="#" style="margin: 0 10px;"><img src="https://via.placeholder.com/30" alt="social"></a>
      <a href="#" style="margin: 0 10px;"><img src="https://via.placeholder.com/30" alt="social"></a>
      <a href="#" style="margin: 0 10px;"><img src="https://via.placeholder.com/30" alt="social"></a>
    </div>`,
    divider: `<hr style="border: none; border-top: 1px solid #dee2e6; margin: 20px 0;">`,
    spacer: `<div style="height: 40px;"></div>`
  }
  return defaults[type] || ''
}
</script>

<template>
  <div class="h-screen flex flex-col">
    <Toolbar />
    <div class="flex-1 flex">
      <div class="flex-1 p-4">
        <DragDrop @component-dropped="handleComponentDrop">
          <template v-for="(component, index) in emailStore.components" :key="component.id">
            <div 
              class="p-4 border border-gray-200 rounded-lg mb-4 cursor-move"
              :class="{ 'border-blue-500': emailStore.selectedComponent?.id === component.id }"
              @click="emailStore.selectedComponent = component"
              v-html="component.content"
            ></div>
          </template>
        </DragDrop>
      </div>
      <Sidebar />
    </div>
  </div>
</template>

<style>
@import 'primevue/resources/themes/lara-light-blue/theme.css';
@import 'primevue/resources/primevue.min.css';
@import 'primeicons/primeicons.css';
@import './style.css';
</style>