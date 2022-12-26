const Product = require('../../models/Product')
const ProductDetail = require('../../models/ProductDetail')
const Manufacture = require('../../models/ManufacturingBase')

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
    getProducts: async function (req, res) {
        try {
            const { code } = req.params
            const products = await Product.find({ 'note.new': code }).lean()

            const _products = validateProduct(products)
            
            res.status(200).json({ success: true, message: "Get Product Success", products: _products })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal Error', error })
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
                bootSystem = '', productName = '', quantity = 0 } = req.body;

            const _product = await Product.findOne({ productName, 'note.new': code }).select('quantity').lean()

            if (_product) {
                // const newNumberProduct = +quantity + (+_product.quantity)
                // await Product.updateOne({ productName }, { quantity: newNumberProduct })
                return res.status(400).json({ success: false, message: 'Product is exist' })
            }

            const _newProduct = new Product({
                productName,
                note: { new: code }, productLine, price,
                quantity
            })

            let newProduct = await _newProduct.save()

            const _newProductDetail = new ProductDetail({
                productId: newProduct._id,
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

            return res.status(200).json({ success: true, message: 'Created Product Success', product: newProduct })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal Error', error })
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

            res.status(200).json({ success: true, message: 'Delete Success' })

        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal Error', error })
        }
    },

    // [POST] /manufacturing-base/export
    exportProductForAgent: async (req, res) => {
        // note: ten dai ly
        const { productIds = [], store = '', note } = req.body;

        await Product.updateMany({ _id: { $in: productIds } }, { position: store, status: 'đại lý', note })

        res.status(200).json({ message: 'Export product success' })
    },

    // [POST] /manufacturing-base/:id/info
    updateInfo: async (req, res) => {
        const _id = req.params.id;

        const { place } = req.body

        const production = await Manufacture.find({ _id })

        if (!production) {
            res.status(400).json({ message: 'Manufacture not found' })
        }

        await production.updateOne({ _id }, { place })

        res.status(200).json({ message: 'Manufacture: update info success' })
    },

    // [GET] /manufacturing-base/error-product
    getProductError: async (req, res) => {
        const productError = await Product.find({ status: 'Lỗi, đã đưa về cơ sở sản xuất' })
        res.status(200).json({ message: 'Get error product success', productError: productError })
    },


}