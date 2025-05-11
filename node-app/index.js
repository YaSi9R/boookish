const express = require("express");
const app = express();
const cors=require("cors");
require("dotenv").config();
const userRoutes=require("./routes/User")
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());
// Database Connecting
const mongoose = require("mongoose");
const database=require('./config/database');
database.connect();



app.use(
    cors({
        origin:"http://localhost:3000",
        method:["GET","POST","PUT","DELETE"],
        credentials:true,
    })
);


// Agar mujhe parsing sambhaalni hai to me body-parser ka use karunga
// specifially use karte hain ham post and updtae ke case me
const bodyParser=require("body-parser");
app.use(bodyParser.json());

// import routes
app.use("/api/v1/auth", userRoutes);




const PORT=process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server Connected successfully:  and is running at:${PORT} `)
})

app.get('/', (req, res) => {
    res.send("Hello  Jii Kaise HO!")
})

app.post('/api/cars', (req, res) => {
    const { name, price } = req.body;
    console.log(name);
    console.log(price);

})
