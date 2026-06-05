'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

export default function HomeSlider({ slides, locale, ui }: { slides: any[]; locale: string; ui: any }) {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (slides.length <= 1) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [slides.length])

  if (!slides || slides.length === 0) return null

  const formattedSlides = slides.map((slide) => {
    const buttons = []

    const resolveSlideLink = (link: string | undefined) => {
      if (!link) return `/${locale}`
      // Absolute URLs, anchors, mailto, tel — use as-is
      if (link.startsWith('http://') || link.startsWith('https://') || link.startsWith('#') || link.startsWith('mailto:') || link.startsWith('tel:')) {
        return link
      }
      const normalized = link.startsWith('/') ? link : `/${link}`
      // Already has locale prefix
      if (normalized.startsWith(`/${locale}/`) || normalized === `/${locale}`) {
        return normalized
      }
      return `/${locale}${normalized}`
    }

    if (slide.button1Text) {
      buttons.push({
        label: slide.button1Text,
        href: resolveSlideLink(slide.button1Link),
        primary: true
      })
    }
    if (slide.button2Text) {
      buttons.push({
        label: slide.button2Text,
        href: resolveSlideLink(slide.button2Link),
        primary: false
      })
    }
    const bgImageUrl = slide.backgroundImage && typeof slide.backgroundImage === 'object' && slide.backgroundImage.url 
      ? slide.backgroundImage.url 
      : '/wp-content/uploads/2017/12/winyu-banner01.jpg'

    return {
      img: bgImageUrl,
      title: slide.title,
      subtitle: slide.subtitle,
      desc: slide.description,
      buttons
    }
  })

  return (
    <div className="custom-slider" style={{ position: 'relative', overflow: 'hidden', height: '420px', borderRadius: '4px', margin: '0 -15px' }}>
      {formattedSlides.map((slide, index) => (
        <div
          key={index}
          className={`custom-slide ${index === currentSlide ? 'active' : ''}`}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${slide.img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            opacity: index === currentSlide ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
            zIndex: index === currentSlide ? 1 : 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff'
          }}
        >
          {index === currentSlide && (
            <div className="uk-text-center" style={{ width: '80%', maxWidth: '800px' }}>
              <h1 style={{ color: '#ffffff', fontSize: '36px', fontWeight: 'bold', letterSpacing: '2px', textShadow: '0 2px 8px rgba(0,0,0,0.5)', margin: '5px 0' }}>
                {slide.title}
                {slide.subtitle && (
                  <>
                    <br />
                    <span style={{ fontSize: '24px', fontWeight: '300' }}>{slide.subtitle}</span>
                  </>
                )}
              </h1>
              {slide.desc && (
                <p style={{ color: '#ffffff', fontSize: '15px', textShadow: '0 1px 4px rgba(0,0,0,0.5)', margin: '15px 0 25px 0' }}>
                  {slide.desc}
                </p>
              )}
              <div>
                {slide.buttons.map((btn, btnIdx) => (
                  <Link
                    key={btnIdx}
                    className={`banner-button ${btn.primary ? 'button1' : 'button2'}`}
                    href={btn.href}
                    style={{ marginLeft: btnIdx > 0 ? '15px' : '0' }}
                  >
                    {btn.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
      
      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
            style={{
              position: 'absolute',
              left: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.4)',
              border: 'none',
              color: '#ffffff',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              cursor: 'pointer',
              zIndex: 10,
              fontSize: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              outline: 'none'
            }}
          >
            &#10094;
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            style={{
              position: 'absolute',
              right: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.4)',
              border: 'none',
              color: '#ffffff',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              cursor: 'pointer',
              zIndex: 10,
              fontSize: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              outline: 'none'
            }}
          >
            &#10095;
          </button>
        </>
      )}
    </div>
  )
}
