const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    customerId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    productId: {
        type: mongoose.Types.ObjectId
    }
})

module.exports = mongoose.model('Order', OrderSchema) 