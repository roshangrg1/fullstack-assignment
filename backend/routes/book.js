const express = require("express");
const router = express.Router();


const { addBook, adminGetAllBooks,adminUpdateOneBook,adminDeleteOneBook,getAllBooks, getOneBook} = require("../controllers/book.controller");
const {isLoggedIn, customRole} = require('../middlewares/auth.middleware')

// Admin routes
router
  .route("/admin/book/add")
  .post(isLoggedIn, customRole("admin"), addBook);

  router.get('/admin/books', isLoggedIn,customRole('admin'),adminGetAllBooks)

  router
  .route("/admin/book/:id")
  .put(isLoggedIn, customRole("admin"), adminUpdateOneBook)
  .delete(isLoggedIn, customRole("admin"),adminDeleteOneBook );

  // user routes
router.route('/books').get(getAllBooks)
router.route('/book/:id').get(getOneBook)



module.exports = router;