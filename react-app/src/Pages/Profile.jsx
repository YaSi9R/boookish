"use client"

import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FaBook } from "react-icons/fa"
import { getUserDetails } from "../services/operations/profileAPI"
import { getMyPosts } from "../services/operations/postAPI"
import { getFavorites } from "../services/operations/favoritesAPI"

export default function Profile() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState("MY ADS")
  const [profileData, setProfileData] = useState(user) // Initialize with existing user data
  const [stats, setStats] = useState({
    adsSold: 0,
    totalListings: 0,
    inactiveAds: 0,
    favorites: 0,
  })

  // Fetch user profile data quickly
  useEffect(() => {
    const fetchAllData = async () => {
      if (!token) return

      try {
        // Fetch all data in parallel for faster loading
        const [userDetailsResponse, postsResponse, favoritesResponse] = await Promise.all([
          dispatch(getUserDetails(token)),
          getMyPosts(token),
          getFavorites(token),
        ])

        // Update profile data if we got new data
        if (userDetailsResponse) {
          setProfileData(userDetailsResponse)
        }

        // Calculate stats immediately
        const totalPosts = postsResponse?.length || 0
        const activePosts = postsResponse?.filter((post) => post.isActive !== false)?.length || 0
        const inactivePosts = totalPosts - activePosts
        const soldAds = postsResponse?.filter((post) => post.status === "sold")?.length || 0
        const favoritesCount = favoritesResponse?.length || 0

        setStats({
          adsSold: soldAds,
          totalListings: totalPosts,
          inactiveAds: inactivePosts,
          favorites: favoritesCount,
        })
      } catch (error) {
        console.error("Error fetching profile data:", error)
        // Don't show error toast, just use existing data
      }
    }

    fetchAllData()
  }, [token, dispatch])

  const tabs = ["MY ADS", "MESSAGES", "PACKAGES", "PACKAGE HISTORY"]

  const handleTabClick = (tab) => {
    setActiveTab(tab)
    switch (tab) {
      case "MY ADS":
        navigate("/dashboard/my-posts")
        break
      case "MESSAGES":
        console.log("Messages functionality to be implemented")
        break
      case "PACKAGES":
        console.log("Packages functionality to be implemented")
        break
      case "PACKAGE HISTORY":
        console.log("Package history functionality to be implemented")
        break
      default:
        break
    }
  }

  // Calculate last active time
  const getLastActiveTime = () => {
    if (!profileData?.updatedAt && !user?.updatedAt) return "1 month Ago"

    const lastUpdate = new Date(profileData?.updatedAt || user?.updatedAt)
    const now = new Date()
    const diffTime = Math.abs(now - lastUpdate)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "1 day ago"
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
    if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months ago`
    return `${Math.ceil(diffDays / 365)} years ago`
  }

  // Get user plan type
  const getUserPlan = () => {
    if (profileData?.plan) return profileData.plan
    if (stats.totalListings > 10) return "Premium"
    if (stats.totalListings > 5) return "Basic"
    return "Free"
  }

  const currentUser = profileData || user

  // Show content immediately, don't wait for loading
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Profile Header Section */}
        <div className="flex items-start gap-6 mb-8">
          {/* Profile Avatar */}
          <div className="w-32 h-32 bg-red-500 rounded-lg flex items-center justify-center shadow-sm">
            {currentUser?.image ? (
              <img
                src={currentUser.image || "/placeholder.svg"}
                alt={currentUser.Name}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="flex flex-col items-center">
                <FaBook className="text-white text-2xl mb-1" />
                <FaBook className="text-white text-2xl mb-1" />
                <FaBook className="text-white text-2xl" />
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <div className="mb-4">
              <h1 className="text-2xl font-normal text-gray-800 mb-2">{currentUser?.Name || "User"}</h1>
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                <button onClick={() => navigate("/profile")} className="text-gray-500 hover:text-gray-700">
                  👤 Profile
                </button>
                <span>|</span>
                <button onClick={() => navigate("/dashboard/settings")} className="text-gray-500 hover:text-gray-700">
                  ✏️ Edit Profile
                </button>
              </div>
              <p className="text-gray-500 text-sm mb-3">Last active: {getLastActiveTime()}</p>
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  getUserPlan() === "Premium"
                    ? "bg-purple-500 text-white"
                    : getUserPlan() === "Basic"
                      ? "bg-blue-500 text-white"
                      : "bg-orange-500 text-white"
                }`}
              >
                {getUserPlan()}
              </span>
            </div>

            {/* Stats Cards */}
            <div className="flex gap-4">
              <div className="bg-slate-600 text-white px-6 py-4 rounded text-center min-w-[120px]">
                <div className="text-2xl font-bold">{stats.adsSold}</div>
                <div className="text-xs uppercase tracking-wide">AD SOLD</div>
              </div>
              <div className="bg-blue-500 text-white px-6 py-4 rounded text-center min-w-[120px]">
                <div className="text-2xl font-bold">{stats.totalListings}</div>
                <div className="text-xs uppercase tracking-wide">TOTAL LISTINGS</div>
              </div>
              <div className="bg-green-500 text-white px-6 py-4 rounded text-center min-w-[120px]">
                <div className="text-2xl font-bold">{stats.inactiveAds}</div>
                <div className="text-xs uppercase tracking-wide">INACTIVE ADS</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-300 mb-8">
          <div className="flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`py-3 px-1 font-medium text-sm uppercase tracking-wide transition-colors relative ${
                  activeTab === tab ? "text-gray-800 border-b-2 border-gray-800" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
                {activeTab === tab && tab === "MY ADS" && <span className="ml-1">▼</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Manage Your Profile Section */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-xl font-medium text-gray-700 mb-8">Manage Your Profile</h2>

          <div className="space-y-6">
            {/* Your name */}
            <div className="flex items-center">
              <label className="w-32 text-gray-700 font-medium">Your name</label>
              <div className="flex-1 max-w-md">
                <span className="text-gray-600">{currentUser?.Name || "Not provided"}</span>
              </div>
            </div>

            {/* Email Address */}
            <div className="flex items-center">
              <label className="w-32 text-gray-700 font-medium">Email Address</label>
              <div className="flex-1 max-w-md">
                <span className="text-gray-600">{currentUser?.email || "Not provided"}</span>
              </div>
            </div>

            {/* Phone Number */}
            <div className="flex items-center">
              <label className="w-32 text-gray-700 font-medium">Phone Number</label>
              <div className="flex-1 max-w-md">
                <span className="text-gray-600">
                  {currentUser?.contactNumber || currentUser?.additionalDetails?.contactNumber || "Not provided"}
                </span>
              </div>
            </div>

            {/* You are a(n) */}
            <div className="flex items-center">
              <label className="w-32 text-gray-700 font-medium">You are a(n)</label>
              <div className="flex-1 max-w-md">
                <span className="text-gray-600">{currentUser?.accountType || "Student"}</span>
              </div>
            </div>

            {/* College */}
            <div className="flex items-center">
              <label className="w-32 text-gray-700 font-medium">College</label>
              <div className="flex-1 max-w-md">
                <span className="text-gray-600">{currentUser?.college || "Not provided"}</span>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center">
              <label className="w-32 text-gray-700 font-medium">Location</label>
              <div className="flex-1 max-w-md">
                <span className="text-gray-600">{currentUser?.location || "Not provided"}</span>
              </div>
            </div>

            {/* Date of Birth */}
            {currentUser?.additionalDetails?.dateOfBirth && (
              <div className="flex items-center">
                <label className="w-32 text-gray-700 font-medium">Date of Birth</label>
                <div className="flex-1 max-w-md">
                  <span className="text-gray-600">
                    {new Date(currentUser.additionalDetails.dateOfBirth).toLocaleDateString()}
                  </span>
                </div>
              </div>
            )}

            {/* Gender */}
            {currentUser?.additionalDetails?.gender && (
              <div className="flex items-center">
                <label className="w-32 text-gray-700 font-medium">Gender</label>
                <div className="flex-1 max-w-md">
                  <span className="text-gray-600">{currentUser.additionalDetails.gender}</span>
                </div>
              </div>
            )}

            {/* About */}
            {currentUser?.additionalDetails?.about && (
              <div className="flex items-start">
                <label className="w-32 text-gray-700 font-medium pt-1">About</label>
                <div className="flex-1 max-w-md">
                  <span className="text-gray-600">{currentUser.additionalDetails.about}</span>
                </div>
              </div>
            )}

            {/* Member Since */}
            <div className="flex items-center">
              <label className="w-32 text-gray-700 font-medium">Member Since</label>
              <div className="flex-1 max-w-md">
                <span className="text-gray-600">
                  {currentUser?.createdAt ? new Date(currentUser.createdAt).toLocaleDateString() : "Not available"}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/dashboard/settings")}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Edit Profile
              </button>
              <button
                onClick={() => navigate("/dashboard/my-posts")}
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors font-medium"
              >
                View My Ads ({stats.totalListings})
              </button>
              <button
                onClick={() => navigate("/dashboard/favorites")}
                className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors font-medium"
              >
                Favorites ({stats.favorites})
              </button>
            </div>
          </div>
        </div>

        {/* Additional Stats Section */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-8">
          <h3 className="text-xl font-medium text-gray-700 mb-6">Account Activity</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{stats.totalListings}</div>
              <div className="text-gray-600 text-sm">Total Posts</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{stats.adsSold}</div>
              <div className="text-gray-600 text-sm">Books Sold</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{stats.favorites}</div>
              <div className="text-gray-600 text-sm">Favorites</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">
                {currentUser?.createdAt
                  ? Math.floor((new Date() - new Date(currentUser.createdAt)) / (1000 * 60 * 60 * 24))
                  : 0}
              </div>
              <div className="text-gray-600 text-sm">Days Active</div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Widget (bottom right) */}
      <div className="fixed bottom-6 left-6 z-50">
        <div className="bg-red-500 text-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-red-600 transition-colors">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="mt-2 text-xs text-gray-600 text-center">Message us</div>
      </div>
    </div>
  )
}
