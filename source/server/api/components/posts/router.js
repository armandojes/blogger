import { Router } from 'express'
import getPost from './controllers/get_post'

const router = Router()

router.get('/single/:url', getPost)

export default router
