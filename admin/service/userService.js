/*************************************************************
 * Author: zhubo
 * Emails: <286154864@qq.com>
 * CreateTime: 2022-07-22 10:30:36
 * Description: 用户业务模块
*************************************************************/
import AjaxResult from '../model/ajaxResult.js'
import UserDao from '../dao/userDao.js'

class UserService {
    async getUserList(query) {
        const result = await UserDao.getUserList(query)
        if (result.sqlMessage) {
            return AjaxResult.error(result.sqlMessage)
        }
        return AjaxResult.success(result)
    }

    async addUser(userModel) {
        const hasUser = await checkIsExist(userModel)
        if (hasUser) {
            return AjaxResult.error('用户账号重名')
        }
        userModel.gender = userModel.formatGender()
        const result = await UserDao.addUser(userModel)
        if (result.sqlMessage) {
            return AjaxResult.error(result.sqlMessage)
        }
        return AjaxResult.success(result.insertId, '注册成功')
    }

    async updateUser(userModel) {
        const hasUser = await checkIsExist(userModel)
        if (hasUser) {
            return AjaxResult.error('用户账号重名')
        }
        const { gender } = userModel
        if (gender) {
            userModel.gender = userModel.formatGender()
        }
        const { sqlMessage } = await UserDao.updateUser(userModel)
        if (sqlMessage) {
            return AjaxResult.error(sqlMessage)
        }
        return AjaxResult.success(null, '更新用户成功')
    }

    async deleteUser(userId) {
        await UserDao.deleteUser(userId)
        return AjaxResult.success(null, '删除成功')
    }
}

async function checkIsExist(userModel) {
    const { userId, userName } = userModel
    const list = await UserDao.findUserByName(userId, userName)
    return list.length
}

export default new UserService()
