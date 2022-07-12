const userList = []

function addUser (user) {
    const { id } = user
    const isExist = userList.some(item => item.id === id)
    if (isExist) return
    userList.push(user)
}

function delUser (id) {
    const index = userList.findIndex(item => item.id === id)
    const userArr = index > -1 ? userList.splice(index, 1) : []
    return userArr[0] || {}
}

function findUser (id) {
    return userList.find(item => item.id === id)
}

module.exports = {
    userList,
    addUser,
    delUser,
    findUser
}