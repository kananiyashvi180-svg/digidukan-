const User = require('../models/User');
const jwt = require('jsonwebtoken');

const signToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '30d'
  });
};

const sendToken = (user, statusCode, res) => {
  const token = signToken(user._id, user.role);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role, phone } = req.body;

    // Strict Restriction for HANDLER role
    if (role === 'HANDLER') {
      const isAdmin = 
        name === 'Yashvi Kanani' && 
        email === 'yashvi@digidukan.com' && 
        phone === '9999999999'; // Example, should be matched with real admin info if provided
      
      if (!isAdmin) {
        return res.status(403).json({
          status: 'fail',
          message: 'Unauthorized: Only the designated administrator can create a Handler account.'
        });
      }
    }

    const newUser = await User.create({
      name,
      email,
      password,
      role,
      phone
    });

    sendToken(newUser, 201, res);
  } catch (err) {

    console.error('--- REGISTRATION ERROR DETAILS ---');
    console.error('Message:', err.message);
    console.error('Stack:', err.stack);
    console.error('Code:', err.code);
    
    let message = err.message;
    if (err.code === 11000) {
      message = 'This email is already registered. Please login or use another email.';
    }

    res.status(400).json({
      status: 'fail',
      message: message || 'An error occurred during registration'
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide email and password'
      });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password, user.password))) {
      return res.status(401).json({
        status: 'fail',
        message: 'Incorrect email or password'
      });
    }

    sendToken(user, 200, res);
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};
