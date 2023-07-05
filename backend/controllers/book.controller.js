const Book = require("../models/book.schema");
const tryCatchHandler = require("../utils/tryCatchHandler");
const CustomError = require("../utils/customError");
const cloudinary = require("cloudinary");
const WhereClause =require('../utils/whereClause')

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

exports.adminUpdateOneBook = tryCatchHandler(async(req, res, next)=>{
    let book = await  Book.findById(req.params.id);

    if (!book){
        return next (new CustomError("No book found with this id", 400))
    }

    let imagesArray =[]

    if(req.files){
        // destroy the existing image
        
        for (let i = 0; i < book.photos.length; i++) {
            const res = await cloudinary.v2.uploader.destroy(book.photos[i].id)
            
        }
        // upload and save the images

        for(let i=0; i< req.files.photos.length; i++){
            // const element = req.files.photos[i];
            // cloudinary
                let result = await cloudinary.v2.uploader.upload(req.files.photos[i].
                tempFilePath, {
                    folder: 'books',
                }
                );
    
                imagesArray.push({
                    id: result.public_id,
                    secure_url:result.secure_url
                })
            }
    }

    req.body.photos = imagesArray

 


    book = await Book.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        book,
    })
})

exports.adminDeleteOneBook = tryCatchHandler(async(req, res, next)=>{
    const book = await  Book.findById(req.params.id);

    if (!book){
        return next (new CustomError("No book found with this id", 400))
    }

    // destroy the existing image.
    for (let i = 0; i < book.photos.length; i++) {
        const res = await cloudinary.v2.uploader.destroy(book.photos[i].id)
        
    }
    
   await book.deleteOne()

    res.status(200).json({
        success: true,
        message: "book was deleted !"
    })
})

// All User

exports.getAllBooks = tryCatchHandler(async (req, res, next) => {
    const resultPerPage = 6;
    const totalcountBook = await Book.countDocuments();
  
    const booksObj = new WhereClause(Book.find(), req.query)
      .search()
      .filter();
  
    let books = await booksObj.base;
    const filteredBookNumber = books.length;
  
    //books.limit().skip()
  
    booksObj.pager(resultPerPage);
    books = await booksObj.base.clone();
  
    res.status(200).json({
      success: true,
      books,
      filteredBookNumber,
      totalcountBook,
    });
  });
  