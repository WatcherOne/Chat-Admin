window.onload = () => {
    const userInfoStr = sessionStorage.getItem('z-user-info')
    let userInfo = userInfoStr ? JSON.parse(userInfoStr) : null
    if (!userInfo) {
        window.location.replace('/login')
    }
    
    // socket连接
    const socket = io()

    // 相关DOM
    const $userAvatar = document.getElementById('avatar')
    const $userCount = document.getElementsByClassName('user-count')
    const $onlineUser = document.getElementById('online-user')
    const $messageList = document.getElementById('message-list')
    const $input = document.getElementById('input-msg')
    const $submit = document.getElementById('send-msg')

    socket.emit('login', userInfo)
    // 连接socket成功后的回调
    socket.on('loginSuccess', (userList, currentUser) => {
        userInfo = currentUser
        showUserList(userList)
        showUserInfo()
        sessionStorage.setItem('z-user-info', JSON.stringify(currentUser))
    })
    // 有新用户上线给出提示
    socket.on('join-user', (userList, newUser) => {
        showUserList(userList)
        showJoinUser(newUser)
    })
    // 当有用户下线给出提示
    socket.on('leave-user', (userList, leaveUser) => {
        showUserList(userList)
        showJoinUser(leaveUser)
    })
    // 聊天
    socket.on('chat', desc => {
        showMessageList(desc)
    })

    $input.addEventListener('keydown', e => {
        const { key, ctrlKey } = e
        if (key === 'Enter' && ctrlKey) {
            const newText = `${$input.value}\n`
            $input.value = newText
        } else if (key === 'Enter') {
            sendMsg()
            e.preventDefault()
            return false
        }
    })
    $submit.addEventListener('click', sendMsg)

    // 发送信息
    function sendMsg () {
        const message = $input.value
        if (!message) return
        socket.emit('chat', message)
        $input.value = ''
    }

    // 展示消息框
    function showMessageList (desc) {
        const { userId, userName, avatar, message } = desc
        const self = userInfo.userId === userId
        $messageList.appendChild(appendHtml(`<div class="each-message ${self ? 'self-message' : ''}">
            <div class="msg-avatar">
                <img src="./images/${avatar || 'avatar1.png'}" />
            </div>
            <div class="msg-content">
                <div class="author ${self ? 'none' : ''}">${userName}</div>
                <div class="msg">${message}</div>
            </div>
        </div>`))
    }

    function appendHtml (html) {
        const divTemp = document.createElement("div")
        let nodes = null
        const fragment = document.createDocumentFragment()
        divTemp.innerHTML = html
        nodes = divTemp.childNodes
        for (let i = 0, length = nodes.length; i < length; i++) {
            fragment.appendChild(nodes[i].cloneNode(true))
        }
        return fragment
    }

    // 展示当前用户信息
    function showUserInfo () {
        const { avatar } = userInfo
        $userAvatar.innerHTML = `<img src="./images/${avatar || 'avatar1.png'}"></img>`
    }

    // 展示在线用户
    function showUserList (userList) {
        Array.prototype.forEach.call($userCount, el => el.innerText = `(${userList.length})`)
        $onlineUser.innerHTML = handleUserList(userList)
    }

    function handleUserList (userList) {
        let result = ''
        console.log(userList)
        userList.forEach(item => {
            const { userId, userName } = item
            result += `<div data-id="${userId}" class="each-user">
                <img src="./images/default.png"></img>
                <span class="user-name">${userName}</span>
            </div>`
        })
        return result
    }

    // 提示有用户上线
    function showJoinUser (user) {

    }
}
