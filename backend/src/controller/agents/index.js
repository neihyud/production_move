const Product = require('../../models/Product')

const { STATUS_PRODUCT_AGENT,
    STATUS_PRODUCT_ERROR_WARRANTY,
    STATUS_PRODUCT_WARRANTY_DONE } = require('../../constants/index')

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
            res.status(500).json({ success: false, message: 'Internal Error', error })
        }
    },

    getProductsWarranty: async (req, res) => {
        try {
            const { code } = req.params
            const products = await Product.find({ 'note.agent': code, status: STATUS_PRODUCT_ERROR_WARRANTY }).lean()

            const _products = validateProduct(products)

            res.status(200).json({ success: true, message: "Get Product Success", products: _products })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal Error', error })
        }
    },

    exportProductToWarranty: async (req, res) => {
        try {
            const { code } = req.params
            const { productIds = [] } = req.body
            const products = await Product.updateMany({ _id: { $in: productIds } }, { status: STATUS_PRODUCT_FIXING, 'note[STATUS_PRODUCT_FIXING]': code }).lean()

            const _products = validateProduct(products)

            res.status(200).json({ success: true, message: "Export Product Success", products: _products })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal Error', error })
        }
    },

    getProductsWarrantyDone: async (req, res) => {
        try {
            const { code } = req.params
            const products = await Product.find({ 'note.agent': code, status: STATUS_PRODUCT_WARRANTY_DONE }).lean()

            const _products = validateProduct(products)

            res.status(200).json({ success: true, message: "Get Product Success", products: _products })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal Error', error })
        }
    }
}