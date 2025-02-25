const express = require("express");
const app = express();
require("dotenv").config();
// Database Connecting
const mongoose = require("mongoose");
const database=require('./config/database');
database.connect();
/*
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/bookishDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true

}).then(() => {
    console.log("Database Connected SuccessFully");
}

).catch((error) => {
    console.log("DB Connection Failed");
    console.error(error);
    process.exit(1);

}) */



app.use(express.json());
app.listen(4000, () => {
    console.log("Server Connected successfully: ")
})

app.get('/', (req, res) => {
    res.send("Hello  Jii Kaise HO!")
})

app.post('/api/cars', (req, res) => {
    const { name, price } = req.body;
    console.log(name);
    console.log(price);

})
console.log("MongoDB URL:", process.env.MONGODB_URL); // Check if it's defined
