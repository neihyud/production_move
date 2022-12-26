const Product = require('../../models/Product')
const Production = require('../../models/ManufacturingBase')

module.exports = {
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

        const production = await Production.find({ _id })

        if (!production) {
            res.status(400).json({ message: 'Production not found' })
        }

        await production.updateOne({ _id }, { place })

        res.status(200).json({ message: 'Production: update info success' })
    },

    // [GET] /manufacturing-base/error-product
    getProductError: async (req, res) => {
        const productError = await Product.find({ status: 'Lỗi, đã đưa về cơ sở sản xuất' })
        res.status(200).json({ message: 'Get error product success', productError: productError })
    }

}