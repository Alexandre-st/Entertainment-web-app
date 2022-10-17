import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/userSchema.js';

export const signUp = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  try {
    // Check if the user already exist
    const existingUser = await User.findOne({ email });

    // If exist return an error
    if (existingUser) return res.status(400).json({ message: 'User already exists'});

    // Checking if the password is the same 
    if (password !== confirmPassword) return res.status(400)({ message: `Password don't match` });

    // To hashed the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // If everything is okay, return the result with a new user with an email and password registered.
    const result = await User.create({ email, password: hashedPassword });

    // And add the token to the result.
    const token = jwt.sign({ email: result.email, id: result._id }, 'secret', { expiresIn: '1h' });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
    console.log(error);
  }
};