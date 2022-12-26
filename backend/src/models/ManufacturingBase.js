const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ManufacturingBaseSchema = new Schema({
    name: String,
    address: String,
    createAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('ManufacturingBase', ManufacturingBaseSchema)