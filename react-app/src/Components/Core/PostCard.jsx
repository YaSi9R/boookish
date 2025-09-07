"use client"

import { useState } from "react"
import { FaHeart, FaLocationDot } from "react-icons/fa6"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { addToFavorites, removeFromFavorites } from "../../services/operations/favoritesAPI"
import { toast } from "react-toastify"

export default function PostCard({ post }) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [isFavorite, setIsFavorite] = useState(user?.favorites?.includes(post._id) || false)

  const handleFavoriteToggle = async () => {
    if (!token) {
      toast.error("Please login to add favorites")
      return
    }

    if (isFavorite) {
      const success = await dispatch(removeFromFavorites(post._id))
      if (success) {
        setIsFavorite(false)
      }
    } else {
      const success = await dispatch(addToFavorites(post._id))
      if (success) {
        setIsFavorite(true)
      }
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img src={post.Images?.[0] || "/placeholder.svg"} alt={post.Title} className="w-full h-48 object-cover" />
        {user && (
          <button
            onClick={handleFavoriteToggle}
            className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
          >
            <FaHeart className={`w-5 h-5 ${isFavorite ? "text-red-500" : "text-gray-400"}`} />
          </button>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{post.Title}</h3>

        <p className="text-2xl font-bold text-[#E74C3C] mb-2">₹{post.Price}</p>

        <div className="flex items-center text-gray-600 mb-2">
          <FaLocationDot className="w-4 h-4 mr-1" />
          <span className="text-sm">{post.City}</span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.Description}</p>

        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">{new Date(post.postedAt).toLocaleDateString()}</span>
          <Link
            to={`/post/${post._id}`}
            className="bg-[#E74C3C] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#b52417] transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}
