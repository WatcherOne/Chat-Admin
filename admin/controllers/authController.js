/*************************************************************
 * Author: zhubo
 * Emails: <286154864@qq.com>
 * CreateTime: 2022-07-22 16:27:19
 * Description: 通用控制层
*************************************************************/
import AjaxResult from '../model/ajaxResult.js'
import AuthService from '../service/authService.js'

class AuthController {
    async login(req, res) {
        const { body } = req
        const { userName, password } = body
        if (!userName) {
            return res.json(AjaxResult.error('用户名不可为空'))
        }
        if (!password) {
            return res.json(AjaxResult.error('密码不可为空'))
        }
        const result = await AuthService.login(body)
        return res.json(result)
    }

    async register(req, res) {
        console.log('login')
        res.send('register')
    }
}

export default new AuthController()
