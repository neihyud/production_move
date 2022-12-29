const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    // customerId: {
    //     type: mongoose.Types.ObjectId,
    //     required: true
    // },
    customerName: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    productId: {
        type: [{ type: mongoose.Types.ObjectId, ref: 'Product' }]
    }
}, { timestamps: true })

module.exports = mongoose.model('Order', OrderSchema) 