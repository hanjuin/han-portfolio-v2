import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import TechStack from './components/TechStack'
import Gallery from './components/Gallery'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import { useEffect } from 'react'

export default function App() {

  useEffect(()=>{
    window.scrollTo(0,0)
  }, [])

  return (
    <div className="min-h-screen grain" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <Navbar />
      <main>
        <Hero />
        <Chatbot />
        <About />
        <Experience />
        <Projects />
        <TechStack />
        <Gallery />
        <Footer />
      </main>
    </div>
  )
}
