const express=require("express");
const app=express();
const database=require("./database");
const cors = require("cors");
const PORT = process.env.PORT || 4000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { cloudinaryConnect } = require("./config/cloudinary");
const dotenv = require("dotenv");
dotenv.config();

// database.connect();
// Middlewares
// app.use(express.json());
// app.use(cookieParser());
// app.use(
//     cors({
//         origin: "http://localhost:3000",
//         methods: ["GET", "POST", "PUT", "DELETE"],

//         credentials: true,
//     })
// );

cloudinaryConnect();
// app.get("/", (req, res) => {
//     return res.json(
//         {
//             success: true,
//             message: 'Your server is up and running....',
//         });
// });

app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
    console.log("Server connected successfully and is ready to handle requests.");

});