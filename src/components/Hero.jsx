import aboutData from '../../resources/about.json'

const hero = aboutData[0].hero

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden hero-grid"
      style={{ paddingTop: '64px' }}
    >
      {/* Glow blobs */}
      <div
        className="glow-blob"
        style={{
          width: '600px',
          height: '600px',
          top: '-100px',
          left: '-150px',
          background: 'radial-gradient(circle, var(--glow-teal) 0%, transparent 70%)',
        }}
      />
      <div
        className="glow-blob"
        style={{
          width: '500px',
          height: '500px',
          bottom: '0',
          right: '-100px',
          background: 'radial-gradient(circle, var(--glow-indigo) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8 text-xs font-mono"
            style={{
              background: 'rgba(45,212,191,0.08)',
              border: '1px solid rgba(45,212,191,0.2)',
              color: '#2DD4BF',
              animation: 'fadeUp 0.6s ease 0.1s both',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse-slow"
              style={{ background: '#2DD4BF' }}
            />
            Open to opportunities
          </div>

          {/* Name */}
          <h1
            className="font-display font-extrabold text-white mb-4 leading-none"
            style={{
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              letterSpacing: '-0.04em',
              animation: 'fadeUp 0.6s ease 0.2s both',
            }}
          >
            Han Juin
            <br />
            <span style={{ color: '#2DD4BF' }}>Wong</span>
          </h1>

          {/* Role */}
          <p
            className="font-display font-semibold text-xl md:text-2xl text-slate-300 mb-6"
            style={{
              letterSpacing: '-0.02em',
              animation: 'fadeUp 0.6s ease 0.35s both',
            }}
          >
            AI Engineer &amp; Software Developer
          </p>

          {/* Tagline */}
          <p
            className="text-base md:text-lg text-slate-400 leading-relaxed mb-10 max-w-xl"
            style={{ animation: 'fadeUp 0.6s ease 0.45s both' }}
          >
            {hero}
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap gap-4"
            style={{ animation: 'fadeUp 0.6s ease 0.55s both' }}
          >
            <a href="#projects" className="btn-primary">
              View Projects
            </a>
            <a
              href="/pdf/Han_Juin_Wong_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Download CV
            </a>
          </div>

          {/* Social links */}
          <div
            className="flex items-center gap-4 mt-10"
            style={{ animation: 'fadeUp 0.6s ease 0.65s both' }}
          >
            <a
              href="https://github.com/hanjuin"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors duration-200"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              hanjuin
            </a>
            <span className="text-slate-700">·</span>
            <a
              href="https://linkedin.com/in/han-juin-wong"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors duration-200"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600"
        style={{ animation: 'fadeIn 1s ease 1s both' }}
      >
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <div
          className="w-px h-10 animate-float"
          style={{ background: 'linear-gradient(to bottom, #2DD4BF, transparent)' }}
        />
      </div>
    </section>
  )
}
