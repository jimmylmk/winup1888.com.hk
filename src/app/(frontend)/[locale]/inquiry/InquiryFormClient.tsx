'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { createInquiryAction } from './actions'

interface ServiceItem {
  id: string
  slug: string
  title: string
  shortDescription: string
}

interface ClientProps {
  services: ServiceItem[]
  locale: string
  formSettings?: {
    formTitle?: string
    formDescription?: string
    labelName?: string
    placeholderName?: string
    labelEmail?: string
    placeholderEmail?: string
    labelPhone?: string
    placeholderPhone?: string
    labelService?: string
    selectEmptyText?: string
    labelMessage?: string
    placeholderMessage?: string
    submitBtnText?: string
    submittingText?: string
    successTitle?: string
    successDescription?: string
    successBackBtnText?: string
    serviceHints?: {
      serviceSlug: string
      hintText: string
    }[]
  }
}

export default function InquiryFormClient({ services, locale, formSettings }: ClientProps) {
  const searchParams = useSearchParams()
  
  // Form field states
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [selectedService, setSelectedService] = useState('')
  const [message, setMessage] = useState('')
  
  // System states
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  // Read URL query param on mount
  useEffect(() => {
    const serviceParam = searchParams.get('service')
    if (serviceParam) {
      const match = services.find(s => s.slug === serviceParam)
      if (match) {
        setSelectedService(serviceParam)
      }
    }
    const planParam = searchParams.get('plan')
    const priceParam = searchParams.get('price')
    if (planParam) {
      const displayPrice = priceParam ? ` (HKD $${priceParam})` : ''
      setMessage(locale === 'en' 
        ? `Hello, I would like to inquire about: "${planParam}"${displayPrice}. Please provide more details.`
        : `你好，我想諮詢有關「${planParam}」${displayPrice} 的服務，請提供詳細方案。`
      )
    }
  }, [searchParams, services, locale])

  // Multi-lingual translations
  const langText: Record<string, any> = {
    'zh-HK': {
      form_title: '在線提交詢價',
      form_desc: '請填寫您的基本資訊與需求，我們將儘快對接。',
      label_name: '您的姓名 / 聯絡人',
      label_email: '電子信箱 (Email)',
      label_phone: '聯絡電話 / 手機',
      label_service: '感興趣的服務項目',
      label_message: '您的具體需求 / 備註資訊',
      placeholder_name: '請輸入您的姓名',
      placeholder_email: 'example@company.com',
      placeholder_phone: '例如：+852 9876 5432',
      placeholder_message: '請簡述您的需求，如：預計註冊香港公司的股東人數、是否需要開立銀行帳戶、會計審計的營業額規模等。',
      submit_btn: '送出詢盤資訊',
      submitting: '送出中...',
      refund_policy: '退款及送貨政策：所有服務不設退款，我們會於購買後廿四小時內有專人回覆。',
      success_title: '提交成功！',
      success_desc: '我們已收到您的詢價申請。專業顧問將在 24 小時內與您聯繫，請保持電話或郵件暢通。',
      success_back: '返回修改',
      select_empty: '-- 請選擇一項服務 --',
      hints: {
        'hk-company': '💡 香港公司註冊提示：一般只需 1-3 個工作天即可完成電子註冊。需準備身份證/護照、住址證明。',
        'company-secretary': '💡 公司秘書服務提示：香港法定要求每家公司必須委任一名香港常住居民或持有信託及公司服務提供者牌照的法人團體擔任公司秘書。',
        'accounting-tax': '💡 會計與審計提示：香港公司每年需進行一次利得稅申報與審計。我們可以協助進行做帳及配合註冊核數師出具審計報告。',
        'trademark-ip': '💡 全球商標註冊提示：商標保護具地域性，香港商標註冊一般需時 6-8 個月。我們可為您做免費的前期商標近似檢索。',
        'virtual-office': '💡 虛擬辦公室提示：提供政府認可的香港甲級商業註冊地址與代收信件/包裹服務，可按月或按年租用。'
      }
    },
    'zh-CN': {
      form_title: '在线提交询价',
      form_desc: '请填写您的基本信息与需求，我们将尽快对接。',
      label_name: '您的姓名 / 联系人',
      label_email: '电子邮箱 (Email)',
      label_phone: '联系电话 / 手机',
      label_service: '感兴趣的服务项目',
      label_message: '您的具体需求 / 备注信息',
      placeholder_name: '请输入您的姓名',
      placeholder_email: 'example@company.com',
      placeholder_phone: '例如：+86 138 0000 0000',
      placeholder_message: '请简述您的需求，如：预计注册香港公司的股东人数、是否需要开立银行账户、会计审计的营业额规模等。',
      submit_btn: '提交询盘信息',
      submitting: '提交中...',
      refund_policy: '退款及送货政策：所有服务不设退款，我们会在购买后二十四小时内有专人回复。',
      success_title: '提交成功！',
      success_desc: '我们收到您的询价申请。专业顾问将在 24 小时内与您联系，请保持电话或邮件畅通。',
      success_back: '返回修改',
      select_empty: '-- 请选择一项服务 --',
      hints: {
        'hk-company': '💡 香港公司注册提示：一般只需 1-3 个工作天即可完成电子注册。需准备身份证/护照、住址证明。',
        'company-secretary': '💡 公司秘书服务提示：香港法定要求每家公司必须委任一名香港常住居民或持有信托及公司服务提供者牌照的法人团体担任公司秘书。',
        'accounting-tax': '💡 会计与审计提示：香港公司每年需进行一次利得税申报与审计。我们可以协助进行做账及配合注册核数师出具审计报告。',
        'trademark-ip': '💡 全球商标注册提示：商标保护具地域性，香港商标注册一般需时 6-8 个月。我们可为您做免费的前期商标近似检索。',
        'virtual-office': '💡 虚拟办公室提示：提供政府合规注册地址与代收信件/包裹服务，可按月或按年租用。'
      }
    },
    'en': {
      form_title: 'Submit Inquiry Online',
      form_desc: 'Please fill in your contact information and requirements, and we will connect with you shortly.',
      label_name: 'Your Name / Contact Person',
      label_email: 'Email Address',
      label_phone: 'Phone / Mobile',
      label_service: 'Service of Interest',
      label_message: 'Your Specific Requirements / Notes',
      placeholder_name: 'Please enter your name',
      placeholder_email: 'example@company.com',
      placeholder_phone: 'e.g. +852 9876 5432 or +1 234 567 890',
      placeholder_message: 'Please briefly describe your needs, e.g. number of shareholders for HK incorporation, bank account opening needs, scale of annual revenue for auditing, etc.',
      submit_btn: 'Submit Inquiry',
      submitting: 'Submitting...',
      refund_policy: 'Refund & Delivery Policy: All services are non-refundable. Our specialist will reply to you within 24 hours of purchase.',
      success_title: 'Submitted Successfully!',
      success_desc: 'We have received your inquiry. A professional consultant will contact you within 24 hours. Please keep your phone or email available.',
      success_back: 'Back to Edit',
      select_empty: '-- Select a Service --',
      hints: {
        'hk-company': '💡 HK Company Registry Tip: E-incorporation typically takes 1-3 business days. Require passport/ID copy and proof of residential address.',
        'company-secretary': '💡 Co. Sec. Tip: Under HK law, every local company must appoint a company secretary who is an HK resident or a licensed trust/corporate service provider.',
        'accounting-tax': '💡 Accounting & Tax Tip: HK companies must perform auditing and profits tax filing annually. We handle accounts preparation and coordinate with auditors.',
        'trademark-ip': '💡 Trademark Tip: Trademark rights are territorial. HK trademark filing takes 6-8 months. Free preliminary similarity search is provided by us.',
        'virtual-office': '💡 Virtual Office Tip: Registered office address compliant with government requirements and mail handling. Flexible monthly or annual terms.'
      }
    }
  }

  const text = langText[locale] || langText['zh-HK']

  // Resolve values dynamically from Payload CMS settings if provided, else fall back to local hardcoded translations
  const formTitle = formSettings?.formTitle || text.form_title
  const formDesc = formSettings?.formDescription || text.form_desc
  const labelName = formSettings?.labelName || text.label_name
  const placeholderName = formSettings?.placeholderName || text.placeholder_name
  const labelEmail = formSettings?.labelEmail || text.label_email
  const placeholderEmail = formSettings?.placeholderEmail || text.placeholder_email
  const labelPhone = formSettings?.labelPhone || text.label_phone
  const placeholderPhone = formSettings?.placeholderPhone || text.placeholder_phone
  const labelService = formSettings?.labelService || text.label_service
  const selectEmpty = formSettings?.selectEmptyText || text.select_empty
  const labelMessage = formSettings?.labelMessage || text.label_message
  const placeholderMessage = formSettings?.placeholderMessage || text.placeholder_message
  const submitBtn = formSettings?.submitBtnText || text.submit_btn
  const submitting = formSettings?.submittingText || text.submitting
  const successTitleText = formSettings?.successTitle || text.success_title
  const successDescText = formSettings?.successDescription || text.success_desc
  const successBack = formSettings?.successBackBtnText || text.success_back

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMsg('')

    const result = await createInquiryAction({
      name,
      email,
      phone,
      serviceSlug: selectedService,
      message
    })

    setIsSubmitting(false)
    if (result.success) {
      setIsSuccess(true)
    } else {
      setErrorMsg(locale === 'en' ? 'Submission failed, please try again.' : '提交失敗，請重試。')
    }
  }

  const handleReset = () => {
    setIsSuccess(false)
    setName('')
    setEmail('')
    setPhone('')
    setSelectedService('')
    setMessage('')
  }

  // Find dynamic hint in page properties, otherwise fallback to local hardcoded strings
  const activeHint = selectedService 
    ? (formSettings?.serviceHints?.find(h => h.serviceSlug === selectedService)?.hintText || text.hints[selectedService])
    : ''

  return (
    <section className="form-section">
      <h2 className="form-title">{formTitle}</h2>
      <p className="form-subtitle">{formDesc}</p>
      
      {errorMsg && <div className="form-error-banner">{errorMsg}</div>}

      <form onSubmit={handleSubmit} className="inquiry-form">
        {/* Name */}
        <div className="form-group">
          <label className="form-label" htmlFor="name-input">{labelName}</label>
          <div className="input-wrapper">
            <div className="input-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <input 
              type="text" 
              id="name-input" 
              className="form-input" 
              placeholder={placeholderName} 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
              autoComplete="name"
            />
          </div>
        </div>
        
        {/* Email */}
        <div className="form-group">
          <label className="form-label" htmlFor="email-input">{labelEmail}</label>
          <div className="input-wrapper">
            <div className="input-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <input 
              type="email" 
              id="email-input" 
              className="form-input" 
              placeholder={placeholderEmail} 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              autoComplete="email"
            />
          </div>
        </div>
        
        {/* Phone */}
        <div className="form-group">
          <label className="form-label" htmlFor="phone-input">{labelPhone}</label>
          <div className="input-wrapper">
            <div className="input-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <input 
              type="tel" 
              id="phone-input" 
              className="form-input" 
              placeholder={placeholderPhone} 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required 
              autoComplete="tel"
            />
          </div>
        </div>
        
        {/* Service Dropdown Selection */}
        <div className="form-group">
          <label className="form-label" htmlFor="service-select">{labelService}</label>
          <div className="input-wrapper">
            <div className="input-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
            </div>
            <select 
              id="service-select" 
              className="form-select"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
            >
              <option value="">{selectEmpty}</option>
              {services.map((service) => (
                <option key={service.id} value={service.slug}>
                  {service.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Service Hint Banner */}
        {selectedService && activeHint && (
          <div className="service-hint-visible" id="service-hint">
            {activeHint}
          </div>
        )}
        
        {/* Message */}
        <div className="form-group">
          <label className="form-label" htmlFor="message-input">{labelMessage}</label>
          <textarea 
            id="message-input" 
            className="form-textarea" 
            placeholder={placeholderMessage}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        
        {/* Submit */}
        <button type="submit" disabled={isSubmitting} className="submit-btn">
          <span>{isSubmitting ? submitting : submitBtn}</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </button>

        <div style={{ marginTop: '15px', fontSize: '13px', color: '#666', lineHeight: '1.5' }}>
          {text.refund_policy}
        </div>
      </form>

      {/* Success Overlay Screen */}
      <div id="successOverlay" className={`success-overlay ${isSuccess ? 'active' : ''}`}>
        <div className="success-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h3 className="success-title">{successTitleText}</h3>
        <p className="success-desc">{successDescText}</p>
        <button type="button" onClick={handleReset} className="success-btn">
          <span>{successBack}</span>
        </button>
      </div>
    </section>
  )
}
