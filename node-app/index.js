const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();

// Database Connecting
const mongoose = require("mongoose");
const database=require('./config/database');
database.connect();

// Agar mujhe parsing sambhaalni hai to me body-parser ka use karunga
// specifially use karte hain ham post and updtae ke case me
const bodyParser=require("body-parser");
app.use(bodyParser.json());




app.listen(4000, () => {
    console.log("Server Connected successfully:  and is running at:4000 ")
})

app.get('/', (req, res) => {
    res.send("Hello  Jii Kaise HO!")
})

app.post('/api/cars', (req, res) => {
    const { name, price } = req.body;
    console.log(name);
    console.log(price);

})
