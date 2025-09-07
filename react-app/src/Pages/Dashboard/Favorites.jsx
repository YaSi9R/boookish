"use client"

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getFavorites } from "../../services/operations/favoritesAPI"
import PostCard from "../../Components/Core/PostCard"

export default function Favorites() {
  const { token } = useSelector((state) => state.auth)
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true)
      const result = await getFavorites(token)
      if (result) {
        setFavorites(result)
      }
      setLoading(false)
    }
    fetchFavorites()
  }, [token])

  if (loading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <>
      <div className="mb-14">
        <h1 className="text-3xl font-medium text-richblack-5">My Favorites</h1>
      </div>
      {favorites.length === 0 ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="text-center">
            <p className="text-2xl text-richblack-400">No favorites found</p>
            <p className="mt-4 text-richblack-300">Start adding books to your favorites to see them here.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </>
  )
}
