const Product = require('../../models/Product')

const { STATUS_PRODUCT_AGENT,
    STATUS_PRODUCT_ERROR_WARRANTY,
    STATUS_PRODUCT_WARRANTY_DONE,
    STATUS_PRODUCT_SOLD, STATUS_PRODUCT_FIXING } = require('../../constants/index')

const Order = require('../../models/Order')

const validateProduct = (products) => {
    const _products = products.map((product) => {
        const status = product.status
        return {
            ...product,
            note: product.note[status]
        }
    })
    return _products
}

module.exports = {
    // product
    // importProduct: async (req, res) => {

    //     // lay ten cua dai ly
    //     const name = req.name
    //     const products = await Product.find({ status: "đại lý", note: name })

    //     return res.status(200).json({ message: 'import product success', products })
    // },

    // [GET] /agent/:code/product
    getProducts: async (req, res) => {
        try {
            const { code } = req.params
            const products = await Product.find({ 'note.agent': code, status: STATUS_PRODUCT_AGENT }).lean()

            const _products = validateProduct(products)

            res.status(200).json({ success: true, message: "Get Product Success", products: _products })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal Error, Report To Admin', error })
        }
    },

    getProductsWarranty: async (req, res) => {
        try {
            const { code } = req.params
            const products = await Product.find({ 'note.agent': code, status: STATUS_PRODUCT_ERROR_WARRANTY }).lean()

            const _products = validateProduct(products)

            res.status(200).json({ success: true, message: "Get Product Success", products: _products })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal Error, Report To Admin', error })
        }
    },

    exportProductToWarranty: async (req, res) => {
        try {
            const { code } = req.params
            const { productIds = [], warranty } = req.body
            await Product.updateMany({ _id: { $in: productIds } }, { status: STATUS_PRODUCT_FIXING, 'note[STATUS_PRODUCT_FIXING]': warranty }).lean()

            // const _products = validateProduct(products)

            res.status(200).json({ success: true, message: "Export Product Success", products: [] })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal Error, Report To Admin', error })
        }
    },

    getProductsWarrantyDone: async (req, res) => {
        try {
            const { code } = req.params
            const products = await Product.find({ 'note.agent': code, status: STATUS_PRODUCT_WARRANTY_DONE }).lean()

            const _products = validateProduct(products)

            res.status(200).json({ success: true, message: "Get Product Success", products: _products })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal Error, Report To Admin', error })
        }
    },

    getProductSold: async (req, res) => {
        try {
            const { code } = req.params
            const products = await Product.find({ 'note.agent': code, 'note[STATUS_PRODUCT_SOLD]': STATUS_PRODUCT_SOLD, status: { $ne: STATUS_PRODUCT_AGENT } }).lean()

            const _products = validateProduct(products)

            res.status(200).json({ success: true, message: "Get Product Success", products: _products })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal Error, Report To Admin', error })
        }
    },

    productReport: async (req, res) => {
        try {
            try {
                const { code } = req.params
                const { productId = '' } = req.body

                const product = await Product.findOne(({ _id: productId })).lean()

                if (!product) {
                    res.status(400).json({ success: false, message: 'Product not found' })
                }

                const _note = (product.numberWarranty) + 1 + `, ${code}`

                await Product.updateOne({ _id: productId }, { status: STATUS_PRODUCT_ERROR_WARRANTY, 'note[STATUS_PRODUCT_ERROR_WARRANTY]': _note }).lean()


                res.status(200).json({ success: true, message: "Export Product Success", products: product })
            } catch (error) {
                res.status(500).json({ success: false, message: 'Internal Error, Report To Admin', error })
            }
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal Error, Report To Admin', error })
        }
    },

    createOrder: async (req, res) => {
        const { code } = req.params
        try {
            const { productIds, username: customerName, phone, address } = req.body
            const order = new Order({
                customerName, phone, address, productId: productIds
            })

            await order.save()

            await Product.updateMany({ _id: { $in: productIds } }, { status: STATUS_PRODUCT_SOLD, 'note[STATUS_PRODUCT_SOLD]': { customerName, phone, address } })

            res.status(200).json({ success: true, message: 'Create Order Success', productIds })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal Error, Report To Admin', error })
        }
    },

    getProductRecall: async (req, res) => {
        try {
            const { code } = req.params
            const products = await Product.find({ 'note.agent': code, status: STATUS_PRODUCT_SOLD }).lean()

            const _products = validateProduct(products)

            res.status(200).json({ success: true, message: "Get Product Success", products: _products })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal Error, Report To Admin', error })
        }
    },

    productRecall: async (req, res) => {
        try {
            const { code, productLine } = req.params
            const products = await Product.find({ 'note.agent': code, status: STATUS_PRODUCT_SOLD, productLine }).lean()

            const _products = validateProduct(products)

            let message = products.length ? 'Get Product Success' : 'Product empty'

            res.status(200).json({ success: true, message, products: _products })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal Error, Report To Admin', error })
        }
    },

    recallToWarranty: async (req, res) => {
        try {
            const { code, id } = req.params

            const product = await Product.findOne(({ _id: id })).lean()

            if (!product) {
                res.status(400).json({ success: false, message: 'Product not found' })
            }

            const number = product.numberWarranty + 1
            const _note = number + `, ${code}`
            const products = await Product.updateOne({ _id: id }, { status: STATUS_PRODUCT_ERROR_WARRANTY, 'note[STATUS_PRODUCT_ERROR_WARRANTY]': _note, numberWarranty: number }).lean()

            res.status(200).json({ success: true, message: "Recall to Warranty Success", product: product })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal Error, Report To Admin', error })
        }
    }



}