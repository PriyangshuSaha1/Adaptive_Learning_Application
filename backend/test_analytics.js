const axios = require('axios');
async function test() {
  try {
    const login = await axios.post('http://localhost:5000/auth/login', { email: 'test@example.com', password: 'password123' });
    const token = login.data.token;
    const res = await axios.get('http://localhost:5000/dashboard/analytics', { headers: { Authorization: 'Bearer ' + token } });
    console.log(JSON.stringify(res.data, null, 2));
  } catch (err) {
    console.error('ERROR:', err.response ? err.response.data : err.message);
  }
}
test();
