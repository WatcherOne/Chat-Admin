/*************************************************************
 * Author: zhubo
 * Emails: <286154864@qq.com>
 * CreateTime: 2022-07-22 10:34:02
 * Description: 用户控制层
*************************************************************/
import UserService from '../service/userService.js'

class UserController {
    async getUserList(req, res) {
        const result = await UserService.getUserList(req)
        res.json(result)
    }

    async addUser(req, res) {
        const result = await UserService.addUser(req)
        res.json(result)
    }

    async updateUser(req, res) {
        const result = await UserService.updateUser(req)
        res.json(result)
    }

    async deleteUser(req, res) {
        const result = await UserService.deleteUser(req)
        res.json(result)
    }
}

export default new UserController()
