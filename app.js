require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models')
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app =express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/' , (req, res, )=>{
  res.status(200).json({
    status:'success',
    message: 'Welcome to the task management Api'
  })
})

// Routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/tasks', require('./routes/taskRoutes'));
app.use('/api/users', authRoutes);
app.use('/api/tasks', taskRoutes);




sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected successfully!');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error.message);
  });

module.exports = app;
