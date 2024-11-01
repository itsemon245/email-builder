<script setup lang="ts">
import { ref } from 'vue'
import { useDrop } from '@vueuse/core'
import { useEmailStore } from '../stores/email'
import EmailBlock from './EmailBlock.vue'

const emailStore = useEmailStore()
const { isOver, target } = useDrop({
  onDrop: (files, position) => {
    const componentData = JSON.parse(files[0].getData('component'))
    emailStore.addComponent(componentData)
  }
})
</script>

<template>
  <div class="p-4">
    <div ref="target" 
         class="email-canvas"
         :class="{ 'dropzone': true, 'active': isOver }">
      <template v-if="emailStore.components.length === 0">
        <div class="text-center text-gray-500 py-8">
          Drag components here
        </div>
      </template>
      <template v-else>
        <EmailBlock v-for="(component, index) in emailStore.components"
                   :key="index"
                   :component="component"
                   :index="index" />
      </template>
    </div>
  </div>
</template>