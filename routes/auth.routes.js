const { Router } = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const router = Router()

router.post('/register',
    [
        check('email', 'Wrong email').isEmail(),
        check('password', 'Min length is 6 symbols').isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            console.log(req.body)
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Wrong registration data'
                })
            }
            const { email, password } = req.body
            const candidate = await User.findOne({ email })
            console.log(candidate)

            if (candidate) {
                return res.status(400).json({ message: 'Such user exists yet' })
            }

            const hashedPassword = await  bcrypt.hash(password, 12);
            const user = new User({ email, password: hashedPassword })

             await user.save()
            res.status(201).json({ message: "User created" })
        } catch (e) {
            console.log(e.message)
            res.status(500).json({ message: "Something went wrong. Try again" })
        }
    })


router.post('/login',
    [
        check('email', 'Input correct email').normalizeEmail().isEmail(),
        check('password', 'Input password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Wrong registration data'
                })
            }
            const { email, password } = req.body;
            const user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json('User not found')
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({ message: "Wrong password" })
            }

            const token = jwt.sign({
                userId: user.id
            }, config.get('jwtSecret'), 
            {expiresIn: '1h'})

            res.json({token, userId: user.id})

        } catch (e) {
            res.status(500).json({ message: "Something went wrong. Try again" })
        }
    })

module.exports = router