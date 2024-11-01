export const settingsConfig: Record<string, Array<{
  key: string
  type: string
  label: string
  default: any
  [key: string]: any
}>> = {
  button: [
    {
      key: 'backgroundColor',
      type: 'color',
      label: 'Background Color',
      default: '#4F46E5'
    },
    {
      key: 'textColor',
      type: 'color',
      label: 'Text Color',
      default: '#ffffff'
    },
    {
      key: 'borderRadius',
      type: 'range',
      label: 'Border Radius',
      min: 0,
      max: 20,
      step: 1,
      unit: 'px',
      default: 4
    },
    {
      key: 'fontSize',
      type: 'range',
      label: 'Font Size',
      min: 12,
      max: 24,
      step: 1,
      unit: 'px',
      default: 16
    },
    {
      key: 'fontWeight',
      type: 'select',
      label: 'Font Weight',
      options: [
        { label: 'Normal', value: 'normal' },
        { label: 'Medium', value: '500' },
        { label: 'Bold', value: 'bold' }
      ],
      default: 'normal'
    },
    {
      key: 'url',
      type: 'text',
      label: 'Button URL',
      default: '#'
    },
    {
      key: 'text',
      type: 'text',
      label: 'Button Text',
      default: 'Click Here'
    }
  ],
  grid: [
    {
      key: 'columns',
      type: 'select',
      label: 'Desktop Columns',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' }
      ],
      default: '2'
    },
    {
      key: 'tabletColumns',
      type: 'select',
      label: 'Tablet Columns',
      options: [
        { label: '1 Column', value: '1' },
        { label: '2 Columns', value: '2' }
      ],
      default: '2'
    },
    {
      key: 'mobileColumns',
      type: 'select',
      label: 'Mobile Columns',
      options: [
        { label: '1 Column', value: '1' }
      ],
      default: '1'
    },
    {
      key: 'gap',
      type: 'range',
      label: 'Gap',
      min: 0,
      max: 40,
      step: 4,
      unit: 'px',
      default: 16
    }
  ]
}