import type { CollectionConfig } from 'payload'

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'phone', 'service', 'status', 'createdAt'],
  },
  access: {
    create: () => true, // Allow anonymous submissions from frontend form
    read: ({ req: { user } }) => !!user, // Only logged-in admin users can view inquiries
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
      hasMany: false,
    },
    {
      name: 'message',
      type: 'textarea',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: '待處理 (Pending)', value: 'pending' },
        { label: '已聯繫 (Contacted)', value: 'contacted' },
        { label: '已結束 (Closed)', value: 'closed' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
