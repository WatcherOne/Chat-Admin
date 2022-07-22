import express from 'express'
import AuthController from '../../admin/controllers/authController.js'

const router = express.Router()

router.use('/register', AuthController.register)
router.use('/login', AuthController.login)

export default router
