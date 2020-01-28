import { json, Router } from 'express'
import userRouter from './components/users/router'

const router = Router()
router.use(json())
router.use('/user', userRouter)

router.get('/', (request, response) => {
  response.send('hello index API')
  response.end()
})

// Error handler router level
router.use((_, response) => {
  response.status(404)
  response.send('NOT FOUND')
})

export default router
