const Product = require('../../models/Product')

module.exports = {
    importProductToManufacturing: async (req, res) => {
        // lay ten cua dai ly
        const name = req.name
        const products = await Product.find({ status: "đại lý", note: name })

        return res.status(200).json({ message: 'import product success', products })
    }
}