import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const SignUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

export const SignIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));

    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong Credintials"));

    const { password: p, ...validuser } = validUser._doc;

    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY);

    res.cookie("token", token, { httpOnly: true }).status(200).json({ user: validuser, token });
  } catch (error) {
    next(error);
  }
};

export const GoogleSignIn = async (req, res, next) => {
  try {
    const userDb = await User.findOne({ email: req.body.email });
    if (userDb) {
      const { email } = req.body;
      const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY);

      const { password, ...user } = userDb._doc;
      console.log({ yaya: userDb, token, user });
      res.cookie("token", token, { httpOnly: true }).status(200).json({ user });
    } else {
      const { username, email, image } = req.body;
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(generatedPassword, 10);
      const newUser = new User({ username, email, image, password: hashedPassword });
      await newUser.save();
      const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY);
      const { password, ...user } = newUser._doc;
      res.cookie("token", token, { httpOnly: true }).status(200).json({ user });
    }
  } catch (error) {
    next(error);
  }
};
