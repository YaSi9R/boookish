const express = require("express")
const router = express.Router()

const {
  updateProfile,
  deleteAccount,
  getAllUserDetails,
  updateDisplayPicture,
  getUserDetails,
} = require("../controllers/Profile")

const { auth, isAdmin } = require("../middleware/auth")

// Profile routes
router.get("/getUserDetails", auth, getUserDetails)
router.put("/updateProfile", auth, updateProfile)
router.delete("/deleteProfile", auth, deleteAccount)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)
router.get("/getAllUserDetails", auth, isAdmin, getAllUserDetails)

module.exports = router
