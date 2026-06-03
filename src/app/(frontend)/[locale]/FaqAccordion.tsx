'use client'

import React, { useState } from 'react'

interface FaqItem {
  question?: string
  answer?: string
  q?: string
  a?: string
}

interface FaqAccordionProps {
  faqs: FaqItem[]
  faqTitle: string
}

export default function FaqAccordion({ faqs, faqTitle }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  if (!faqs || faqs.length === 0) return null

  return (
    <div id="faq" style={{ padding: '30px 0' }}>
      <h2 style={{ fontSize: '24px', color: '#002b66', fontWeight: 'bold', marginBottom: '20px', borderBottom: '2px solid #e5e5e5', paddingBottom: '10px' }}>
        {faqTitle}
      </h2>
      
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index
          const questionText = faq.question || faq.q || ''
          const answerText = faq.answer || faq.a || ''

          return (
            <li
              key={index}
              style={{
                borderBottom: '1px solid #e5e5e5',
                paddingBottom: '15px',
                marginBottom: '15px'
              }}
            >
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); toggleIndex(index); }}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '15px',
                  color: '#002b66',
                  fontWeight: '600',
                  textDecoration: 'none'
                }}
              >
                <span>{questionText}</span>
                <span style={{ fontSize: '18px', fontWeight: 'normal' }}>
                  {isOpen ? '−' : '+'}
                </span>
              </a>
              {isOpen && (
                <div
                  style={{
                    padding: '15px 10px 10px 10px',
                    fontSize: '14px',
                    color: '#5b5b5e',
                    lineHeight: '1.8',
                    animation: 'fadeIn 0.3s ease',
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  <p>{answerText}</p>
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
