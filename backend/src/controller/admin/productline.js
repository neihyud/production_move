const handleStatus = require('../../helpers/handleStatus');
const ProductLine = require('../../models/ProductLine')

module.exports = {

    // [GET] /admin/productlines
    getProductLines: async (req, res) => {
        const productlines = await ProductLine.find({}).lean()

        return res.status(200).json({ success: true, message: 'Get ProductLine Success', productlines })
    },

    // [POST] /admin/productlines
    createProductLine: async (req, res) => {
        try {
            const { code = '', productLine = '', description = '' } = req.body;

            const _productline = await ProductLine.findOne({ code }).select('code').lean()

            if (_productline) {
                return res.status(400).json({ success: false, message: 'ProductLine is exist' })
            }

            const newProductline = new ProductLine({
                code, productLine, description
            })

            await newProductline.save()

            return res.status(200).json({ success: true, message: 'Created ProductLine Success', productline: newProductline })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal Error', error })
        }
    },

    // [PUT] /admin/productlines/:id
    updateProductLine: async (req, res) => {
        try {
            const { code = '', productLine = '', description = '' } = req.body

            let updatedProductLine = await ProductLine.findOneAndUpdate({ code }, { productLine, description }).lean()

            if (!updatedProductLine) {
                return res.status(401).json({
                    success: false,
                    message: 'ProducLine not found'
                })
            }
            res.status(200).json({ success: true, message: 'Update ProductLine Success', productline: updatedProductLine })

        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal Error', error })
        }


    },

    // [PUT] /admin/productlines/:id
    deleteProductLine: async (req, res) => {
        const _id = req.params.id

        const productline = new ProductLine.find({ _id })

        if (!productline) {
            res.status(400).json({ success: false, message: 'Productline is not exist' })
        }

        await productline.deleteOne({ _id })

        res.status(200).json({ success: true, message: 'Delete Success' })

    }

}
