/*************************************************************
 * Author: zhubo
 * Emails: <286154864@qq.com>
 * CreateTime: 2022-07-22 10:32:28
 * Description: 用户数据层
*************************************************************/
import { SQL } from './connect.js'

class UserDao {
    async getUserList(query) {
        const { keys, values } = handleQuery(query)
        const sqlStart = `select * from user${values.length ? ' where ' : ''}`
        const sqlEnd = keys.length ? keys.join(' and ') : ''
        return SQL(`${sqlStart}${sqlEnd}`, values)
    }

    async addUser(userModel) {
        const sql = `insert into user set ?`
        return SQL(sql, Object.assign(userModel, { userId: 0 }))
    }

    async updateUser(userModel) {
        const { userId, ...otherObj } = userModel
        const sql = `update user set ? where userId = ${userId}`
        return SQL(sql, handleData(otherObj))
    }

    async deleteUser(userIds) {
        return SQL(`delete from user where userId in (${userIds})`)
    }

    async findUserByName(userId, userName) {
        const filter = userId ? `and userId!=${userId}` : '' 
        const sql = `select * from user where userName='${userName}' ${filter}`
        return SQL(sql)
    }

    async findUserById(userId) {
        return SQL(`select * from user where userId=${userId}`)
    }
}

const handleQuery = (query) => {
    const keys = []
    const values = []
    for (let [key, value] of Object.entries(query)) {
        if (value) {
            if (key === 'userName' || key === 'nickName') {
                keys.push(`${key} like ?`)
                values.push(`%${value}%`)
            } else {
                keys.push(`${key}=?`)
                values.push(value)
            }
        }
    }
    return { keys, values }
}

const handleData = (data) => {
    const result = {}
    Object.keys(data).forEach(key => {
        const value = data[key]
        if (value !== null && value !== undefined) {
            result[key] = value
        }
    })
    return result
}

export default new UserDao()
