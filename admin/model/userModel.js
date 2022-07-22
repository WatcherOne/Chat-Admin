/*************************************************************
 * Author: zhubo
 * Emails: <286154864@qq.com>
 * CreateTime: 2022-07-22 10:52:00
 * Description: 参数的模拟 与 准确搜索 与 排序
*************************************************************/
import connection from '../../utils/mysql.js'

const query = (sql, values) => {
    const conn = connection()
    return new Promise((resolve) => {
        conn.query(sql, values, (error, results) => {
            resolve(error || results)
        })
    })
}

const insert = (body = {}) => {
    const sql = `insert into user set ?`
    return query(sql, Object.assign({ userId: 0 }, body))
}

const update = (body = {}) => {
    const { userId, ...otherObj } = body
    const sql = `update user set ? where userId = ${userId}`
    return query(sql, otherObj)
}

const deleteOne = (userIds) => {
    const sql = `delete from user where userId in (${userIds})`
    return query(sql)
}

const getList = (params = {}) => {
    const { keys, values } = handleParams(params)
    const sqlStart = `select * from user${values.length ? ' where ' : ''}`
    const sqlEnd = keys.length ? keys.join(' and ') : ''
    return query(`${sqlStart}${sqlEnd}`, values)
}

const findUserByName = (name) => {
    const sql = `select * from user where userName='${name}'`
    return query(sql)
}

const handleParams = (params) => {
    const keys = []
    const values = []
    for (let [key, value] of Object.entries(params)) {
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

export default {
    getList,
    insert,
    update,
    deleteOne,
    findUserByName
}
