const mongoose = require('mongoose')
const Schema = mongoose.Schema

const { ROLE_ADMIN, ROLE_AGENT, ROLE_MANUFACTURE, ROLE_WARRANTY_CENTER } = require('../constants/role')

const AccountSchema = new Schema({
    role: {
        type: String,
        enum: [ROLE_ADMIN, ROLE_WARRANTY_CENTER, ROLE_MANUFACTURE, ROLE_AGENT],
        default: ROLE_AGENT
    },
    username: {
        type: String, required: true
    },
    password: {
        type: String, required: true
    },
    imgUri: {
        type: String
    },
    status: {
        type: String,
        enum: ['first', 'active', 'inactive'],
        default: 'first'
    }
})

module.exports = mongoose.model('Account', AccountSchema) 