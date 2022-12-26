const Product = require('../../models/Product')

module.exports = {
    // [GET] /product-insurance
    getProductsInsurance: async (req, res) => {
        const productsNeedInsurance = new Product.find({ status: { $in: ["lỗi, cần triệu hồi", "lỗi, cần bảo hành"] } }).lean()

        return res.status(200).json({ message: "success", productsNeedInsurance })
    },

    // [PUT] update san pham khi da den noi bao hanh
    statusInsurance: async (req, res) => {
        const ids = req.body.productIds
        const productsInsurance = new Product.updateMany({ _id: { $in: ids } }, { status: "đang sửa chữa bảo hành", note: "?" })
    },

    //[PUT] /transfer/:id
    transferProductToAgent: async (req, res) => {
        const id = req.params.id
        await Product.updateOne({ _id: id }, { status: "đã bảo hành xong", note: "?" })
    },

    // [PUT] /transfer/manufacturing/:id
    transferProductToManufacturing: async (req, res) => {
        const id = req.params.id

        await Product.updateOne({ _id: id }, { status: "lỗi, cần trả về nhà máy", note: "?" })
    }
}
