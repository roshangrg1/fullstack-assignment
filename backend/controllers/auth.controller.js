const User = require("../models/user.schema");
const tryCatchHandler = require("../utils/tryCatchHandler");
const CustomError = require("../utils/customError");

//
exports.cookieOptions = {
  expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  httpOnly: true,

  // could be in separate file in utils
};

// signup controller
exports.signup = tryCatchHandler(async (req, res, next) => {
  // collect data from frontend
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new CustomError("Please fill all fields", 400);
  }

  // check if user exists

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new CustomError("User alreaady exists", 400);
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  const token = user.getJwtToken();
  console.log(user);
  user.password = undefined;

  res.cookie("token", token, this.cookieOptions);
  res.status(200).json({
    success: true,
    token,
    user,
  });
});

// login controller
exports.login = tryCatchHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError("Please fill all fields", 400);
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new CustomError("Invalid credentials", 400);
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (isPasswordMatched) {
    const token = user.getJwtToken();
    user.password = undefined;
    res.cookie("token", token, this.cookieOptions);
    return res.status(200).json({
      success: true,
      token,
      user,
    });
  }

  throw new CustomError("Invalid credentials - pass", 400);
});

// logout controller
exports.logout = tryCatchHandler(async (_req, res) => {
  // res.clearCookie()
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// get profile controller

exports.getProfile = tryCatchHandler(async (req, res) => {
  // req.user
  const { user } = req;

  if (!user) {
    throw new CustomError("user not  found ", 404);
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// admin

exports.adminAllUser = tryCatchHandler(async (req, res, next) => {
  // select all users
  const users = await User.find();

  // send all users
  res.status(200).json({
    success: true,
    users,
  });
});

exports.admingetOneUser = tryCatchHandler(async (req, res, next) => {
  // get id from url and get user from database
  const user = await User.findById(req.params.id);

  if (!user) {
    next(new CustomError("No user found", 400));
  }

  // send user
  res.status(200).json({
    success: true,
    user,
  });
});

exports.adminUpdateOneUserDetails = tryCatchHandler(async (req, res, next) => {
  // add a check for email and name in body

  // get data from request body
  const newData = {
    name: req.body.name,
    email: req.body.email,
    roles: req.body.roles,
  };

  // update the user in database
  const user = await User.findByIdAndUpdate(req.params.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

exports.adminDeleteOneUser = tryCatchHandler(async (req, res, next) => {
  // get user from url
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new CustomError("No Such user found", 401));
  }

  // remove user from databse
  await user.deleteOne();

  res.status(200).json({
    success: true,
  });
});
