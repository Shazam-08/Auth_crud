const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: string,
    required: true,
  },
  email: {
    type: string,
    required: true,
    unique: true,
  },
  password: {
    type: string,
    require: true,
  },
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
