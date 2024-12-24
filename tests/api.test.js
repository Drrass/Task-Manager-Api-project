const axios = require('axios');

const API_URL = 'http://localhost:3000';
let authToken = '';

const testAPI = async () => {
  try {
    // Register
    console.log('Testing registration...');
    const registerRes = await axios.post(`${API_URL}/auth/register`, {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });
    console.log('Registration successful:', registerRes.data);

    // Login
    console.log('\nTesting login...');
    const loginRes = await axios.post(`${API_URL}/auth/login`, {
      email: 'test@example.com',
      password: 'password123'
    });
    authToken = loginRes.data.token;
    console.log('Login successful:', loginRes.data);

    // Create task
    console.log('\nTesting task creation...');
    const taskRes = await axios.post(
      `${API_URL}/tasks`,
      {
        title: 'Test Task',
        description: 'This is a test task',
        priority: 'high',
        dueDate: '2024-12-31'
      },
      {
        headers: { Authorization: `Bearer ${authToken}` }
      }
    );
    console.log('Task created:', taskRes.data);

    // Get tasks
    console.log('\nTesting get tasks...');
    const tasksRes = await axios.get(`${API_URL}/tasks`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('Tasks retrieved:', tasksRes.data);

  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
};

testAPI(); 