import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { favoritesEndpoints } from "../apis"

const { ADD_TO_FAVORITES_API, REMOVE_FROM_FAVORITES_API, GET_FAVORITES_API, CHECK_FAVORITE_API } = favoritesEndpoints

// Add to favorites
export function addToFavorites(postId) {
  return async (dispatch) => {
    try {
      const response = await apiConnector(
        "POST",
        ADD_TO_FAVORITES_API,
        { postId },
        {
          Authorization: `Bearer ${localStorage.getItem("token")?.replace(/"/g, "")}`,
        },
      )

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Added to favorites!")
      return true
    } catch (error) {
      console.log("ADD TO FAVORITES API ERROR............", error)
      toast.error(error.response?.data?.message || "Failed to add to favorites")
      return false
    }
  }
}

// Remove from favorites
export function removeFromFavorites(postId) {
  return async (dispatch) => {
    try {
      const response = await apiConnector(
        "POST",
        REMOVE_FROM_FAVORITES_API,
        { postId },
        {
          Authorization: `Bearer ${localStorage.getItem("token")?.replace(/"/g, "")}`,
        },
      )

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Removed from favorites!")
      return true
    } catch (error) {
      console.log("REMOVE FROM FAVORITES API ERROR............", error)
      toast.error("Failed to remove from favorites")
      return false
    }
  }
}

// Get user's favorites
export async function getFavorites(token) {
  try {
    const response = await apiConnector("GET", GET_FAVORITES_API, null, {
      Authorization: `Bearer ${token?.replace(/"/g, "")}`,
    })

    if (!response.data.success) {
      throw new Error(response.data.message)
    }

    return response.data.data
  } catch (error) {
    console.log("GET FAVORITES API ERROR............", error)
    toast.error("Failed to load favorites")
    return []
  }
}

// Check if post is favorite
export function checkFavorite(postId) {
  return async (dispatch) => {
    try {
      const response = await apiConnector("GET", `${CHECK_FAVORITE_API}/${postId}`, null, {
        Authorization: `Bearer ${localStorage.getItem("token")?.replace(/"/g, "")}`,
      })

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      return response.data.isFavorite
    } catch (error) {
      console.log("CHECK FAVORITE API ERROR............", error)
      return false
    }
  }
}
