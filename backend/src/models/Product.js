const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    productName: {
        type: String,
        require: true
    },
    productLine: {
        type: mongoose.Types.ObjectId,
        ref: 'ProductLine',
        required: true
    },
    status: {
        type: String,
        enum: [
            'mới sản xuât', 'đại lý',
            'đã bán', 'lỗi, cần bảo hành',
            'đang sửa chữa bảo hành',
            'đã bảo hành xong',
            'đã trả lại bảo hành cho khách hàng',
            'lỗi, cần trả về nhà máy',
            'lỗi, cần đưa về cơ sở sản xuất',
            'lỗi, cần triệu hồi',
            'hết thời gian bảo hành',
            'trả lại cơ sở sản xuất'
        ],
        default: 'mới sản xuất'
    },
    note: {
        type: String
    },
    imageUri: {
        type: String
    },
    warrantyPeriod: {
        type: String,
        default: "1"
    },
    numberWarranty: {
        type: Number,
        default: 0
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