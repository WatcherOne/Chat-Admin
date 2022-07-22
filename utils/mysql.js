/*************************************************************
 * Author: zhubo
 * Emails: <286154864@qq.com>
 * CreateTime: 2022-07-22 10:49:51
 * Description: mysql
*************************************************************/
import mysql from 'mysql'
import { DATABASE } from '../config.js'

const mysqlConfig = {
    host: DATABASE.host,
    user: DATABASE.user,
    password: DATABASE.password,
    database: DATABASE.database
}

let CONN = null

export default function connection() {
    if (CONN) return CONN
    // todo: createPool() 创建连接池
    CONN = mysql.createConnection(mysqlConfig)
    CONN.connect()
    return CONN
}
