import React, { Suspense } from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import InquiryFormClient from './InquiryFormClient'

interface PageProps {
  params: Promise<{
    locale: string
  }>
}

export default async function LocalizedInquiryPage(props: PageProps) {
  const { locale } = await props.params

  const payload = await getPayload({ config })

  // 1. Fetch active services (to populate select dropdown)
  const servicesData = await payload.find({
    collection: 'services',
    locale: locale as any,
    where: {
      isActive: {
        equals: true,
      },
    },
    limit: 100,
  })

  // Simplify the services docs for client consumption
  const servicesList = servicesData.docs.map((s) => ({
    id: s.id,
    slug: s.slug,
    title: s.title,
    shortDescription: s.shortDescription,
  }))

  // 2. Fetch global site settings (for address & contacts)
  const settings = await payload.findGlobal({
    slug: 'site-settings',
    locale: locale as any,
  })

  // 3. Fetch the inquiry page content from CMS (slug: inquiry)
  const inquiryPageQuery = await payload.find({
    collection: 'pages',
    locale: locale as any,
    where: {
      slug: {
        equals: 'inquiry',
      },
      isActive: {
        equals: true,
      },
    },
    limit: 1,
  })

  const pageDoc = inquiryPageQuery.docs[0]

  // Localized UI string declarations & content fallbacks
  const layoutStrings: Record<string, any> = {
    'zh-HK': {
      badge: '專業顧問對接',
      title: '立即諮詢您的 <span>企業服務</span>',
      subtitle: '填寫表單，我們的專業合規團隊將在 1 個工作天內為您出具專屬的商業服務方案與報價單。',
      f1_t: '一站式商業顧問',
      f1_d: '涵蓋註冊公司、會計審計、全球商標等全方位服務。',
      f2_t: '資深合規專家團隊',
      f2_d: '由香港註冊會計師與公司秘書專家親自為您把關。',
      f3_t: '透明報價・絕無隱藏收費',
      f3_d: '我們提供公開透明的費用清單，保障您的權益。',
      office_hk: '香港總部',
      office_sz: '深圳分部',
      whatsapp_btn: 'WhatsApp 諮詢',
      phone_btn: '致電我們',
    },
    'zh-CN': {
      badge: '专业顾问对接',
      title: '立即咨询您的 <span>企业服务</span>',
      subtitle: '填写表单，我们的专业合规团队将在 1 个工作天内为您出具专属的商业服务方案与报价单。',
      f1_t: '一站式商业顾问',
      f1_d: '涵盖注册公司、会计审计、全球商标等全方位服务。',
      f2_t: '资深合规专家团队',
      f2_d: '由香港注册会计师与公司秘书专家亲自为您把关。',
      f3_t: '透明报价・绝无隐藏收费',
      f3_d: '我们提供公开透明的费用清单，保障您的权益。',
      office_hk: '香港总部',
      office_sz: '深圳分部',
      whatsapp_btn: 'WhatsApp 咨询',
      phone_btn: '致电我们',
    },
    'en': {
      badge: 'Dedicated Consulting Team',
      title: 'Inquire for Your <span>Corporate Services</span>',
      subtitle: 'Fill out the form. Our professional compliance team will issue a customized business proposal and itemized quotation within 1 business day.',
      f1_t: 'One-Stop Business Consultant',
      f1_d: 'Covering company incorporation, accounting, auditing, and global trademark registration.',
      f2_t: 'Experienced Compliance Experts',
      f2_d: 'Supervised directly by Hong Kong Certified Public Accountants (CPAs) and Corporate Secretaries.',
      f3_t: 'Transparent Pricing & No Hidden Fees',
      f3_d: 'We provide itemized, upfront pricing to ensure absolute peace of mind.',
      office_hk: 'Hong Kong HQ',
      office_sz: 'Shenzhen Office',
      whatsapp_btn: 'WhatsApp Us',
      phone_btn: 'Call Us',
    }
  }

  const fallback = layoutStrings[locale] || layoutStrings['zh-HK']

  // Resolve values dynamically, falling back to static strings if CMS doc or field is missing
  const badgeText = pageDoc?.badge || fallback.badge
  const titleText = pageDoc?.title || fallback.title
  const subtitleText = pageDoc?.shortDescription || fallback.subtitle

  // Features list mapping from CMS
  let features = (pageDoc as any)?.features || []
  if (features.length === 0) {
    features = [
      { title: fallback.f1_t, description: fallback.f1_d, icon: 'check' },
      { title: fallback.f2_t, description: fallback.f2_d, icon: 'users' },
      { title: fallback.f3_t, description: fallback.f3_d, icon: 'dollar' },
    ]
  }

  const getIconSvg = (iconSlug: string) => {
    switch (iconSlug) {
      case 'users':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        )
      case 'dollar':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        )
      case 'check':
      default:
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        )
    }
  }

  return (
    <div className="inquiry-page-wrapper">
      <div className="container main-inquiry-layout">
        {/* Left column */}
        <section className="info-section">
          <div className="badge">{badgeText}</div>
          <h1 className="title-primary" dangerouslySetInnerHTML={{ __html: titleText }}></h1>
          <p className="desc-primary">{subtitleText}</p>
          
          <div className="feature-list">
            {features.map((feature: any, index: number) => (
              <div className="feature-item" key={index}>
                <div className="feature-icon">
                  {getIconSvg(feature.icon)}
                </div>
                <div className="feature-text">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Offices Contacts */}
          <div className="office-contacts">
            <div className="office-card">
              <div className="office-name">{fallback.office_hk}</div>
              <div className="office-detail">{settings.hkAddress}</div>
              <div className="office-actions">
                <a href={settings.whatsapp} target="_blank" rel="noreferrer" className="action-link whatsapp">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.335 4.963L2 22l5.233-1.372a9.948 9.948 0 0 0 4.778 1.22c5.507 0 9.99-4.478 9.99-9.986 0-2.67-1.037-5.178-2.924-7.065A9.919 9.919 0 0 0 12.012 2zm5.727 14.126c-.31.874-1.572 1.605-2.187 1.664-.523.051-1.2.083-3.415-.83-2.83-1.168-4.662-4.04-4.803-4.227-.143-.187-1.16-1.536-1.16-2.93 0-1.394.726-2.078 1.004-2.36.27-.274.606-.343.805-.343.199 0 .399.002.573.01.182.008.423-.07.663.507.24.58.823 2.01.895 2.155.07.146.12.316.023.51-.097.193-.146.313-.292.484-.146.172-.307.382-.438.513-.146.146-.3.305-.129.597.172.292.763 1.258 1.636 2.034.872.776 1.608 1.016 1.902 1.162.293.146.463.123.636-.07.172-.193.753-.876.953-1.17.202-.293.402-.246.68-.146.277.098 1.767.834 2.073.987.307.153.51.23.585.36.075.13.075.753-.235 1.628z"/></svg>
                  <span>{fallback.whatsapp_btn}</span>
                </a>
                <a href={`tel:${settings.phone}`} className="action-link phone">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <span>{fallback.phone_btn}</span>
                </a>
              </div>
            </div>

            <div className="office-card">
              <div className="office-name">{fallback.office_sz}</div>
              <div className="office-detail">{settings.szAddress}</div>
              <div className="office-actions">
                <a href={settings.szWhatsapp || "https://wa.me/8613800000000"} target="_blank" rel="noreferrer" className="action-link whatsapp">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.335 4.963L2 22l5.233-1.372a9.948 9.948 0 0 0 4.778 1.22c5.507 0 9.99-4.478 9.99-9.986 0-2.67-1.037-5.178-2.924-7.065A9.919 9.919 0 0 0 12.012 2zm5.727 14.126c-.31.874-1.572 1.605-2.187 1.664-.523.051-1.2.083-3.415-.83-2.83-1.168-4.662-4.04-4.803-4.227-.143-.187-1.16-1.536-1.16-2.93 0-1.394.726-2.078 1.004-2.36.27-.274.606-.343.805-.343.199 0 .399.002.573.01.182.008.423-.07.663.507.24.58.823 2.01.895 2.155.07.146.12.316.023.51-.097.193-.146.313-.292.484-.146.172-.307.382-.438.513-.146.146-.3.305-.129.597.172.292.763 1.258 1.636 2.034.872.776 1.608 1.016 1.902 1.162.293.146.463.123.636-.07.172-.193.753-.876.953-1.17.202-.293.402-.246.68-.146.277.098 1.767.834 2.073.987.307.153.51.23.585.36.075.13.075.753-.235 1.628z"/></svg>
                  <span>{fallback.whatsapp_btn}</span>
                </a>
                <a href={`tel:${(settings.szPhone || "+86 755 8888 8888").replace(/\s+/g, '')}`} className="action-link phone">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <span>{fallback.phone_btn}</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Right column Client Form */}
        <Suspense fallback={<div>Loading form...</div>}>
          <InquiryFormClient 
            services={servicesList} 
            locale={locale} 
            formSettings={(pageDoc as any)?.inquiryFormSettings}
          />
        </Suspense>
      </div>
    </div>
  )
}
