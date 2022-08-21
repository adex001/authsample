const express = require('express');
const Helper = require('./helper');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();


const SECRET = 'SCRETBLABLA';

class Authentication {
    static async register (req, res) {
        const {email, password, first_name, last_name} = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Email or Password should not be empty'
            })
        }

        const findUser = Helper.findUser(email);

        if(findUser) {
            return res.status(400).json({
                message: 'User already registered on this platform'
            })
        }

        // Save the user to the database
        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        const data = {
            email,
            first_name,
            last_name,
            password: hashPassword
        };

        const saveUser = Helper.saveUser(data);

        return res.json({
            message: 'Successful created',
            data
        })
    }

    static async getAllUsers (req, res) {
        return res.status(200).json({
            message: "All users retrieved",
            data: Helper.getAllUsers()
        })
    }

    static async login (req, res) {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Email or Password should not be empty'
            })
        }

        const findUser = Helper.findUser(email);

        if (!findUser) {
            return res.status(400).json({
                message: 'Invalid email or password'
            })
        }

        const comparePassword = await bcrypt.compare(password, findUser.password);
        if (!comparePassword) {
            return res.status(400).json({
                message: 'Invalid email or password'
            })
        }

        const payload = {
            first_name: findUser.first_name,
            last_name: findUser.last_name,
            email
        }

        const token = jwt.sign(payload, SECRET);

        return res.status(200).json({
            message: 'Login successful',
            data: {
                ...payload, token
            }
        })

    }
}

router.post('/register', Authentication.register);
router.get('/users', Authentication.getAllUsers);
router.post('/login', Authentication.login)

module.exports = router;