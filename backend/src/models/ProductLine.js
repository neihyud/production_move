const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductLineSchema = new Schema({
    code: {
        type: String,
        required: true,
    },
    productLine: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('ProductLine', ProductLineSchema)