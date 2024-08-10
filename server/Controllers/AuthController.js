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
