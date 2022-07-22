/*************************************************************
 * Author: zhubo
 * Emails: <286154864@qq.com>
 * CreateTime: 2022-07-22 10:30:36
 * Description: 用户业务模块
*************************************************************/
import UserDao from '../dao/userDao.js'
import AjaxResult from '../model/ajaxResult.js'

class UserService {
    async getUserList(req) {
        const result = await UserDao.getUserList(req.query)
        if (result.sqlMessage) {
            return new AjaxResult().set500(result.sqlMessage)
        }
        return new AjaxResult(result)
    }

    async addUser(req) {
        const { body } = req
        const { error, params } = checkParams(body)
        if (error) {
            return new AjaxResult().set500(error)
        }
        const hasUser = await checkIsExist(params)
        if (hasUser) {
            return new AjaxResult().set500('用户账号重名')
        }
        const result = await UserDao.addUser(params)
        if (result.sqlMessage) {
            return new AjaxResult().set500(result.sqlMessage)
        }
        return new AjaxResult(result.insertId)
    }

    async updateUser(req) {
        const { body } = req
        if (!body.userId) {
            return new AjaxResult().set500('参数错误')
        }
        const { sqlMessage } = await UserDao.updateUser(body)
        if (sqlMessage) {
            return new AjaxResult().set500(sqlMessage)
        }
        return new AjaxResult().setMsg('更新用户成功')
    }

    async deleteUser(req) {
        const { params } = req
        const { id = 0 } = params
        if (!id) {
            return new AjaxResult().set500('userId未传入')
        }
        await UserDao.deleteUser(id)
        return new AjaxResult().setMsg('删除成功')
    }
}

function checkParams(params) {
    const result = { error: '', params: null }
    let { userName, password, gender } = params
    if (!userName) {
        result.error = '用户名不可为空'
    } else if (!password) {
        result.error = '密码不可为空'
    }
    gender = isNaN(+gender) ? 0 : ((+gender) % 2)
    result.params = Object.assign({}, params, { gender })
    return result
}

async function checkIsExist(params) {
    const { userName } = params
    const list = await UserDao.findUserByName(userName)
    return list.length
}

export default new UserService()
