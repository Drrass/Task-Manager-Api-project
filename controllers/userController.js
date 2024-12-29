const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../middleware/auth');
const { where } = require('sequelize');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                status: 'error',
                message: 'Email is already registered'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 8);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            status: 'success',
            message: 'Registration successful. Please login.',
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            }
        });

    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid email or password'
            });
        } 

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid email or password'
            });
        }

        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '24h' });

        res.json({
            status: 'success',
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    token: token
                },
                
            }
        });

    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
};

module.exports = {
    register,
    login
};