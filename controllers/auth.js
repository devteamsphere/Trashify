// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// export const register = async (req, res, next) => {
//   try {

//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(req.body.password, salt);

//     const newUser = new User({
//       username: req.body.username,
//       email: req.body.email,
//       password: hash,
//     });
//     await newUser.save();
//     res.status(200).json("ho gaya create tera bhai");
//   } catch (error) {
//     res.send(error)
//   }
// };

// export const login = async (req, res) => {
//   try {
//     const user = await User.findOne({ username: req.body.username });
//     if (!user) {
//       res.status(404).send("User Not Found.");
//     }
//     const isPasswordCorrect = await bcrypt.compare(
//       req.body.password,
//       user.password
//     );
//     if (!isPasswordCorrect)
//       res.status(404).send("password sahi daal")

//     const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "5d" });

//     res.status(200).send({user,accessToken});
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

// const Joi_Scehmas = require("../joi/auth/index");
import { createUser, getUserByEmail }  from "../repository/user.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken" ;
import {
  badRequestResponse,
  handle304,
  serverErrorResponse,
  successResponse,
  notFoundResponse,
} from "../utils/response.js";

// signup user
 export const userSignup = async (req, res) => {
  try {
    console.log(req.body);
    let [err, hash] = await _createHash(req.body.password);
    if (err) {
      console.log(`Error in create hash: ${err.message}`);
      return serverErrorResponse(res, err.message);
    }
    req.body.password = hash;
    let [err1, newUser] = await createUser(req.body);
    if (err1) {
      console.log(`Error in create user route: ${err1.message}`);
      return serverErrorResponse(res, err1.message);
    }
    console.log(newUser);
    return successResponse(res, newUser, "User created successfully");
  } catch (err) {
    logFunction("error", err);
    handle304(err.message, res);
    serverErrorResponse(res, "Internal Server Error");
  }
};

// sign in user and verify password
export const userSignin = async (req, res) => {
  try {
    let [err, user] = await getUserByEmail(req.body.email);
    if (err) {
      console.log(`Error in get user by email: ${err.message}`);
      return serverErrorResponse(res, err.message);
    }
    if (user.length === 0) {
      return notFoundResponse(res, "User not found");
    }

    // verify passWord
    let [err1, isMatch] = await _verifyPassword(
      req.body.password,
      user[0].password
    );
    if (err1) {
      console.log(`Error in verify password: ${err1.message}`);
      return serverErrorResponse(res, err1.message);
    }
    if (!isMatch) {
      return badRequestResponse(res, "Password is incorrect");
    }

    // generate jwt token
    let jwtSecretKey = "secret";
    let data = {
      time: Date(),
      userId: user[0]._id,
      email: user[0].email,
      _id: user[0]._id,
    };

    const token = jwt.sign(data, jwtSecretKey);
    user[0].token = token;
    console.log(token);
    let toReturn = {
      token: token,
      ...user[0]._doc,
    };
    return successResponse(res, toReturn, "User logged in successfully");
  } catch (err) {
    console.log("error: ", err);
    handle304(err.message, res);
    serverErrorResponse(res, "Internal Server Error");
  }
};

const _verifyPassword = async (password, hash) => {
  try {
    const isMatch = await bcrypt.compare(password, hash);
    return [null, isMatch];
  } catch (err) {
    console.log(`Error in verify password: ${err.message}`);
    return [err, null];
  }
};
const _createHash = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return [null, hash];
  } catch (err) {
    console.log(`Error in create hash: ${err.message}`);
    return [err, null];
  }
};

// module.exports = {
//   userSignup,
//   userSignin
// };



