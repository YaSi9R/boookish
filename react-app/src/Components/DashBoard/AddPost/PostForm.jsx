"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { createPost, editPost } from "../../../services/operations/postAPI"
import IconBtn from "../../Common/IconBtn"
import Upload from "../Upload"

export default function PostForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const { post, editPost: editPostFlag } = useSelector((state) => state.post)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (editPostFlag) {
      setValue("Title", post.Title)
      setValue("Description", post.Description)
      setValue("Price", post.Price)
      setValue("Category", post.Category)
      setValue("subCategory", post.subCategory)
      setValue("adType", post.adType)
      setValue("PriceType", post.PriceType)
      setValue("Condition", post.Condition)
      setValue("old", post.old)
      setValue("MRP", post.MRP)
      setValue("Pages", post.Pages)
      setValue("Language", post.Language)
      setValue("Name", post.Name)
      setValue("Number", post.Number)
      setValue("City", post.City)
      setValue("Images", post.Images)
    }
  }, [editPostFlag, post, setValue])

  const isFormUpdated = () => {
    const currentValues = getValues()
    if (
      currentValues.Title !== post.Title ||
      currentValues.Description !== post.Description ||
      currentValues.Price !== post.Price ||
      currentValues.Category !== post.Category ||
      currentValues.subCategory !== post.subCategory ||
      currentValues.adType !== post.adType ||
      currentValues.PriceType !== post.PriceType ||
      currentValues.Condition !== post.Condition ||
      currentValues.old !== post.old ||
      currentValues.MRP !== post.MRP ||
      currentValues.Pages !== post.Pages ||
      currentValues.Language !== post.Language ||
      currentValues.Name !== post.Name ||
      currentValues.Number !== post.Number ||
      currentValues.City !== post.City ||
      currentValues.Images !== post.Images
    ) {
      return true
    }
    return false
  }

  const onSubmit = async (data) => {
    if (editPostFlag) {
      if (isFormUpdated()) {
        const currentValues = getValues()
        const formData = new FormData()

        formData.append("postId", post._id)
        if (currentValues.Title !== post.Title) {
          formData.append("Title", data.Title)
        }
        if (currentValues.Description !== post.Description) {
          formData.append("Description", data.Description)
        }
        if (currentValues.Price !== post.Price) {
          formData.append("Price", data.Price)
        }
        if (currentValues.Category !== post.Category) {
          formData.append("Category", data.Category)
        }
        if (currentValues.subCategory !== post.subCategory) {
          formData.append("subCategory", data.subCategory)
        }
        if (currentValues.adType !== post.adType) {
          formData.append("adType", data.adType)
        }
        if (currentValues.PriceType !== post.PriceType) {
          formData.append("PriceType", data.PriceType)
        }
        if (currentValues.Condition !== post.Condition) {
          formData.append("Condition", data.Condition)
        }
        if (currentValues.old !== post.old) {
          formData.append("old", data.old)
        }
        if (currentValues.MRP !== post.MRP) {
          formData.append("MRP", data.MRP)
        }
        if (currentValues.Pages !== post.Pages) {
          formData.append("Pages", data.Pages)
        }
        if (currentValues.Language !== post.Language) {
          formData.append("Language", data.Language)
        }
        if (currentValues.Name !== post.Name) {
          formData.append("Name", data.Name)
        }
        if (currentValues.Number !== post.Number) {
          formData.append("Number", data.Number)
        }
        if (currentValues.City !== post.City) {
          formData.append("City", data.City)
        }
        if (currentValues.Images !== post.Images) {
          formData.append("Images", data.Images)
        }

        setLoading(true)
        const result = await editPost(formData, token)
        setLoading(false)
        if (result) {
          navigate("/dashboard/my-posts")
        }
      } else {
        toast.error("No changes made to the form")
      }
      return
    }

    const formData = new FormData()
    formData.append("Title", data.Title)
    formData.append("Description", data.Description)
    formData.append("Price", data.Price)
    formData.append("Category", data.Category)
    formData.append("subCategory", data.subCategory)
    formData.append("adType", data.adType)
    formData.append("PriceType", data.PriceType)
    formData.append("Condition", data.Condition)
    formData.append("old", data.old)
    formData.append("MRP", data.MRP)
    formData.append("Pages", data.Pages)
    formData.append("Language", data.Language)
    formData.append("Name", data.Name)
    formData.append("Number", data.Number)
    formData.append("City", data.City)
    if (data.Images) {
      for (let i = 0; i < data.Images.length; i++) {
        formData.append("images", data.Images[i])
      }
    }

    setLoading(true)
    const result = await createPost(formData, token)
    if (result) {
      navigate("/dashboard/my-posts")
    }
    setLoading(false)
  }

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
    Competitive_Exam: ["UPSC", "SSC", "Banking", "Railway"],
    Engineering: ["Computer Science", "Mechanical", "Electrical", "Civil"],
    Magazines: ["Science", "Fashion", "Tech", "Entertainment"],
    "Management Books": ["Finance", "Marketing", "HR", "Leadership"],
    Medical: ["Anatomy", "Pharmacology", "Surgery", "Pathology"],
    "School Books": ["Mathematics", "Science", "History", "Geography"],
    Stories: ["Fiction", "Non-Fiction", "Comics", "Short Stories"],
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6"
    >
      {/* Post Information */}
      <div>
        <label className="text-sm text-richblack-5" htmlFor="Title">
          Book Title <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="Title"
          placeholder="Enter book title"
          {...register("Title", { required: true })}
          className="form-style w-full"
        />
        {errors.Title && <span className="ml-2 text-xs tracking-wide text-pink-200">Book title is required</span>}
      </div>

      {/* Post Short Description */}
      <div>
        <label className="text-sm text-richblack-5" htmlFor="Description">
          Book Description <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="Description"
          placeholder="Enter Description"
          {...register("Description", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full"
        />
        {errors.Description && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">Book Description is required</span>
        )}
      </div>

      {/* Post Price */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="Price">
          Book Price <sup className="text-pink-200">*</sup>
        </label>
        <div className="relative">
          <input
            id="Price"
            placeholder="Enter Price"
            {...register("Price", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
            className="form-style w-full !pl-12"
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
        </div>
        {errors.Price && <span className="ml-2 text-xs tracking-wide text-pink-200">Book Price is required</span>}
      </div>

      {/* Category */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="Category">
          Book Category <sup className="text-pink-200">*</sup>
        </label>
        <select
          {...register("Category", { required: true })}
          defaultValue=""
          id="Category"
          className="form-style w-full"
        >
          <option value="" disabled>
            Choose a Category
          </option>
          {categories?.map((category, indx) => (
            <option key={indx} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.Category && <span className="ml-2 text-xs tracking-wide text-pink-200">Book Category is required</span>}
      </div>

      {/* Sub Category */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="subCategory">
          Sub Category <sup className="text-pink-200">*</sup>
        </label>
        <select
          {...register("subCategory", { required: true })}
          defaultValue=""
          id="subCategory"
          className="form-style w-full"
        >
          <option value="" disabled>
            Choose a Sub Category
          </option>
          {getValues("Category") &&
            subCategories[getValues("Category")]?.map((subCat, indx) => (
              <option key={indx} value={subCat}>
                {subCat}
              </option>
            ))}
        </select>
        {errors.subCategory && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">Sub Category is required</span>
        )}
      </div>

      {/* Ad Type */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="adType">
          Ad Type <sup className="text-pink-200">*</sup>
        </label>
        <select {...register("adType", { required: true })} defaultValue="" id="adType" className="form-style w-full">
          <option value="" disabled>
            Choose Ad Type
          </option>
          <option value="Buy">Buy</option>
          <option value="Exchange">Exchange</option>
          <option value="Lost and Found">Lost and Found</option>
          <option value="Sell">Sell</option>
        </select>
        {errors.adType && <span className="ml-2 text-xs tracking-wide text-pink-200">Ad Type is required</span>}
      </div>

      {/* Price Type */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="PriceType">
          Price Type <sup className="text-pink-200">*</sup>
        </label>
        <select
          {...register("PriceType", { required: true })}
          defaultValue=""
          id="PriceType"
          className="form-style w-full"
        >
          <option value="" disabled>
            Choose Price Type
          </option>
          <option value="Fixed">Fixed</option>
          <option value="Negotiable">Negotiable</option>
          <option value="Price On Call">Price On Call</option>
        </select>
        {errors.PriceType && <span className="ml-2 text-xs tracking-wide text-pink-200">Price Type is required</span>}
      </div>

      {/* Condition */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="Condition">
          Book Condition <sup className="text-pink-200">*</sup>
        </label>
        <select
          {...register("Condition", { required: true })}
          defaultValue=""
          id="Condition"
          className="form-style w-full"
        >
          <option value="" disabled>
            Choose Condition
          </option>
          <option value="New">New</option>
          <option value="Used">Used</option>
        </select>
        {errors.Condition && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">Book Condition is required</span>
        )}
      </div>

      {/* Additional Fields */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="text-sm text-richblack-5" htmlFor="old">
            How Old <sup className="text-pink-200">*</sup>
          </label>
          <input
            id="old"
            placeholder="e.g., 2 years"
            {...register("old", { required: true })}
            className="form-style w-full"
          />
          {errors.old && <span className="ml-2 text-xs tracking-wide text-pink-200">This field is required</span>}
        </div>

        <div>
          <label className="text-sm text-richblack-5" htmlFor="MRP">
            Original MRP <sup className="text-pink-200">*</sup>
          </label>
          <input
            id="MRP"
            placeholder="Enter original MRP"
            {...register("MRP", { required: true, valueAsNumber: true })}
            className="form-style w-full"
          />
          {errors.MRP && <span className="ml-2 text-xs tracking-wide text-pink-200">MRP is required</span>}
        </div>

        <div>
          <label className="text-sm text-richblack-5" htmlFor="Pages">
            Number of Pages
          </label>
          <input
            id="Pages"
            placeholder="Enter number of pages"
            {...register("Pages", { valueAsNumber: true })}
            className="form-style w-full"
          />
        </div>

        <div>
          <label className="text-sm text-richblack-5" htmlFor="Language">
            Language
          </label>
          <input
            id="Language"
            placeholder="e.g., English, Hindi"
            {...register("Language")}
            className="form-style w-full"
          />
        </div>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="text-sm text-richblack-5" htmlFor="Name">
            Your Name <sup className="text-pink-200">*</sup>
          </label>
          <input
            id="Name"
            placeholder="Enter your name"
            {...register("Name", { required: true })}
            className="form-style w-full"
          />
          {errors.Name && <span className="ml-2 text-xs tracking-wide text-pink-200">Name is required</span>}
        </div>

        <div>
          <label className="text-sm text-richblack-5" htmlFor="Number">
            Contact Number <sup className="text-pink-200">*</sup>
          </label>
          <input
            id="Number"
            placeholder="Enter contact number"
            {...register("Number", { required: true, valueAsNumber: true })}
            className="form-style w-full"
          />
          {errors.Number && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">Contact number is required</span>
          )}
        </div>
      </div>

      <div>
        <label className="text-sm text-richblack-5" htmlFor="City">
          City <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="City"
          placeholder="Enter your city"
          {...register("City", { required: true })}
          className="form-style w-full"
        />
        {errors.City && <span className="ml-2 text-xs tracking-wide text-pink-200">City is required</span>}
      </div>

      {/* Post Thumbnail Image */}
      <Upload
        name="Images"
        label="Book Images"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editPostFlag ? post?.Images : null}
      />

      {/* Next Button */}
      <div className="flex justify-end gap-x-2">
        {editPostFlag && (
          <button
            onClick={() => navigate("/dashboard/my-posts")}
            disabled={loading}
            className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
          >
            Continue Without Saving
          </button>
        )}
        <IconBtn disabled={loading} text={!editPostFlag ? "Create Post" : "Save Changes"}>
          <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  )
}
