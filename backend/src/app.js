const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');

const connectDB = require('./config/db');

dotenv.config();

// Connect to Database
connectDB();

const app = express();

// 1. ADVANCED CORS MIDDLEWARE (MUST BE FIRST)
app.use((req, res, next) => {
  const allowedOrigins = [
    'https://digidukan-frontend.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:3000'
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  // Handle Preflight (OPTIONS)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// 2. SECONDARY CORS PROTECTION
app.use(cors({
  origin: (origin, callback) => {
    const allowed = [
      'https://digidukan-frontend.vercel.app',
      'http://localhost:5173',
      'http://localhost:3000'
    ];
    if (!origin || allowed.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(morgan('dev'));

// Debug middleware
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    if (req.method === 'POST') {
      console.log('--- Incoming POST Body ---');
      console.log(req.body);
    }
    next();
  });
}

// Static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
const authRoutes = require('./routes/authRoutes');
const shopRoutes = require('./routes/shopRoutes');

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/shops', shopRoutes);

app.get('/ping', (req, res) => {
  res.json({ message: 'pong', version: '1.0.1' });
});

app.get('/', (req, res) => {
  res.json({ message: 'DigiDukan API is running' });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error Stack:', err.stack);
  res.status(err.status || 400).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// Serve frontend in production (Only if files exist)
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '../../frontend/dist');
  const fs = require('fs');

  if (fs.existsSync(frontendPath)) {
    app.use(express.static(frontendPath));

    app.use((req, res) => {
      res.sendFile(path.resolve(frontendPath, 'index.html'));
    });
  } else {
    app.get('*', (req, res) => {
      if (!req.path.startsWith('/api')) {
        res.status(404).json({
          status: 'error',
          message: 'Backend is running, but frontend files were not found in this deployment. If you are using separate deployments, this is normal.'
        });
      }
    });
  }
}

module.exports = app;
