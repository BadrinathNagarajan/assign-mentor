import express from 'express'
import UserRoutes from './users.js'
import BooksRoutes from './books.js'
const router = express.Router()

router.use('/user',UserRoutes)
router.use('/books',BooksRoutes)

export default router