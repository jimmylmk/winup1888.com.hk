import React from 'react'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import config from '@/payload.config'

interface PageProps {
  params: Promise<{
    locale: string
    slug: string
  }>
}

export async function generateMetadata(props: PageProps) {
  const { locale, slug } = await props.params
  const payload = await getPayload({ config })

  try {
    const serviceQuery = await payload.find({
      collection: 'services',
      locale: locale as any,
      where: { slug: { equals: slug }, isActive: { equals: true } },
      limit: 1,
    })
    const serviceDoc = serviceQuery.docs[0]
    
    const settings = await payload.findGlobal({
      slug: 'site-settings',
      locale: locale as any,
    })

    if (serviceDoc) {
      return {
        title: (serviceDoc as any).metaTitle || `${serviceDoc.title} | ${settings.companyName}`,
        description: (serviceDoc as any).metaDescription || serviceDoc.shortDescription || '',
      }
    }
  } catch (e) {}

  return { title: 'Winyu Group' }
}

// Robust Lexical Rich Text Renderer
function RichTextRenderer({ content }: { content: any }) {
  if (!content || !content.root || !content.root.children) return null

  const renderTextNode = (child: any, key: number) => {
    if (child.type === 'text') {
      let textElement: React.ReactNode = child.text

      // Lexical text formats are bitwise flags: 1 = Bold, 2 = Italic, 8 = Underline
      if (child.format & 1) {
        textElement = <strong key={key}>{textElement}</strong>
      }
      if (child.format & 2) {
        textElement = <em key={key}>{textElement}</em>
      }
      if (child.format & 8) {
        textElement = <u key={key}>{textElement}</u>
      }

      return <React.Fragment key={key}>{textElement}</React.Fragment>
    }

    if (child.type === 'link' || child.type === 'autolink') {
      const url = child.fields?.url || child.url
      return (
        <a key={key} href={url} target="_blank" rel="noopener noreferrer" style={{ color: '#1776ed', textDecoration: 'underline' }}>
          {child.children?.map((c: any, index: number) => renderTextNode(c, index))}
        </a>
      )
    }

    return null
  }

  const renderNode = (node: any, key: number) => {
    switch (node.type) {
      case 'paragraph':
        return (
          <p key={key} className="mb-4" style={{ marginBottom: '1.2rem', lineHeight: '1.8' }}>
            {node.children?.map((child: any, index: number) => renderTextNode(child, index))}
          </p>
        )
      case 'heading':
        const Tag = node.tag as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
        return (
          <Tag key={key} className={`detail-heading-${node.tag}`} style={{ color: '#002b66', fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '0.8rem' }}>
            {node.children?.map((child: any, index: number) => renderTextNode(child, index))}
          </Tag>
        )
      case 'list':
        const ListTag = node.listType === 'number' ? 'ol' : 'ul'
        return (
          <ListTag key={key} style={{ paddingLeft: '20px', marginBottom: '1.2rem', listStyleType: node.listType === 'number' ? 'decimal' : 'disc' }}>
            {node.children?.map((li: any, liIndex: number) => (
              <li key={liIndex} style={{ marginBottom: '0.4rem' }}>
                {li.children?.map((child: any, index: number) => renderTextNode(child, index))}
              </li>
            ))}
          </ListTag>
        )
      default:
        return null
    }
  }

  return (
    <div className="rich-text-content">
      {content.root.children.map((node: any, i: number) => renderNode(node, i))}
    </div>
  )
}

export default async function ServiceDetailPage(props: PageProps) {
  const { locale, slug } = await props.params

  const payload = await getPayload({ config })

  // Query service from Payload CMS in matching locale
  const serviceQuery = await payload.find({
    collection: 'services',
    locale: locale as any,
    where: {
      slug: {
        equals: slug,
      },
      isActive: {
        equals: true,
      },
    },
    limit: 1,
  })

  const service = serviceQuery.docs[0]

  if (!service) {
    notFound()
  }

  // Fetch global site settings (for customized UI wording overrides)
  const settings = await payload.findGlobal({
    slug: 'site-settings',
    locale: locale as any,
  })

  // Localized wording fallback
  const wording: Record<string, { price: string, cta: string, back: string }> = {
    'zh-HK': {
      price: '服務費用',
      cta: '立即聯絡顧問諮詢',
      back: '返回首頁',
    },
    'zh-CN': {
      price: '服务费用',
      cta: '立即联系顾问咨询',
      back: '返回首页',
    },
    'en': {
      price: 'Service Fee',
      cta: 'Contact Consultant Now',
      back: 'Back to Homepage',
    }
  }

  const text = wording[locale] || wording['zh-HK']
  
  const bannerImageUrl = (service as any).bannerImage && typeof (service as any).bannerImage === 'object' && (service as any).bannerImage.url ? (service as any).bannerImage.url : null;

  return (
    <>
      {bannerImageUrl && (
        <div style={{ width: '100%', height: '300px', backgroundImage: `url(${bannerImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', marginBottom: '30px' }}></div>
      )}
    <div className="service-detail-container">
      <div className="container">
        {/* Breadcrumb / Back button */}
        <Link href={`/${locale}`} className="back-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          <span style={{ verticalAlign: 'middle' }}>{settings?.backToHomeLabel || text.back}</span>
        </Link>

        <div className="detail-layout">
          {/* Left side content */}
          <div className="detail-content-col">
            <h1 className="detail-title">{service.title}</h1>
            <p className="detail-summary">{service.shortDescription}</p>
            
            <div className="detail-rich-body">
              <RichTextRenderer content={service.content} />
            </div>
          </div>

          {/* Right side pricing card / CTA */}
          <div className="detail-sidebar-col">
            <div className="sticky-sidebar">
              <div className="sidebar-price-card">
                <span className="price-label">{settings?.priceLabel || text.price}</span>
                <span className="price-value">
                  {service.price ? `HKD ${service.price}${((service as any).priceSuffix !== undefined && (service as any).priceSuffix !== null) ? (service as any).priceSuffix : '+'}` : (locale === 'en' ? 'Contact Us' : '請諮詢我們')}
                </span>
                
                <div className="price-divider"></div>
                
                <Link href={`/${locale}/inquiry?service=${service.slug}`} className="sidebar-cta-btn">
                  {(service as any).ctaText || settings?.serviceCtaFallback || text.cta}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
