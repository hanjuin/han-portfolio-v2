import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'

export default function BlogNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { light, toggleTheme } = useTheme()
  const location = useLocation()
  const isPost = location.pathname.startsWith('/blog/') && location.pathname !== '/blog/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'var(--navbar-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="font-display font-bold text-lg flex items-center gap-2 group"
          style={{ letterSpacing: '-0.02em' }}
        >
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-200 group-hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #2DD4BF, #0891B2)',
              color: '#070B14',
            }}
          >
            HJ
          </span>
          <span className="text-white hidden sm:block">Han Juin</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          <Link
            to="/"
            className="font-sans text-sm px-3 py-2 rounded-lg text-slate-400 transition-colors duration-150 hover:text-white hover:bg-white/5"
          >
            Portfolio
          </Link>
          <Link
            to="/blog"
            className="font-sans text-sm px-3 py-2 rounded-lg transition-colors duration-150 hover:text-white hover:bg-white/5"
            style={{ color: '#2DD4BF' }}
          >
            Blog
          </Link>
          {isPost && (
            <Link
              to="/blog"
              className="font-sans text-sm px-3 py-2 rounded-lg text-slate-400 transition-colors duration-150 hover:text-white hover:bg-white/5 flex items-center gap-1.5"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              All Posts
            </Link>
          )}
        </nav>

        {/* Theme toggle */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-colors duration-150"
          >
            {light ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            {menuOpen ? (
              <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            ) : (
              <path d="M3 5H17M3 10H17M3 15H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          className="md:hidden border-t border-border"
          style={{ background: 'var(--navbar-mobile-bg)', backdropFilter: 'blur(16px)' }}
        >
          <div className="px-6 py-4 flex flex-col gap-1">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="text-sm px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              Portfolio
            </Link>
            <Link
              to="/blog"
              onClick={() => setMenuOpen(false)}
              className="text-sm px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors"
              style={{ color: '#2DD4BF' }}
            >
              Blog
            </Link>
            {isPost && (
              <Link
                to="/blog"
                onClick={() => setMenuOpen(false)}
                className="text-sm px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-1.5"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                All Posts
              </Link>
            )}
            <div className="flex items-center gap-3 mt-3">
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="flex items-center gap-2 text-sm px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                {light ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5"/>
                    <line x1="12" y1="1" x2="12" y2="3"/>
                    <line x1="12" y1="21" x2="12" y2="23"/>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                    <line x1="1" y1="12" x2="3" y2="12"/>
                    <line x1="21" y1="12" x2="23" y2="12"/>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                  </svg>
                )}
                {light ? 'Dark mode' : 'Light mode'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
