import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import BlogNavbar from '../components/BlogNavbar'
import Footer from '../components/Footer'

function formatDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const [manifestRes, contentRes] = await Promise.all([
          fetch('/posts/index.json'),
          fetch(`/posts/${slug}.md`),
        ])

        if (!manifestRes.ok) throw new Error('manifest')
        if (!contentRes.ok) { setNotFound(true); setLoading(false); return }

        const manifest = await manifestRes.json()
        const md = await contentRes.text()

        const meta = manifest.find(p => p.slug === slug)
        if (!meta) { setNotFound(true); setLoading(false); return }

        setPost(meta)
        setContent(md)
        setLoading(false)
      } catch {
        setNotFound(true)
        setLoading(false)
      }
    }
    fetchPost()
  }, [slug])

  return (
    <div className="min-h-screen grain" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <BlogNavbar />
      <main>
        {loading && (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="w-5 h-5 rounded-full border-2 border-slate-600 border-t-teal-400 animate-spin" />
          </div>
        )}

        {notFound && !loading && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-6">
            <p className="font-mono text-xs tracking-widest uppercase text-slate-500">404</p>
            <h1 className="font-display text-3xl font-bold" style={{ letterSpacing: '-0.02em' }}>Post not found</h1>
            <p className="text-slate-400">This post doesn't exist or may have been removed.</p>
            <Link
              to="/blog"
              className="btn-primary text-sm mt-2"
            >
              Back to Blog
            </Link>
          </div>
        )}

        {!loading && !notFound && post && (
          <article className="py-24 md:py-32">
            <div className="max-w-3xl mx-auto px-6">
              {/* Back link */}
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors duration-150 mb-10 group"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-0.5 transition-transform duration-150">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                All Posts
              </Link>

              {/* Article header */}
              <header className="mb-10">
                {post.tags && post.tags.length > 0 && (
                  <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: '#2DD4BF' }}>
                    {post.tags[0]}
                  </p>
                )}
                <h1
                  className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-6"
                  style={{ letterSpacing: '-0.03em', lineHeight: '1.1', color: 'var(--text-primary)' }}
                >
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-slate-500 text-sm font-mono mb-4">
                  <span>{formatDate(post.date)}</span>
                  {post.readingTime && (
                    <>
                      <span className="text-slate-700">·</span>
                      <span>{post.readingTime}</span>
                    </>
                  )}
                </div>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <span key={tag} className="tag text-xs">{tag}</span>
                    ))}
                  </div>
                )}
              </header>

              {/* Divider */}
              <div
                className="mb-10"
                style={{ height: '1px', background: 'linear-gradient(to right, transparent, var(--border), transparent)' }}
              />

              {/* Content */}
              <div className="prose prose-invert prose-slate max-w-none
                prose-headings:font-display prose-headings:tracking-tight prose-headings:text-[var(--text-primary)]
                prose-p:text-slate-300 prose-p:leading-relaxed
                prose-a:text-[#2DD4BF] prose-a:no-underline hover:prose-a:underline
                prose-strong:text-slate-100
                prose-code:text-[#2DD4BF] prose-code:font-mono prose-code:text-sm prose-code:bg-[var(--bg-secondary)] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                prose-pre:bg-[var(--bg-secondary)] prose-pre:border prose-pre:border-[var(--border)] prose-pre:rounded-xl
                prose-blockquote:border-l-[#2DD4BF] prose-blockquote:text-slate-400 prose-blockquote:not-italic
                prose-hr:border-[var(--border)]
                prose-li:text-slate-300
                prose-img:rounded-xl prose-img:border prose-img:border-[var(--border)]">
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>

              {/* Footer divider */}
              <div
                className="mt-16 mb-10"
                style={{ height: '1px', background: 'linear-gradient(to right, transparent, var(--border), transparent)' }}
              />

              <div className="flex items-center justify-between">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors duration-150 group"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-0.5 transition-transform duration-150">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                  </svg>
                  All Posts
                </Link>
              </div>
            </div>
          </article>
        )}
      </main>
      <Footer />
    </div>
  )
}
