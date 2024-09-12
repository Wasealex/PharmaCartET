import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
// @desc login user/set token
// route POST /api/users/login
// @access Public
const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPasswords(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      message: `${user.name} logged in successfully`,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});
// @desc register a new user
// route POST /api/users/signup
// @access Public
const registerUser = expressAsyncHandler(async (req, res) => {
  const requiredFields = ["name", "email", "password"];
  const { name, email, password } = req.body;
  requiredFields.forEach((field) => {
    if (!req.body[field]) {
      res.status(400);
      throw new Error(`${field} is required`);
    }
  });
  const userExists = await User.findOne({ email });
  const passwordLength = password.length;
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  if (passwordLength < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters");
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      message: "User created successfully",
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
// @desc Logout user
// route POST /api/users/logout
// @access Public
const logOutUser = expressAsyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({
    status: "success",
    message: "user logged out successfully",
  });
});
// @desc Get user Profile
// route GET /api/users/profile
// @access Private
const getUserProfile = expressAsyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    isAdmin: req.user.isAdmin,
  };
  res.status(200).json(user);
});
// @desc Update user profile
// route PUT /api/users/profile
// @access Private
const updateUserProfile = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
export {
  loginUser,
  registerUser,
  logOutUser,
  getUserProfile,
  updateUserProfile,
};
