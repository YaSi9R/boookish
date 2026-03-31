const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const {
    getOrCreateConversation,
    getUserConversations,
    getMessages,
    sendMessage
} = require("../controllers/Chat");

router.post("/get-or-create", auth, getOrCreateConversation);
router.post("/send", auth, sendMessage);
router.get("/conversations", auth, getUserConversations);
router.get("/messages/:conversationId", auth, getMessages);

module.exports = router;
