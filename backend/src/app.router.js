const express = require('express')
const router = express.Router()
const verifyToken = require('./middleware/auth')
const isRole = require('./middleware/role')

const productLineController = require('./controller/admin/productline')
router.get('/admin/productline', verifyToken, isRole('admin'), productLineController.getProductLines)
router.post('/admin/productline/create', verifyToken, isRole('admin'), productLineController.createProductLine)
router.put('/admin/productline/:id', verifyToken, isRole('admin'), productLineController.updateProductLine)
router.delete('/admin/productline/:id', verifyToken, isRole('admin'), productLineController.deleteProductLine)

const accountController = require('./controller/admin/account')
router.get('/admin/account', verifyToken, isRole('admin'), accountController.getAccounts)
router.post('/admin/account/create', verifyToken, isRole('admin'), accountController.createAccount)
router.put('/admin/account/:id', verifyToken, isRole('admin'), accountController.updateAccount)
router.delete('/admin/account/:id', verifyToken, isRole('admin'), accountController.deleteAccount)

const authController = require('./controller/auth')
router.post('/auth/login', authController.login)
router.post('/auth/register', authController.register)
router.get('/auth', verifyToken, authController.checkUser)

module.exports = router