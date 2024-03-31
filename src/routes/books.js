import express from 'express'
import BooksController from '../controller/books.js'

const router = express.Router()

router.get('/',BooksController.getAll)
router.post('/create',BooksController.create)
router.post('/assign',BooksController.assignstudent)
router.post('/newassign',BooksController.changementor)
router.get('/:id',BooksController.studentsformentor)
router.get('/previous/:id',BooksController.previousmentor)

export default router