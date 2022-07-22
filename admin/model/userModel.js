/*************************************************************
 * Author: zhubo
 * Emails: <286154864@qq.com>
 * CreateTime: 2022-07-22 14:38:15
 * Description: 用户实体类
*************************************************************/

class User {
    
    // 用户ID（唯一标识）
    userId = null

    // 用户账号
    userName = null

    // 用户密码
    password = null

    // 用户昵称
    nickName = null

    // 用户头像
    avatar = null

    // 用户性别
    // 0: 女  1: 男
    gender = 0

    constructor(options) {
        const {
            userId = 0,
            userName = null,
            password = null,
            nickName = null,
            avatar = null,
            gender = null
        } = options
        this.userId = userId || 0
        this.userName = userName
        this.password = password
        this.nickName = nickName
        this.avatar = avatar
        this.gender = gender
    }

    formatGender(gender = this.gender) {
        const genderInt = isNaN(+gender) ? 0 : +gender
        return genderInt % 2
    }
}

export default User
