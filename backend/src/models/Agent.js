const mongoose = require('mongoose')
const { Schema } = mongoose

const DistributionAgentSchema = new Schema({
    agentName: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('DistributionAgent', DistributionAgentSchema)