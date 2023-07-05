const express = require('express')
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors")
const cookieParser = require("cookie-parser")
// file upload
const cloudinary = require("cloudinary");
const fileUpload = require('express-fileupload');

const app = express()

// cloudinary cofiguration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})


// middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(cookieParser())

// Morgan logger
app.use(morgan('tiny'))

// Note that this option available for versions 1.0.0 and newer. 
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));

// importing routes
const user = require("./routes/user")
const book = require('./routes/book')

// router middlewares
app.use("/api/v1", user);
app.use('/api/v1', book)

app.get("/", (req, res) => {
    res.send("home");
  });
  

module.exports = app;