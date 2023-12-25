const express = require('express')
const server = express()
const dogs_routes = require('./dogs/dogs_routes')

server.use(express.json())
server.use('/api', dogs_routes)

server.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message
    })
})

module.exports = server

