const Post = require("../models/Post")
const User = require("../models/User")
const { uploadImageToCloudinary } = require("../utils/imageUploader")

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const {
      Title,
      Category,
      subCategory,
      adType,
      PriceType,
      Price,
      Condition,
      old,
      MRP,
      Pages,
      Language,
      Description,
      Name,
      Number,
      City,
    } = req.body;

    // Ensure user is logged in
    const sellerId = req.user?.id;
    if (!sellerId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Validate required fields
    if (!Title || !Category || !subCategory || !adType || !Price || !Condition || !Description) {
      return res.status(400).json({ success: false, message: "Please fill all required fields" });
    }

    // Handle images (max 5)
    if (!req.files || !req.files.images) {
      return res.status(400).json({ success: false, message: "At least one image is required" });
    }

    let imagesArray = [];
    const images = Array.isArray(req.files.images) ? req.files.images : [req.files.images];

    if (images.length > 5) {
      return res.status(400).json({ success: false, message: "You can upload maximum 5 images" });
    }

    for (const img of images) {
      const uploaded = await uploadImageToCloudinary(img, process.env.FOLDER_NAME);
      imagesArray.push(uploaded.secure_url);
    }

    // Save post
    const newPost = await Post.create({
      Title,
      Category,
      subCategory,
      adType,
      PriceType,
      Price,
      Condition,
      old,
      MRP,
      Pages,
      Language,
      Description,
      Name,
      Number,
      City,
      Images: imagesArray, // ✅ match schema field name
      seller: sellerId,
    });

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: newPost,
    });
  } catch (error) {
    console.error("CREATE POST ERROR:", error);
    return res.status(500).json({ success: false, message: "Failed to create post", error: error.message });
  }
};
// Get all posts with optional filters
exports.getAllPosts = async (req, res) => {
  try {
    const {
      category,
      subCategory,
      adType,
      priceMin,
      priceMax,
      condition,
      city,
      search,
      page = 1,
      limit = 10,
    } = req.query

    // Build filter object
    const filter = {}

    if (category) filter.Category = category
    if (subCategory) filter.subCategory = subCategory
    if (adType) filter.adType = adType
    if (condition) filter.Condition = condition
    if (city) filter.City = new RegExp(city, "i")

    // Price range filter
    if (priceMin || priceMax) {
      filter.Price = {}
      if (priceMin) filter.Price.$gte = Number(priceMin)
      if (priceMax) filter.Price.$lte = Number(priceMax)
    }

    // Search in title and description
    if (search) {
      filter.$or = [{ Title: new RegExp(search, "i") }, { Description: new RegExp(search, "i") }]
    }

    // Calculate pagination
    const skip = (Number(page) - 1) * Number(limit)

    // Get posts with pagination
    const posts = await Post.find(filter)
      .populate("seller", "Name email contactNumber image")
      .sort({ postedAt: -1 })
      .skip(skip)
      .limit(Number(limit))

    // Get total count for pagination
    const totalPosts = await Post.countDocuments(filter)

    res.status(200).json({
      success: true,
      message: "Posts fetched successfully",
      data: posts,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(totalPosts / Number(limit)),
        totalPosts,
        hasNext: skip + posts.length < totalPosts,
        hasPrev: Number(page) > 1,
      },
    })
  } catch (error) {
    console.error("Get All Posts Error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to fetch posts",
      error: error.message,
    })
  }
}

// Get single post by ID
exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params

    const post = await Post.findById(id).populate("seller", "Name email contactNumber image college location")

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "Post fetched successfully",
      data: post,
    })
  } catch (error) {
    console.error("Get Post By ID Error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to fetch post",
      error: error.message,
    })
  }
}

// Get user's own posts
exports.getMyPosts = async (req, res) => {
  try {
    const userId = req.user.id

    const posts = await Post.find({ seller: userId }).sort({ postedAt: -1 })

    res.status(200).json({
      success: true,
      message: "Your posts fetched successfully",
      data: posts,
    })
  } catch (error) {
    console.error("Get My Posts Error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to fetch your posts",
      error: error.message,
    })
  }
}

// Update post
exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user.id

    // Check if post exists and belongs to user
    const post = await Post.findById(id)
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      })
    }

    if (post.seller.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own posts",
      })
    }

    // Handle new image uploads if provided
    let imageUrls = post.Images
    if (req.files && req.files.images) {
      const images = Array.isArray(req.files.images) ? req.files.images : [req.files.images]
      imageUrls = []

      for (const image of images) {
        const uploadedImage = await uploadImageToCloudinary(image, process.env.FOLDER_NAME || "Bookish")
        imageUrls.push(uploadedImage.secure_url)
      }
    }

    // Update post
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { ...req.body, Images: imageUrls },
      { new: true, runValidators: true },
    ).populate("seller", "Name email contactNumber")

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: updatedPost,
    })
  } catch (error) {
    console.error("Update Post Error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to update post",
      error: error.message,
    })
  }
}

// Delete post
exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user.id

    // Check if post exists and belongs to user
    const post = await Post.findById(id)
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      })
    }

    if (post.seller.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own posts",
      })
    }

    // Remove post from user's myAds
    await User.findByIdAndUpdate(userId, { $pull: { myAds: id } })

    // Remove from all users' favorites
    await User.updateMany({ favorites: id }, { $pull: { favorites: id } })

    // Delete the post
    await Post.findByIdAndDelete(id)

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    })
  } catch (error) {
    console.error("Delete Post Error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to delete post",
      error: error.message,
    })
  }
}
