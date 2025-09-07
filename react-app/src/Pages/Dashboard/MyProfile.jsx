"use client"

import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FaBook } from "react-icons/fa"
import { RiEditBoxLine } from "react-icons/ri"
import { getUserDetails } from "../../services/operations/profileAPI"
import { getMyPosts } from "../../services/operations/postAPI"
import { getFavorites } from "../../services/operations/favoritesAPI"

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [profileData, setProfileData] = useState(user) // Initialize with existing user data
  const [stats, setStats] = useState({
    adsSold: 0,
    totalListings: 0,
    inactiveAds: 0,
    favorites: 0,
  })

  // Fetch user profile data quickly in parallel
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
        // Don't show error, just use existing data
      }
    }

    fetchAllData()
  }, [token, dispatch])

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
      {/* Profile Header Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-start gap-6">
            {/* Profile Avatar */}
            <div className="w-32 h-32 bg-red-500 rounded-lg flex items-center justify-center shadow-sm">
              {currentUser?.image ? (
                <img
                  src={currentUser.image || "/placeholder.svg"}
                  alt={currentUser.Name}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <FaBook className="text-white text-4xl" />
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{currentUser?.Name || "User"}</h1>
                <span
                  className={`px-2 py-1 rounded text-sm font-medium ${
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

              <div className="flex items-center gap-4 text-gray-600 mb-4">
                <button className="text-blue-600 hover:underline">Profile</button>
                <span>|</span>
                <button
                  onClick={() => navigate("/dashboard/settings")}
                  className="text-blue-600 hover:underline flex items-center gap-1"
                >
                  <RiEditBoxLine className="text-sm" />
                  Edit Profile
                </button>
              </div>

              <p className="text-gray-500 text-sm mb-6">Last active: {getLastActiveTime()}</p>

              {/* Stats Cards */}
              <div className="flex gap-4">
                <div className="bg-slate-600 text-white px-6 py-4 rounded-lg text-center min-w-[120px]">
                  <div className="text-2xl font-bold">{stats.adsSold}</div>
                  <div className="text-sm opacity-90">AD SOLD</div>
                </div>
                <div className="bg-blue-500 text-white px-6 py-4 rounded-lg text-center min-w-[120px]">
                  <div className="text-2xl font-bold">{stats.totalListings}</div>
                  <div className="text-sm opacity-90">TOTAL LISTINGS</div>
                </div>
                <div className="bg-green-500 text-white px-6 py-4 rounded-lg text-center min-w-[120px]">
                  <div className="text-2xl font-bold">{stats.inactiveAds}</div>
                  <div className="text-sm opacity-90">INACTIVE ADS</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of the component remains the same... */}
      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-8">
            <button className="py-4 px-2 border-b-2 border-blue-500 text-blue-600 font-medium">MY ADS</button>
            <button
              onClick={() => navigate("/dashboard/favorites")}
              className="py-4 px-2 text-gray-600 hover:text-gray-900"
            >
              FAVORITES ({stats.favorites})
            </button>
            <button className="py-4 px-2 text-gray-600 hover:text-gray-900">MESSAGES</button>
            <button className="py-4 px-2 text-gray-600 hover:text-gray-900">PACKAGES</button>
          </div>
        </div>
      </div>

      {/* Profile Management Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Manage Your Profile</h2>

          <div className="space-y-6">
            {/* Your Name */}
            <div className="flex items-center">
              <label className="w-32 text-gray-700 font-medium">Your name</label>
              <div className="flex-1 max-w-md">
                <input
                  type="text"
                  value={currentUser?.Name || ""}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="flex items-center">
              <label className="w-32 text-gray-700 font-medium">Email Address</label>
              <div className="flex-1 max-w-md">
                <input
                  type="email"
                  value={currentUser?.email || ""}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="flex items-center">
              <label className="w-32 text-gray-700 font-medium">Phone Number</label>
              <div className="flex-1 max-w-md">
                <input
                  type="tel"
                  value={currentUser?.contactNumber || currentUser?.additionalDetails?.contactNumber || ""}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
                  placeholder="Add phone number"
                />
              </div>
            </div>

            {/* Account Type */}
            <div className="flex items-center">
              <label className="w-32 text-gray-700 font-medium">You are a(n)</label>
              <div className="flex-1 max-w-md">
                <select
                  value={currentUser?.accountType || "Student"}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
                >
                  <option value="Student">Student</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>

            {/* College */}
            <div className="flex items-center">
              <label className="w-32 text-gray-700 font-medium">College</label>
              <div className="flex-1 max-w-md">
                <input
                  type="text"
                  value={currentUser?.college || ""}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
                  placeholder="Add college name"
                />
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center">
              <label className="w-32 text-gray-700 font-medium">Location</label>
              <div className="flex-1 max-w-md">
                <input
                  type="text"
                  value={currentUser?.location || ""}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
                  placeholder="Add location"
                />
              </div>
            </div>

            {/* About */}
            {currentUser?.additionalDetails?.about && (
              <div className="flex items-start">
                <label className="w-32 text-gray-700 font-medium pt-1">About</label>
                <div className="flex-1 max-w-md">
                  <textarea
                    value={currentUser.additionalDetails.about}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600 min-h-[80px]"
                  />
                </div>
              </div>
            )}

            {/* Edit Button */}
            <div className="flex items-center">
              <div className="w-32"></div>
              <div className="flex-1 max-w-md">
                <button
                  onClick={() => navigate("/dashboard/settings")}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <RiEditBoxLine />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => navigate("/dashboard/add-post")}
              className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors font-medium"
            >
              Add New Post
            </button>
            <button
              onClick={() => navigate("/dashboard/my-posts")}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              View My Posts ({stats.totalListings})
            </button>
            <button
              onClick={() => navigate("/dashboard/favorites")}
              className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition-colors font-medium"
            >
              My Favorites ({stats.favorites})
            </button>
          </div>
        </div>

        {/* Account Statistics */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Account Statistics</h3>
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
    </div>
  )
}
