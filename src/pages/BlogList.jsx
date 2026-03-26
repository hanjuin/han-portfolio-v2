import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import BlogNavbar from '../components/BlogNavbar'
import Footer from '../components/Footer'

function formatDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function BlogList() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/posts/index.json')
      .then(r => { if (!r.ok) throw new Error('Failed to load posts'); return r.json() })
      .then(data => {
        const sorted = [...data].sort((a, b) => new Date(b.date) - new Date(a.date))
        setPosts(sorted)
        setLoading(false)
      })
      .catch(err => { setError(err.message); setLoading(false) })
  }, [])

  return (
    <div className="min-h-screen grain" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <BlogNavbar />
      <main>
        <section className="py-24 md:py-32">
          <div className="max-w-4xl mx-auto px-6">
            {/* Header */}
            <div className="mb-16">
              <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: '#2DD4BF' }}>
                Writing
              </p>
              <h1 className="section-heading text-4xl md:text-5xl font-display font-bold mb-4" style={{ letterSpacing: '-0.03em' }}>
                Blog
              </h1>
              <p className="text-slate-400 text-lg max-w-xl">
                Thoughts on software, learning, and building things.
              </p>
            </div>

            {/* Content */}
            {loading && (
              <div className="flex items-center gap-3 text-slate-500">
                <div className="w-4 h-4 rounded-full border-2 border-slate-600 border-t-teal-400 animate-spin" />
                Loading posts…
              </div>
            )}

            {error && (
              <div className="text-slate-500">
                <p>Could not load posts.</p>
              </div>
            )}

            {!loading && !error && posts.length === 0 && (
              <div className="text-slate-500">
                <p>No posts yet. Check back soon.</p>
              </div>
            )}

            {!loading && !error && posts.length > 0 && (
              <div className="flex flex-col gap-4">
                {posts.map((post) => (
                  <Link
                    key={post.slug}
                    to={`/blog/${post.slug}`}
                    className="card group block p-6 rounded-xl transition-all duration-300 hover:border-[var(--border-bright)] no-underline"
                    style={{ textDecoration: 'none' }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-mono text-xs text-slate-500">{formatDate(post.date)}</span>
                          {post.readingTime && (
                            <>
                              <span className="text-slate-700">·</span>
                              <span className="font-mono text-xs text-slate-500">{post.readingTime}</span>
                            </>
                          )}
                        </div>
                        <h2
                          className="font-display font-semibold text-xl mb-2 text-slate-100 group-hover:text-white transition-colors duration-150"
                          style={{ letterSpacing: '-0.02em' }}
                        >
                          {post.title}
                        </h2>
                        {post.description && (
                          <p className="text-slate-400 text-sm leading-relaxed">{post.description}</p>
                        )}
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {post.tags.map(tag => (
                              <span key={tag} className="tag text-xs">{tag}</span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex-shrink-0 self-center text-slate-600 group-hover:text-teal-400 transition-colors duration-150 mt-1 sm:mt-0">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
