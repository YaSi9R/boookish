import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserConversations, getConversationMessages, sendMessage } from '../services/operations/chatAPI'
import ChatWindow from '../Components/Core/Chat/ChatWindow'
import { io } from 'socket.io-client'
import { useSearchParams } from 'react-router-dom'

const Chats = () => {
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()
    const initialConversationId = searchParams.get("id")

    const [conversations, setConversations] = useState([])
    const [selectedConversation, setSelectedConversation] = useState(null)
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const socket = useRef(null)

    const fetchConversations = useCallback(async () => {
        const result = await dispatch(getUserConversations(token))
        if (result) {
            setConversations(result)
            if (initialConversationId && !selectedConversation) {
                const found = result.find(c => c._id === initialConversationId)
                if (found) setSelectedConversation(found)
            }
        }
    }, [dispatch, token, initialConversationId, selectedConversation])

    useEffect(() => {
        // Initialize socket connection
        socket.current = io("http://localhost:4000") // Change to your backend URL

        socket.current.on("receive_message", (data) => {
            if (selectedConversation && data.conversationId === selectedConversation._id) {
                setMessages((prev) => [...prev, data])
            }
            // Refresh conversations list to update last message
            fetchConversations()
        })

        return () => {
            if (socket.current) {
                socket.current.disconnect()
            }
        }
    }, [selectedConversation, fetchConversations])

    useEffect(() => {
        fetchConversations()
    }, [fetchConversations])

    useEffect(() => {
        if (selectedConversation) {
            const fetchMessages = async () => {
                setLoading(true)
                const result = await dispatch(getConversationMessages(selectedConversation._id, token))
                if (result) {
                    setMessages(result)
                }
                setLoading(false)
                // Join socket room
                if (socket.current) {
                    socket.current.emit("join_room", selectedConversation._id)
                }
            }
            fetchMessages()
        }
    }, [selectedConversation, token, dispatch])

    const handleSendMessage = async (text) => {
        if (!text.trim() || !selectedConversation) return

        const receiver = selectedConversation.participants.find(p => p._id !== user._id)
        
        const messageData = {
            conversationId: selectedConversation._id,
            receiverId: receiver._id,
            text
        }

        const result = await dispatch(sendMessage(messageData, token))
        if (result) {
            setMessages((prev) => [...prev, result])
            socket.current.emit("send_message", {
                ...result,
                room: selectedConversation._id
            })
            fetchConversations()
        }
    }

    return (
        <div className="flex h-[calc(100vh-3.5rem)] md:h-[calc(100vh-4rem)] bg-gray-50 overflow-hidden relative">
            {/* Conversations Sidebar */}
            <div className={`w-full md:w-80 bg-white border-r border-gray-200 flex flex-col ${
                selectedConversation ? "hidden md:flex" : "flex"
            }`}>
                <div className="p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
                    <h2 className="text-xl font-bold text-gray-800">Messages</h2>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {conversations.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <p>No conversations yet</p>
                        </div>
                    ) : (
                        conversations.map((conv) => {
                            const otherUser = conv.participants?.find(p => p._id !== user?._id)
                            return (
                                <div
                                    key={conv._id}
                                    onClick={() => setSelectedConversation(conv)}
                                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                                        selectedConversation?._id === conv._id ? "bg-red-50 border-l-4 border-l-[#E74C3C]" : ""
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="relative flex-shrink-0">
                                            <img
                                                src={otherUser?.image || `https://api.dicebear.com/5.x/initials/svg?seed=${otherUser?.Name}`}
                                                alt={otherUser?.Name}
                                                className="w-12 h-12 rounded-full object-cover border border-gray-100"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h3 className="font-semibold text-gray-900 truncate">
                                                    {otherUser?.Name || "Unknown User"}
                                                </h3>
                                                <span className="text-[10px] text-gray-400">
                                                    {conv.updatedAt && new Date(conv.updatedAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500 truncate font-medium">
                                                {conv.post?.Title || "Deleted Ad"}
                                            </p>
                                            {conv.lastMessage && (
                                                <p className="text-xs text-gray-400 truncate mt-1">
                                                    {conv.lastMessage.text}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>
            </div>

            {/* Chat Window Area */}
            <div className={`flex-1 flex flex-col bg-gray-50 ${
                !selectedConversation ? "hidden md:flex" : "flex"
            }`}>
                {selectedConversation ? (
                    <ChatWindow
                        messages={messages}
                        onSendMessage={handleSendMessage}
                        otherUser={selectedConversation.participants?.find(p => p._id !== user?._id)}
                        post={selectedConversation.post}
                        loading={loading}
                        currentUserId={user?._id || user?.id}
                        onBack={() => setSelectedConversation(null)}
                    />
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-500 p-4 text-center">
                        <div className="w-20 h-20 bg-white shadow-sm rounded-full flex items-center justify-center mb-6">
                            <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-medium text-gray-700 mb-2">Your Conversations</h3>
                        <p className="max-w-xs text-sm">Select a chat from the sidebar to view messages and contact sellers.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Chats
