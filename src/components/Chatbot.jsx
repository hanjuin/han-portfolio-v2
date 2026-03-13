import { useState, useEffect, useRef } from "react";

export default function Chatbot(){
    const [sessionId, setSessionId] = useState(null)
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const bottomrRef = useRef(null)

    useEffect(()=>{
        fetch('http://localhost:8000/conversation/chat/sessions/',{
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

        try{
            const res = await fetch(`http://localhost:8000/conversation/${sessionId}`,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({message: userText})
            })
            const data = await res.json()
            setMessages(prev => [...prev, {role:'assistant', content: data.answer}])
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
                {/* <div className="p-0 overflow-hidden rounded-xl" style={{
                    border: '2px solid', animation: 'rainbow-border 3s linear infinite'
                }}> */}
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
                                    }>{msg.content}</span>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start mb-3">
                                <span
                                    className="px-4 py-2 rounded-2xl text-sm font-mono text-slate-500"
                                    style={{background: 'var(--bg-card)', border:'1px solid var(--border)'}}
                                >
                                    <div class="loader" style={{margin:'5px'}}>
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
