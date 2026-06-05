import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'price', 'isActive'],
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
        description: '用於網頁 URL，例如：hk-company-incorporation',
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
      required: true,
      localized: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
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
      name: 'price',
      type: 'number',
      admin: {
        description: '參考價格 (港幣 HKD)，留空表示「請諮詢我們」',
      },
    },
    {
      name: 'icon',
      type: 'select',
      defaultValue: 'briefcase',
      options: [
        { label: 'Briefcase (商業/註冊)', value: 'briefcase' },
        { label: 'Shield (公司秘書/法定合規)', value: 'shield' },
        { label: 'FileText (會計/審計/稅務)', value: 'file-text' },
        { label: 'Award (知識產權/商標)', value: 'award' },
        { label: 'MapPin (虛擬辦公室/地址)', value: 'map-pin' },
      ],
    },
    {
      name: 'ctaText',
      type: 'text',
      localized: true,
      admin: {
        description: '自訂聯絡按鈕文字，如「免費獲取報價」或「立即諮詢」 (選填，留空將使用預設文字)',
      },
    },
    {
      name: 'priceSuffix',
      type: 'text',
      localized: true,
      admin: {
        description: '自訂價格後綴，例如：「+」或「起」或「起/年」 (選填，留空將顯示「+」)',
      },
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
