/*************************************************************
 * Author: zhubo
 * Emails: <286154864@qq.com>
 * CreateTime: 2022-07-22 16:44:14
 * Description: token加密与解码
*************************************************************/
import jwt from 'jsonwebtoken'
import { promisify } from 'util'

// 将 sign() 回调函数转换成支持 promise 的 sign() 形式
export const sign = promisify(jwt.sign)
export const verify = promisify(jwt.verify)
