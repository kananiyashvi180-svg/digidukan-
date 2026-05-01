const User = require('../models/User');
const jwt = require('jsonwebtoken');

const signToken = (id, role) => {
  const secret = process.env.JWT_SECRET || 'fallback-secret-for-early-deployment-only';
  return jwt.sign({ id, role }, secret, {
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

    // Basic Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide name, email and password'
      });
    }

    // Strict Restriction for HANDLER role
    if (role === 'HANDLER') {
      const isAdmin = 
        name === 'Yashvi Kanani' && 
        email === 'yashvi.kanani.cg@gmail.com' && 
        phone === '9106454707';
      
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
    console.error('REGISTRATION ERROR:', err);
    
    let message = 'An error occurred during registration';
    
    if (err.code === 11000) {
      message = 'This email is already registered. Please login or use another email.';
    } else if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      message = `Invalid input data: ${messages.join('. ')}`;
    } else {
      message = err.message;
    }

    res.status(400).json({
      status: 'fail',
      message
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
