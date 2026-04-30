const mongoose = require('mongoose');
const User = require('./backend/src/models/User');
require('dotenv').config({ path: './backend/.env' });

const check = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  const users = await User.find();
  console.log('Total Users:', users.length);
  users.forEach(u => console.log(`- ${u.email} (${u.role})`));
  process.exit(0);
};

check();
