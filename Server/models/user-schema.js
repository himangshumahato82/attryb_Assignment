const mongoose = require("mongoose");
const validator = require("validator");
const user_schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name field required..."],
    },
    email: {
      type: String,
      validate: [validator.isEmail, "Email format not correct"],
      required: [true, "Email field required..."],
    },
    password: {
      type: String,
      minLength: 5,
    },
    userImg: {
      type: String,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("user", user_schema);
module.exports = UserModel;
