const express = require("express");
const router = express.Router();

const { signup ,login, logout ,getProfile} = require("../controllers/auth.controller");

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(logout)

module.exports = router;
