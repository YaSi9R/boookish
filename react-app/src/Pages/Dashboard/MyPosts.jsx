"use client"

import { useEffect, useState } from "react"
import { VscAdd } from "react-icons/vsc"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getMyPosts } from "../../services/operations/postAPI"
import IconBtn from "../../Components/Common/IconBtn"
import PostsTable from "../../Components/DashBoard/MyPosts/PostsTable"

export default function MyPosts() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      const result = await getMyPosts(token)
      if (result) {
        setPosts(result)
      }
      setLoading(false)
    }
    fetchPosts()
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
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-richblack-5">My Posts</h1>
        <IconBtn text="Add Post" onclick={() => navigate("/dashboard/add-post")}>
          <VscAdd />
        </IconBtn>
      </div>
      {posts && <PostsTable posts={posts} setPosts={setPosts} />}
    </>
  )
}
