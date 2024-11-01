<script setup lang="ts">
import { ref, computed } from 'vue'
import { settingsConfig } from '../data/settings'

const props = defineProps<{
  component: {
    id: string
    type: string
    content: string
    settings: Record<string, any>
  }
}>()

const emit = defineEmits<{
  (e: 'update', id: string, settings: Record<string, any>): void
}>()

const componentSettings = computed(() => {
  return settingsConfig[props.component.type] || []
})

const updateSetting = (key: string, value: any) => {
  emit('update', props.component.id, { [key]: value })
}
</script>

<template>
  <div class="space-y-4">
    <template v-for="setting in componentSettings" :key="setting.key">
      <!-- Color Picker -->
      <div v-if="setting.type === 'color'" class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">{{ setting.label }}</label>
        <input 
          type="color" 
          :value="component.settings[setting.key]"
          @input="e => updateSetting(setting.key, e.target.value)"
          class="w-full h-8 rounded border"
        >
      </div>

      <!-- Range Slider -->
      <div v-else-if="setting.type === 'range'" class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">
          {{ setting.label }}: {{ component.settings[setting.key] }}{{ setting.unit }}
        </label>
        <input 
          type="range" 
          :min="setting.min" 
          :max="setting.max"
          :step="setting.step"
          :value="component.settings[setting.key]"
          @input="e => updateSetting(setting.key, e.target.value)"
          class="w-full"
        >
      </div>

      <!-- Select -->
      <div v-else-if="setting.type === 'select'" class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">{{ setting.label }}</label>
        <select 
          :value="component.settings[setting.key]"
          @change="e => updateSetting(setting.key, e.target.value)"
          class="w-full rounded-md border-gray-300 shadow-sm"
        >
          <option v-for="option in setting.options" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>

      <!-- Text Input -->
      <div v-else-if="setting.type === 'text'" class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">{{ setting.label }}</label>
        <input 
          type="text" 
          :value="component.settings[setting.key]"
          @input="e => updateSetting(setting.key, (e.target as HTMLInputElement).value)"
          class="w-full rounded-md border-gray-300 shadow-sm"
        >
      </div>
    </template>
  </div>
</template>