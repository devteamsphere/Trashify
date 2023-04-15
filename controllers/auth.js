import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res, next) => {
  try {

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    await newUser.save();
    res.status(200).json("ho gaya create tera bhai");
  } catch (error) {
    res.send(error)
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(404).send("User Not Found.");
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      res.status(404).send("password sahi daal")

    const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "5d" });

    res.status(200).send({user,accessToken});
  } catch (error) {
    res.status(500).send(error);
  }
};


