const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

app.use(express.json())

// const route = require('./router/index')
const route = require('./app.router')
// route(app)

app.use('/', route)

// Error Handling Middleware called
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

// error handler middleware
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            status: error.status || 500,
            message: error.message || 'Internal Server Error',
        },
    });
});

module.exports = app