const {
  Hash_Password,
  Compare_Password,
} = require("../helpers/bcypt-password");
const GENERATE_TOKEN = require("../helpers/generate-token");
const UserModel = require("../models/user-schema");

// REGISTER USER
const REGISTER_USER = async (req, res) => {
  const { name, email, password } = JSON.parse(req.body.user);
  // when use postman then this will work
  // const { name, email, password } = req.body;
  console.log(req.body.user);
  console.log("file", req.file);
  const { filename } = req.file || {};

  if (!name || !email || !password) {
    return res.status(400).json({
      success: true,
      message: "Please fill all the details....",
    });
  } else if (password.length <= 4) {
    return res.status(404).json({
      success: true,
      message: "Password must be greater than 4 digit ",
    });
  }
  try {
    const alreadyUserExist = await UserModel.findOne({ email: email });
    if (alreadyUserExist) {
      return res.status(404).json({
        success: true,
        message: "This email already exist",
      });
    }
    const hash_passwword = await Hash_Password(password);

    const newUser = new UserModel({
      name,
      email,
      userImg: filename,
      password: hash_passwword,
    });
    
    const saveUser = await newUser.save();
    return res.status(200).json({
      success: true,
      data: saveUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// LOGIN USER
const LOGIN_USER = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: true,
      message: "Please fill all the details...",
    });
  }
  try {
    const userExist = await UserModel.findOne({ email });
    if (!userExist) {
      return res
        .status(404)
        .json({ success: true, message: "user does not exist" });
    }
    const matchPassword = await Compare_Password(password, userExist.password);
    console.log(matchPassword);
    if (!matchPassword) {
      return res
        .status(404)
        .json({ success: false, message: "Password does not match" });
    }
    const token = await GENERATE_TOKEN(userExist.id);
    if (!token) {
      return res.status(404).json({
        success: true,
        message: "Token not generated...",
      });
    }
    return res.status(200).json({
      success: true,
      Token: token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = { REGISTER_USER, LOGIN_USER };
