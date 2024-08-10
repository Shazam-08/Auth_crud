const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/Users");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      res.status(409).json({
        message: "The User Already exists Please Log In",
        success: false,
      });
    }
    const userModel = new UserModel({ name, email, password });
    userModel.password = await bcrypt.hash(password, 10);
    userModel.save();
    res.status(201).json({ message: "Signup Successful", success: true });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server error",
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const err_msg = "The Email or Password is incorrect";
    if (!user) {
      res.status(409).json({ message: err_msg, success: false });
    }
    const isPassEqual = bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      res.status(403).json({ message: err_msg, success: false });
    }
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.status(200).json({
      message: "Login Successful",
      success: true,
      jwtToken,
      email,
      name: user.name,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server error",
      success: false,
    });
  }
};

module.exports = { login, signup };
