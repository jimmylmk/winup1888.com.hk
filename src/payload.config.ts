import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Services } from './collections/Services'
import { Inquiries } from './collections/Inquiries'
import { BlogPosts } from './collections/BlogPosts'
import { Pages } from './collections/Pages'
import { SiteSettings } from './globals/SiteSettings'
import { HomePage } from './globals/HomePage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Services, Inquiries, BlogPosts, Pages],
  globals: [SiteSettings, HomePage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'winyu-secret-key-12345',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:./accolade-cms.db',
      authToken: process.env.DATABASE_AUTH_TOKEN || undefined,
    },
    push: false,
  }),
  localization: {
    locales: [
      {
        label: '繁體中文',
        code: 'zh-HK',
      },
      {
        label: '简体中文',
        code: 'zh-CN',
      },
      {
        label: 'English',
        code: 'en',
      },
    ],
    defaultLocale: 'zh-HK',
    fallback: true,
  },
  sharp,
  plugins: [],
})
