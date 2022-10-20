import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

import { User } from '../models/userSchema';

export const registerUser = asyncHandler(async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  // Verify all the fields to be present.
  if (!email || !password || !confirmPassword) {
    res.status(400);
    throw new Error("Please enter all Fields");
  }

  // Check if the user already exist
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(400);
    throw new Error("User already exist");
  }

  // Hash the password before the user is created
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // If everything is okay, return the result with a new user with an email and password registered.
  const user = await User.create({
    email,
    password: hashedPassword
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      email: user.email,
      token: generateToken(user._id)
    });
  } else {
    res.status(400)
    throw new Error('Invalid user data');
  }
});

// To generate the token
export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: '1h'
  })
};