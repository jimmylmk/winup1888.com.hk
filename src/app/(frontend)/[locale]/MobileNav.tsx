'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

interface NavItem {
  label: string
  link: string
  subMenuItems?: SubNavItem[]
}

interface SubNavItem {
  label: string
  link: string
  nestedMenuItems?: NestedNavItem[]
}

interface NestedNavItem {
  label: string
  link: string
}

interface MobileNavProps {
  locale: string
  menuItems: NavItem[]
  menuLabel?: string
  cartLink: string
}

type DrawerLevel = 'top' | 'sub' | 'nested'

export default function MobileNav({ locale, menuItems, menuLabel = 'Menu', cartLink }: MobileNavProps) {
  // Inline link resolver — mirrors the server-side resolveLink logic
  const resolveLink = (link: string, loc: string): string => {
    if (!link) return `/${loc}`
    if (
      link.startsWith('http://') ||
      link.startsWith('https://') ||
      link.startsWith('#') ||
      link.startsWith('mailto:') ||
      link.startsWith('tel:')
    ) {
      return link
    }
    const normalizedLink = link.startsWith('/') ? link : `/${link}`
    if (normalizedLink.startsWith(`/${loc}/`) || normalizedLink === `/${loc}`) {
      return normalizedLink
    }
    return `/${loc}${normalizedLink}`
  }
  const [isOpen, setIsOpen] = useState(false)
  const [level, setLevel] = useState<DrawerLevel>('top')
  const [activeParent, setActiveParent] = useState<NavItem | null>(null)
  const [activeSubParent, setActiveSubParent] = useState<SubNavItem | null>(null)

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const openDrawer = () => {
    setIsOpen(true)
    setLevel('top')
    setActiveParent(null)
    setActiveSubParent(null)
  }

  const closeDrawer = () => {
    setIsOpen(false)
    setTimeout(() => {
      setLevel('top')
      setActiveParent(null)
      setActiveSubParent(null)
    }, 300)
  }

  const goBack = () => {
    if (level === 'nested') {
      setLevel('sub')
      setActiveSubParent(null)
    } else {
      setLevel('top')
      setActiveParent(null)
    }
  }

  const handleTopItemClick = (item: NavItem) => {
    if (item.subMenuItems && item.subMenuItems.length > 0) {
      setActiveParent(item)
      setLevel('sub')
    } else {
      closeDrawer()
    }
  }

  const handleSubItemClick = (subItem: SubNavItem) => {
    if (subItem.nestedMenuItems && subItem.nestedMenuItems.length > 0) {
      setActiveSubParent(subItem)
      setLevel('nested')
    } else {
      closeDrawer()
    }
  }

  const currentTitle = level === 'nested' && activeSubParent
    ? activeSubParent.label
    : level === 'sub' && activeParent
    ? activeParent.label
    : menuLabel

  return (
    <>
      {/* Hamburger / Menu Button — visible only on mobile */}
      <button
        id="mobile-nav-toggle"
        className="mobile-nav-toggle"
        onClick={openDrawer}
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
      >
        <span className="mobile-nav-toggle-icon">
          <span></span>
          <span></span>
          <span></span>
        </span>
        <span className="mobile-nav-toggle-text">{menuLabel}</span>
      </button>

      {/* Full-screen Overlay Backdrop */}
      <div
        className={`mobile-nav-backdrop ${isOpen ? 'active' : ''}`}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Slide-in Navigation Drawer */}
      <div
        className={`mobile-nav-drawer ${isOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Drawer Title Bar */}
        <div className="mobile-nav-titlebar">
          {level !== 'top' && (
            <button className="mobile-nav-back" onClick={goBack} aria-label="Go back">
              <i className="fa fa-chevron-left" aria-hidden="true" />
              <span>Back</span>
            </button>
          )}
          <h3 className="mobile-nav-title">{currentTitle}</h3>
          <button className="mobile-nav-close" onClick={closeDrawer} aria-label="Close menu">
            <i className="fa fa-times" aria-hidden="true" />
          </button>
        </div>

        {/* TOP LEVEL Items */}
        {level === 'top' && (
          <ul className="mobile-nav-list">
            {menuItems.map((item, idx) => (
              <li key={idx} className="mobile-nav-item">
                {item.subMenuItems && item.subMenuItems.length > 0 ? (
                  <button
                    className="mobile-nav-link mobile-nav-link--has-children"
                    onClick={() => handleTopItemClick(item)}
                  >
                    <span>{item.label}</span>
                    <i className="fa fa-chevron-right" aria-hidden="true" />
                  </button>
                ) : (
                  <Link
                    href={resolveLink(item.link, locale)}
                    className="mobile-nav-link"
                    onClick={closeDrawer}
                  >
                    <span>{item.label}</span>
                  </Link>
                )}
              </li>
            ))}
            {/* Cart / Inquiry */}
            <li className="mobile-nav-item mobile-nav-item--cart">
              <Link href={cartLink} className="mobile-nav-link" onClick={closeDrawer}>
                <i className="fa fa-shopping-cart" aria-hidden="true" style={{ marginRight: '8px' }} />
                <span>Inquiry / 查詢</span>
              </Link>
            </li>
          </ul>
        )}

        {/* SUB LEVEL Items */}
        {level === 'sub' && activeParent && (
          <ul className="mobile-nav-list">
            {/* First item links to parent page */}
            <li className="mobile-nav-item mobile-nav-item--parent-link">
              <Link
                href={resolveLink(activeParent.link, locale)}
                className="mobile-nav-link mobile-nav-link--overview"
                onClick={closeDrawer}
              >
                <span>{activeParent.label} — Overview</span>
              </Link>
            </li>
            {activeParent.subMenuItems?.map((subItem, subIdx) => (
              <li key={subIdx} className="mobile-nav-item">
                {subItem.nestedMenuItems && subItem.nestedMenuItems.length > 0 ? (
                  <button
                    className="mobile-nav-link mobile-nav-link--has-children"
                    onClick={() => handleSubItemClick(subItem)}
                  >
                    <span>{subItem.label}</span>
                    <i className="fa fa-chevron-right" aria-hidden="true" />
                  </button>
                ) : (
                  <Link
                    href={resolveLink(subItem.link, locale)}
                    className="mobile-nav-link"
                    onClick={closeDrawer}
                  >
                    <span>{subItem.label}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        )}

        {/* NESTED LEVEL Items */}
        {level === 'nested' && activeSubParent && (
          <ul className="mobile-nav-list">
            <li className="mobile-nav-item mobile-nav-item--parent-link">
              <Link
                href={resolveLink(activeSubParent.link, locale)}
                className="mobile-nav-link mobile-nav-link--overview"
                onClick={closeDrawer}
              >
                <span>{activeSubParent.label} — Overview</span>
              </Link>
            </li>
            {activeSubParent.nestedMenuItems?.map((nestedItem, nIdx) => (
              <li key={nIdx} className="mobile-nav-item">
                <Link
                  href={resolveLink(nestedItem.link, locale)}
                  className="mobile-nav-link"
                  onClick={closeDrawer}
                >
                  <span>{nestedItem.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}
