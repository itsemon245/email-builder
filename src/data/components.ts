export const emailComponents = [
  {
    name: 'Layout',
    items: [
      {
        id: 'container',
        name: 'Container',
        icon: 'pi pi-box',
        type: 'container',
        defaultContent: `
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <!-- Content goes here -->
          </div>
        `
      },
      {
        id: 'two-columns',
        name: 'Two Columns',
        icon: 'pi pi-table',
        type: 'columns',
        defaultContent: `
          <table width="100%" cellpadding="0" cellspacing="0" style="min-width: 100%;">
            <tr>
              <td width="50%" valign="top">Column 1</td>
              <td width="50%" valign="top">Column 2</td>
            </tr>
          </table>
        `
      }
    ]
  },
  {
    name: 'Content',
    items: [
      {
        id: 'header',
        name: 'Header',
        icon: 'pi pi-header',
        type: 'header',
        defaultContent: `
          <h1 style="color: #333; font-size: 24px; font-weight: bold; margin-bottom: 20px;">
            Your Header Text
          </h1>
        `
      },
      {
        id: 'text',
        name: 'Text Block',
        icon: 'pi pi-align-left',
        type: 'text',
        defaultContent: `
          <p style="color: #666; font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
            Your content goes here
          </p>
        `
      },
      {
        id: 'button',
        name: 'Button',
        icon: 'pi pi-check-square',
        type: 'button',
        defaultContent: `
          <table cellpadding="0" cellspacing="0" style="margin: 20px 0;">
            <tr>
              <td style="background-color: #4F46E5; border-radius: 4px; padding: 12px 24px;">
                <a href="#" style="color: #ffffff; text-decoration: none;">Click Here</a>
              </td>
            </tr>
          </table>
        `
      },
      {
        id: 'image',
        name: 'Image',
        icon: 'pi pi-image',
        type: 'image',
        defaultContent: `
          <img src="https://via.placeholder.com/600x300" alt="Image" style="max-width: 100%; height: auto; margin-bottom: 20px;">
        `
      }
    ]
  },
  {
    name: 'Social',
    items: [
      {
        id: 'social-links',
        name: 'Social Links',
        icon: 'pi pi-share-alt',
        type: 'social',
        defaultContent: `
          <table cellpadding="0" cellspacing="0" style="margin: 20px 0;">
            <tr>
              <td style="padding: 0 10px;"><a href="#"><img src="https://via.placeholder.com/32" alt="Facebook"></a></td>
              <td style="padding: 0 10px;"><a href="#"><img src="https://via.placeholder.com/32" alt="Twitter"></a></td>
              <td style="padding: 0 10px;"><a href="#"><img src="https://via.placeholder.com/32" alt="Instagram"></a></td>
            </tr>
          </table>
        `
      }
    ]
  }
]

export const emailTemplates = [
  {
    id: 'welcome',
    name: 'Welcome Email',
    description: 'A warm welcome message for new subscribers',
    components: [
      { type: 'header', content: 'Welcome to Our Newsletter!' },
      { type: 'text', content: 'We\'re excited to have you on board...' },
      { type: 'button', content: 'Get Started' }
    ]
  },
  {
    id: 'promotional',
    name: 'Promotional Campaign',
    description: 'Announce sales and special offers',
    components: [
      { type: 'header', content: 'Special Offer Inside!' },
      { type: 'image', content: 'product-image.jpg' },
      { type: 'button', content: 'Shop Now' }
    ]
  }
]