const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AccountSchema = new Schema({
    role: {
        type: String,
        enum: ['admin', 'warranty-center', 'manufacture', 'agent'],
        default: 'product'
    },
    username: {
        type: String, required: true
    },
    password: {
        type: String, required: true
    },
    imgUri: {
        type: String
    },
    status: {
        type: String,
        enum: ['first', 'active', 'inactive'],
        default: 'first'
    }
})

module.exports = mongoose.model('Account', AccountSchema) 