const mongoose = require('mongoose');

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const uri = process.env.MONGODB_URI || "mongodb+srv://yashvi257:yashvi257@cluster0.v0jpuyu.mongodb.net/digidukan?appName=Cluster0";
    const opts = {
      serverSelectionTimeoutMS: 10000,
    };

    console.log('Connecting to MongoDB (cached pattern)...');
    cached.promise = mongoose.connect(uri, opts).then((mongoose) => {
      console.log('✅ MongoDB Connected Successfully');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('❌ MongoDB Connection Error:', e.message);
    throw e;
  }

  return cached.conn;
};

module.exports = connectDB;
