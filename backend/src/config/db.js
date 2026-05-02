const mongoose = require('mongoose');

const connectDB = async () => {
  // If already connected, do nothing
  if (mongoose.connection.readyState >= 1) return;

  try {
    const uri = process.env.MONGODB_URI || "mongodb+srv://yashvi257:yashvi257@cluster0.v0jpuyu.mongodb.net/digidukan?appName=Cluster0";
    
    console.log('Connecting to MongoDB...');
    
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    // In local dev, we might want to know immediately
    if (process.env.NODE_ENV === 'development') {
       console.error('Check if your IP is whitelisted in MongoDB Atlas: https://www.mongodb.com/docs/atlas/security/ip-access-list/');
    }
  }
};

module.exports = connectDB;
