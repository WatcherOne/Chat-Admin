import { verify } from '../utils/jwt.js'
import { jwtSecretKey } from '../config.js'
import AjaxResult from '../admin/model/ajaxResult.js'
import UserDao from '../admin/dao/userDao.js'

// 验证是否登录
export const checkIsLogin = async (req, res, next) => {
    let token = req.headers['authorization']
    token = token ? token.split('Bearer ')[1] : null
    if (!token) {
        return res.json(AjaxResult.error('用户未登录'))
    }
    try {
        const decodedToken = await verify(token, jwtSecretKey)
        const user = await UserDao.findUserById(decodedToken.userId)
        req.user = user
        next()
    } catch {
        console.log(777)
    }
}
