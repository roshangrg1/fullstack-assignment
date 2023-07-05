const express = require("express");
const router = express.Router();


const { addBook} = require("../controllers/book.controller");
const {isLoggedIn, customRole} = require('../middlewares/auth.middleware')

// Admin routes
router
  .route("/admin/book/add")
  .post(isLoggedIn, customRole("admin"), addBook);


module.exports = router;