import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'isActive'],
    group: '內容管理',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: '網址路徑，例如：about-us',
      },
    },
    {
      name: 'bannerImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: '頁面頂部橫幅圖片 (選填，不填將使用預設背景)',
      },
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'badge',
      type: 'text',
      localized: true,
      admin: {
        description: '頁面徽章/小標題 (選填，如：專業顧問對接)',
      },
    },
    {
      name: 'features',
      type: 'array',
      localized: true,
      admin: {
        description: '頁面特色列表 (選填，例如諮詢頁面的左側特色清單)',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'icon',
          type: 'select',
          defaultValue: 'check',
          options: [
            { label: 'Check (打勾)', value: 'check' },
            { label: 'Users (用戶)', value: 'users' },
            { label: 'Dollar (貨幣)', value: 'dollar' },
          ],
        },
      ],
    },
    {
      name: 'content',
      type: 'richText',
      required: false,
      localized: true,
    },
    {
      name: 'metaTitle',
      type: 'text',
      localized: true,
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'inquiryFormSettings',
      type: 'group',
      admin: {
        condition: (data) => data?.slug === 'inquiry',
        description: '詢價頁面表單的自訂欄位名稱與提示訊息 (僅在 slug 為 inquiry 時顯示)',
      },
      fields: [
        { name: 'formTitle', type: 'text', localized: true },
        { name: 'formDescription', type: 'textarea', localized: true },
        { name: 'labelName', type: 'text', localized: true },
        { name: 'placeholderName', type: 'text', localized: true },
        { name: 'labelEmail', type: 'text', localized: true },
        { name: 'placeholderEmail', type: 'text', localized: true },
        { name: 'labelPhone', type: 'text', localized: true },
        { name: 'placeholderPhone', type: 'text', localized: true },
        { name: 'labelService', type: 'text', localized: true },
        { name: 'selectEmptyText', type: 'text', localized: true },
        { name: 'labelMessage', type: 'text', localized: true },
        { name: 'placeholderMessage', type: 'text', localized: true },
        { name: 'submitBtnText', type: 'text', localized: true },
        { name: 'submittingText', type: 'text', localized: true },
        { name: 'successTitle', type: 'text', localized: true },
        { name: 'successDescription', type: 'textarea', localized: true },
        { name: 'successBackBtnText', type: 'text', localized: true },
        {
          name: 'serviceHints',
          type: 'array',
          localized: true,
          admin: {
            description: '不同服務的動態提示文字。',
          },
          fields: [
            {
              name: 'serviceSlug',
              type: 'text',
              required: true,
              admin: {
                description: '服務的 slug，必須與服務的網址路徑一致，例如：hk-company',
              },
            },
            {
              name: 'hintText',
              type: 'textarea',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
