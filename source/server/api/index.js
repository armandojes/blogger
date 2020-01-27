import { Router } from 'express'
import user from './user'

const router = Router()

router.use('/user', user)

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
