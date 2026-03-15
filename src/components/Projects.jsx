import { useInView } from '../hooks/useInView'
import projectsData from '../../resources/projects.json'

function ProjectCard({ project, index, visible }) {
  const imagePath = project.images
    ? `/project${project.images}`
    : null

  return (
    <div
      className="card flex flex-col h-full group hover:border-border-bright transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s ease ${index * 100 + 200}ms, transform 0.6s ease ${index * 100 + 200}ms`,
      }}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden"
        style={{
          height: '200px',
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        {imagePath ? (
          <>
            <img
              src={imagePath}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ display: 'block' }}
              onError={(e) => { e.target.style.display = 'none' }}
            />
            {/* Overlay gradient */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, rgba(7,11,20,0.6) 0%, transparent 60%)',
              }}
            />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-slate-700 text-sm font-mono">No preview</div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3
          className="font-display font-bold text-lg mb-3 transition-colors duration-200"
          style={{ letterSpacing: '-0.02em', color: 'var(--text-primary)' }}
        >
          {project.title}
        </h3>

        <ul className="text-slate-400 text-sm leading-[1.8] mb-5 flex-1 list-disc list-outside pl-4 space-y-1">
          {project.description.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 mt-auto">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors duration-150"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            {project.url.includes('youtu') ? 'Demo' : 'GitHub'}
          </a>

          {project.internal_url && (
            <a
              href={project.internal_url}
              className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors duration-150"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
              {project.internal_label ?? 'Check it out'}
            </a>
          )}

          {project.paper && (
            <a
              href={project.paper}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-accent transition-colors duration-150"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              Paper
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const [ref, visible] = useInView()

  return (
    <section id="projects" className="py-24 md:py-32">
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
            What I've built
          </p>
          <h2
            className="section-heading mb-4"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
            }}
          >
            Projects
          </h2>
          <p
            className="text-slate-500 text-sm mb-12"
            style={{
              opacity: visible ? 1 : 0,
              transition: 'opacity 0.6s ease 0.2s',
            }}
          >
            A selection of projects across AI, web, and mobile.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projectsData.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} visible={visible} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
