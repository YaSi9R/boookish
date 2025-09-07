const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()

const cookieParser = require("cookie-parser")
const { fileUploadMiddleware } = require("./middleware/fileUpload")

// Import routes
const userRoutes = require("./routes/User")
const postRoutes = require("./routes/Post")
const profileRoutes = require("./routes/Profile")
const favoritesRoutes = require("./routes/Favorites")

// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(fileUploadMiddleware)

// Database Connection
const mongoose = require("mongoose")
const database = require("./config/database")
database.connect()

// Cloudinary Connection
const { cloudinaryConnect } = require("./config/cloudinary")
cloudinaryConnect()

// CORS Configuration
app.use(
  cors({
    // origin: "http://localhost:3000",
    origin: "https://bookish-psi.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
)

// Routes
app.use("/api/v1/auth", userRoutes)
app.use("/api/v1/posts", postRoutes)
app.use("/api/v1/profile", profileRoutes)
app.use("/api/v1/favorites", favoritesRoutes)

// Default route
app.get("/", (req, res) => {
  res.send("Bookish API is running! 📚")
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: err.message,
  })
})

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(` Server running successfully on port: ${PORT}`)
})
