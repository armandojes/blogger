import express from 'express'
import renderHandler from './render_handler'

const server = express()

server.use('/public', express.static('public'))
server.get('*', renderHandler)

server.listen(3000, () => console.log('server stared now....'))
