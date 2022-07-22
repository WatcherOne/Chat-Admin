/*************************************************************
 * Author: zhubo
 * Emails: <286154864@qq.com>
 * CreateTime: 2022-07-22 10:34:02
 * Description: 用户控制层
*************************************************************/
import AjaxResult from '../model/ajaxResult.js'
import UserModel from '../model/userModel.js'
import UserService from '../service/userService.js'

class UserController {
    async getUserList(req, res) {
        const { query } = req
        const result = await UserService.getUserList(query)
        return res.json(result)
    }

    async addUser(req, res) {
        const { body } = req
        const userModel = new UserModel(body)
        const { userName, password } = userModel
        if (!userName) {
            return res.json(AjaxResult.error('用户名不可为空'))
        }
        if (!password) {
            return res.json(AjaxResult.error('密码不可为空'))
        }
        const result = await UserService.addUser(userModel)
        return res.json(result)
    }

    async updateUser(req, res) {
        const { body } = req
        const userModel = new UserModel(body)
        const { userId } = userModel
        if (!userId) {
            return res.json(AjaxResult.error('用户ID不可为空'))
        }
        const result = await UserService.updateUser(userModel)
        return res.json(result)
    }

    async deleteUser(req, res) {
        const { params } = req
        if (params.id) {
            const result = await UserService.deleteUser(params.id)
            res.json(result)
        } else {
            res.json(AjaxResult.error('参数不可为空'))
        }
    }
}

export default new UserController()
