import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { postEndpoints } from "../apis"

const { GET_ALL_POSTS_API, GET_POST_BY_ID_API, CREATE_POST_API, GET_MY_POSTS_API, UPDATE_POST_API, DELETE_POST_API } =
  postEndpoints

// Get all posts with filters
export function getAllPosts(filters = {}) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading posts...")
    try {
      const queryParams = new URLSearchParams(filters).toString()
      const url = queryParams ? `${GET_ALL_POSTS_API}?${queryParams}` : GET_ALL_POSTS_API

      const response = await apiConnector("GET", url)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Posts loaded successfully")
      return response.data.data
    } catch (error) {
      console.log("GET ALL POSTS API ERROR............", error)
      toast.error("Failed to load posts")
      return null
    } finally {
      toast.dismiss(toastId)
    }
  }
}

// Get single post by ID
export function getPostById(postId) {
  return async (dispatch) => {
    try {
      const response = await apiConnector("GET", `${GET_POST_BY_ID_API}/${postId}`)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      return response.data.data
    } catch (error) {
      console.log("GET POST BY ID API ERROR............", error)
      toast.error("Failed to load post details")
      return null
    }
  }
}

// Get post details for editing
export async function getPostDetails(postId, token) {
  const toastId = toast.loading("Loading...")
  let result = null
  try {
    const response = await apiConnector("GET", `${GET_POST_BY_ID_API}/${postId}`, null, {
      Authorization: `Bearer ${token}`,
    })
    console.log("GET_POST_DETAILS_API API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Post Details")
    }
    result = {
      postDetails: response?.data?.data,
    }
  } catch (error) {
    console.log("GET_POST_DETAILS_API API ERROR............", error)
    result = error.response?.data
    toast.error(error.response?.data?.message || "Failed to fetch post details")
  }
  toast.dismiss(toastId)
  return result
}

// Create new post
// Create new post
export async function createPost(postData, token) {
  const toastId = toast.loading("Creating post...");
  try {
    // ✅ Enforce max 5 images before sending
    if (postData.getAll("images").length > 5) {
      toast.error("You can upload a maximum of 5 images");
      toast.dismiss(toastId);
      return null;
    }

    const response = await apiConnector("POST", CREATE_POST_API, postData, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Failed to create post");
    }

    toast.success("Book posted successfully!");
    return response.data.data;
  } catch (error) {
    console.error("Create Post API Error: in operations/postApi.js/createPost", error);
    toast.error(error.response?.data?.message || "Error while creating post");
    return null;
  } finally {
    toast.dismiss(toastId);
  }
}


// Get user's posts
export async function getMyPosts(token) {
  const toastId = toast.loading("Loading your posts...")
  try {
    const response = await apiConnector("GET", GET_MY_POSTS_API, null, {
      Authorization: `Bearer ${token?.replace(/"/g, "")}`,
    })

    if (!response.data.success) {
      throw new Error(response.data.message)
    }

    return response.data.data
  } catch (error) {
    console.log("GET MY POSTS API ERROR............", error)
    toast.error("Failed to load your posts")
    return []
  } finally {
    toast.dismiss(toastId)
  }
}

// Edit post
export async function editPost(data, token) {
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("PUT", UPDATE_POST_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    })
    console.log("EDIT POST API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Post Details")
    }
    toast.success("Post Details Updated Successfully")
    return response?.data?.data
  } catch (error) {
    console.log("EDIT POST API ERROR............", error)
    toast.error(error.response?.data?.message || "Failed to update post")
  }
  toast.dismiss(toastId)
}

// Delete post
export async function deletePost(postId) {
  const toastId = toast.loading("Deleting post...")
  try {
    const response = await apiConnector("DELETE", `${DELETE_POST_API}/${postId}`, null, {
      Authorization: `Bearer ${localStorage.getItem("token")?.replace(/"/g, "")}`,
    })

    if (!response.data.success) {
      throw new Error(response.data.message)
    }

    toast.success("Post deleted successfully!")
    return true
  } catch (error) {
    console.log("DELETE POST API ERROR............", error)
    toast.error("Failed to delete post")
    return false
  } finally {
    toast.dismiss(toastId)
  }
}
