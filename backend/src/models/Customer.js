const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CustomerSchema = new Schema({
    customerName: {
        type: String,
        required: true
    },
    customerPhone: {
        type: String,
        required: true,
        index: true
    },
    customerAddress: {
        type: String,
        required: true
    },
    productId: {
        type: mongoose.Types.ObjectId,
        require: true
    }
})

module.exports = mongoose.model('Customer', CustomerSchema) 