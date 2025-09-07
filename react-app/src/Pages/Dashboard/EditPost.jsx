"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getPostDetails } from "../../services/operations/postAPI"
import { setPost, setEditPost } from "../../slices/postSlice"
import PostForm from "../../Components/DashBoard/AddPost/PostForm"

export default function EditPost() {
  const dispatch = useDispatch()
  const { postId } = useParams()
  const { post } = useSelector((state) => state.post)
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const result = await getPostDetails(postId, token)
      if (result?.postDetails) {
        dispatch(setEditPost(true))
        dispatch(setPost(result.postDetails))
      }
      setLoading(false)
    })()
  }, [postId, token, dispatch])

  if (loading) {
    return (
      <div className="grid flex-1 place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">Edit Post</h1>
      <div className="mx-auto max-w-[600px]">
        {post ? (
          <PostForm />
        ) : (
          <p className="mt-14 text-center text-3xl font-semibold text-richblack-100">Post not found</p>
        )}
      </div>
    </div>
  )
}
