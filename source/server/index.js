import express from 'express'
import renderHandler from './render_handler'
import api from './api'

const server = express()

server.use('/public', express.static('public'))
server.use('/api', api)
server.get('*', renderHandler)

server.listen(3000, () => console.log('server stared now on port 3000'))
