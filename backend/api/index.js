const app = require('../src/app');
const connectDB = require('../src/config/db');
const cors = require('cors');

// Middleware: ensure DB is connected before every request
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('DB Connection failed:', err.message);
    res.status(503).json({ status: 'error', message: 'Database connection failed. Please try again.' });
  }
});

module.exports = app;

