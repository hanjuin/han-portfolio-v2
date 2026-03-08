import { useInView } from '../hooks/useInView'
import aboutData from '../../resources/about.json'

const { paragraphs } = aboutData[1].about

function ParagraphWithLinks({ text, links }) {
  if (!links || links.length === 0) return <p className="text-slate-400 leading-[1.8]">{text}</p>

  const parts = []
  let remaining = text

  // Build parts array by splitting on link labels
  const sorted = [...links].sort((a, b) => text.indexOf(a.label) - text.indexOf(b.label))

  sorted.forEach(({ label, url }) => {
    const idx = remaining.indexOf(label)
    if (idx === -1) return
    if (idx > 0) parts.push(remaining.slice(0, idx))
    parts.push(
      <a
        key={url}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent underline underline-offset-2 hover:text-accent-bright transition-colors duration-150"
      >
        {label}
      </a>
    )
    remaining = remaining.slice(idx + label.length)
  })
  if (remaining) parts.push(remaining)

  return (
    <p className="text-slate-400 leading-[1.8]">
      {parts.map((part, i) => (typeof part === 'string' ? <span key={i}>{part}</span> : part))}
    </p>
  )
}

export default function About() {
  const [ref, visible] = useInView()

  return (
    <section id="about" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={ref}
          className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <p className="section-label">Who I am</p>
          <h2 className="section-heading mb-12">About Me</h2>

          <div className="grid md:grid-cols-5 gap-12 md:gap-16">
            {/* Text content */}
            <div className="md:col-span-3 space-y-5">
              {paragraphs.map((para, i) => (
                <div
                  key={para.id}
                  className="transition-all duration-700"
                  style={{
                    transitionDelay: visible ? `${i * 80}ms` : '0ms',
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(12px)',
                  }}
                >
                  <ParagraphWithLinks text={para.text} links={para.links} />
                </div>
              ))}
            </div>

            {/* Stats / Highlights panel */}
            <div className="md:col-span-2 space-y-4">
              <div
                className="card p-6 space-y-5"
                style={{
                  transitionDelay: visible ? '300ms' : '0ms',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(12px)',
                  transition: 'opacity 0.7s ease, transform 0.7s ease',
                }}
              >
                {[
                  { label: 'Degree', value: "Master's — MHCIS", sub: 'AUT' },
                  { label: 'Focus', value: 'AI & Full-Stack', sub: 'Engineering' },
                  { label: 'Location', value: 'Auckland', sub: 'New Zealand' },
                  { label: 'Status', value: 'Open to Work', sub: 'Full-time / Contract', accent: true },
                ].map(({ label, value, sub, accent }) => (
                  <div key={label} className="flex items-start justify-between gap-4">
                    <span className="text-xs font-mono text-slate-600 uppercase tracking-wider pt-1">{label}</span>
                    <div className="text-right">
                      <div
                        className="text-sm font-semibold font-display"
                        style={{ color: accent ? '#2DD4BF' : '#F1F5F9', letterSpacing: '-0.01em' }}
                      >
                        {value}
                      </div>
                      <div className="text-xs text-slate-500">{sub}</div>
                    </div>
                  </div>
                ))}

                <div className="border-t border-border pt-5">
                  <p className="text-xs font-mono text-slate-600 uppercase tracking-wider mb-3">Interests</p>
                  <div className="flex flex-wrap gap-2">
                    {['Machine Learning', 'RAG / LLMs', 'Computer Vision', 'Full-Stack'].map((tag) => (
                      <span key={tag} className="tag text-xs">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
