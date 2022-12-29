const Product = require('../../models/Product')

const { STATUS_PRODUCT_AGENT, STATUS_PRODUCT_ERROR_WARRANTY, STATUS_PRODUCT_FIXING, STATUS_PRODUCT_WARRANTY_DONE } = require('../../constants/index')

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
    // [GET] /warranty/:code/product
    getProducts: async (req, res) => {
        try {
            const { code } = req.params
            const products = await Product.find({ status: STATUS_PRODUCT_FIXING }).lean()

            const _products = validateProduct(products)

            res.status(200).json({ success: true, message: "Get Product Success", products: _products })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal Error, Report To Admin', error })
        }
    },

    // [PUT] update san pham khi da den noi bao hanh
    statusInsurance: async (req, res) => {
        const ids = req.body.productIds
        const productsInsurance = new Product.updateMany({ _id: { $in: ids } }, { status: "đang sửa chữa bảo hành", note: "?" })
    },

    //[PUT] /warranty/:code/product/export-agent
    exportToAgent: async (req, res) => {
        try {
            const { code, productId } = req.params

            const product = await Product.findOne({ _id: productId }).lean()
            if (!product) {
                res.status(400).json({ success: false, message: 'Product not exist' })
            }

            await Product.updateOne({ _id: productId }, { 'note[STATUS_PRODUCT_WARRANTY_DONE]': code , status: STATUS_PRODUCT_WARRANTY_DONE })

            // const products = await Product.find({ 'note.new': code }).lean()
            // const _products = validateProduct(products)
            res.status(200).json({ success: true, message: 'Export product success', product: product })

        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal Error, Report To Admin' })
        }
    },

    // [PUT] /warranty/:code/product/export-manufacture
    exportToManufacturing: async (req, res) => {
        const id = req.params.id

        await Product.updateOne({ _id: id }, { status: "lỗi, cần trả về nhà máy", note: "?" })
    }
}
