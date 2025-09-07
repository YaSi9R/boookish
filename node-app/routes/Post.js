const express = require("express")
const router = express.Router()

const { createPost, getAllPosts, getPostById, getMyPosts, updatePost, deletePost } = require("../controllers/Post")

const { auth } = require("../middleware/auth")

// Public routes
router.get("/", getAllPosts)
router.get("/:id", getPostById)

// Protected routes (require authentication)
router.post("/create", auth, createPost)
router.get("/user/my-posts", auth, getMyPosts)
router.put("/:id", auth, updatePost)
router.delete("/:id", auth, deletePost)

module.exports = router
