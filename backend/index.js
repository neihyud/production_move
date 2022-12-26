const dotenv = require('dotenv')
dotenv.config()

const app = require('./src/app')

const port = process.env.PORT || 8081

const mongodb = require('./src/connections/mongodb')
mongodb.connect()

const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})


process.on('SIGINT', () => {
    server.close(() => console.log(`exits server express`))
})
