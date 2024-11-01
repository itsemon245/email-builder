<script setup lang="ts">
import { computed } from 'vue'
import { useEmailStore } from '../stores/email'

const props = defineProps<{
  component: {
    id: string
    type: string
    settings: {
      columns: string
      tabletColumns: string
      mobileColumns: string
      gap: number
    }
  }
}>()

const emailStore = useEmailStore()

const gridStyle = computed(() => {
  const { columns, tabletColumns, mobileColumns, gap } = props.component.settings
  return `
    display: grid;
    gap: ${gap}px;
    grid-template-columns: repeat(${columns}, 1fr);
    @media (max-width: 768px) {
      grid-template-columns: repeat(${tabletColumns}, 1fr);
    }
    @media (max-width: 480px) {
      grid-template-columns: repeat(${mobileColumns}, 1fr);
    }
  `
})
</script>

<template>
  <div class="grid-container" :style="gridStyle">
    <slot></slot>
  </div>
</template>