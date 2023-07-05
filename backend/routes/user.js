const express = require("express");
const router = express.Router();

const { signup ,login, logout ,getProfile,adminAllUser} = require("../controllers/auth.controller");
const {isLoggedIn, customRole} = require('../middlewares/auth.middleware')
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(logout)
router.route("/profile").get(isLoggedIn, getProfile)

// Admin only routes
router.route("/admin/users").get(isLoggedIn, customRole("admin"), adminAllUser);
module.exports = router;
