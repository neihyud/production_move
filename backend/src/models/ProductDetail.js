const mongoose = require('mongoose')
const { Schema } = mongoose

const ProductDetailSchema = new Schema({
    productId: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true,
        index: true
    },
    description: {
        type: String,
    },
    // loai dong co
    engineType: {
        type: String,
        // required: true,
    },
    // dung tich binh xang
    petrolTankCapacity: {
        type: String,
        // required: true
    },
    // cong suat toi da
    maximumCapacity: {
        type: String,
        // required: true
    },
    // tieu thu tai nguyen
    rawMaterialConsumption: {
        type: String,
        // required: true
    },
    // dung tich dau may
    engineOilCapacity: {
        type: String,
        // required: true
    },
    // kich thuoc: dai rong cao
    sizeLongLargeHeigh: {
        type: String,
        // required: true
    },
    // chieu cao yen xe
    saddleHeight: {
        type: String,
        // required: true
    },
    // chieu cao gam xe
    chassisHeight: {
        type: String,
        // required: true
    },
    // dung tich xi lanh
    cylinderCapacity: {
        type: String,
        // required: true
    },
    // he thong khoi dong
    bootSystem: {
        type: String,
        // required: true
    },

})

module.exports = mongoose.model('ProductDetail', ProductDetailSchema)



// const productItem = {
//     name, description, price, imageUrl, engineType, petrolTankCapacity,
//     maximumCapacity, rawMaterialConsumption, engineOilCapacity,
//     sizeLongLargeHeigh, saddleHeight, chassisHeight, cylinderCapacity, bootSystem, warrantyPeriod
// }