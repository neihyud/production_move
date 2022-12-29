const mongoose = require('mongoose')
const Schema = mongoose.Schema

const { STATUS_PRODUCT_AGENT,
    STATUS_PRODUCT_ERROR_FACTORY,
    STATUS_PRODUCT_ERROR_MANUFACTURE,
    STATUS_PRODUCT_ERROR_RECALL,
    STATUS_PRODUCT_ERROR_WARRANTY,
    STATUS_PRODUCT_EXPIRE_WARRANTY,
    STATUS_PRODUCT_FIXING,
    STATUS_PRODUCT_NEW,
    STATUS_PRODUCT_RETURN_CUSTOMER,
    STATUS_PRODUCT_RETURN_MANUFACTURE,
    STATUS_PRODUCT_SOLD,
    STATUS_PRODUCT_WARRANTY_DONE } = require('../constants/index.js')

const ProductSchema = new Schema({
    productName: {
        type: String,
        require: true
    },
    productLine: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true,
        default: '10'
    },
    status: {
        type: String,
        enum: [
            STATUS_PRODUCT_NEW,
            STATUS_PRODUCT_AGENT,
            STATUS_PRODUCT_ERROR_FACTORY,
            STATUS_PRODUCT_ERROR_MANUFACTURE,
            STATUS_PRODUCT_ERROR_RECALL,
            STATUS_PRODUCT_ERROR_WARRANTY,
            STATUS_PRODUCT_EXPIRE_WARRANTY,
            STATUS_PRODUCT_FIXING,
            STATUS_PRODUCT_RETURN_CUSTOMER,
            STATUS_PRODUCT_RETURN_MANUFACTURE,
            STATUS_PRODUCT_SOLD,
            STATUS_PRODUCT_WARRANTY_DONE
        ],
        default: STATUS_PRODUCT_NEW
    },
    note: {
        type: Object,
        default: {}
    },
    imageUri: {
        type: String,
        default: 'https://cdn.honda.com.vn/motorbikes/December2022/kIs5EUI938YVxyeVrpeA.png'
    },
    warrantyPeriod: {
        type: String,
        default: "1"
    },
    numberWarranty: {
        type: Number,
        default: 0
    },
    quantity: {
        type: Number,
        default: 1
    },
    batchCode: {
        type: String,
    }
}, { timestamps: true })

module.exports = mongoose.model('Product', ProductSchema)

// - Mới sản xuất: Sản xuất tại cơ sở nào thì nằm tại kho của cơ sở đó.
// - Đưa về đại lý: Đại lý nào.
// - Đã bán: Khách hàng nào(Thông tin của khách hàng).
// - Lỗi, cần bảo hành: Bảo hành lần thứ mấy, đại lý đã nhận lại từ khách hàng.
// - Đang sửa chữa bảo hành: Ở trung tâm bảo hành nào.
// - Đã bảo hành xong: Quay lại đại lý.
// - Đã trả lại bảo hành cho khách hàng: Quay lại khách hàng
// - Lỗi, cần trả về nhà máy: Đang ở trung tâm bảo hành nào.
// - Lỗi, đã đưa về cơ sở sản xuất: Cơ sở sản xuất nào.
// - Lỗi cần triệu hồi: Đang ở khách hàng(sản phẩm triệu hồi được đưa đi bảo hành như sản phẩm khách hàng chủ động yêu cầu bảo hành).
// - Hết thời gian bảo hành.
// - Trả lại cơ sở sản xuất(do lâu không bán được)