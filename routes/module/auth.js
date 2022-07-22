import express from 'express'
import AuthController from '../../admin/controllers/authController.js'
import UserController from '../../admin/controllers/userController.js'

const router = express.Router()

router.use('/login', AuthController.login)
router.use('/register', UserController.addUser)

export default router
