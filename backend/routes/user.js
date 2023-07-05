const express = require("express");
const router = express.Router();

const { signup ,login, logout ,getProfile} = require("../controllers/auth.controller");
const {isLoggedIn} = require('../middlewares/auth.middleware')
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(logout)
router.route("/profile").get(isLoggedIn, getProfile)
module.exports = router;
