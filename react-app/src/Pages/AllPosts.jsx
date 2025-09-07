"use client"

import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { getAllPosts } from "../services/operations/postAPI"
import PostCard from "../Components/Core/PostCard"

export default function AllPosts() {
  const dispatch = useDispatch()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    category: "",
    search: "",
    city: "",
    priceMin: "",
    priceMax: "",
    adType: "",
  })

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      const result = await dispatch(getAllPosts(filters))
      if (result) {
        setPosts(result)
      }
      setLoading(false)
    }
    fetchPosts()
  }, [dispatch, filters])

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  if (loading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">All Books</h1>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <input
              type="text"
              placeholder="Search books..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2"
            />
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">All Categories</option>
              <option value="Competitive Exam">Competitive Exam</option>
              <option value="Engineering">Engineering</option>
              <option value="Medical">Medical</option>
              <option value="Stories">Stories</option>
              <option value="School Books">School Books</option>
              <option value="Magazines">Magazines</option>
            </select>
            <input
              type="text"
              placeholder="City"
              value={filters.city}
              onChange={(e) => handleFilterChange("city", e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2"
            />
            <input
              type="number"
              placeholder="Min Price"
              value={filters.priceMin}
              onChange={(e) => handleFilterChange("priceMin", e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2"
            />
            <input
              type="number"
              placeholder="Max Price"
              value={filters.priceMax}
              onChange={(e) => handleFilterChange("priceMax", e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2"
            />
            <select
              value={filters.adType}
              onChange={(e) => handleFilterChange("adType", e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">All Types</option>
              <option value="Sell">Sell</option>
              <option value="Buy">Buy</option>
              <option value="Exchange">Exchange</option>
              <option value="Lost and Found">Lost and Found</option>
            </select>
          </div>
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No books found</p>
            <p className="text-gray-500 mt-2">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
