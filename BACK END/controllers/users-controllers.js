const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");

const User = require("../models/user");

const getUsers = async (req, res, next) => {
  let users;

  try {
    users = await User.find({}, "-password");
  } catch (err) {
    const error = new HttpError("Fetching users failed", 500);
    return next(error);
  }

  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError("Invalid input", 422);
    return next(error);
  }

  const { name, email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Something wrong!", 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError("Email already exist!", 422);
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    password,
    image: "https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg",
    places: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Sing up failed!", 500);
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Something wrong!", 500);
    return next(error);
  }

  if (!existingUser || password !== existingUser.password) {
    const error = new HttpError("Logging in failed!", 401);
    return next(error);
  }

  res.status(200).json({ message: "User logged in!" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
