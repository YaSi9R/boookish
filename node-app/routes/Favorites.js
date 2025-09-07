const express = require("express")
const router = express.Router()

const { addToFavorites, removeFromFavorites, getFavorites, checkFavorite } = require("../controllers/Favorites")

const { auth } = require("../middleware/auth")

// All routes require authentication
router.post("/add", auth, addToFavorites)
router.post("/remove", auth, removeFromFavorites)
router.get("/", auth, getFavorites)
router.get("/check/:postId", auth, checkFavorite)

module.exports = router
