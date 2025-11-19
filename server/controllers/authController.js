const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const { PrismaClient } = require('@prisma/client');

const userModel = new UserModel();

// -------------- CONTROLLERS ----------------

async function register(req, res) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Username, email, and password are required.' });
    }

    const existingUser = await userModel.getUserByEmail(email);

    if (existingUser) {
        return res.status(409).json({ message: 'User with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const newUser = await userModel.createUser({
            username,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({ message: 'User registered successfully.', userId: newUser.id });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
}

async function login(req, res) {
     const { email, password } = req.body;

     if (!email || !password) {
          return res.status(400).json({ message: 'Email and password are required.' });
     }

     const user = await userModel.getUserByEmail(email);

     if (!user) {
          return res.status(401).json({ message: 'Invalid email or password.' }); 
     }

     const validPassword = await bcrypt.compare(password, user.password);

     const token = jwt.sign(
          { userId: user.id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
     ); 
}

async function loginSuccess(req, res) {
  const user = await userModel.user.findUnique({
    where: { id: req.user.userId },
    select: { id: true, username: true, email: true, role: true }
  });

  return res.json(user);
}

module.exports = {
  register,
  login,
  loginSuccess
}
