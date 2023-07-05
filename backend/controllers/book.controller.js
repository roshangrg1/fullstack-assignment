const Book = require("../models/book.schema");
const tryCatchHandler = require("../utils/tryCatchHandler");
const CustomError = require("../utils/customError");
const cloudinary = require("cloudinary");

// For admin only

exports.addBook = tryCatchHandler(async(req, res, next)=>{

    // images
    let imageArray =[];

    if(!req.files){
        return next(new CustomError('images are required', 400))
    }

    if (req.files){
        for(let i=0; i< req.files.photos.length; i++){
        // const element = req.files.photos[i];
        // cloudinary
            let result = await cloudinary.v2.uploader.upload(req.files.photos[i].
            tempFilePath, {
                folder: 'books'
            }
            );

            imageArray.push({
                id: result.public_id,
                secure_url:result.secure_url
            })
        }
    }

    req.body.photos = imageArray;
    req.body.user = req.user.id

    const books =await Book.create(req.body)
    res.status(200).json({
        success:true,
        books,
    })
});

exports.adminGetAllBooks = tryCatchHandler(async (req, res , next)=>{
    const books = await Book.find()


    res.status(200).json({
        success:true,
        books

    })
})
