const hondaMotors = require('./honda.json')
const yamahaMotors = require('./yamaha.json')
const suzukiMotors = require('./suzuki.json')
const symMotors = require('./sym.json')

const Product = require('../src/models/Product')
const ProductDetail = require('../src/models/ProductDetail')
const BlueBird = require('bluebird')
const mongoose = require('mongoose');

const motorsBike = [hondaMotors, yamahaMotors, suzukiMotors, symMotors]

async function run() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/web');
        console.log("MongoDb connect success!")
        const tpLine = ['XM_Honda', 'XM_Yamaha', 'XM_Suzuki', 'XM_Sym']
        motorsBike.map(async (motors, index) => {
            await addProducts(motors, tpLine[index])
            console.log("Success")
            return
        })

    } catch (error) {
        console.log('MongoDb connect fail: ', error)
    }
}

run()


const addProducts = async (motors, ptLine) => {

    try {
        await BlueBird.map(motors, async (motor) => {
            const {
                productLine = ptLine,
                price = '',
                description = '',
                engineType = '',
                petrolTankCapacity = '',
                maximumCapacity = '',
                rawMaterialConsumption = '',
                engineOilCapacity = '',
                sizeLongLargeHeigh = '',
                saddleHeight = '',
                chassisHeight = '',
                cylinderCapacity = '',
                bootSystem = '', name: productName = '', quantity = Math.floor(Math.random() * 20) + 1
            } = motor;

            const _price = price.split(' ')[0]
            let _newProduct = new Product({
                _id: new mongoose.Types.ObjectId(),
                productName,
                note: { new: 'fac' }, productLine, price: _price,
                quantity
            })

            await _newProduct.save()

            const _newProductDetail = new ProductDetail({
                productId: _newProduct._id,
                description,
                engineType,
                petrolTankCapacity,
                maximumCapacity,
                rawMaterialConsumption,
                engineOilCapacity,
                sizeLongLargeHeigh,
                saddleHeight,
                chassisHeight,
                cylinderCapacity,
                bootSystem,
            })

            await _newProductDetail.save()
        }, { concurrency: 2 })
    } catch (error) {
        console.log("error: ", error)
    }
}