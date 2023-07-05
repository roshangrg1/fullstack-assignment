const express = require('express')
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors")
const cookieParser = require("cookie-parser")

const app = express()

// middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(cookieParser())

// Morgan logger
app.use(morgan('tiny'))

// importing routes
const user = require("./routes/user")

// router middleware
app.use("/api/v1", user);


app.get("/", (req, res) => {
    res.send("home");
  });
  

module.exports = app;