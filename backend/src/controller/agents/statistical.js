const Product = require("../../models/Product")
const ProductLine = require("../../models/ProductLine")

const BlueBird = require('bluebird')
module.exports = {
    // product sold 
    statisticalSold: async (options) => {
        // agent
    },
    statisticalError: async (type) => {
        // type: agent - manufacture
        const productLines = await ProductLine.find({}).select('code productLine').lean()

        const data = await BlueBird.map((productLines), async (productLine) => {
            return Product.countDocuments({ productLine })
        }, { concurrency: 10 })

    }
}