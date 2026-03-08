import { useInView } from '../hooks/useInView'
import experienceData from '../../resources/experience.json'

export default function Experience() {
  const [ref, visible] = useInView()

  return (
    <section id="experience" className="py-24 md:py-32">
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
            Work history
          </p>
          <h2
            className="section-heading mb-16"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
            }}
          >
            Experience
          </h2>

          <div className="relative">
            {/* Vertical timeline line */}
            <div
              className="absolute left-0 top-3 bottom-3 w-px hidden md:block"
              style={{ background: 'linear-gradient(to bottom, #2DD4BF, transparent)' }}
            />

            <div className="space-y-10">
              {experienceData.map((job, i) => (
                <div
                  key={i}
                  className="md:pl-10 relative"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateX(0)' : 'translateX(-16px)',
                    transition: `opacity 0.6s ease ${i * 150 + 200}ms, transform 0.6s ease ${i * 150 + 200}ms`,
                  }}
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute left-[-5px] top-3 w-2.5 h-2.5 rounded-full hidden md:block"
                    style={{
                      background: '#2DD4BF',
                      boxShadow: '0 0 12px rgba(45,212,191,0.6)',
                    }}
                  />

                  <div
                    className="card p-6 md:p-8 hover:border-border-bright transition-all duration-300 group"
                    style={{ cursor: 'default' }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                      <div>
                        <h3
                          className="font-display font-bold text-white text-lg group-hover:text-accent transition-colors duration-200"
                          style={{ letterSpacing: '-0.02em' }}
                        >
                          {job.title}
                        </h3>
                      </div>
                      <span
                        className="font-mono text-xs px-3 py-1.5 rounded-lg shrink-0"
                        style={{
                          background: 'rgba(45,212,191,0.06)',
                          border: '1px solid rgba(45,212,191,0.15)',
                          color: '#2DD4BF',
                        }}
                      >
                        {job.date}
                      </span>
                    </div>

                    <ul className="text-slate-400 text-sm leading-[1.8] mb-5 list-disc list-inside space-y-1">
                      {job.description.map((point, j) => (
                        <li key={j}>{point}</li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {job.tags.map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
