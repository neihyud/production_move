const Product = require('../src/models/Product')
const ProductLine = require("../src/models/ProductLine")
const mongoose = require('mongoose')
const BlueBird = require('bluebird')

const {
    STATUS_PRODUCT_AGENT,
    STATUS_PRODUCT_ERROR_WARRANTY,
    STATUS_PRODUCT_FIXING,
    STATUS_PRODUCT_NEW,
    STATUS_PRODUCT_SOLD,
    STATUS_PRODUCT_WARRANTY_DONE
} = require('../src/constants')

async function run() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/web');
        // const productLines = await ProductLine.find({}).select('code productLine').lean()
        // console.log(productLines)
        // const query = type === 'agent' ? {'note.agent': code } : { 'note.new': code}
        // const data = await BlueBird.map((productLines), async (productLine) => {
        //     return await Product.countDocuments({ productLine: productLine.code, 'note' })
        // }, { concurrency: 10 })

        // console.log("data: ", data)

        const unsoldProduct = await Product.countDocuments({ status: { $in: [STATUS_PRODUCT_NEW, STATUS_PRODUCT_AGENT] } })
        const soldProduct = await Product.countDocuments({ status: { $in: [STATUS_PRODUCT_SOLD, STATUS_PRODUCT_WARRANTY_DONE] } })
        const fixProduct = await Product.countDocuments({ status: { $in: [STATUS_PRODUCT_FIXING, STATUS_PRODUCT_ERROR_WARRANTY] } })

        const a = [unsoldProduct, soldProduct, fixProduct]
        console.log(a)
    } catch (error) {
        console.log('MongoDb connect fail: ', error)
    }
}

run()