// 'mới sản xuất'
const STATUS_PRODUCT_NEW = 'new'

// 'đưa về đại lý'
const STATUS_PRODUCT_AGENT = 'agent'

// 'đã bán'
const STATUS_PRODUCT_SOLD = 'sold'

// 'lỗi cần bảo hành'
const STATUS_PRODUCT_ERROR_WARRANTY = 'error, warranty'

// 'đang sửa chữa'
const STATUS_PRODUCT_FIXING = 'fixing'

// 'bảo hành xong'
const STATUS_PRODUCT_WARRANTY_DONE = 'warranty_done'

// 'trả lại cho khách hàng'
const STATUS_PRODUCT_RETURN_CUSTOMER = 'return_customer'

// 'lỗi, đã đưa về cơ sở sản xuất'
const STATUS_PRODUCT_ERROR_MANUFACTURE = 'error, manufacture'

// 'lỗi cần trả về nhà máy
const STATUS_PRODUCT_ERROR_FACTORY = 'error, factory'

// 'lỗi, cần triệu hồi'
const STATUS_PRODUCT_ERROR_RECALL = 'error, recall'

// 'hết hạn bảo hành'
const STATUS_PRODUCT_EXPIRE_WARRANTY = 'expire_warranty'

// 'trả về cơ sở sản xuất, do lâu không bán được'
const STATUS_PRODUCT_RETURN_MANUFACTURE = 'return_manufacture'


module.exports = {
    STATUS_PRODUCT_NEW,
    STATUS_PRODUCT_AGENT,
    STATUS_PRODUCT_SOLD,
    STATUS_PRODUCT_ERROR_WARRANTY,
    STATUS_PRODUCT_FIXING,
    STATUS_PRODUCT_WARRANTY_DONE,
    STATUS_PRODUCT_RETURN_CUSTOMER,
    STATUS_PRODUCT_ERROR_MANUFACTURE,
    STATUS_PRODUCT_ERROR_FACTORY,
    STATUS_PRODUCT_ERROR_RECALL,
    STATUS_PRODUCT_EXPIRE_WARRANTY,
    STATUS_PRODUCT_RETURN_MANUFACTURE
}