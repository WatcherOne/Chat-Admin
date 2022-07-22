/*****************************************************************************
 * Author: zhubo
 * Emails: <286154864@qq.com>
 * CreateTime: 2022-07-22 09:29:51
 * Description: server
*****************************************************************************/
import path from 'path'
import express from 'express'
import logger from 'morgan'
import router from './routes/index.js'
const __dirname = path.resolve()

const app =  express()
const port = process.argv[2] || process.env.PORT || 8090

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logger('short'))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/api', router)
app.use((request, response, next) => {
    console.log(request.url)
    response.send('Not Found')
    next()
})

app.listen(port, () => {
    console.log(`listening on: http://localhost:${port}`)
})

// 其实就是 websocket 的封装
// const { Server } = require('socket.io')
// const { Cluster } = require('./cluster')

// const io = new Server(app)

// const cluster = new Cluster()
// let messageList = []

// io.on('connection', socket => {
//     // 当建立新连接时触发, socket为当前连接的实例
//     const { id } = socket
//     console.log('连接者:', id)
//     // socket.handshake.remoteAddress - 拿不到客户端IP

//     // 当用户登录进来后
//     socket.on('login', userInfo => {
//         const newUser = cluster.addUser(Object.assign({}, userInfo, { id }))
//         // 给自己发, 返回当前用户绑定的相关信息
//         socket.emit('loginSuccess', cluster.userList, newUser, messageList)
//         // 给除自己之外的人发, 当有新用户上线后, 发送通知
//         socket.broadcast.emit('join-user', cluster.userList, Object.assign({}, newUser, {
//             type: 1,
//             time: new Date().getTime()
//         }))
//     })
//     socket.on('disconnect', () => {
//         const user = cluster.findUserById(id)
//         // 只有登录过的用户才能删除用户
//         if (user) {
//             cluster.delUser(user.userId)
//             // 当有用户离开时, 发送通知
//             socket.broadcast.emit('leave-user', cluster.userList, Object.assign({}, user, {
//                 type: 2,
//                 time: new Date().getTime()
//             }))
//         }
//     })
//     // 聊天连接
//     socket.on('chat', msg => {
//         const user = cluster.findUserById(id) || {}
//         const params = Object.assign({}, user, {
//             type: 0,
//             time: new Date().getTime(),
//             message: msg
//         })
//         messageList.push(params)
//         io.emit('chat', params)
//     })

//     // 客户端：io.connect('http://localhost:3000?roomId=2') 房间号
//     // roomId = url.parse(socket.request.url, true).query.roomId
//     // roomId = socket.handshake.query.roomId
//     // socket.rooms 所处的房间, 默认当前连接ID作为：房间号
//     // socket.join(roomId) 加入房间号
//     // socket.leave(roomId) 离开房间号
//     // io.to(roomId).emit('') 给指定房间号所有人广播
//     // io.broadcast.to(roomId).emit('') 给指定房间除了自己外的所有人广播
// })
