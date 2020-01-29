import express from 'express'
import renderHandler from './render_handler'
import routerApi from './api/router'
import cookieParser from 'cookie-parser'

const server = express()

server.use('/public', express.static('public'))
server.use(cookieParser())
server.use('/api', routerApi)
server.get('*', renderHandler)

server.listen(3000, () => console.log('server stared now on port 3000'))
