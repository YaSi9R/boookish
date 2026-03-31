const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const Post = require("../models/Post");

// Create or get conversation
exports.getOrCreateConversation = async (req, res) => {
    try {
        const { sellerId, postId } = req.body;
        const buyerId = req.user.id;

        if (buyerId === sellerId) {
            return res.status(400).json({
                success: false,
                message: "You cannot chat with yourself",
            });
        }

        // Check if conversation already exists for this post between these users
        let conversation = await Conversation.findOne({
            participants: { $all: [buyerId, sellerId] },
            post: postId
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [buyerId, sellerId],
                post: postId
            });
        }

        res.status(200).json({
            success: true,
            conversation
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error getting/creating conversation",
            error: error.message
        });
    }
};

// Send message
exports.sendMessage = async (req, res) => {
    try {
        const { conversationId, receiverId, text } = req.body;
        const senderId = req.user.id;

        const message = await Message.create({
            conversationId,
            sender: senderId,
            receiver: receiverId,
            text
        });

        // Update last message in conversation
        await Conversation.findByIdAndUpdate(conversationId, {
            lastMessage: message._id
        });

        res.status(200).json({
            success: true,
            message
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error sending message",
            error: error.message
        });
    }
};

// Get all conversations for a user
exports.getUserConversations = async (req, res) => {
    try {
        const userId = req.user.id;

        const conversations = await Conversation.find({
            participants: { $in: [userId] }
        })
        .populate("participants", "Name email image")
        .populate("post", "Title Images Price")
        .populate("lastMessage")
        .sort({ updatedAt: -1 });

        res.status(200).json({
            success: true,
            conversations
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching conversations",
            error: error.message
        });
    }
};

// Get messages for a conversation
exports.getMessages = async (req, res) => {
    try {
        const { conversationId } = req.params;

        const messages = await Message.find({ conversationId })
            .sort({ createdAt: 1 });

        res.status(200).json({
            success: true,
            messages
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching messages",
            error: error.message
        });
    }
};
