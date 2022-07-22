/*************************************************************
 * Author: zhubo
 * Emails: <286154864@qq.com>
 * CreateTime: 2022-07-22 10:32:28
 * Description: 用户数据层
*************************************************************/
import UserModel from '../model/userModel.js'

class UserDao {
    async getUserList(query) {
        return UserModel.getList(query)
    }

    async addUser(body) {
        return UserModel.insert(body)
    }

    async findUserByName(name) {
        return UserModel.findUserByName(name)
    }

    async updateUser(body) {
        return UserModel.update(body)
    }

    async deleteUser(userId) {
        return UserModel.deleteOne(userId)
    }
}

export default new UserDao()
