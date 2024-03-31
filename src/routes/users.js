import express from 'express'
import UserController from '../controller/users.js'
const router = express.Router()

router.get('/',UserController.getAll)
router.get('/:id',UserController.getById)
router.post('/create',UserController.create)
router.put('/edit/:id',UserController.editById)
router.delete('/delete/:id',UserController.deleteById)

export default router