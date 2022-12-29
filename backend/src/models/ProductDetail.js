const mongoose = require('mongoose')
const { Schema } = mongoose

const ProductDetailSchema = new Schema({
    productId: {
        type: mongoose.Types.ObjectId,
        required: true,
        index: true
    },
    description: {
        type: String,
        default: ' '
    },
    // loai dong co
    engineType: {
        type: String,
        default: 'Empty'
    },
    // dung tich binh xang
    petrolTankCapacity: {
        type: String,
        required: true
    },
    // cong suat toi da
    maximumCapacity: {
        type: String,
        required: true
    },
    // tieu thu tai nguyen
    rawMaterialConsumption: {
        type: String,
        required: true
    },
    // dung tich dau may
    engineOilCapacity: {
        type: String,
        required: true
    },
    // kich thuoc: dai rong cao
    sizeLongLargeHeigh: {
        type: String,
        required: true
    },
    // chieu cao yen xe
    saddleHeight: {
        type: String,
        default: 'Empty'
    },
    // chieu cao gam xe
    chassisHeight: {
        type: String,
        default: 'Empty'
    },
    // dung tich xi lanh
    cylinderCapacity: {
        type: String,
        default: "Empty"
    },
    // he thong khoi dong
    bootSystem: {
        type: String,
        default: 'Empty'
    },

})

module.exports = mongoose.model('ProductDetail', ProductDetailSchema)
