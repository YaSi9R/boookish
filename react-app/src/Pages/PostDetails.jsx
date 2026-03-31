"use client"

import { useEffect, useState } from "react"
import { useSearchParams, Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { FaHeart, FaLocationDot, FaArrowLeft, FaMessage } from "react-icons/fa6"
import { getPostById, getAllPosts } from "../services/operations/postAPI"
import { getOrCreateConversation } from "../services/operations/chatAPI"
import { addToFavorites, removeFromFavorites } from "../services/operations/favoritesAPI"
import { toast } from "react-hot-toast"
import HomeCard from "../Components/Core/HomeCard"

export default function PostDetails({ id: propId }) {
  const [searchParams] = useSearchParams()
  const id = propId || searchParams.get("id")
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return
      setLoading(true)
      const result = await dispatch(getPostById(id))
      if (result) {
        setPost(result)
        setIsFavorite(user?.favorites?.includes(result._id) || false)
      }
      setLoading(false)
    }
    fetchPost()
  }, [dispatch, id, user])

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

  const handleChat = async () => {
    console.log("Chat button clicked");
    if (!token) {
      toast.error("Please login to chat with the seller");
      return;
    }

    if (!user) {
      console.log("User missing:", user);
      toast.error("User data not loaded yet. Please wait a moment.");
      return;
    }

    if (!post) {
      console.log("Post missing:", post);
      toast.error("Post data not loaded yet. Please wait a moment.");
      return;
    }

    // Standardize IDs (some objects might have .id while others have ._id)
    const currentUserId = user._id || user.id;
    const sellerId = post.seller?._id || post.seller;

    console.log("Initiating chat:", { currentUserId, sellerId, postId: post._id });

    if (!sellerId) {
      toast.error("Seller information is missing from this post");
      return;
    }

    if (currentUserId === sellerId) {
      toast.error("This is your own post. You cannot chat with yourself.");
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading("Initiating chat...");
    try {
      const conversation = await dispatch(getOrCreateConversation(sellerId, post._id, token));
      toast.dismiss(loadingToast);
      
      if (conversation) {
        toast.success("Opening chat...");
        navigate(`/chats?id=${conversation._id}`);
      } else {
        toast.error("Could not create conversation. Check console.");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      console.error("Chat initiation failed:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <p className="text-xl text-gray-600">Post not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <Link 
            to={`/posts?category=${encodeURIComponent(post.Category)}&subCategory=${encodeURIComponent(post.subCategory)}`}
            className="inline-flex items-center gap-2 text-[#E74C3C] hover:text-[#b52417] font-semibold transition-colors"
          >
            <FaArrowLeft />
            Back to {post.subCategory} Books
          </Link>
        </div>
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 font-medium">
          <Link to="/" className="hover:text-[#E74C3C] transition-colors">Home</Link>
          <span className="text-gray-300">/</span>
          <Link 
            to={`/posts?category=${encodeURIComponent(post.Category)}`} 
            className="hover:text-[#E74C3C] transition-colors"
          >
            {post.Category}
          </Link>
          <span className="text-gray-300">/</span>
          <Link 
            to={`/posts?category=${encodeURIComponent(post.Category)}&subCategory=${encodeURIComponent(post.subCategory)}`} 
            className="text-[#E74C3C] font-semibold"
          >
            {post.subCategory}
          </Link>
        </nav>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Image Gallery */}
            <div>
              <div className="relative mb-4">
                <img
                  src={post.Images?.[currentImageIndex] || "/placeholder.svg"}
                  alt={post.Title}
                  className="w-full h-96 object-cover rounded-lg"
                />
                {user && (
                  <button
                    onClick={handleFavoriteToggle}
                    className="absolute top-4 right-4 p-3 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
                  >
                    <FaHeart className={`w-6 h-6 ${isFavorite ? "text-red-500" : "text-gray-400"}`} />
                  </button>
                )}
              </div>

              {/* Image Thumbnails */}
              {post.Images && post.Images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {post.Images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${
                        currentImageIndex === index ? "border-[#E74C3C]" : "border-gray-200"
                      }`}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${post.Title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Post Details */}
            <div>
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{post.Title}</h1>
                <div className="flex items-center text-gray-600 mb-4">
                  <FaLocationDot className="w-5 h-5 mr-2" />
                  <span>{post.City}</span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl font-bold text-[#E74C3C]">₹{post.Price}</span>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">({post.PriceType})</span>
                    <span className="text-xs text-blue-600 font-medium">{post.visits || 0} Views</span>
                  </div>
                </div>
              </div>

              {/* Book Details */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <span className="text-sm font-medium text-gray-500">Category:</span>
                  <p className="text-gray-900">{post.Category}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Sub Category:</span>
                  <p className="text-gray-900">{post.subCategory}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Condition:</span>
                  <p className="text-gray-900">{post.Condition}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Ad Type:</span>
                  <p className="text-gray-900">{post.adType}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Original MRP:</span>
                  <p className="text-gray-900">₹{post.MRP}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Age:</span>
                  <p className="text-gray-900">{post.old}</p>
                </div>
                {post.Pages && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Pages:</span>
                    <p className="text-gray-900">{post.Pages}</p>
                  </div>
                )}
                {post.Language && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Language:</span>
                    <p className="text-gray-900">{post.Language}</p>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">{post.Description}</p>
              </div>

              {/* Seller Information */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Seller Information</h3>
                <div className="flex items-center gap-4 mb-3">
                  <img
                    src={post.seller?.image || "/placeholder.svg"}
                    alt={post.seller?.Name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{post.Name}</p>
                    <p className="text-sm text-gray-600">
                      Member since {post.seller?.createdAt ? new Date(post.seller.createdAt).getFullYear() : new Date().getFullYear()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mb-6">
                <button 
                  onClick={handleFavoriteToggle}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold border-2 transition-colors ${
                    isFavorite 
                    ? "bg-red-50 border-red-500 text-red-500" 
                    : "bg-white border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-500"
                  }`}
                >
                  <FaHeart className={isFavorite ? "fill-current" : ""} />
                  {isFavorite ? "Saved to Favourites" : "Add to Favourites"}
                </button>
                <button 
                  onClick={handleChat}
                  className="flex-1 bg-[#E74C3C] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#b52417] transition-colors flex items-center justify-center gap-2"
                >
                  <FaMessage />
                  Chat Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Books Section */}
        <RelatedBooks subCategory={post.subCategory} currentPostId={post._id} />
      </div>
    </div>
  )
}

function RelatedBooks({ subCategory, currentPostId }) {
  const [relatedPosts, setRelatedPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchRelated = async () => {
      setLoading(true)
      const result = await dispatch(getAllPosts({ subCategory, limit: 10 }))
      if (result) {
        // Filter out the current post
        const filtered = result.filter(p => p._id !== currentPostId).slice(0, 4)
        setRelatedPosts(filtered)
      }
      setLoading(false)
    }
    if (subCategory) {
      fetchRelated()
    }
  }, [subCategory, currentPostId, dispatch])

  if (loading || relatedPosts.length === 0) return null

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Books</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedPosts.map((book) => (
          <HomeCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  )
}
