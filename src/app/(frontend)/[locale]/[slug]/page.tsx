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
    const pageQuery = await payload.find({
      collection: 'pages',
      locale: locale as any,
      where: { slug: { equals: slug }, isActive: { equals: true } },
      limit: 1,
    })
    const pageDoc = pageQuery.docs[0]
    
    const settings = await payload.findGlobal({
      slug: 'site-settings',
      locale: locale as any,
    })

    if (pageDoc) {
      return {
        title: (pageDoc as any).metaTitle || `${pageDoc.title} | ${settings.companyName}`,
        description: (pageDoc as any).metaDescription || pageDoc.shortDescription || '',
      }
    }
  } catch (e) {}

  return { title: 'Winyu Group' }
}

// Robust Lexical Rich Text Renderer (consistent with services/page)
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
          <Tag key={key} className={`detail-heading-${node.tag}`} style={{ color: '#002b66', fontWeight: 'bold', marginTop: '1.8rem', marginBottom: '0.8rem' }}>
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

export default async function DynamicGeneralPage(props: PageProps) {
  const { locale, slug } = await props.params

  const payload = await getPayload({ config })

  // Query general page from Payload CMS in matching locale
  const pageQuery = await payload.find({
    collection: 'pages',
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

  const pageDoc = pageQuery.docs[0]

  if (!pageDoc) {
    notFound()
  }

  // Localized wording
  const wording: Record<string, { back: string }> = {
    'zh-HK': { back: '返回首頁' },
    'zh-CN': { back: '返回首页' },
    'en': { back: 'Back to Homepage' }
  }

  const text = wording[locale] || wording['zh-HK']
  
  const badgeText = pageDoc.badge
  const features = (pageDoc as any).features || []
  const bannerImageUrl = (pageDoc as any).bannerImage && typeof (pageDoc as any).bannerImage === 'object' && (pageDoc as any).bannerImage.url ? (pageDoc as any).bannerImage.url : null;

  return (
    <>
      {bannerImageUrl && (
        <div style={{ width: '100%', height: '300px', backgroundImage: `url(${bannerImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', marginBottom: '30px' }}></div>
      )}
      <div className="general-page-container" style={{ background: '#ffffff', padding: '40px 25px', borderRadius: '4px', border: '1px solid #e5e5e5', marginBottom: '30px' }}>
      <div className="container">
        {/* Breadcrumb / Back button */}
        <Link href={`/${locale}`} className="back-link" style={{ display: 'inline-flex', alignItems: 'center', marginBottom: '20px', color: '#1776ed', fontSize: '14px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          <span>{text.back}</span>
        </Link>

        <div className="page-header" style={{ marginBottom: '30px', borderBottom: '1px solid #eeeeee', paddingBottom: '15px' }}>
          {badgeText && <div className="badge">{badgeText}</div>}
          <h1 className="page-title" style={{ fontSize: '28px', color: '#002b66', fontWeight: 'bold' }}>{pageDoc.title}</h1>
          {pageDoc.shortDescription && (
            <p className="page-summary" style={{ fontSize: '16px', color: '#5b5b5e', marginTop: '10px', lineHeight: '1.6' }}>
              {pageDoc.shortDescription}
            </p>
          )}
        </div>

        {features.length > 0 && (
          <div className="feature-list" style={{ marginTop: '20px', marginBottom: '30px' }}>
            {features.map((feature: any, index: number) => (
              <div className="feature-item" key={index}>
                <div className="feature-icon">
                  {getIconSvg(feature.icon)}
                </div>
                <div className="feature-text">
                  <h3 style={{ margin: 0, fontWeight: 'bold', color: '#002b66' }}>{feature.title}</h3>
                  <p style={{ margin: '5px 0 0 0', color: '#5b5b5e' }}>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="page-body">
          <RichTextRenderer content={pageDoc.content} />
        </div>
      </div>
    </div>
    </>
  )
}
