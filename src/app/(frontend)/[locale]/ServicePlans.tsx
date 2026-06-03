'use client'

import React, { useState } from 'react'
import Link from 'next/link'

interface Plan {
  title: string
  price: string
  features?: Array<{ feature?: string }>
  inquiryPlanName?: string
  moreLink?: string
}

interface ServicePlansProps {
  locale: string
  ui: any
  tabTitles: {
    tabHkTitle: string
    tabOffshoreTitle: string
    tabTrademarkTitle: string
  }
  hkPlans: Plan[]
  offshorePlans: Plan[]
  trademarkPlans: Plan[]
}

export default function ServicePlans({
  locale,
  ui,
  tabTitles,
  hkPlans,
  offshorePlans,
  trademarkPlans
}: ServicePlansProps) {
  const [activeTab, setActiveTab] = useState(0)

  // Strip non-digit characters for price query parameters
  const cleanPrice = (priceStr: string) => {
    return priceStr.replace(/[^\d]/g, '')
  }

  return (
    <div id="service-plan" style={{ paddingBottom: '40px' }}>
      <ul className="tab-headers" style={{ display: 'flex', listStyle: 'none', borderBottom: '1px solid #dddddd', marginBottom: '30px', flexWrap: 'wrap', paddingLeft: 0 }}>
        <li style={{ marginRight: '5px' }} className={activeTab === 0 ? 'uk-active' : ''}>
          <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab(0); }}>{tabTitles.tabHkTitle}</a>
        </li>
        <li style={{ marginRight: '5px' }} className={activeTab === 1 ? 'uk-active' : ''}>
          <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab(1); }}>{tabTitles.tabOffshoreTitle}</a>
        </li>
        <li style={{ marginRight: '5px' }} className={activeTab === 2 ? 'uk-active' : ''}>
          <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab(2); }}>{tabTitles.tabTrademarkTitle}</a>
        </li>
      </ul>

      <div className="tab-contents">
        {/* Tab 1: Hong Kong Company Registration */}
        {activeTab === 0 && (
          <div className="uk-grid uk-grid-small uk-child-width-1-4@l uk-child-width-1-2@m" style={{ display: 'flex', flexWrap: 'wrap', margin: '0 -10px' }}>
            {hkPlans.map((plan, idx) => (
              <div key={idx} className="card-wrapper" style={{ flex: '1 1 21%', minWidth: '240px', padding: '0 10px', marginBottom: '20px' }}>
                <div className="uk-card">
                  <div className="uk-card-header">
                    <h3 className="uk-card-title" dangerouslySetInnerHTML={{ __html: plan.title.replace(/\+/g, '+<br/>').replace(/\s+/g, '<br/>') }}></h3>
                    <p>${plan.price}</p>
                  </div>
                  <div className="uk-card-body">
                    {plan.features?.map((f, fIdx) => (
                      <p key={fIdx}>{f.feature}</p>
                    ))}
                  </div>
                  <div className="uk-card-footer">
                    <Link className="wspsc_add_cart_submit" href={`/${locale}/inquiry?service=hk-company&plan=${encodeURIComponent(plan.inquiryPlanName || plan.title)}&price=${cleanPrice(plan.price)}`}>
                      {ui.add_to_cart}
                    </Link>
                    <Link className="more" href={plan.moreLink ? (plan.moreLink.startsWith('/') ? plan.moreLink : `/${locale}${plan.moreLink}`) : `/${locale}/services/hk-company`}>
                      {ui.inquire_more}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Offshore Company Registry */}
        {activeTab === 1 && (
          <div className="uk-grid uk-grid-small uk-child-width-1-4@m" style={{ display: 'flex', flexWrap: 'wrap', margin: '0 -10px' }}>
            {offshorePlans.map((plan, idx) => (
              <div key={idx} className="card-wrapper" style={{ flex: '1 1 21%', minWidth: '240px', padding: '0 10px', marginBottom: '20px' }}>
                <div className="uk-card">
                  <div className="uk-card-header">
                    <h3 className="uk-card-title" dangerouslySetInnerHTML={{ __html: plan.title.replace(/\+/g, '+<br/>').replace(/\s+/g, '<br/>') }}></h3>
                    <p>${plan.price}</p>
                  </div>
                  <div className="uk-card-body">
                    {plan.features?.map((f, fIdx) => (
                      <p key={fIdx}>{f.feature}</p>
                    ))}
                  </div>
                  <div className="uk-card-footer">
                    <Link className="wspsc_add_cart_submit" href={`/${locale}/inquiry?service=hk-company&plan=${encodeURIComponent(plan.inquiryPlanName || plan.title)}&price=${cleanPrice(plan.price)}`}>
                      {ui.add_to_cart}
                    </Link>
                    <Link className="more" href={plan.moreLink ? (plan.moreLink.startsWith('/') ? plan.moreLink : `/${locale}${plan.moreLink}`) : `/${locale}/inquiry?service=hk-company`}>
                      {ui.inquire_more}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Trademark Registry */}
        {activeTab === 2 && (
          <div className="uk-grid uk-grid-small uk-child-width-1-3@m" style={{ display: 'flex', flexWrap: 'wrap', margin: '0 -10px' }}>
            {trademarkPlans.map((plan, idx) => (
              <div key={idx} className="card-wrapper" style={{ flex: '1 1 30%', minWidth: '240px', padding: '0 10px', marginBottom: '20px' }}>
                <div className="uk-card" id="trademark">
                  <div className="uk-card-header">
                    <h3 className="uk-card-title" dangerouslySetInnerHTML={{ __html: plan.title.replace(/\s+/g, '<br/>') }}></h3>
                    <p>${plan.price}</p>
                  </div>
                  <div className="uk-card-body">
                    {plan.features?.map((f, fIdx) => (
                      <p key={fIdx}>{f.feature}</p>
                    ))}
                  </div>
                  <div className="uk-card-footer">
                    <Link className="wspsc_add_cart_submit" href={`/${locale}/inquiry?service=trademark-ip&plan=${encodeURIComponent(plan.inquiryPlanName || plan.title)}&price=${cleanPrice(plan.price)}`}>
                      {ui.add_to_cart}
                    </Link>
                    <Link className="more" href={plan.moreLink ? (plan.moreLink.startsWith('/') ? plan.moreLink : `/${locale}${plan.moreLink}`) : `/${locale}/services/trademark-ip`}>
                      {ui.inquire_more}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
