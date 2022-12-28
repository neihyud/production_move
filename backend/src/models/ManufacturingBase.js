const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ManufactureSchema = new Schema({
    name: String,
    address: String,
    createAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Manufacture', ManufactureSchema)