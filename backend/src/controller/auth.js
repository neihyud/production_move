const jwt = require('jsonwebtoken')
const Account = require('../models/Account')
const bcrypt = require('bcrypt')
const config = require('../config/index')

exports.login = async (req, res) => {
    const { username = '', password = '' } = req.body

    const account = await Account.findOne({ username }).lean()
    if (!account) {
        return res.status(400).json({ success: false, message: 'Account not found' })
    }

    const passwordValid = await bcrypt.compare(password, account.password)
    if (!passwordValid) {
        return res.status(400).json({ success: false, message: 'Invalid password' })
    }

    const accessToken = jwt.sign({ userId: account._id, role: account.role }, config.accessTokenSecret)

    res.status(200).json({ success: true, message: 'Login successful', accessToken: accessToken, account })
}

exports.register = async (req, res) => {
    const { username, password } = req.body
    const salt = 10;
    // Simple validation
    if (!username || !password)
        return res
            .status(400)
            .json({ success: false, message: 'Missing username and/or password' })

    try {
        // Check for existing user
        const user = await Account.findOne({ username })

        if (user)
            return res
                .status(400)
                .json({ success: false, message: 'Username already taken' })

        // All good
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new Account({ username, password: hashedPassword })
        await newUser.save()

        // Return token
        const accessToken = jwt.sign(
            { userId: newUser._id, role: newUser.role },
            process.env.ACCESS_TOKEN_SECRET
        )

        res.json({
            success: true,
            message: 'User created successfully',
            accessToken
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

exports.checkUser = async (req, res) => {
    try {
        const user = await Account.findById(req.userId).select('-password')
        if (!user)
            return res.status(400).json({ success: false, message: 'User not found' })
        res.json({ success: true, user })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}