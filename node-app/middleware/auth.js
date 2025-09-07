const jwt = require("jsonwebtoken")
require("dotenv").config()
const User = require("../models/User")

// Authentication middleware
exports.auth = async (req, res, next) => {
  try {
    // Extract token from request
    const token = req.cookies.token || req.body.token || req.header("Authorization")?.replace("Bearer ", "")

    // If token is missing
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing. Please login to continue.",
      })
    }

    try {
      // Verify the token
      const decode = jwt.verify(token, process.env.JWT_SECRET)
      req.user = decode
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid. Please login again.",
      })
    }
    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong while validating the token",
    })
  }
}

// Check if user is Student
exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Students only",
      })
    }
    next()
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    })
  }
}

// Check if user is Admin
exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Admin only",
      })
    }
    next()
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    })
  }
}
