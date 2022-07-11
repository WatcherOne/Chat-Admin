/****************************************************************************
 * author:  zhubo
 * github:  https://github.com/WatcherOne
 * created: 2022-07-11
*****************************************************************************/

const fs = require('fs')
const http = require('http')
// 其实就是 websocket 的封装
const { Server } = require('socket.io')

const app = http.createServer((request, response) => {
    const url = request.url
    if (url === '/' || url === '/index') {
        response.writeHead(200, { 'Content-type': 'text/html' })
        const data = fs.readFileSync('./public/index.html')
        response.end(data)
    } else if (url === '/socket.min.js') {
        response.writeHead(200, { 'Content-type': 'text/js' })
        const data = fs.readFileSync('./public/socket.min.js')
        response.end(data)
    } else if (url.includes('.css')) {
        response.writeHead(200, { 'Content-type': 'text/css' })
        const data = fs.readFileSync('./public/index.css')
        response.end(data)
    } else {
        response.writeHead(200, { 'Content-type': 'text/plain' })
        response.end('hello world!')
    }
})

const io = new Server(app)

const userList = []

function addUser (obj) {
    const { id } = obj
    const isExist = userList.some(item => item.id === id)
    if (isExist) return
    userList.push(obj)
}

function delUser (id) {
    const index = userList.findIndex(item => item.id === id)
    const userArr = index > -1 ? userList.splice(index, 1) : []
    return userArr[0] || {}
}

function findUser (id) {
    return userList.find(item => item.id === id)
}

let messageList = []

io.on('connection', socket => {
    const { id } = socket
    console.log('连接者:', id)
    // 当建立新连接时触发, socket为当前连接的实例
    /**
     *   socket.emit('hello') --- 新连接时, 可以发送通知
     *   socket.broadcast.emit('hello')  --- 新连接时, 除自己之外的通知
     */

    // 当用户登录后
    socket.on('login', userName => {
        const user = { id, userName }
        addUser(user)
        socket.emit('loginSuccess', userList, user)
        // 当有新用户上线后, 发送通知
        socket.broadcast.emit('join-user', userList, user)
    })

    socket.on('disconnect', () => {
        const user = delUser(id)
        // 当有用户离开时, 发送通知
        socket.broadcast.emit('leave-user', userList, user)
    })

    // 聊天连接
    socket.on('chat', msg => {
        const { userName } = findUser(id) || {}
        const msgObj = {
            id,
            userName,
            time: new Date().getTime(),
            message: msg
        }
        messageList.push(msgObj)
        io.emit('chat', msgObj)
    })

    // 客户端：io.connect('http://localhost:3000?roomId=2') 房间号
    // roomId = url.parse(socket.request.url, true).query.roomId
    // roomId = socket.handshake.query.roomId
    // socket.rooms 所处的房间, 默认当前连接ID作为：房间号
    // socket.join(roomId) 加入房间号
    // socket.leave(roomId) 离开房间号
    // io.to(roomId).emit('') 给指定房间号所有人广播
    // io.broadcast.to(roomId).emit('') 给指定房间除了自己外的所有人广播
})

app.listen(5000, () => {
    console.log('listening on: localhost:5000')
})
