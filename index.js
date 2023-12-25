const server = require('./api/server')

const PORT = process.env.NODE_PORT || 9000 // eslint-disable-line

server.listen(PORT, () => {
    console.log('Server is listening on ' + PORT + '!')
})