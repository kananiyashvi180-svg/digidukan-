const axios = require('axios');

async function test() {
  try {
    const res1 = await axios.get('http://localhost:5000/api/v1/auth/users');
    console.log('Users:', res1.status);
  } catch (err) {
    console.log('Users Error:', err.response?.status || err.message);
  }

  try {
    const res2 = await axios.get('http://localhost:5000/api/v1/shops/admin/analytics');
    console.log('Analytics:', res2.status);
  } catch (err) {
    console.log('Analytics Error:', err.response?.status || err.message);
  }
}

test();
