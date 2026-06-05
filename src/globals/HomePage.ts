import type { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  admin: {
    group: '系統設定',
  },
  fields: [
    // Banner / Slider
    {
      name: 'slides',
      type: 'array',
      localized: true,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'subtitle', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'button1Text', type: 'text' },
        { name: 'button1Link', type: 'text' },
        { name: 'button2Text', type: 'text' },
        { name: 'button2Link', type: 'text' },
        { 
          name: 'backgroundImage', 
          type: 'upload', 
          relationTo: 'media',
          admin: { 
            description: '背景圖片 (不選擇則使用預設圖片)' 
          } 
        },
      ],
    },
    // Services highlights (3 top cards)
    {
      name: 'servicesHighlight',
      type: 'array',
      localized: true,
      maxRows: 3,
      fields: [
        { name: 'title', type: 'text', required: true },
        { 
          name: 'bgImage', 
          type: 'upload', 
          relationTo: 'media',
          admin: { description: '背景圖片 (不選擇則使用預設圖片)' } 
        },
        { name: 'link', type: 'text', required: true },
      ],
    },
    // Featured Services Title / Subtitle
    {
      name: 'featuredTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'featuredSubtitle',
      type: 'text',
      localized: true,
    },
    // Service Plans Tabs titles
    {
      name: 'tabHkTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'tabOffshoreTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'tabTrademarkTitle',
      type: 'text',
      localized: true,
    },
    // Service Plans Cards
    {
      name: 'hkPlans',
      type: 'array',
      localized: true,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'price', type: 'text', required: true },
        { 
          name: 'features', 
          type: 'array', 
          fields: [{ name: 'feature', type: 'text' }] 
        },
        { 
          name: 'inquiryPlanName', 
          type: 'text', 
          admin: { description: '預填詢價方案名稱，例如：基本香港有限公司成立' } 
        },
        { name: 'moreLink', type: 'text' },
      ],
    },
    {
      name: 'offshorePlans',
      type: 'array',
      localized: true,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'price', type: 'text', required: true },
        { 
          name: 'features', 
          type: 'array', 
          fields: [{ name: 'feature', type: 'text' }] 
        },
        { name: 'inquiryPlanName', type: 'text' },
        { name: 'moreLink', type: 'text' },
      ],
    },
    {
      name: 'trademarkPlans',
      type: 'array',
      localized: true,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'price', type: 'text', required: true },
        { 
          name: 'features', 
          type: 'array', 
          fields: [{ name: 'feature', type: 'text' }] 
        },
        { name: 'inquiryPlanName', type: 'text' },
        { name: 'moreLink', type: 'text' },
      ],
    },
    // About Winyu
    {
      name: 'aboutTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'aboutContent',
      type: 'textarea',
      localized: true,
    },
    // Why HK
    {
      name: 'whyTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'whyContent',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'whyImage1',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: '「成立公司簡單」圖片 (對應預設的 company-formation-01.jpg)',
      },
    },
    {
      name: 'whyImage2',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: '「成立策略」圖片 (對應預設的 company-formation-02.png)',
      },
    },
    // Advantages
    {
      name: 'advantagesTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'advantages',
      type: 'array',
      localized: true,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'paragraph1', type: 'textarea' },
        { name: 'paragraph2', type: 'textarea' },
      ],
    },
    // FAQ Section
    {
      name: 'faqTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'faqs',
      type: 'array',
      localized: true,
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
    // Contact Section
    {
      name: 'contactTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'contactDesc',
      type: 'textarea',
      localized: true,
    },
  ],
}
