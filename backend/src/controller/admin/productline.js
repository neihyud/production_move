const ProductLine = require('../../models/ProductLine')

module.exports = {

    // [GET] /admin/productLine
    getProductLines: async (req, res) => {
        const productLines = await ProductLine.find({}).lean()

        return res.status(200).json({ success: true, message: 'Get ProductLine Success', productLines })
    },

    // [POST] /admin/productLines
    createProductLine: async (req, res) => {
        try {
            const { code = '', productLine = '', description = '' } = req.body;

            const _productLine = await ProductLine.findOne({ code }).select('code').lean()

            if (_productLine) {
                return res.status(400).json({ success: false, message: 'ProductLine is exist' })
            }

            const newProductline = new ProductLine({
                code, productLine, description
            })

            await newProductline.save()

            return res.status(200).json({ success: true, message: 'Created ProductLine Success', productLine: newProductline })
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal Error, Report To Admin', error })
        }
    },

    // [PUT] /admin/productLine/:id
    updateProductLine: async (req, res) => {
        try {
            const { code = '', productLine = '', description = '' } = req.body

            let updatedProductLine = await ProductLine.findOneAndUpdate({ code }, { productLine, description }, { new: true }).lean()

            if (!updatedProductLine) {
                return res.status(401).json({
                    success: false,
                    message: 'ProducLine not found'
                })
            }
            res.status(200).json({ success: true, message: 'Update ProductLine Success', productLine: updatedProductLine })

        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal Error, Report To Admin', error })
        }
    },

    // [DELETE] /admin/productLine/:id
    deleteProductLine: async (req, res) => {
        try {
            const { id: _id } = req.params

            const productLine = await ProductLine.findOne({ _id })

            if (!productLine) {
                return res.status(400).json({ success: false, message: 'Productline is not exist' })
            }

            await productLine.deleteOne({ _id })

            res.status(200).json({ success: true, message: 'Delete Success' })

        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal Error, Report To Admin', error })
        }

    }

}
