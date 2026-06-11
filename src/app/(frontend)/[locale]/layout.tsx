import React from 'react'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import config from '@/payload.config'
import '../styles.css'
import LanguageSwitcher from './LanguageSwitcher'
import MobileNav from './MobileNav'

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{
    locale: string
  }>
}

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params
  const payload = await getPayload({ config })

  try {
    const settings = await payload.findGlobal({
      slug: 'site-settings',
      locale: locale as any,
    })
    return {
      title: `${settings.companyName} | 一站式公司註冊及成立公司方案`,
      description: '提供香港公司註冊、法定公司秘書、會計稅務審計、全球商標註冊、虛擬辦公室等一站式專業企業顧問服務。',
    }
  } catch (e) {
    return {
      title: 'Winyu Group | 一站式公司註冊及成立公司方案',
    }
  }
}

const resolveLink = (link: string, locale: string) => {
  if (!link) return `/${locale}`
  if (link.startsWith('http://') || link.startsWith('https://') || link.startsWith('#') || link.startsWith('mailto:') || link.startsWith('tel:')) {
    return link
  }
  const normalizedLink = link.startsWith('/') ? link : `/${link}`
  if (normalizedLink.startsWith(`/${locale}/`) || normalizedLink === `/${locale}`) {
    return normalizedLink
  }
  return `/${locale}${normalizedLink}`
}

export default async function LocalizedLayout(props: LayoutProps) {
  const { children } = props
  const { locale } = await props.params

  if (!['zh-HK', 'zh-CN', 'en'].includes(locale)) {
    notFound()
  }

  const payload = await getPayload({ config })

  const settings = await payload.findGlobal({
    slug: 'site-settings',
    locale: locale as any,
  })

  const logoUrl = settings.logoImage && typeof settings.logoImage === 'object' && settings.logoImage.url
    ? settings.logoImage.url
    : '/logo.png'

  // Dynamic Navigation Translations
  const navTitles: Record<string, any> = {
    'zh-HK': {
      home: '主頁',
      about: '關於天宇國際',
      vision: '遠景和核心價值',
      contact: '聯絡我們',
      incorporation: '公司註冊',
      hk_incorporation: '香港公司註冊',
      hk_files: '註冊香港公司文件',
      hk_fees: '註冊香港公司收費',
      cn_incorporation: '中國公司註冊',
      cn_files: '註冊中國公司文件',
      cn_fees: '註冊中國公司收費',
      sg_incorporation: '新加坡公司註冊',
      sg_files: '註冊新加坡公司文件',
      sg_fees: '註冊新加坡公司收費',
      bvi_incorporation: '英屬處女群島(BVI)註冊',
      cayman_incorporation: '開曼群島公司註冊',
      seychelles_incorporation: '塞舌爾群島公司註冊',
      samoa_incorporation: '薩摩亞公司註冊',
      marshall_incorporation: '馬紹爾群島公司註冊',
      us_incorporation: '美國公司註冊',
      corporate_services: '企業服務',
      secretary: '公司秘書服務',
      notarization: '公證服務',
      bank: '銀行開戶服務',
      hr: '人力資源及薪資服務',
      virtual: '虛擬辦公室',
      virtual_hk: '香港虛擬辦公室',
      global_communication: '全球通訊服務',
      accounting: '會計稅務',
      ip: '知識產權',
      trademark: '商標註冊',
      trademark_cat: '商標註冊分類',
      trademark_watch: '商標監察',
      design_registration: '外觀設計註冊',
      patent_registration: '專利註冊',
      domain_registration: '域名註冊',
      ip_management: '知識產權管理',
      search: '商業查冊',
      faq: 'FAQ',
      faq_accounting: '會計及稅務',
      faq_ip: '知識產權',
      news: '最新消息',
      whatsappDisplay: '+852 6693 6776',
      license: '牌照編號:TC010082',
      sitemap: '網站地圖',
      headquarters: '總部',
      tel: '電話',
      fax: '傳真',
      email: '電郵',
      menu: '選單',
    },
    'zh-CN': {
      home: '主页',
      about: '关于天宇国际',
      vision: '远景和核心价值',
      contact: '联络我们',
      incorporation: '公司注册',
      hk_incorporation: '香港公司注册',
      hk_files: '注册香港公司文件',
      hk_fees: '注册香港公司收费',
      cn_incorporation: '中国公司注册',
      cn_files: '注册中国公司文件',
      cn_fees: '注册中国公司收费',
      sg_incorporation: '新加坡公司注册',
      sg_files: '注册新加坡公司文件',
      sg_fees: '注册新加坡公司收费',
      bvi_incorporation: '英属处女群岛(BVI)注册',
      cayman_incorporation: '开曼群岛公司注册',
      seychelles_incorporation: '塞舌尔群岛公司注册',
      samoa_incorporation: '萨摩亚公司注册',
      marshall_incorporation: '马绍尔群岛公司注册',
      us_incorporation: '美国公司注册',
      corporate_services: '企业服务',
      secretary: '公司秘书服务',
      notarization: '公证服务',
      bank: '银行开户服务',
      hr: '人力资源及薪资服务',
      virtual: '虚拟办公室',
      virtual_hk: '香港虚拟办公室',
      global_communication: '全球通讯服务',
      accounting: '会计税务',
      ip: '知识产权',
      trademark: '商标注册',
      trademark_cat: '商标注册分类',
      trademark_watch: '商标监察',
      design_registration: '外观设计注册',
      patent_registration: '专利注册',
      domain_registration: '域名注册',
      ip_management: '知识产权管理',
      search: '商业查册',
      faq: 'FAQ',
      faq_accounting: '会计及税务',
      faq_ip: '知识产权',
      news: '最新消息',
      whatsappDisplay: '+852 6693 6776',
      license: '牌照编号:TC010082',
      sitemap: '网站地图',
      headquarters: '总部',
      tel: '电话',
      fax: '传真',
      email: '电邮',
      menu: '菜单',
    },
    'en': {
      home: 'Home',
      about: 'About Winyu',
      vision: 'Vision & Core Values',
      contact: 'Contact Us',
      incorporation: 'Company Setup',
      hk_incorporation: 'Hong Kong Setup',
      hk_files: 'Setup Documents',
      hk_fees: 'Setup Fees',
      cn_incorporation: 'China Setup',
      cn_files: 'China Setup Documents',
      cn_fees: 'China Setup Fees',
      sg_incorporation: 'Singapore Setup',
      sg_files: 'Singapore Setup Documents',
      sg_fees: 'Singapore Setup Fees',
      bvi_incorporation: 'BVI Incorporation',
      cayman_incorporation: 'Cayman Setup',
      seychelles_incorporation: 'Seychelles Setup',
      samoa_incorporation: 'Samoa Setup',
      marshall_incorporation: 'Marshall Setup',
      us_incorporation: 'US Setup',
      corporate_services: 'Corporate Services',
      secretary: 'Company Secretary',
      notarization: 'Notarization',
      bank: 'Bank Account Setup',
      hr: 'HR & Payroll Services',
      virtual: 'Virtual Office',
      virtual_hk: 'HK Virtual Office',
      global_communication: 'Global Communication',
      accounting: 'Accounting & Tax',
      ip: 'Intellectual Property',
      trademark: 'Trademark Registry',
      trademark_cat: 'Trademark Classes',
      trademark_watch: 'Trademark Watch',
      design_registration: 'Design Registration',
      patent_registration: 'Patent Registration',
      domain_registration: 'Domain Registration',
      ip_management: 'IP Management',
      search: 'Business Search',
      faq: 'FAQ',
      faq_accounting: 'Accounting & Tax',
      faq_ip: 'Intellectual Property',
      news: 'Latest News',
      whatsappDisplay: '+852 6693 6776',
      license: 'Licence No:TC010082',
      sitemap: 'Sitemap',
      headquarters: 'Head Office',
      tel: 'Tel',
      fax: 'Fax',
      email: 'Email',
      menu: 'Menu',
    }
  }

  const translations = navTitles[locale] || navTitles['zh-HK']

  // Build menu items array for MobileNav
  const mobileMenuItems = settings.navigationMenu && settings.navigationMenu.length > 0
    ? settings.navigationMenu
    : [
        { label: translations.home, link: `/${locale}`, subMenuItems: [] },
        { label: translations.about, link: `/${locale}/about-us`, subMenuItems: [
          { label: translations.vision, link: `/${locale}/about-us`, nestedMenuItems: [] },
          { label: translations.contact, link: `/${locale}/inquiry`, nestedMenuItems: [] },
        ]},
        { label: translations.incorporation, link: `/${locale}/services/hk-company`, subMenuItems: [
          { label: translations.hk_incorporation, link: `/${locale}/services/hk-company`, nestedMenuItems: [
            { label: translations.hk_files, link: `/${locale}/services/hk-company` },
            { label: translations.hk_fees, link: `/${locale}/services/hk-company` },
          ]},
          { label: translations.cn_incorporation, link: `/${locale}/services/china-company`, nestedMenuItems: [] },
          { label: translations.sg_incorporation, link: `/${locale}/services/singapore-company`, nestedMenuItems: [] },
          { label: translations.bvi_incorporation, link: `/${locale}/services/bvi-company`, nestedMenuItems: [] },
          { label: translations.cayman_incorporation, link: `/${locale}/services/cayman-company`, nestedMenuItems: [] },
          { label: translations.us_incorporation, link: `/${locale}/services/us-company`, nestedMenuItems: [] },
        ]},
        { label: translations.corporate_services, link: `/${locale}/services/company-secretary`, subMenuItems: [
          { label: translations.secretary, link: `/${locale}/services/company-secretary`, nestedMenuItems: [] },
          { label: translations.notarization, link: `/${locale}/services/notarization`, nestedMenuItems: [] },
          { label: translations.bank, link: `/${locale}/services/bank-account`, nestedMenuItems: [] },
          { label: translations.virtual, link: `/${locale}/services/virtual-office`, nestedMenuItems: [] },
        ]},
        { label: translations.accounting, link: `/${locale}/services/accounting-tax`, subMenuItems: [] },
        { label: translations.ip, link: `/${locale}/services/trademark-ip`, subMenuItems: [
          { label: translations.trademark, link: `/${locale}/services/trademark-ip`, nestedMenuItems: [] },
          { label: translations.patent_registration, link: `/${locale}/services/patent-registration`, nestedMenuItems: [] },
          { label: translations.domain_registration, link: `/${locale}/services/domain-registration`, nestedMenuItems: [] },
        ]},
        { label: translations.search, link: `/${locale}/services/business-search`, subMenuItems: [] },
        { label: translations.faq, link: `/${locale}#faq`, subMenuItems: [] },
        { label: translations.news, link: `/${locale}/about-us`, subMenuItems: [] },
      ]


  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;600;700&family=Noto+Sans+TC:wght@300;400;500;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.0-beta.30/css/uikit.min.css" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.0-beta.30/js/uikit.min.js" defer></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.0-beta.30/js/uikit-icons.min.js" defer></script>
      </head>
      <body suppressHydrationWarning className="home page-template page-template-home-panels page-template-home-panels-php page siteorigin-panels layout-full">
        <div id="page-wrapper">
          {/* Header */}
          <header id="masthead" className="site-header" role="banner">
            <div className="hgroup full-container">
              {/* Logo — always left-aligned */}
              <Link href={`/${locale}`} className="logo">
                <img
                  src={logoUrl}
                  className="logo-height-constrain"
                  width="800"
                  height="272"
                  alt={`${settings.companyName} Logo`}
                  style={{ display: 'block', maxWidth: '300px', height: 'auto' }}
                />
              </Link>

              {/* Header sidebar — desktop: flex row with license/lang/tel/email; mobile: only lang + mobile tel */}
              <div id="header-sidebar">
                <aside className="widget widget_siteorigin-panels-builder">
                  <div className="header-sidebar-layout">
                    {/* License text — hidden on mobile */}
                    <div className="license-text header-desktop-only">
                      <a href={settings.licenseLink || "/wp-content/uploads/2024/06/ACSL_TCSP-Licence-2024-2027.pdf"} target="_blank" rel="noopener">
                        {settings.licenseText || translations.license}
                      </a>
                    </div>
                    <LanguageSwitcher currentLocale={locale} />
                    {/* Tel/WhatsApp — desktop shows inline, mobile shows compact */}
                    <div className="header-tel">
                      <i className="fa fa-phone" aria-hidden="true" style={{ marginRight: '6px' }}></i>
                      <a href={`tel:${settings.phone.replace(/\s+/g, '')}`}>{settings.phone}</a>
                      <br />
                      <i className="fa fa-whatsapp" aria-hidden="true" style={{ marginRight: '6px' }}></i>
                      <a href={settings.whatsapp || "https://wa.me/85266936776"} target="_blank" rel="noopener noreferrer">
                        {settings.whatsappDisplay || "+852 6693 6776"}
                      </a>
                    </div>
                    {/* Email — hidden on mobile */}
                    <div className="header-mail header-desktop-only">
                      <Link href={`/${locale}/inquiry`}>{settings.email}</Link>
                    </div>
                  </div>
                </aside>
              </div>
            </div>

            {/* Desktop sticky navigation — hidden on mobile via CSS */}
            <nav role="navigation" className="site-navigation main-navigation primary use-sticky-menu so-mobilenav-standard">
              <div className="full-container">
                <ul id="menu-primary" className="menu">
                  {settings.navigationMenu && settings.navigationMenu.length > 0 ? (
                    settings.navigationMenu.map((item: any, idx: number) => {
                      const hasSub = item.subMenuItems && item.subMenuItems.length > 0
                      return (
                        <li key={idx} className={`menu-item ${hasSub ? 'menu-item-has-children has-dropdown' : ''}`}>
                          <Link href={resolveLink(item.link, locale)}>{item.label}</Link>
                          {hasSub && (
                            <ul className="sub-menu nav-dropdown">
                              {item.subMenuItems.map((subItem: any, subIdx: number) => {
                                const hasNested = subItem.nestedMenuItems && subItem.nestedMenuItems.length > 0
                                return (
                                  <li key={subIdx} className={`menu-item ${hasNested ? 'menu-item-has-children has-dropdown' : ''}`}>
                                    <Link href={resolveLink(subItem.link, locale)}>{subItem.label}</Link>
                                    {hasNested && (
                                      <ul className="sub-menu nav-dropdown">
                                        {subItem.nestedMenuItems.map((nestedItem: any, nestedIdx: number) => (
                                          <li key={nestedIdx} className="menu-item">
                                            <Link href={resolveLink(nestedItem.link, locale)}>{nestedItem.label}</Link>
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </li>
                                )
                              })}
                            </ul>
                          )}
                        </li>
                      )
                    })
                  ) : (
                    <>
                      {/* Home */}
                      <li className="menu-item">
                        <Link href={`/${locale}`}>{translations.home}</Link>
                      </li>

                      {/* About Us */}
                      <li className="menu-item menu-item-has-children has-dropdown">
                        <Link href={`/${locale}/about-us`}>{translations.about}</Link>
                        <ul className="sub-menu nav-dropdown">
                          <li className="menu-item">
                            <Link href={`/${locale}/about-us`}>{translations.vision}</Link>
                          </li>
                          <li className="menu-item">
                            <Link href={`/${locale}/inquiry`}>{translations.contact}</Link>
                          </li>
                        </ul>
                      </li>

                      {/* Company Setup */}
                      <li className="menu-item menu-item-has-children has-dropdown">
                        <Link href={`/${locale}/services/hk-company`}>{translations.incorporation}</Link>
                        <ul className="sub-menu nav-dropdown">
                          {/* HK */}
                          <li className="menu-item menu-item-has-children has-dropdown">
                            <Link href={`/${locale}/services/hk-company`}>{translations.hk_incorporation}</Link>
                            <ul className="sub-menu nav-dropdown">
                              <li className="menu-item">
                                <Link href={`/${locale}/services/hk-company`}>{translations.hk_files}</Link>
                              </li>
                              <li className="menu-item">
                                <Link href={`/${locale}/services/hk-company`}>{translations.hk_fees}</Link>
                              </li>
                            </ul>
                          </li>
                          {/* China */}
                          <li className="menu-item menu-item-has-children has-dropdown">
                            <Link href={`/${locale}/services/china-company`}>{translations.cn_incorporation}</Link>
                            <ul className="sub-menu nav-dropdown">
                              <li className="menu-item">
                                <Link href={`/${locale}/services/china-company`}>{translations.cn_files}</Link>
                              </li>
                              <li className="menu-item">
                                <Link href={`/${locale}/services/china-company`}>{translations.cn_fees}</Link>
                              </li>
                            </ul>
                          </li>
                          {/* Singapore */}
                          <li className="menu-item menu-item-has-children has-dropdown">
                            <Link href={`/${locale}/services/singapore-company`}>{translations.sg_incorporation}</Link>
                            <ul className="sub-menu nav-dropdown">
                              <li className="menu-item">
                                <Link href={`/${locale}/services/singapore-company`}>{translations.sg_files}</Link>
                              </li>
                              <li className="menu-item">
                                <Link href={`/${locale}/services/singapore-company`}>{translations.sg_fees}</Link>
                              </li>
                            </ul>
                          </li>
                          {/* BVI */}
                          <li className="menu-item">
                            <Link href={`/${locale}/services/bvi-company`}>{translations.bvi_incorporation}</Link>
                          </li>
                          {/* Cayman */}
                          <li className="menu-item">
                            <Link href={`/${locale}/services/cayman-company`}>{translations.cayman_incorporation}</Link>
                          </li>
                          {/* Seychelles */}
                          <li className="menu-item">
                            <Link href={`/${locale}/services/seychelles-company`}>{translations.seychelles_incorporation}</Link>
                          </li>
                          {/* Samoa */}
                          <li className="menu-item">
                            <Link href={`/${locale}/services/samoa-company`}>{translations.samoa_incorporation}</Link>
                          </li>
                          {/* Marshall */}
                          <li className="menu-item">
                            <Link href={`/${locale}/services/marshall-company`}>{translations.marshall_incorporation}</Link>
                          </li>
                          {/* US */}
                          <li className="menu-item">
                            <Link href={`/${locale}/services/us-company`}>{translations.us_incorporation}</Link>
                          </li>
                        </ul>
                      </li>

                      {/* Corporate Services */}
                      <li className="menu-item menu-item-has-children has-dropdown">
                        <Link href={`/${locale}/services/company-secretary`}>{translations.corporate_services}</Link>
                        <ul className="sub-menu nav-dropdown">
                          <li className="menu-item">
                            <Link href={`/${locale}/services/company-secretary`}>{translations.secretary}</Link>
                          </li>
                          <li className="menu-item">
                            <Link href={`/${locale}/services/notarization`}>{translations.notarization}</Link>
                          </li>
                          <li className="menu-item">
                            <Link href={`/${locale}/services/bank-account`}>{translations.bank}</Link>
                          </li>
                          <li className="menu-item">
                            <Link href={`/${locale}/services/hr-payroll`}>{translations.hr}</Link>
                          </li>
                          <li className="menu-item menu-item-has-children has-dropdown">
                            <Link href={`/${locale}/services/virtual-office`}>{translations.virtual}</Link>
                            <ul className="sub-menu nav-dropdown">
                              <li className="menu-item">
                                <Link href={`/${locale}/services/virtual-office`}>{translations.virtual_hk}</Link>
                              </li>
                              <li className="menu-item">
                                <Link href={`/${locale}/services/global-communication`}>{translations.global_communication}</Link>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>

                      {/* Accounting & Tax */}
                      <li className="menu-item">
                        <Link href={`/${locale}/services/accounting-tax`}>{translations.accounting}</Link>
                      </li>

                      {/* Intellectual Property */}
                      <li className="menu-item menu-item-has-children has-dropdown">
                        <Link href={`/${locale}/services/trademark-ip`}>{translations.ip}</Link>
                        <ul className="sub-menu nav-dropdown">
                          <li className="menu-item">
                            <Link href={`/${locale}/services/trademark-ip`}>{translations.trademark}</Link>
                          </li>
                          <li className="menu-item">
                            <Link href={`/${locale}/services/trademark-ip`}>{translations.trademark_cat}</Link>
                          </li>
                          <li className="menu-item">
                            <Link href={`/${locale}/services/trademark-ip`}>{translations.trademark_watch}</Link>
                          </li>
                          <li className="menu-item">
                            <Link href={`/${locale}/services/design-registration`}>{translations.design_registration}</Link>
                          </li>
                          <li className="menu-item">
                            <Link href={`/${locale}/services/patent-registration`}>{translations.patent_registration}</Link>
                          </li>
                          <li className="menu-item">
                            <Link href={`/${locale}/services/domain-registration`}>{translations.domain_registration}</Link>
                          </li>
                          <li className="menu-item">
                            <Link href={`/${locale}/services/ip-management`}>{translations.ip_management}</Link>
                          </li>
                        </ul>
                      </li>

                      {/* Business Search */}
                      <li className="menu-item">
                        <Link href={`/${locale}/services/business-search`}>{translations.search}</Link>
                      </li>

                      {/* FAQ */}
                      <li className="menu-item menu-item-has-children has-dropdown">
                        <Link href={`/${locale}#faq`}>{translations.faq}</Link>
                        <ul className="sub-menu nav-dropdown">
                          <li className="menu-item">
                            <Link href={`/${locale}#faq`}>{translations.faq_accounting}</Link>
                          </li>
                          <li className="menu-item">
                            <Link href={`/${locale}#faq`}>{translations.faq_ip}</Link>
                          </li>
                        </ul>
                      </li>

                      {/* News */}
                      <li className="menu-item">
                        <Link href={`/${locale}/about-us`}>{translations.news}</Link>
                      </li>
                    </>
                  )}

                  {/* Cart/Inquiry Icon */}
                  <li className="menu-item font-cart">
                    <Link href={`/${locale}/inquiry`}>
                      <i className="fa fa-shopping-cart" aria-hidden="true" style={{ fontSize: '18px' }}></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>

            {/* Mobile navigation drawer — visible only on mobile via CSS */}
            <div className="so-mobilenav-mobile mobile-nav-wrapper">
              <MobileNav
                locale={locale}
                menuItems={mobileMenuItems as any}
                menuLabel={translations.menu}
                cartLink={`/${locale}/inquiry`}
              />
            </div>
          </header>

          {/* Main Body */}
          <main id="main" className="site-main">
            <div className="full-container">{children}</div>
          </main>

          {/* Footer */}
          <footer id="colophon" className="site-footer" role="contentinfo">
            <div id="footer-widgets" className="full-container">
              <aside className="widget widget_siteorigin-panels-builder">
                <div className="footer-layout footer-grid-main">
                  
                  {/* Sitemap and contact details */}
                  <div className="footer-sitemap-grid">
                    {settings.navigationMenu && settings.navigationMenu.length > 0 ? (
                      <>
                        <div>
                          <h2 style={{ fontSize: '20px', color: '#ffffff', marginBottom: '15px' }}>{translations.sitemap}</h2>
                          {settings.navigationMenu.slice(0, Math.ceil(settings.navigationMenu.length / 2)).map((item: any, idx: number) => (
                            <React.Fragment key={idx}>
                              <h3 style={{ fontSize: '15px', color: '#ffffff', margin: '10px 0 5px 0' }}>
                                <Link href={resolveLink(item.link, locale)}>{item.label}</Link>
                              </h3>
                              {item.subMenuItems?.map((sub: any, subIdx: number) => (
                                <p style={{ margin: '3px 0' }} key={subIdx}>
                                  <Link href={resolveLink(sub.link, locale)}>{sub.label}</Link>
                                </p>
                              ))}
                            </React.Fragment>
                          ))}
                        </div>
                        <div>
                          <div style={{ height: '38px' }}></div> {/* Spacer to align with sitemap header */}
                          {settings.navigationMenu.slice(Math.ceil(settings.navigationMenu.length / 2)).map((item: any, idx: number) => (
                            <React.Fragment key={idx}>
                              <h3 style={{ fontSize: '15px', color: '#ffffff', margin: '10px 0 5px 0' }}>
                                <Link href={resolveLink(item.link, locale)}>{item.label}</Link>
                              </h3>
                              {item.subMenuItems?.map((sub: any, subIdx: number) => (
                                <p style={{ margin: '3px 0' }} key={subIdx}>
                                  <Link href={resolveLink(sub.link, locale)}>{sub.label}</Link>
                                </p>
                              ))}
                            </React.Fragment>
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <h2 style={{ fontSize: '20px', color: '#ffffff', marginBottom: '15px' }}>{translations.sitemap}</h2>
                          <h3 style={{ fontSize: '15px', color: '#ffffff', margin: '10px 0 5px 0' }}>
                            <Link href={`/${locale}`}>{translations.home}</Link>
                          </h3>
                          <p style={{ margin: '3px 0' }}><Link href={`/${locale}/about-us`}>{translations.about}</Link></p>
                          
                          <h3 style={{ fontSize: '15px', color: '#ffffff', margin: '10px 0 5px 0' }}>
                            <Link href={`/${locale}/services/hk-company`}>{translations.incorporation}</Link>
                          </h3>
                          <p style={{ margin: '3px 0' }}><Link href={`/${locale}/services/hk-company`}>{translations.hk_incorporation}</Link></p>
                          <p style={{ margin: '3px 0' }}><Link href={`/${locale}/services/china-company`}>{translations.cn_incorporation}</Link></p>
                          <p style={{ margin: '3px 0' }}><Link href={`/${locale}/services/bvi-company`}>{translations.bvi_incorporation}</Link></p>
                          
                          <h3 style={{ fontSize: '15px', color: '#ffffff', margin: '10px 0 5px 0' }}>{translations.ip}</h3>
                          <p style={{ margin: '3px 0' }}><Link href={`/${locale}/services/trademark-ip`}>{translations.trademark}</Link></p>
                          <p style={{ margin: '3px 0' }}><Link href={`/${locale}/services/business-search`}>{translations.search}</Link></p>
                        </div>

                        <div>
                          <h3 style={{ fontSize: '15px', color: '#ffffff', margin: '10px 0 5px 0' }}>{translations.corporate_services}</h3>
                          <p style={{ margin: '3px 0' }}><Link href={`/${locale}/services/company-secretary`}>{translations.secretary}</Link></p>
                          <p style={{ margin: '3px 0' }}><Link href={`/${locale}/services/notarization`}>{translations.notarization}</Link></p>
                          <p style={{ margin: '3px 0' }}><Link href={`/${locale}/services/bank-account`}>{translations.bank}</Link></p>
                          <p style={{ margin: '3px 0' }}><Link href={`/${locale}/services/accounting-tax`}>{translations.accounting}</Link></p>
                          <p style={{ margin: '3px 0' }}><Link href={`/${locale}/services/virtual-office`}>{translations.virtual}</Link></p>
                          
                          <h3 style={{ fontSize: '15px', color: '#ffffff', margin: '15px 0 5px 0' }}>
                            <Link href={`/${locale}/inquiry`}>{translations.contact}</Link>
                          </h3>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Headquarters Address info & Maps */}
                  <div>
                    <h2 style={{ fontSize: '20px', color: '#ffffff', marginBottom: '15px' }}>{translations.headquarters}</h2>
                    <p style={{ fontSize: '13px', lineHeight: '1.6', marginBottom: '10px' }}>{settings.hkAddress}</p>
                    <p style={{ fontSize: '13px', margin: '4px 0' }}>
                      <span style={{ fontWeight: 'bold', color: '#91d401' }}>{translations.tel}:</span>
                      <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} style={{ color: '#ffffff' }}> {settings.phone}</a>
                    </p>
                    <p style={{ fontSize: '13px', margin: '4px 0' }}>
                      <span style={{ fontWeight: 'bold', color: '#91d401' }}>{translations.fax}:</span> +852 3521 2800
                    </p>
                    <p style={{ fontSize: '13px', margin: '4px 0' }}>
                      <span style={{ fontWeight: 'bold', color: '#91d401' }}>{translations.email}:</span>
                      <a href={`mailto:${settings.email}`} style={{ color: '#ffffff' }}> {settings.email}</a>
                    </p>
                    
                    <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.15)', margin: '15px 0' }} />
                  </div>
                </div>

                {/* Google map iframe and Social Buttons */}
                <div className="footer-grid-bottom">
                  <div>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.8047605488605!2d114.15087962632818!3d22.28538442969746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x340401b2adec8d11%3A0xfe43c7408e20e61a!2z5paw57qq5YWD5buj5Z-4!5e0!3m2!1sen!2smy!4v1732873583872!5m2!1sen!2smy"
                      width="100%"
                      height="200"
                      style={{ border: 0, borderRadius: '4px' }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div className="social-links" style={{ display: 'flex', gap: '10px' }}>
                      <a href="https://www.facebook.com/companysetting/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '4px', backgroundColor: '#3b5998', color: '#ffffff' }}>
                        <i className="fa fa-facebook"></i>
                      </a>
                      <a href="https://twitter.com/WinyuIP" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '4px', backgroundColor: '#1da1f2', color: '#ffffff' }}>
                        <i className="fa fa-twitter"></i>
                      </a>
                      <a href="https://www.linkedin.com/company/winyu-intellectual-property-limited/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '4px', backgroundColor: '#0077b5', color: '#ffffff' }}>
                        <i className="fa fa-linkedin"></i>
                      </a>
                    </div>
                    
                    <div className="compliance-logos" style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                      <img src="/wp-content/uploads/2023/02/Good-MPF-Employer-300x137.png" alt="Good MPF Employer" style={{ height: '50px', width: 'auto' }} />
                      <img src="/wp-content/uploads/2023/02/AIP-caring-company-logo-2017-2021-300x139.png" alt="Caring Company" style={{ height: '50px', width: 'auto' }} />
                      <img src="/wp-content/uploads/2023/02/TSB_logo_all-300x54.png" alt="TSB Logo" style={{ height: '28px', width: 'auto', marginTop: '11px' }} />
                    </div>
                  </div>
                </div>
              </aside>
            </div>

            <div id="site-info">
              <div className="full-container" style={{ textAlign: 'center', fontSize: '13px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '15px', marginTop: '20px' }}>
                Copyright &copy; {new Date().getFullYear()} {settings.companyName}. All Rights Reserved.
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
