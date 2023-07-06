const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOneOrder
} = require("../controllers/order.controller");

const { isLoggedIn, } = require("../middlewares/auth.middleware");

router.route("/order/create").post(isLoggedIn, createOrder);
router.route("/order/:id").get(isLoggedIn, getOneOrder);




module.exports = router;
