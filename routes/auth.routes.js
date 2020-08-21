const { Router } = require('express')
const bcrypt = require('bcrypt')
const config = require('config')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const router = Router()

router.post('/signup',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Password length has to be at least 8 character.').isLength({
            min: 8
        }),
        check('firstName', 'Field must be non-empty').exists(),
        check('lastName', 'Field must be non-empty').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data during registration'
                })
            }

            const { email, password, firstName, lastName } = req.body

            const candidate = await User.findOne({ email })

            if (candidate) {
                return res.status(400).json({
                    message: 'User already exists'
                })
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({
                email: email,
                password: hashedPassword,
                firstName: firstName,
                lastName: lastName,
                superuser: false
            })

            await user.save()
            res.status(201).json({
                message: 'User has been created.'
            })
        } catch (e) {
            res.status(500).json({
                message: 'Something went wrong.'
            })
        }
    }
)

router.post('/signin',
    [
        check('email', 'Enter valid email').normalizeEmail().isEmail(),
        check('password', 'Enter valid password').isLength({
            min: 8
        })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data during signing in.'
                })
            }

            const { email, password } = req.body
            const user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({
                    message: 'Invalid credentials'
                })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({
                    message: 'Invalid credentials'
                })
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )

            res.json({
                token,
                userId: user.id
            })
        } catch (e) {
            res.status(500).json({
                message: 'Something went wrong.'
            })
        }
    }
)

module.exports = router