const express = require("express");
const router = express.Router();
const {
  createOrder,

} = require("../controllers/order.controller");

const { isLoggedIn, } = require("../middlewares/auth.middleware");

router.route("/order/create").post(isLoggedIn, createOrder);




module.exports = router;
