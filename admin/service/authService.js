/*************************************************************
 * Author: zhubo
 * Emails: <286154864@qq.com>
 * CreateTime: 2022-07-22 16:29:52
 * Description: 通用业务模块
*************************************************************/
import { sign } from '../../utils/jwt.js'
import { jwtSecretKey, expiresIn } from '../../config.js'
import AjaxResult from '../model/ajaxResult.js'
import UserDao from '../dao/userDao.js'

class AuthService {
    async login(data) {
        const { userName, password } = data
        const list = await UserDao.findUserByName(null, userName)
        if (!list.length) {
            return AjaxResult.error('用户账户不存在')
        }
        const userInfo = list[0]
        if (userInfo.password !== password) {
            return AjaxResult.error('用户密码不正确')
        }
        const user = Object.assign({}, userInfo, { password: '' })
        const tokenStr = await sign(user, jwtSecretKey, { expiresIn })
        return AjaxResult.success(`Bearer ${tokenStr}`, '登录成功')
    }
}

export default new AuthService()
