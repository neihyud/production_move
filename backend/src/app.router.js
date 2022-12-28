const express = require('express')
const router = express.Router()
const verifyToken = require('./middleware/auth')
const isRole = require('./middleware/role')

const { ROLE_ADMIN, ROLE_AGENT, ROLE_MANUFACTURE, ROLE_WARRANTY_CENTER } = require('./constants/role')

const authController = require('./controller/auth')
router.post('/auth/login', authController.login)
router.post('/auth/register', authController.register)
router.get('/auth', verifyToken, authController.checkUser)


// Admin
const productLineController = require('./controller/admin/productLine')
router.get('/admin/productLine', verifyToken, productLineController.getProductLines)
router.post('/admin/productLine', verifyToken, isRole(ROLE_ADMIN), productLineController.createProductLine)
router.put('/admin/productLine/:id', verifyToken, isRole(ROLE_ADMIN), productLineController.updateProductLine)
router.delete('/admin/productLine/:id', verifyToken, isRole(ROLE_ADMIN), productLineController.deleteProductLine)

const accountController = require('./controller/admin/account')
router.get('/admin/account', verifyToken, isRole(ROLE_ADMIN), accountController.getAccounts)
router.post('/admin/account', verifyToken, isRole(ROLE_ADMIN), accountController.createAccount)
router.put('/admin/account/:id', verifyToken, isRole(ROLE_ADMIN), accountController.updateAccount)
router.delete('/admin/account/:id', verifyToken, isRole(ROLE_ADMIN), accountController.deleteAccount)

// Manufacture
const manufactureController = require('./controller/manufacture/index')
router.get('/manufacture/:code/product', verifyToken, isRole(ROLE_MANUFACTURE), manufactureController.getProducts)
router.get('/manufacture/:code/product/:id', verifyToken, isRole(ROLE_MANUFACTURE), manufactureController.getProduct)
router.post('/manufacture/:code/product', verifyToken, isRole(ROLE_MANUFACTURE), manufactureController.createProduct)
router.put('/manufacture/:code/product/:id', verifyToken, isRole(ROLE_MANUFACTURE), manufactureController.updateProduct)
router.delete('/manufacture/:code/product/:id', verifyToken, isRole(ROLE_MANUFACTURE), manufactureController.deleteProduct)
router.post('/manufacture/:code/product/export', verifyToken, isRole(ROLE_MANUFACTURE), manufactureController.exportProductForAgent)
router.get('/manufacture/:code/product-error', verifyToken, isRole(ROLE_MANUFACTURE), manufactureController.getErrorProducts)

// Agent
const agentController = require('./controller/agents/index')
router.get('/agent/:code/product', agentController.getProducts)
router.get('/agent/:code/product/warranty', agentController.getProductsWarranty)
router.get('/agent/:code/product/warranty-done', agentController.getProductsWarrantyDone)
router.post('/agent/:code/product/warranty/export', agentController.exportProductToWarranty)

// Common
const commonController = require('./controller/common')
router.get('/common/productLine', commonController.getProductLines)
router.get('/common/agent', commonController.getAgents)
router.get('/common/warranty', commonController.getWarranties)

module.exports = router