const express = require("express")
const fileUpload = require("express-fileupload")

// File upload middleware
exports.fileUploadMiddleware = fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/",
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  abortOnLimit: true,
  responseOnLimit: "File size limit exceeded",
})
