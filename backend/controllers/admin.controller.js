import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ userName: username });
    if (existingUser) {
      return next(errorHandler(401, "Username is already taken"));
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return next(errorHandler(401, "Email is already taken"));
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({
      userName: username,
      email: email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    console.log("req.body", req.body);
    
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return next(errorHandler(401, "Invalid credentials"));
    }

    // genearting JWT token with an expiration time
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Destructure the user object to remove the password field from the response
    const { password: _, ...userData } = user._doc;

    // set token in cookie (no spaces in cookie name)
    res.cookie("accessToken", token, { 
      httpOnly: true,
      maxAge: 3600000 // 1 hour in milliseconds
    });

    res.status(200).json({ message: "User signed in successfully", user: userData });
  } catch (error) {
    next(error);
  }
};
