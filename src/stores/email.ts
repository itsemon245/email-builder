import { defineStore } from 'pinia'
import { ref } from 'vue'
import juice from 'juice'
import { settingsConfig } from '../data/settings'

interface EmailComponent {
  id: string
  type: string
  content: string
  settings: Record<string, any>
}

export const useEmailStore = defineStore('email', () => {
  const components = ref<EmailComponent[]>([])
  const selectedComponent = ref<EmailComponent | null>(null)

  const addComponent = (component: any) => {
    const settings = settingsConfig[component.type]?.reduce((acc, setting) => {
      acc[setting.key] = setting.default
      return acc
    }, {}) || {}

    components.value.push({
      ...component,
      id: `component-${Date.now()}`,
      content: component.defaultContent,
      settings
    })
  }

  const removeComponent = (index: number) => {
    components.value.splice(index, 1)
    if (selectedComponent.value?.id === components.value[index]?.id) {
      selectedComponent.value = null
    }
  }

  const moveComponent = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= components.value.length) return
    const component = components.value.splice(fromIndex, 1)[0]
    components.value.splice(toIndex, 0, component)
  }

  const reorderComponent = (fromIndex: number, position: { x: number, y: number }) => {
    // Implementation for drag-based reordering
    const elements = document.querySelectorAll('.email-block')
    let closestIndex = fromIndex
    let closestDistance = Infinity

    elements.forEach((element, index) => {
      const rect = element.getBoundingClientRect()
      const distance = Math.hypot(
        position.x - (rect.left + rect.width / 2),
        position.y - (rect.top + rect.height / 2)
      )
      if (distance < closestDistance) {
        closestDistance = distance
        closestIndex = index
      }
    })

    if (closestIndex !== fromIndex) {
      moveComponent(fromIndex, closestIndex)
    }
  }

  const setSelectedComponent = (component: EmailComponent) => {
    selectedComponent.value = component
  }

  const updateComponentSettings = (id: string, newSettings: Record<string, any>) => {
    const component = components.value.find(c => c.id === id)
    if (component) {
      component.settings = { ...component.settings, ...newSettings }
      updateComponentContent(component)
    }
  }

  const updateComponentContent = (component: EmailComponent) => {
    // Update component content based on settings
    switch (component.type) {
      case 'button':
        component.content = `
          <table cellpadding="0" cellspacing="0" style="margin: 20px 0;">
            <tr>
              <td style="
                background-color: ${component.settings.backgroundColor};
                border-radius: ${component.settings.borderRadius}px;
                padding: 12px 24px;
              ">
                <a href="${component.settings.url}" 
                   style="
                     color: ${component.settings.textColor};
                     text-decoration: none;
                     font-size: ${component.settings.fontSize}px;
                     font-weight: ${component.settings.fontWeight};
                   ">${component.settings.text}</a>
              </td>
            </tr>
          </table>
        `
        break
      // Add cases for other component types
    }
  }

  const exportHTML = () => {
    const template = generateTemplate()
    const inlined = juice(template)
    
    const blob = new Blob([inlined], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'email-template.html'
    a.click()
    URL.revokeObjectURL(url)
  }

  const generateTemplate = () => {
    const content = components.value.map(component => component.content).join('')
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Template</title>
        </head>
        <body>
          ${content}
        </body>
      </html>
    `
  }

  return {
    components,
    selectedComponent,
    addComponent,
    removeComponent,
    moveComponent,
    reorderComponent,
    setSelectedComponent,
    updateComponentSettings,
    exportHTML
  }
})