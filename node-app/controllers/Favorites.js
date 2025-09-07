const User = require("../models/User")
const Post = require("../models/Post")

// Add to favorites
exports.addToFavorites = async (req, res) => {
  try {
    const { postId } = req.body
    const userId = req.user.id

    // Check if post exists
    const post = await Post.findById(postId)
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      })
    }

    // Check if already in favorites
    const user = await User.findById(userId)
    if (user.favorites.includes(postId)) {
      return res.status(400).json({
        success: false,
        message: "Post already in favorites",
      })
    }

    // Add to favorites
    await User.findByIdAndUpdate(userId, { $push: { favorites: postId } }, { new: true })

    res.status(200).json({
      success: true,
      message: "Post added to favorites successfully",
    })
  } catch (error) {
    console.error("Add to Favorites Error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to add to favorites",
      error: error.message,
    })
  }
}

// Remove from favorites
exports.removeFromFavorites = async (req, res) => {
  try {
    const { postId } = req.body
    const userId = req.user.id

    // Remove from favorites
    await User.findByIdAndUpdate(userId, { $pull: { favorites: postId } }, { new: true })

    res.status(200).json({
      success: true,
      message: "Post removed from favorites successfully",
    })
  } catch (error) {
    console.error("Remove from Favorites Error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to remove from favorites",
      error: error.message,
    })
  }
}

// Get user's favorites
exports.getFavorites = async (req, res) => {
  try {
    const userId = req.user.id

    const user = await User.findById(userId)
      .populate({
        path: "favorites",
        populate: {
          path: "seller",
          select: "Name email contactNumber image",
        },
      })
      .exec()

    res.status(200).json({
      success: true,
      message: "Favorites fetched successfully",
      data: user.favorites,
    })
  } catch (error) {
    console.error("Get Favorites Error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to fetch favorites",
      error: error.message,
    })
  }
}

// Check if post is in favorites
exports.checkFavorite = async (req, res) => {
  try {
    const { postId } = req.params
    const userId = req.user.id

    const user = await User.findById(userId)
    const isFavorite = user.favorites.includes(postId)

    res.status(200).json({
      success: true,
      isFavorite,
    })
  } catch (error) {
    console.error("Check Favorite Error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to check favorite status",
      error: error.message,
    })
  }
}
