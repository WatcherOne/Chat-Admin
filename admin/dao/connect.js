/*************************************************************
 * Author: zhubo
 * Emails: <286154864@qq.com>
 * CreateTime: 2022-07-22 15:14:16
 * Description: 底层数据连接
*************************************************************/
import connection from '../../utils/mysql.js'

export const SQL = (sql, values) => {
    const conn = connection()
    return new Promise((resolve) => {
        conn.query(sql, values, (error, results) => {
            resolve(error || results)
        })
    })
}
