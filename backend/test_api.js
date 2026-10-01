const axios = require('axios');
async function test() {
  try {
    const login = await axios.post('http://localhost:5000/auth/login', { email: 'test@example.com', password: 'password123' });
    const token = login.data.token;
    const res = await axios.post('http://localhost:5000/quiz/start', { subject: 'JEE', topic: 'Physics', questionCount: 10 }, { headers: { Authorization: 'Bearer ' + token } });
    console.log('Received questions:', res.data.questions.length);
  } catch (err) {
    console.error('ERROR:', err.response ? err.response.data : err.message);
  }
}
test();
