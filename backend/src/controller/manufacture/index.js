const Product = require('../../models/Product')
const ProductDetail = require('../../models/ProductDetail')
const Manufacture = require('../../models/Manufacture')

const { STATUS_PRODUCT_AGENT, STATUS_PRODUCT_ERROR_FACTORY, STATUS_PRODUCT_NEW, STATUS_PRODUCT_ERROR_MANUFACTURE } = require('../../constants/index')
const { default: mongoose } = require('mongoose')

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

    // [GET] /manufacture/:code/product
    getProducts: async (req, res) => {
        try {
            const { code } = req.params
            const products = await Product.find({ 'note.new': code, status: STATUS_PRODUCT_NEW }).lean()

            // const _products = validateProduct(products)

            const _products = products.map((product) => {
                const status = product.status
                return {
                    ...product,
                    note: product.note[status],
                    price: product.price.split(' ')[0].replace(/\./g, '')

                }
            })

            res.status(200).json({ success: true, message: "Get Product Success", products: _products })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal Error, Report To Admin', error })
        }
    },

    getProduct: async (req, res) => {
        try {
            const { code, id } = req.params
            const product = await Product.findOne({ 'note.new': code, _id: id }).lean()

            if (!product) {
                return res.status(400).json({ success: false, message: 'Product is not exist' })
            }
            const productDetail = await ProductDetail.findOne({ productId: id }).select('-productId').lean()

            const note = product.note[product.status]

            const _product = { ...product, ...productDetail, note }

            res.status(200).json({ success: true, message: "Get Product Success", product: _product })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal Error, Report To Admin', error })
        }
    },

    // [POST] /manufacture/:code/product
    createProduct: async (req, res) => {
        const { code } = req.params
        try {
            const {
                productLine = '',
                price = '',
                description = '',
                engineType = '',
                petrolTankCapacity = '',
                maximumCapacity = '',
                rawMaterialConsumption = '',
                engineOilCapacity = '',
                sizeLongLargeHeigh = '',
                saddleHeight = '',
                chassisHeight = '',
                cylinderCapacity = '',
                bootSystem = '', productName = '', quantity = 1 } = req.body;

            if (!productLine || !productName) {
                return res.status(400).json({ success: false, message: 'productLine or productName is empty' })
            }

            const _product = await Product.findOne({ productName, 'note.new': code }).select('quantity').lean()

            if (_product) {
                // const newNumberProduct = +quantity + (+_product.quantity)
                // await Product.updateOne({ productName }, { quantity: newNumberProduct })
                return res.status(400).json({ success: false, message: 'Product is exist' })
            }

            let _newProduct = new Product({
                _id: new mongoose.Types.ObjectId(),
                productName,
                note: { new: code }, productLine, price,
                quantity
            })

            await _newProduct.save()

            const _newProductDetail = new ProductDetail({
                productId: _newProduct._id,
                description,
                engineType,
                petrolTankCapacity,
                maximumCapacity,
                rawMaterialConsumption,
                engineOilCapacity,
                sizeLongLargeHeigh,
                saddleHeight,
                chassisHeight,
                cylinderCapacity,
                bootSystem,
            })

            await _newProductDetail.save()

            return res.status(200).json({ success: true, message: 'Created Product Success', product: _newProduct })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal Error, Report To Admin', error })
        }
    },

    // [PUT] /manufacture/:code/product/:id
    updateProduct: async (req, res) => {
        const { code, id } = req.params
        try {
            const {
                productLine = '',
                price = '',
                description = '',
                engineType = '',
                petrolTankCapacity = '',
                maximumCapacity = '',
                rawMaterialConsumption = '',
                engineOilCapacity = '',
                sizeLongLargeHeigh = '',
                saddleHeight = '',
                chassisHeight = '',
                cylinderCapacity = '',
                bootSystem = '', productName = '', quantity = 1 } = req.body;

            let updateProduct = await Product.findOneAndUpdate({ _id: id }, {
                productName,
                note: { new: code }, productLine, price,
                quantity
            }, { new: true }).lean()

            if (!updateProduct) {
                return res.status(400).json({ success: false, message: 'Product is not exist' })
            }

            await ProductDetail.updateOne({ productId: id }, {
                description,
                engineType,
                petrolTankCapacity,
                maximumCapacity,
                rawMaterialConsumption,
                engineOilCapacity,
                sizeLongLargeHeigh,
                saddleHeight,
                chassisHeight,
                cylinderCapacity,
                bootSystem,
            })

            const status = updateProduct.status
            updateProduct = { ...updateProduct, note: updateProduct.note[status] }
            return res.status(200).json({ success: true, message: 'Update Product Success', product: updateProduct })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal Error, Report To Admin', error })
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const { id: _id } = req.params

            const product = await Product.findOne({ _id })

            if (!product) {
                return res.status(400).json({ success: false, message: 'Product is not exist' })
            }

            await product.deleteOne({ _id })
            await ProductDetail.deleteOne({ _id })

            res.status(200).json({ success: true, message: 'Delete Success' })

        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal Error, Report To Admin', error })
        }
    },

    // [PUT] /manufacture/:code/product/export
    exportProductForAgent: async (req, res) => {
        try {
            const { code } = req.params

            const { productIds = [], agent } = req.body;

            await Product.updateMany({ _id: { $in: productIds }, 'note.new': code }, {
                'note.agent': agent, status: STATUS_PRODUCT_AGENT
            })

            res.status(200).json({ success: true, message: 'Export product success', products: productIds })

        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal Error, Report To Admin' })
        }
    },

    // [PUT] /manufacture/:code/product/:id/info
    // updateInfo: async (req, res) => {
    //     const _id = req.params.id;

    //     const { place } = req.body

    //     const production = await Manufacture.find({ _id })

    //     if (!production) {
    //         res.status(400).json({ message: 'Manufacture not found' })
    //     }

    //     await production.updateOne({ _id }, { place })

    //     res.status(200).json({ message: 'Manufacture: update info success' })
    // },

    // [GET] /manufacture/:code/product/error-product
    getErrorProducts: async (req, res) => {

        try {
            const { code } = req.params

            const productError = await Product.find({ 'note.new': code, status: STATUS_PRODUCT_ERROR_MANUFACTURE }).lean()

            const _products = validateProduct(productError)
            res.status(200).json({ success: true, message: 'Get error product success', products: _products })
        } catch (error) {
            res.status(500).json({ success: false, message: "Internal Error, Report To Admin" })
        }

    },

}