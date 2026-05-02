const mongoose = require('mongoose');

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  try {
    const conn = await mongoose.connect("mongodb+srv://yashvi257:yashvi257@cluster0.v0jpuyu.mongodb.net/digidukan?appName=Cluster0");
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // In serverless, we might not want to exit the process, but log the error
  }
};

module.exports = connectDB;
