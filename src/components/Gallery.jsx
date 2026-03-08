import { useState } from 'react'
import { useInView } from '../hooks/useInView'

const photos = [
  { src: '/carousel/1.jpg', alt: 'Sandfield Office' },
  { src: '/carousel/2.jpg', alt: 'AUT Event' },
  { src: '/carousel/3.jpg', alt: 'Spark Alumni Panel' },
  { src: '/carousel/4.jpg', alt: 'Hamilton Show' },
  { src: '/carousel/5.jpg', alt: 'Murder of the Orient Express' },
  { src: '/carousel/6.jpg', alt: 'Coldplay Concert' },
]

export default function Gallery() {
  const [ref, visible] = useInView()
  const [active, setActive] = useState(null)

  return (
    <section id="gallery" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref}>
          <p
            className="section-label"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            Moments
          </p>
          <h2
            className="section-heading mb-12"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
            }}
          >
            Gallery
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {photos.map((photo, i) => (
              <button
                key={photo.src}
                onClick={() => setActive(photo)}
                className="relative overflow-hidden rounded-xl group cursor-zoom-in"
                style={{
                  aspectRatio: '1 / 1',
                  background: '#0D1322',
                  border: '1px solid #1E293B',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'scale(1)' : 'scale(0.96)',
                  transition: `opacity 0.5s ease ${i * 80 + 200}ms, transform 0.5s ease ${i * 80 + 200}ms`,
                }}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3"
                  style={{
                    background: 'linear-gradient(to top, rgba(7,11,20,0.8), transparent)',
                  }}
                >
                  <span className="text-xs font-mono text-slate-300">{photo.alt}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          style={{ background: 'rgba(7,11,20,0.95)', backdropFilter: 'blur(8px)' }}
          onClick={() => setActive(null)}
        >
          <button
            className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors p-2"
            onClick={() => setActive(null)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <img
            src={active.src}
            alt={active.alt}
            className="max-w-full max-h-full rounded-xl"
            style={{ maxHeight: '85vh', boxShadow: '0 32px 80px rgba(0,0,0,0.6)' }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}
