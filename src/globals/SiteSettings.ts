import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: '系統設定',
  },
  fields: [
    {
      name: 'companyName',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'WINYU',
    },
    {
      name: 'logoImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: '網站標誌 (Logo)',
      },
    },
    {
      name: 'logoText',
      type: 'text',
      defaultValue: 'WINYU',
    },
    {
      name: 'email',
      type: 'text',
      required: true,
      defaultValue: 'info@winyugroup.com.hk',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      defaultValue: '+852 3110 8633',
    },
    {
      name: 'whatsapp',
      type: 'text',
      required: true,
      defaultValue: 'https://wa.me/85266936776',
      admin: {
        description: 'WhatsApp 聯絡連結',
      },
    },
    {
      name: 'whatsappDisplay',
      type: 'text',
      required: true,
      defaultValue: '+852 6693 6776',
      admin: {
        description: '網頁頂部顯示的 WhatsApp 號碼文字',
      },
    },
    {
      name: 'hkAddress',
      type: 'textarea',
      required: true,
      localized: true,
      defaultValue: '上環干諾道中181號大新行24樓06室',
    },
    {
      name: 'licenseText',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: '牌照編號:TC010082',
    },
    {
      name: 'licenseLink',
      type: 'text',
      required: true,
      defaultValue: '/wp-content/uploads/2024/06/ACSL_TCSP-Licence-2024-2027.pdf',
    },
    // Navigation Menu setup supporting up to 3 levels
    {
      name: 'navigationMenu',
      type: 'array',
      localized: true,
      admin: {
        description: '主導航選單項目（最多支援 3 層嵌套，各語言分別填寫）',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          required: true,
        },
        {
          name: 'subMenuItems',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'link',
              type: 'text',
              required: true,
            },
            {
              name: 'nestedMenuItems',
              type: 'array',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'link',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
    // Global UI Label text overrides
    {
      name: 'priceLabel',
      type: 'text',
      localized: true,
      defaultValue: '服務費用',
    },
    {
      name: 'serviceCtaFallback',
      type: 'text',
      localized: true,
      defaultValue: '立即聯絡顧問諮詢',
    },
    {
      name: 'backToHomeLabel',
      type: 'text',
      localized: true,
      defaultValue: '返回首頁',
    },
    {
      name: 'inquireMoreLabel',
      type: 'text',
      localized: true,
      defaultValue: '查詢更多',
    },
    {
      name: 'addToCartLabel',
      type: 'text',
      localized: true,
      defaultValue: 'Add to Cart 購買',
    },
    {
      name: 'learnMoreLabel',
      type: 'text',
      localized: true,
      defaultValue: '了解更多',
    },
  ],
}
