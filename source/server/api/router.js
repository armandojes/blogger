import { json, Router } from 'express'
import usersRouter from './components/users/router'
import postsRouter from './components/posts/router'
import response from './middlewares/response'

const router = Router()
router.use(json())
router.use(response)

router.use('/users', usersRouter)
router.use('/posts', postsRouter)

router.get('/', (request, response) => {
  response.send('hello index API')
  response.end()
})

// Error handler router level
router.use((_, response) => {
  response.error({
    statusCode: 404,
    status: 'Not found',
    errorMessage: 'Not found'
  })
})

export default router
