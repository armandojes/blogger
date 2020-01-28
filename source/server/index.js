import express from 'express'
import renderHandler from './render_handler'
import routerApi from './api/router'

const server = express()

server.use('/public', express.static('public'))
server.use('/api', routerApi)
server.get('*', renderHandler)

server.listen(3000, () => console.log('server stared now on port 3000'))
