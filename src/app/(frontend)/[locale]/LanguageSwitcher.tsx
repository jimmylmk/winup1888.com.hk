'use client'

import React from 'react'
import { useRouter, usePathname } from 'next/navigation'

interface LanguageSwitcherProps {
  currentLocale: string
}

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value
    
    // Split the pathname by '/'
    // e.g. "/zh-HK/services/hk-company-incorporation" -> ["", "zh-HK", "services", "hk-company-incorporation"]
    const segments = pathname.split('/')
    if (segments.length > 1) {
      segments[1] = newLocale
      const newPath = segments.join('/')
      router.push(newPath)
    } else {
      router.push(`/${newLocale}`)
    }
  }

  return (
    <div className="polylang-switcher-wrapper" style={{ display: 'inline-block' }}>
      <label className="screen-reader-text" htmlFor="lang_choice" style={{ display: 'none' }}>
        Choose a language
      </label>
      <select
        name="lang_choice"
        id="lang_choice"
        className="pll-switcher-select lang-switcher-select"
        value={currentLocale}
        onChange={handleLanguageChange}
        style={{
          border: 'none',
          borderBottom: '1px solid #919191',
          backgroundColor: 'transparent',
          width: '100px',
          fontSize: '13px',
          padding: '4px',
          color: '#333333',
          cursor: 'pointer',
          outline: 'none',
        }}
      >
        <option value="zh-HK">繁體中文</option>
        <option value="en">English</option>
        <option value="zh-CN">简体中文</option>
      </select>
    </div>
  )
}
