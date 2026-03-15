import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

export default function Chatbot(){
    const [sessionId, setSessionId] = useState(null)
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const API_URL = import.meta.env.VITE_API_URL
    const bottomrRef = useRef(null)

    useEffect(()=>{
        fetch(`${API_URL}/conversation/chat/sessions/`,{
            method:'POST',})
            .then(res => res.json())
            .then(data => setSessionId(data.session_id))
    }, [])

    useEffect(()=>{
        bottomrRef.current?.scrollIntoView({behavior: 'smooth', block:'nearest'})
    }, [messages])

    const handleSend = async () => {
        if(!input.trim() || !sessionId) return

        const userText = input
        setInput('')
        setMessages(prev => [...prev, {role:'user', content:userText}])
        setLoading(true)
        try {
            // 1. Add empty assistant message first
            
            const res = await fetch(`${API_URL}/conversation/${sessionId}/stream`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userText })
            })
            
            // 2. Read the stream chunk by chunk
            const reader = res.body.getReader()
            const decoder = new TextDecoder()
            
            setLoading(false) 
            setMessages(prev => [...prev, { role: 'assistant', content: '' }])
            
            while (true) {
                const { done, value } = await reader.read()
                if (done) break

                const chunk = decoder.decode(value)

                // 3. Append chunk to the last message
                setMessages(prev => {
                    const updated = [...prev]
                    updated[updated.length - 1] = {
                        ...updated[updated.length - 1],
                        content: updated[updated.length - 1].content + chunk
                    }
                    return updated
                })
            }
        } catch (err){
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="py-24 md:py-32">
            <div className="max-w-3xl mx-auto px-6">
                <p className="section-label">Ask me anything</p>
                <h2 className="section-heading mb-12">Chat with Han's AI</h2>
                <div className="chat">
                    <div className="chat-inner">
                    <div className="p-6" style={{height: '420px', overflowY: 'auto'}}>
                        {messages.map((msg,i)=>(
                            <div key={i} className={`flex mb-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <span
                                    className="px-4 py-2 rounded-2xl text-sm max-w-[75%]"
                                    style={
                                        msg.role === 'user'
                                            ? {background: '#2DD4BF', color: '#0f172a'}
                                            : {background: 'var(--bg-card)', border: '1px solid var(--border-chat)', color: 'var(--text-primary)'}
                                    }>
                                    {msg.role === 'assistant'
                                        ? <div className="prose prose-sm max-w-none prose-invert"><ReactMarkdown>{msg.content}</ReactMarkdown></div>
                                        : msg.content}
                                </span>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start mb-3">
                                <span
                                    className="px-4 py-2 rounded-2xl text-sm font-mono text-slate-500"
                                    style={{background: 'var(--bg-card)', border:'1px solid var(--border)'}}
                                >
                                    <div className="loader" style={{margin:'5px'}}>
                                    </div> 
                            </span>
                            </div>
                            )}
                        <div ref={bottomrRef}></div>
                    </div>
                    <div className="flex gap-3 p-4" style={{borderTop: '1px solid var(--border)'}}>
                        <input
                            className="flex-1 bg-transparent text-sm outline-none placeholder-slate-400"
                            style={{color: 'var(--text-primary)'}}
                            value={input}
                            onChange={e=>setInput(e.target.value)}
                            disabled={!sessionId}
                            placeholder="Ask me anything..."
                            onKeyDown={e=>{
                                if (e.key === 'Enter') handleSend()
                            }}
                        />
                        <button
                            className="btn-primary text-sm px-5 py-2"
                            onClick={handleSend} disabled={!sessionId || loading}>
                            Send
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
