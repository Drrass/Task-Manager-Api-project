require("dotenv").config({ path: `${process.cwd()}/.env` });

  const config = {
    jwtSecretKey: process.env.JWT_SECRET,
    development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || 'task_manager_db',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres',

  }

}; 
module.exports = config;

