const app = require('../src/app');
const connectDB = require('../src/config/db');

// Connect to DB on every cold start
connectDB().catch(err => console.error('DB connection failed:', err.message));

module.exports = app;
