const express = require("express");
const {
  signUpValidator,
  loginValidator,
} = require("../middlewares/authValidation");
const { signUp, login } = require("../controllers/authController");
const router = express.Router();

router.post("/signup", signUpValidator, signUp);

router.post("/login", loginValidator, login);

module.exports = router;
