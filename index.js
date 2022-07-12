/****************************************************************************
 * author:  zhubo
 * github:  https://github.com/WatcherOne
 * created: 2022-07-11
*****************************************************************************/

const path = require('path')
const fs = require('fs')
const http = require('http')
// 其实就是 websocket 的封装
const { Server } = require('socket.io')
const { userList, addUser, delUser, findUser } = require('./users')

// 后续用 koa 来改进
const app = http.createServer((request, response) => {
    const url = request.url
    if (url === '/' || url === '/login') {
        response.writeHead(200, { 'Content-type': 'text/html' })
        const data = fs.readFileSync('./public/login.html')
        response.end(data)
    } else if (url === '/index') {
        response.writeHead(200, { 'Content-type': 'text/html' })
        const data = fs.readFileSync('./public/index.html')
        response.end(data)
    } else if (url.endsWith('.js')) {
        response.writeHead(200, { 'Content-type': 'text/js' })
        const data = fs.readFileSync(path.join('./public', url))
        response.end(data)
    } else if (url.endsWith('.css')) {
        response.writeHead(200, { 'Content-type': 'text/css' })
        const data = fs.readFileSync(path.join('./public', url))
        response.end(data)
    } else if (url.endsWith('.png') || url.endsWith('.jpg')) {
        const type = url.split('.')[1]
        response.writeHead(200, { 'Content-type': `image/${type}` })
        const data = fs.readFileSync(path.join('./public', url))
        response.end(data)
    } else {
        response.writeHead(200, { 'Content-type': 'text/plain' })
        response.end('hello world!')
    }
})

const io = new Server(app)

let userFlag = 0
let messageList = []

io.on('connection', socket => {
    // 当建立新连接时触发, socket为当前连接的实例
    const { id } = socket
    console.log('连接者:', id)

    // 当用户登录进来后
    socket.on('login', userInfo => {
        const newUser = Object.assign({}, userInfo, { id, userId: ++userFlag })
        addUser(newUser)
        console.log('有用户进入：', userList)
        // 给自己发, 返回当前用户绑定的相关信息
        socket.emit('loginSuccess', userList, newUser)
        // 给除自己之外的人发, 当有新用户上线后, 发送通知
        socket.broadcast.emit('join-user', userList, newUser)
    })
    socket.on('disconnect', () => {
        const user = delUser(id)
        // 当有用户离开时, 发送通知
        socket.broadcast.emit('leave-user', userList, user)
    })
    // 聊天连接
    socket.on('chat', msg => {
        const userObj = findUser(id) || {}
        const params = Object.assign({}, userObj, {
            time: new Date().getTime(),
            message: msg
        })
        messageList.push(params)
        io.emit('chat', params)
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
