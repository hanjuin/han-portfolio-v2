import { useState, useEffect } from 'react'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Gallery', href: '#gallery' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? 'rgba(7,11,20,0.85)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(30,41,59,0.8)' : '1px solid transparent',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
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
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans text-sm px-3 py-2 rounded-lg text-slate-400 transition-colors duration-150 hover:text-white hover:bg-white/5"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Resume button */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/pdf/Han_Juin_Wong_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm"
          >
            Resume
          </a>
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
          style={{ background: 'rgba(7,11,20,0.95)', backdropFilter: 'blur(16px)' }}
        >
          <div className="px-6 py-4 flex flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/pdf/Han_Juin_Wong_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-center mt-3"
            >
              Resume
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
