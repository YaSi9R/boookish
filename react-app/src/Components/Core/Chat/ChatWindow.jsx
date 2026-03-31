import { useState, useRef, useEffect } from 'react'
import { FaBook, FaPaperPlane } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

export default function ChatWindow({ messages, onSendMessage, otherUser, post, loading, currentUserId, onBack }) {
    const [newMessage, setNewMessage] = useState("")
    const scrollRef = useRef()

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (newMessage.trim()) {
            onSendMessage(newMessage)
            setNewMessage("")
        }
    }

    return (
        <div className="flex-1 flex flex-col min-h-0 bg-white">
            {/* Header */}
            <div className="p-3 md:p-4 border-b border-gray-200 flex items-center gap-3 shadow-sm bg-white sticky top-0 z-20">
                {/* Back button for mobile */}
                <button 
                    onClick={onBack}
                    className="md:hidden p-2 -ml-2 text-gray-600 hover:text-[#E74C3C] transition-colors"
                    aria-label="Back to conversations"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <div className="flex items-center gap-3 flex-1 min-w-0">
                    <img 
                        src={otherUser?.image || `https://api.dicebear.com/5.x/initials/svg?seed=${otherUser?.Name}`}
                        className="w-10 h-10 rounded-full border border-gray-100 flex-shrink-0"
                        alt={otherUser?.Name}
                    />
                    <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 leading-tight truncate">
                            {otherUser?.Name || "User"}
                        </h4>
                        <Link 
                            to={post?._id ? `/posts?id=${post._id}` : "#"} 
                            className="text-[10px] md:text-xs text-[#E74C3C] hover:underline flex items-center gap-1 truncate"
                        >
                            <FaBook className="flex-shrink-0" /> <span className="truncate">{post?.Title || "View Ad"}</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f0f2f5]">
                {loading ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E74C3C]"></div>
                    </div>
                ) : (
                    messages.map((message) => (
                        <div
                            key={message._id}
                            className={`flex ${message.sender === currentUserId ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-[70%] px-4 py-2 rounded-2xl shadow-sm ${
                                    message.sender === currentUserId
                                        ? "bg-[#E74C3C] text-white rounded-br-none"
                                        : "bg-white text-gray-800 rounded-bl-none"
                                }`}
                            >
                                <p className="text-sm leading-relaxed">{message.text}</p>
                                <p className={`text-[10px] mt-1 opacity-70 text-right ${
                                    message.sender === currentUserId ? "text-white" : "text-gray-500"
                                }`}>
                                    {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </div>
                    ))
                )}
                <div ref={scrollRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 bg-gray-100 border-none rounded-full px-4 py-2 focus:ring-2 focus:ring-[#E74C3C] focus:bg-white transition-all outline-none"
                    />
                    <button
                        type="submit"
                        disabled={!newMessage.trim()}
                        className={`p-3 rounded-full transition-all ${
                            newMessage.trim() 
                            ? "bg-[#E74C3C] text-white shadow-md hover:scale-105 active:scale-95" 
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                    >
                        <FaPaperPlane />
                    </button>
                </form>
            </div>
        </div>
    )
}
