const express = require("express");
const UserController = require("../controllers/user");
const router = express.Router();


router.post("/signup", UserController.userCreate);

router.post("/login", UserController.userLogin);

module.exports = router;
