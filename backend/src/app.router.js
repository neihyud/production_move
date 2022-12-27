const express = require('express')
const router = express.Router()
const verifyToken = require('./middleware/auth')
const isRole = require('./middleware/role')

const authController = require('./controller/auth')
router.post('/auth/login', authController.login)
router.post('/auth/register', authController.register)
router.get('/auth', verifyToken, authController.checkUser)

// Admin
const productLineController = require('./controller/admin/productLine')
router.get('/admin/productLine', verifyToken, productLineController.getProductLines)
router.post('/admin/productLine', verifyToken, isRole('admin'), productLineController.createProductLine)
router.put('/admin/productLine/:id', verifyToken, isRole('admin'), productLineController.updateProductLine)
router.delete('/admin/productLine/:id', verifyToken, isRole('admin'), productLineController.deleteProductLine)

const accountController = require('./controller/admin/account')
router.get('/admin/account', verifyToken, isRole('admin'), accountController.getAccounts)
router.post('/admin/account', verifyToken, isRole('admin'), accountController.createAccount)
router.put('/admin/account/:id', verifyToken, isRole('admin'), accountController.updateAccount)
router.delete('/admin/account/:id', verifyToken, isRole('admin'), accountController.deleteAccount)

// Manufacture
const manufactureController = require('./controller/manufacture/index')
router.get('/manufacture/:code/product', manufactureController.getProducts)
router.get('/manufacture/:code/product/:id', manufactureController.getProduct)
router.post('/manufacture/:code/product', manufactureController.createProduct)
router.put('/manufacture/:code/product/:id', manufactureController.updateProduct)
router.delete('/manufacture/:code/product/:id', manufactureController.deleteProduct)
router.post('/manufacture/:code/product/export', manufactureController.exportProductForAgent)



module.exports = router