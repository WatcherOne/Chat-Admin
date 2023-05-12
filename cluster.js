/**
 * 用户集群类
 */

class Cluster {
    constructor() {
        this.uniqueKey = 0
        this.userList = []
    }

    findUserById (id) {
        return this.userList.find(item => item.id === id)
    }

    findUser (userId) {
        return this.userList.find(item => item.userId === userId)
    }

    addUser (user) {
        const hasUser = this.userList.find(item => item.userId === user.userId)
        if (hasUser) return hasUser
        const newUser = Object.assign({}, user, { userId: ++this.uniqueKey })
        this.userList.push(newUser)
        return newUser
    }
    
    delUser (userId) {
        const index = this.userList.findIndex(item => item.userId === userId)
        const userArr = index > -1 ? this.userList.splice(index, 1) : []
        return userArr[0] || {}
    }
}

export default Cluster
