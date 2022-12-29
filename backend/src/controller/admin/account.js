const Account = require('../../models/Account')
const bcrypt = require('bcrypt')
const { default: mongoose } = require('mongoose')


module.exports = {

    // [GET] /admin/account
    getAccounts: async (req, res) => {
        const accounts = await Account.find({}).lean()

        return res.status(200).json({ success: true, message: 'Get Success', accounts })
    },

    // [POST] /admin/account
    createAccount: async (req, res) => {
        try {
            const { role = '', username = '', password = '' } = req.body

            if (!username.trim() || !password.trim()) {
                res.status(400).json({success: false, message: "username or password is empty"})
            }
            const account = await Account.findOne({ username: username.trim() }).lean()

            if (account) {
                return res.status(400).json({ success: false, message: 'Account is exist' })
            }

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)

            const newAccount = new Account({
                role, username,
                password: hashedPassword
            })

            await newAccount.save()

            res.status(201).json({ success: true, message: 'Create Account Success', account: newAccount })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal Error, Report To Admin', error })
        }


    },

    // [PUT] /admin/account
    updateAccount: async (req, res) => {
        try {
            const { role = '' } = req.body
            const _id = req.params.id

            let updatedAccount = await Account.findOneAndUpdate({ _id }, { role }, { new: true }).lean()

            if (!updatedAccount) {
                return res.status(401).json({
                    success: false,
                    message: 'Account not found'
                })
            }

            res.status(201).json({ success: true, message: `Updated Account Success`, account: updatedAccount })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal Error, Report To Admin', error })
        }
    },

    // [Delete] /admin/account/:id
    deleteAccount: async (req, res) => {
        try {
            const { id = '' } = req.params

            const account = await Account.findOne({ _id: id }).select('username')

            if (!account) {
                return res.status(400).json({ success: false, message: 'Account is not exist' })
            }

            await account.deleteOne({ _id: id })

            res.status(201).json({ success: true, message: `Delete Account ${account.username}Success` })

        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal Error, Report To Admin', error })
        }
    }

}