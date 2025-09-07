const Profile = require("../models/Profile")
const User = require("../models/User")
const Post = require("../models/Post") // Import Post model
const mongoose = require("mongoose") // Import mongoose
const { uploadImageToCloudinary } = require("../utils/imageUploader")

// Get user profile
exports.getUserDetails = async (req, res) => {
  try {
    const id = req.user.id
    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .populate("myAds")
      .populate("favorites")
      .exec()
console.log("profile from cntroller");
    res.status(200).json({
      success: true,
      message: "User Data fetched successfully",
      data: userDetails,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Update profile
exports.updateProfile = async (req, res) => {
  try {
    const { gender, dateOfBirth, about, contactNumber, college, phone, location } = req.body
    const id = req.user.id

    // Find the profile of the user
    const userDetails = await User.findById(id)
    const profile = await Profile.findById(userDetails.additionalDetails)

    const user = await User.findByIdAndUpdate(id, {
      college,
      phone,
      location,
    })
    await user.save()

    // Update the profile fields
    profile.dateOfBirth = dateOfBirth
    profile.about = about
    profile.contactNumber = contactNumber
    profile.gender = gender

    // Save the updated profile
    await profile.save()

    // Find the updated user details
    const updatedUserDetails = await User.findById(id).populate("additionalDetails").exec()

    return res.json({
      success: true,
      message: "Profile updated successfully",
      updatedUserDetails,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      error: error.message,
    })
  }
}

// Update display picture
exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture
    const userId = req.user.id

    const image = await uploadImageToCloudinary(displayPicture, process.env.FOLDER_NAME, 1000, 1000)

    const updatedProfile = await User.findByIdAndUpdate({ _id: userId }, { image: image.secure_url }, { new: true })

    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Delete account
exports.deleteAccount = async (req, res) => {
  try {
    const id = req.user.id

    const user = await User.findById({ _id: id })
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    // Delete Additional Profile
    await Profile.findByIdAndDelete(user.additionalDetails)

    // Delete user's posts
    await Post.deleteMany({ seller: id })

    // Remove user from other users' favorites
    await User.updateMany({ favorites: { $in: user.myAds } }, { $pull: { favorites: user.myAds } })

    // Delete User
    await User.findByIdAndDelete(id)

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "User Cannot be deleted successfully",
    })
  }
}

// Get all user details for admin
exports.getAllUserDetails = async (req, res) => {
  try {
    const id = req.user.id
    const userDetails = await User.findById(id).populate("additionalDetails").exec()

    res.status(200).json({
      success: true,
      message: "User Data fetched successfully",
      data: userDetails,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
