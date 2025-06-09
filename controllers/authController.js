const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User Already exists." });
    }

    const newUser = new User({ name, email, password });

    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();

    res
      .status(201)
      .json({ success: true, message: "User created successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error." });
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUser = await User.findOne({ email });

    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: "Login failed! Email or Password is wrong.",
      });
    }

    const checkPassword = await bcrypt.compare(password, findUser.password);

    if (!checkPassword) {
      return res.status(404).json({
        success: false,
        message: "Login failed! Email or Password is wrong.",
      });
    }

    const jwtToken = jwt.sign(
      { email: findUser.email, _id: findUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      success: true,
      message: "Login successfully.",
      jwtToken,
      email,
      name: findUser.name,
      userData: findUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};

module.exports = {
  signUp,
  login,
};
