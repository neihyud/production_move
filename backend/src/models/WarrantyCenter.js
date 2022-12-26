const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WarrantyCenterScheme = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('WarrantyCenter', WarrantyCenterScheme)