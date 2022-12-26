const dotenv = require('dotenv');
dotenv.config()

const configs = {
    mongodbUri: process.env.MONGODB_URI || "mongodb://localhost:27017/web",
    dbPassword: process.env.DB_PASSWORD || '2458696357',
    dbUsername: process.env.DB_USERNAME || 'root',
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || 'secret'
}

module.exports = configs