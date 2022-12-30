const Product = require('../models/Product')
const ProductLine = require('../models/ProductLine')

const {
    STATUS_PRODUCT_AGENT,
    STATUS_PRODUCT_ERROR_WARRANTY,
    STATUS_PRODUCT_FIXING,
    STATUS_PRODUCT_NEW,
    STATUS_PRODUCT_SOLD,
    STATUS_PRODUCT_WARRANTY_DONE,
    STATUS_PRODUCT_ERROR_MANUFACTURE
} = require('../constants')

const BlueBird = require('bluebird')

module.exports = {

    // [GET] /admin/statistical
    getStatisticalAll: async (req, res) => {
        const unsoldProduct = Product.countDocuments({ status: { $in: [STATUS_PRODUCT_NEW, STATUS_PRODUCT_AGENT] } })
        const soldProduct = Product.countDocuments({ status: { $in: [STATUS_PRODUCT_SOLD, STATUS_PRODUCT_WARRANTY_DONE] } })
        const fixProduct = Product.countDocuments({ status: { $in: [STATUS_PRODUCT_FIXING, STATUS_PRODUCT_ERROR_WARRANTY] } })

        try {
            const [unsold, sold, fix] = await Promise.all([unsoldProduct, soldProduct, fixProduct])

            res.status(200).json({ success: true, message: '', data: [unsold, sold, fix] })

        } catch (error) {
            res.status(500).json({ success: false, message: 'Error statistical' })
        }
    },

    // [GET] /admin/statistical/manufacture/:code
    getStatisticalManufacture: async (req, res) => {
        // const { code = 'fac' } = req.params
        const code = 'fac'

        const productNew = Product.countDocuments({ 'note.new': code, status: STATUS_PRODUCT_NEW })
        const productExport = Product.countDocuments({ 'note.new': code, status: STATUS_PRODUCT_AGENT })
        const productDefective = Product.countDocuments({ 'note.new': code, status: STATUS_PRODUCT_ERROR_MANUFACTURE })

        try {
            const [newP, exportP, defectiveP] = await Promise.all([productNew, productExport, productDefective])
            res.status(200).json({ success: true, message: '', data: [newP, exportP, defectiveP] })

        } catch (error) {
            res.status(500).json({ success: false, message: 'Error statistical' })
        }
    },

    // [GET] /admin/statistical/agent/:code
    getStatisticalAgent: async (req, res) => {
        // const { code ='agent_zero' } = req.params
        const code = 'agent_zero'

        const soldProduct = Product.countDocuments({ 'note.agent': code, status: STATUS_PRODUCT_SOLD })
        const unSoldProduct = Product.countDocuments({ 'note.agent': code, status: STATUS_PRODUCT_AGENT })
        const warrantyProduct = Product.countDocuments({ 'note.agent': code, status: STATUS_PRODUCT_ERROR_WARRANTY })

        try {
            const [unsold, sold, warrant] = await Promise.all([unSoldProduct, soldProduct, warrantyProduct])

            res.status(200).json({ success: true, message: '', data: [unsold, sold, warrant] })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error statistical' })
        }
    },

    // [GET] /admin/statistical/warranty/:code
    getStatisticalWarranty: async (req, res) => {
        // const { code = 'war' } = req.params
        const code = 'war'

        const warrantyProduct = Product.countDocuments({ 'note.fixing': code, status: STATUS_PRODUCT_FIXING })
        const warrantyDoneProduct = Product.countDocuments({ 'note.fixing': code, status: STATUS_PRODUCT_WARRANTY_DONE })
        const defectiveProduct = Product.countDocuments({ 'note.fixing': code, status: STATUS_PRODUCT_ERROR_MANUFACTURE })

        try {
            const [warrant, warrantDone, defectiveP] = await Promise.all([warrantyProduct, warrantyDoneProduct, defectiveProduct])

            res.status(200).json({ success: true, message: '', data: [warrant, warrantDone, defectiveP] })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error statistical' })
        }
    },

    // [GET] /manufacture/statistical/productLine
    errorProductLineManufacture: async (req, res) => {
        const code = 'fac'

        try {
            const productLines = await ProductLine.find({}).select('code productLine').lean()

            const labels = []
            const data = []
            const dataAll = []
            await BlueBird.map((productLines), async (productLine) => {
                const count = await Product.countDocuments({ 'note.error_warranty': { $ne: undefined }, 'note.new': code, productLine: productLine.code })
                const countAll = await Product.countDocuments({ 'note.new': code, productLine: productLine.code })
                labels.push(productLine.productLine)
                data.push(count)
                dataAll.push(countAll)
                return true
            }, { concurrency: 4 })



            res.status(200).json({ success: true, message: '', data: { data: data, labels: labels, dataAll: dataAll } })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error statistical' })
        }
    },

    errorProductLineAgent: async (req, res) => {
        const code = 'agent_zero'

        try {
            const productLines = await ProductLine.find({}).select('code productLine').lean()
            const labels = []
            const data = []
            const dataAll = []
            await BlueBird.map((productLines), async (productLine) => {
                const count = await Product.countDocuments({ 'note.error_warranty': { $ne: undefined }, 'note.agent': code, productLine: productLine.code })
                const countAll = await Product.countDocuments({ 'note.agent': code, productLine: productLine.code })

                labels.push(productLine.productLine)
                data.push(count)
                dataAll.push(countAll)
                return true
            }, { concurrency: 4 })


            res.status(200).json({ success: true, message: '', data: { data: data, labels: labels, dataAll: dataAll } })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error statistical' })
        }
    },

    getNumberSold: async () => {
        return Product.countDocuments({ 'note.sold': { $ne: undefined } })
    }

}