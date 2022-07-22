import express from 'express'
import { checkIsLogin } from '../middlewares/checkIsLogin.js'
import authRouter from './module/auth.js'
import userRouter from './module/user.js'

const router = express.Router()

router.use('/auth', authRouter)

router.use(checkIsLogin)
router.use('/user', userRouter)

export default router
