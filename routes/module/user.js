import express from 'express'
import UserController from '../../admin/controllers/userController.js'

const router = express.Router()

router.get('/getUserList', UserController.getUserList)
router.put('/updateUser', UserController.updateUser)
router.delete('/deleteUser/:id', UserController.deleteUser)

export default router
