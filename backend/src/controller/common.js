const { ROLE_AGENT, ROLE_WARRANTY_CENTER } = require("../constants/role")
const Account = require("../models/Account")
const ProductLine = require('../models/ProductLine')

module.exports = {
    getWarranties: async (req, res) => {
        try {
            const warranties = await Account.find({ role: ROLE_WARRANTY_CENTER }).select('username').lean()
            res.status(200).json({ success: true, message: "Warranty success", warranties })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal error' })
        }
    },

    getProductLines: async (req, res) => {
        try {
            const productLines = await ProductLine.find({}).select('code').lean()
            res.status(200).json({ success: true, message: "ProductLine success", productLines })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal error' })
        }
    },

    getAgents: async (req, res) => {
        try {
            const agents = await Account.find({ role: ROLE_AGENT }).select('code').lean()
            res.status(200).json({ success: true, message: "ProductLine success", agents })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal error' })
        }
    }

}