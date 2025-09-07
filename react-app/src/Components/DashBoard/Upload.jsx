"use client"

import { useEffect, useRef, useState } from "react"
import { FiUploadCloud } from "react-icons/fi"
import { useDropzone } from "react-dropzone"

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) {
  const [selectedFiles, setSelectedFiles] = useState([])
  const [previewSources, setPreviewSources] = useState(viewData ? [viewData] : editData ? editData : [])
  const inputRef = useRef(null)

  const onDrop = (acceptedFiles) => {
    const files = acceptedFiles
    setSelectedFiles(files)
    previewFiles(files)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: !video ? { "image/*": [".jpeg", ".jpg", ".png", ".gif"] } : { "video/*": [".mp4"] },
    onDrop,
  })

  const previewFiles = (files) => {
    const previews = []
    files.forEach((file) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        previews.push(reader.result)
        if (previews.length === files.length) {
          setPreviewSources(previews)
        }
      }
    })
  }

  useEffect(() => {
    register(name, { required: true })
  }, [register, name])

  useEffect(() => {
    setValue(name, selectedFiles)
  }, [selectedFiles, setValue, name])

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} {!viewData && <sup className="text-pink-200">*</sup>}
      </label>
      <div className="flex flex-col items-center justify-center">
        {previewSources.length > 0 ? (
          <div className="flex flex-wrap gap-2 p-6">
            {previewSources.map((source, index) => (
              <div key={index} className="relative">
                {!video ? (
                  <img
                    src={source || "/placeholder.svg"}
                    alt={`Preview ${index}`}
                    className="h-full w-full rounded-md object-cover"
                  />
                ) : (
                  <video muted autoPlay controls className="h-full w-full rounded-md">
                    <source src={source} type="video/mp4" />
                  </video>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div
            className="flex w-full cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500 bg-richblack-700 p-6"
            {...getRootProps()}
          >
            <input {...getInputProps()} ref={inputRef} />
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
              <FiUploadCloud className="text-2xl text-yellow-50" />
            </div>
            <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
              Drag and drop {!video ? "an image" : "a video"}, or click to{" "}
              <span className="font-semibold text-yellow-50">Browse</span> a file
            </p>
          </div>
        )}
        {selectedFiles.length > 0 && (
          <button
            type="button"
            onClick={() => {
              setSelectedFiles([])
              setPreviewSources([])
              setValue(name, [])
            }}
            className="mt-3 text-richblack-400 underline"
          >
            Cancel
          </button>
        )}
      </div>
      {errors[name] && <span className="ml-2 text-xs tracking-wide text-pink-200">{label} is required</span>}
    </div>
  )
}
