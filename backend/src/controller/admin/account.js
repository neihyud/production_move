const Account = require('../../models/Account')
const bcrypt = require('bcrypt')
const { default: mongoose } = require('mongoose')


module.exports = {

    // [GET] /admin/account => 1 role ...
    getAccounts: async (req, res) => {
        const accounts = await Account.find({}).lean()

        return res.status(200).json({ success: true, message: 'Get Success', accounts })
    },

    // [POST] /admin/account
    createAccount: async (req, res) => {
        try {
            const { role = '', username = '', password = '' } = req.body

            const account = await Account.findOne({ username }).lean()

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

    // [POST] /admin/account
    updateAccount: async (req, res) => {
        try {
            const { role = '', username = '' } = req.body
            const _id = req.params.id

            if (!username) {
                return res
                    .status(400)
                    .json({ success: false, message: 'Username is required' })
            }

            let updatedAccount = await Account.findOneAndUpdate({ username }, { role }, { new: true }).lean()

            if (!updatedAccount) {
                return res.status(401).json({
                    success: false,
                    message: 'Account not found'
                })
            }

            res.status(201).json({ success: true, message: 'Update Account Success', account: updatedAccount })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal Error, Report To Admin', error })
        }


    },

    // [Delete] /admin/account/:id
    deleteAccount: async (req, res) => {
        try {
            const { id = '' } = req.params
            // let _id = new mongoose.Types.ObjectId(id)
            const account = await Account.findOne({ _id: id })

            if (!account) {
                return res.status(400).json({ success: false, message: 'Account is not exist' })
            }

            await account.deleteOne({ _id: id })

            res.status(201).json({ success: true, message: 'Delete Account Success' })

        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal Error, Report To Admin', error })
        }
    }

}