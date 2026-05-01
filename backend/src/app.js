const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
const allowedOrigins = [
  'https://digidukan-2.vercel.app',
  'https://digidukan-1.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || origin.includes('vercel.app')) {
      return callback(null, true);
    } else {
      return callback(new Error('The CORS policy for this site does not allow access from the specified Origin.'), false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}));
app.options('*', cors()); // Enable pre-flight for all routes
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

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../frontend/dist')));
  
  app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, '../../frontend', 'dist', 'index.html'));
  });
}

module.exports = app;
