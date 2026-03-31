import { toast } from "react-toastify"
import { apiConnector } from "../apiConnector"
import { chatEndpoints } from "../apis"

const {
    GET_OR_CREATE_CONVERSATION_API,
    GET_USER_CONVERSATIONS_API,
    GET_MESSAGES_API,
    SEND_MESSAGE_API
} = chatEndpoints

export function getOrCreateConversation(sellerId, postId, token) {
    return async (dispatch) => {
        let result = null
        try {
            const response = await apiConnector(
                "POST",
                GET_OR_CREATE_CONVERSATION_API,
                { sellerId, postId },
                { Authorization: `Bearer ${token}` }
            )

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            result = response.data.conversation
        } catch (error) {
            console.log("GET_OR_CREATE_CONVERSATION_API ERROR...", error)
            toast.error(error.response?.data?.message || error.message)
        }
        return result
    }
}

export function getUserConversations(token) {
    return async (dispatch) => {
        let result = []
        try {
            const response = await apiConnector(
                "GET",
                GET_USER_CONVERSATIONS_API,
                null,
                { Authorization: `Bearer ${token}` }
            )

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            result = response.data.conversations
        } catch (error) {
            console.log("GET_USER_CONVERSATIONS_API ERROR...", error)
            // toast.error(error.message)
        }
        return result
    }
}

export function getConversationMessages(conversationId, token) {
    return async (dispatch) => {
        let result = []
        try {
            const response = await apiConnector(
                "GET",
                `${GET_MESSAGES_API}/${conversationId}`,
                null,
                { Authorization: `Bearer ${token}` }
            )

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            result = response.data.messages
        } catch (error) {
            console.log("GET_MESSAGES_API ERROR...", error)
            toast.error(error.message)
        }
        return result
    }
}

export function sendMessage(messageData, token) {
    return async (dispatch) => {
        let result = null
        try {
            const response = await apiConnector(
                "POST",
                SEND_MESSAGE_API,
                messageData,
                { Authorization: `Bearer ${token}` }
            )

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            result = response.data.message
        } catch (error) {
            console.log("SEND_MESSAGE_API ERROR...", error)
            toast.error(error.message)
        }
        return result
    }
}
