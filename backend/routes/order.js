const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOneOrder,
  getLoggedInOrders,
  admingetAllOrders
} = require("../controllers/order.controller");

const { isLoggedIn, customRole } = require("../middlewares/auth.middleware");

router.route("/order/create").post(isLoggedIn, createOrder);
router.route("/order/:id").get(isLoggedIn, getOneOrder);
router.route("/myorder").get(isLoggedIn, getLoggedInOrders);

router
  .route("/admin/orders")
  .get(isLoggedIn, customRole("admin"), admingetAllOrders);


module.exports = router;
