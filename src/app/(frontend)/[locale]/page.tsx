import React from 'react'
import { getPayload } from 'payload'
import Link from 'next/link'
import config from '@/payload.config'
import HomeSlider from './HomeSlider'
import ServicePlans from './ServicePlans'
import FaqAccordion from './FaqAccordion'

interface PageProps {
  params: Promise<{
    locale: string
  }>
}

export default async function LocalizedHomePage(props: PageProps) {
  const { locale } = await props.params

  const payload = await getPayload({ config })
  
  // 1. Fetch site-settings (already exists)
  const settings = await payload.findGlobal({
    slug: 'site-settings',
    locale: locale as any,
  })

  // 2. Fetch home-page dynamic content from Payload CMS
  let homeData: any = null
  try {
    homeData = await payload.findGlobal({
      slug: 'home-page',
      locale: locale as any,
    })
  } catch (e) {
    console.error("Failed to load home-page global:", e)
  }

  // Fallback data in case the database settings are missing or empty
  const fallbackSlides = [
    {
      title: '成立公司，註冊公司，開公司',
      subtitle: '一站式 公司註冊 公司成立 方案',
      description: '卓遠在香港是一所領先的企業服務有限公司，提供 註冊成立有限公司 服務',
      button1Text: '香港公司註冊',
      button1Link: '/services/hk-company',
      button2Text: '秘書服務',
      button2Link: '/services/company-secretary',
      backgroundImage: '/wp-content/uploads/2017/12/accolade-banner01.jpg',
    }
  ]

  const slides = homeData?.slides || fallbackSlides
  const servicesHighlight = homeData?.servicesHighlight || [
    { title: '香港公司成立', bgImage: '/wp-content/uploads/2017/12/accolade-service01.jpg', link: '/services/hk-company' },
    { title: '離岸公司成立', bgImage: '/wp-content/uploads/2017/12/accolade-service02-1.jpg', link: '/inquiry?service=hk-company' },
    { title: '辦公室搬遷通知', bgImage: '/wp-content/uploads/2018/06/accolade-service03.jpg', link: '#about' }
  ]

  const featuredTitle = homeData?.featuredTitle || '重點服務推介'
  const featuredSubtitle = homeData?.featuredSubtitle || '成立公司 註冊公司 開公司 重點服務推介'
  const tabHkTitle = homeData?.tabHkTitle || '香港公司成立'
  const tabOffshoreTitle = homeData?.tabOffshoreTitle || '離岸公司成立'
  const tabTrademarkTitle = homeData?.tabTrademarkTitle || '商標註冊-熱門註冊司法區'

  const hkPlans = homeData?.hkPlans || []
  const offshorePlans = homeData?.offshorePlans || []
  const trademarkPlans = homeData?.trademarkPlans || []

  const aboutTitle = homeData?.aboutTitle || '公司成立 註冊公司 香港有限公司成立 開公司 一站式方案'
  const aboutContent = homeData?.aboutContent || ''
  const whyTitle = homeData?.whyTitle || '為何選擇在香港 成立公司 註冊公司 ？'
  const whyContent = homeData?.whyContent || ''
  const advantagesTitle = homeData?.advantagesTitle || '在香港 註冊公司 公司成立 開展業務的一些主要優勢如下：'
  const advantages = homeData?.advantages || []
  const faqTitle = homeData?.faqTitle || '公司成立 註冊公司 常見問題'
  const faqs = homeData?.faqs || []
  const contactTitle = homeData?.contactTitle || '與我們聯絡'
  const contactDesc = homeData?.contactDesc || ''

  // Localized label strings for fixed UI actions
  const uiLabels: Record<string, { learnMore: string, add_to_cart: string, inquire_more: string }> = {
    'zh-HK': { learnMore: '了解更多', add_to_cart: 'Add to Cart 購買', inquire_more: '查詢更多' },
    'zh-CN': { learnMore: '了解更多', add_to_cart: 'Add to Cart 购买', inquire_more: '查询更多' },
    'en': { learnMore: 'Learn More', add_to_cart: 'Add to Cart / Buy', inquire_more: 'Inquire More' }
  }
  const ui = uiLabels[locale] || uiLabels['zh-HK']

  return (
    <div className="entry-content">
      {/* 1. Dynamic Slider Hero Component */}
      <HomeSlider slides={slides} locale={locale} ui={ui} />

      {/* 2. Three Column Overlay Service Boxes (CSS Flex layout) */}
      <div id="service-button" style={{ padding: '40px 0' }}>
        <div className="uk-grid uk-grid-small uk-child-width-1-3@s" style={{ display: 'flex', flexWrap: 'wrap', margin: '0 -10px' }}>
          {servicesHighlight.map((srv: any, idx: number) => (
            <div key={idx} className="servicebox" style={{ flex: '1 1 30%', minWidth: '280px', padding: '0 10px', marginBottom: '20px' }}>
              <div className="uk-inline uk-text-center uk-inline-clip uk-transition-toggle" style={{ width: '100%', position: 'relative', overflow: 'hidden', borderRadius: '4px' }}>
                <img src={srv.bgImage} alt={srv.title} style={{ width: '100%', display: 'block' }} />
                <div className="uk-position-center" style={{ color: '#ffffff', fontSize: '20px', fontWeight: 'bold', letterSpacing: '3px', textShadow: '0 2px 4px rgba(0,0,0,0.8)', width: '100%', padding: '0 10px' }}>
                  {srv.title}
                </div>
                <div className="uk-transition-fade uk-position-cover uk-overlay uk-overlay-default uk-flex uk-flex-center uk-flex-middle" style={{ backgroundColor: 'rgba(34,34,34,0.7)', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Link className="service-button" href={srv.link.startsWith('/') ? srv.link : `/${locale}${srv.link}`}>
                    {ui.learnMore}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Section Title */}
      <div style={{ textAlign: 'center', padding: '30px 0 10px 0' }}>
        <p className="style-four" style={{ margin: '0 auto 10px auto', width: '40px', borderBottom: '2px solid #002b66' }}></p>
        <h1 className="title" style={{ fontSize: '27px', color: '#002b66', fontWeight: 'bold', letterSpacing: '3px' }}>
          {featuredTitle}
        </h1>
        <h2 className="title" style={{ fontSize: '18px', color: '#1776ed', marginTop: '5px', letterSpacing: '3px', fontWeight: 'normal' }}>
          {featuredSubtitle}
        </h2>
      </div>

      {/* 4. React-state based Service Plans tab switcher component */}
      <ServicePlans 
        locale={locale} 
        ui={ui}
        tabTitles={{ tabHkTitle, tabOffshoreTitle, tabTrademarkTitle }}
        hkPlans={hkPlans}
        offshorePlans={offshorePlans}
        trademarkPlans={trademarkPlans}
      />

      {/* 5. Company Registry Advantage Text Description Section */}
      <div id="homepage-services" style={{ background: '#ffffff', padding: '40px 25px', borderRadius: '4px', border: '1px solid #e5e5e5', marginBottom: '30px' }}>
        {aboutTitle && (
          <div>
            <h2 style={{ fontSize: '22px', color: '#002b66', fontWeight: 'bold', marginBottom: '15px' }}>{aboutTitle}</h2>
            <p style={{ fontSize: '14.5px', color: '#5b5b5e', lineHeight: '1.8', marginBottom: '30px', whiteSpace: 'pre-wrap' }}>
              {aboutContent}
            </p>
          </div>
        )}
        {whyTitle && (
          <div style={{ marginTop: '20px' }}>
            <h2 style={{ fontSize: '22px', color: '#002b66', fontWeight: 'bold', marginBottom: '15px' }}>{whyTitle}</h2>
            <p style={{ fontSize: '14.5px', color: '#5b5b5e', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
              {whyContent}
            </p>
          </div>
        )}
      </div>

      {/* 6. Vantage Layout Advantage Section */}
      {advantages.length > 0 && (
        <div style={{ padding: '20px 0' }}>
          <div className="rich-text" style={{ fontSize: '14.5px', color: '#333333', lineHeight: '1.8' }}>
            <p style={{ fontWeight: '500', color: '#002b66', fontSize: '16px', marginBottom: '20px' }}>{advantagesTitle}</p>
            
            {advantages.map((adv: any, aIdx: number) => (
              <React.Fragment key={aIdx}>
                <h3 style={{ fontSize: '18px', color: '#002b66', fontWeight: 'bold', margin: '20px 0 10px 0' }}>{adv.title}</h3>
                {adv.paragraph1 && <p style={{ marginBottom: '15px' }}>{adv.paragraph1}</p>}
                {adv.paragraph2 && <p style={{ marginBottom: '25px' }}>{adv.paragraph2}</p>}
                
                {aIdx === 0 && (
                  <p style={{ textAlign: 'center', margin: '25px 0' }}>
                    <img src="/wp-content/uploads/2019/03/company-formation-02.png" alt="Company Formation Strategy" style={{ maxWidth: '100%', height: 'auto' }} />
                  </p>
                )}
                {aIdx === 1 && (
                  <p style={{ textAlign: 'center', margin: '25px 0' }}>
                    <img src="/wp-content/uploads/2019/03/company-formation-01.jpg" alt="Setup Company Easiness" style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }} />
                  </p>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* 7. React-state based FAQ Accordion Component */}
      <FaqAccordion faqs={faqs} faqTitle={faqTitle} />

      {/* 8. Contact Section Strip */}
      <div id="contact-background" style={{ background: '#012f5e url(/wp-content/uploads/2017/12/contact-background.jpg) no-repeat center center/cover', margin: '40px -15px 0 -15px', padding: '60px 20px', color: '#ffffff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'right' }}>
          <h1 style={{ color: '#ffffff', fontSize: '32px', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '15px' }}>
            <i className="fa fa-volume-control-phone" aria-hidden="true" style={{ marginRight: '10px' }}></i>
            {contactTitle}
          </h1>
          <p style={{ fontSize: '15px', lineHeight: '1.8', maxWidth: '600px', marginLeft: 'auto', whiteSpace: 'pre-wrap' }}>
            {contactDesc}
          </p>
        </div>
      </div>
    </div>
  )
}
