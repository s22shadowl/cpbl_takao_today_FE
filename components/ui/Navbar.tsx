// /components/ui/Navbar.tsx

'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from '@/components/ui/Icons'
import * as styles from './Navbar.css'

const navLinks = [
  { href: '/season-trends', label: '賽季趨勢' },
  { href: '/advanced-analysis', label: '進階數據分析' },
  { href: '/about', label: '關於本站' },
]

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  return (
    <header>
      <div
        className={styles.backdrop}
        data-state={isOpen ? 'open' : 'closed'}
        onClick={closeMenu}
        aria-hidden="true"
      />
      <nav className={styles.navContainer}>
        <Link href="/" className={styles.titleLink} onClick={closeMenu}>
          CPBL Stats
        </Link>
        <button
          className={styles.menuButton}
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
        <div className={styles.dropdownMenu} data-state={isOpen ? 'open' : 'closed'}>
          <ul className={styles.menuList}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.menuLink} onClick={closeMenu}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}
