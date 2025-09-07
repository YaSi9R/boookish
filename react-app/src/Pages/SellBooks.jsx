"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { FiUploadCloud, FiX } from "react-icons/fi"
import { createPost } from "../services/operations/postAPI"

export default function SellBook() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm()

  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [selectedImages, setSelectedImages] = useState([])
  const [previewImages, setPreviewImages] = useState([])

  // Watch category to show subcategories
  const watchedCategory = watch("Category")

  const categories = [
    "Competitive Exam",
    "Engineering",
    "Magazines",
    "Management Books",
    "Medical",
    "School Books",
    "Stories",
  ]

  const subCategories = {
    "Competitive Exam": ["UPSC", "SSC", "Banking", "Railway", "GATE", "CAT", "Other"],
    Engineering: ["Computer Science", "Mechanical", "Electrical", "Civil", "Electronics", "Other"],
    Magazines: ["Science", "Fashion", "Tech", "Entertainment", "News", "Other"],
    "Management Books": ["Finance", "Marketing", "HR", "Leadership", "Strategy", "Other"],
    Medical: ["Anatomy", "Pharmacology", "Surgery", "Pathology", "Nursing", "Other"],
    "School Books": ["Mathematics", "Science", "History", "Geography", "English", "Other"],
    Stories: ["Fiction", "Non-Fiction", "Comics", "Short Stories", "Novels", "Other"],
  }

  // Handle image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 5) {
      toast.error("You can upload maximum 5 images")
      return
    }

    setSelectedImages(files)
    setValue("images", files)

    // Create preview URLs
    const previews = files.map((file) => URL.createObjectURL(file))
    setPreviewImages(previews)
  }

  // Remove image
  const removeImage = (index) => {
    const newImages = selectedImages.filter((_, i) => i !== index)
    const newPreviews = previewImages.filter((_, i) => i !== index)

    setSelectedImages(newImages)
    setPreviewImages(newPreviews)
    setValue("images", newImages)
  }

  // Handle form submission
  const onSubmit = async (data) => {
    if (!token) {
      toast.error("Please login to sell books")
      navigate("/login")
      return
    }

    if (selectedImages.length === 0) {
      toast.error("Please select at least one image")
      return
    }

    setLoading(true)

    try {
      const formData = new FormData()

      // Add all form fields
      formData.append("Title", data.Title)
      formData.append("Category", data.Category)
      formData.append("subCategory", data.subCategory)
      formData.append("adType", data.adType)
      formData.append("PriceType", data.PriceType)
      formData.append("Price", data.Price)
      formData.append("Condition", data.Condition)
      formData.append("old", data.old)
      formData.append("MRP", data.MRP)
      formData.append("Pages", data.Pages || "")
      formData.append("Language", data.Language || "")
      formData.append("Description", data.Description)
      formData.append("Name", data.Name || user?.Name)
      formData.append("Number", data.Number)
      formData.append("City", data.City)

      // Add images
      selectedImages.forEach((image) => {
        formData.append("images", image)
      })

      const result = await createPost(formData, token)

      if (result) {
        toast.success("Book posted successfully!")
        navigate("/dashboard/my-posts")
      }
    } catch (error) {
      console.error("Error creating post:", error)
      toast.error("Failed to post book")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Sell Your Book</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Book Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Book Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("Title", { required: "Book title is required" })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Enter book title"
              />
              {errors.Title && <p className="text-red-500 text-sm mt-1">{errors.Title.message}</p>}
            </div>

            {/* Category and Subcategory */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("Category", { required: "Category is required" })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.Category && <p className="text-red-500 text-sm mt-1">{errors.Category.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sub Category <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("subCategory", { required: "Sub category is required" })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  disabled={!watchedCategory}
                >
                  <option value="">Select Sub Category</option>
                  {watchedCategory &&
                    subCategories[watchedCategory]?.map((subCat) => (
                      <option key={subCat} value={subCat}>
                        {subCat}
                      </option>
                    ))}
                </select>
                {errors.subCategory && <p className="text-red-500 text-sm mt-1">{errors.subCategory.message}</p>}
              </div>
            </div>

            {/* Ad Type and Price Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ad Type <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("adType", { required: "Ad type is required" })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">Select Ad Type</option>
                  <option value="Sell">Sell</option>
                  <option value="Buy">Buy</option>
                  <option value="Exchange">Exchange</option>
                  <option value="Lost and Found">Lost and Found</option>
                </select>
                {errors.adType && <p className="text-red-500 text-sm mt-1">{errors.adType.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Type <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("PriceType", { required: "Price type is required" })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">Select Price Type</option>
                  <option value="Fixed">Fixed</option>
                  <option value="Negotiable">Negotiable</option>
                  <option value="Price On Call">Price On Call</option>
                </select>
                {errors.PriceType && <p className="text-red-500 text-sm mt-1">{errors.PriceType.message}</p>}
              </div>
            </div>

            {/* Price and MRP */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selling Price <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    type="number"
                    {...register("Price", {
                      required: "Price is required",
                      min: { value: 1, message: "Price must be greater than 0" },
                    })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter selling price"
                  />
                </div>
                {errors.Price && <p className="text-red-500 text-sm mt-1">{errors.Price.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Original MRP <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    type="number"
                    {...register("MRP", {
                      required: "MRP is required",
                      min: { value: 1, message: "MRP must be greater than 0" },
                    })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter original MRP"
                  />
                </div>
                {errors.MRP && <p className="text-red-500 text-sm mt-1">{errors.MRP.message}</p>}
              </div>
            </div>

            {/* Condition and Age */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Book Condition <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("Condition", { required: "Condition is required" })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">Select Condition</option>
                  <option value="New">New</option>
                  <option value="Like New">Like New</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Used">Used</option>
                </select>
                {errors.Condition && <p className="text-red-500 text-sm mt-1">{errors.Condition.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How Old <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("old", { required: "Age is required" })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="e.g., 6 months, 1 year"
                />
                {errors.old && <p className="text-red-500 text-sm mt-1">{errors.old.message}</p>}
              </div>
            </div>

            {/* Pages and Language */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Pages</label>
                <input
                  type="number"
                  {...register("Pages")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter number of pages"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                <input
                  type="text"
                  {...register("Language")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="e.g., English, Hindi"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("Description", { required: "Description is required" })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Describe your book condition, any highlights, missing pages, etc."
              />
              {errors.Description && <p className="text-red-500 text-sm mt-1">{errors.Description.message}</p>}
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("Name", { required: "Name is required" })}
                    defaultValue={user?.Name || ""}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter your name"
                  />
                  {errors.Name && <p className="text-red-500 text-sm mt-1">{errors.Name.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    {...register("Number", {
                      required: "Contact number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Please enter a valid 10-digit phone number",
                      },
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter 10-digit phone number"
                  />
                  {errors.Number && <p className="text-red-500 text-sm mt-1">{errors.Number.message}</p>}
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("City", { required: "City is required" })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter your city"
                />
                {errors.City && <p className="text-red-500 text-sm mt-1">{errors.City.message}</p>}
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Book Images <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-500 mb-4">Upload up to 5 images of your book</p>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-red-400 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <FiUploadCloud className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-lg font-medium text-gray-900 mb-2">Click to upload images</p>
                  <p className="text-sm text-gray-500">PNG, JPG, JPEG up to 10MB each</p>
                </label>
              </div>

              {/* Image Previews */}
              {previewImages.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-4">
                  {previewImages.map((preview, index) => (
                    <div key={index} className="relative">
                      <img
                        src={preview || "/placeholder.svg"}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#E74C3C] text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "Posting..." : "Post Your Book"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
