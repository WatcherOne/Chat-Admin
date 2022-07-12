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
    socket.on('loginSuccess', (userList, currentUser, messageList) => {
        userInfo = currentUser
        showUserInfo()
        showUserList(userList)
        // showMessageList(messageList)
        sessionStorage.setItem('z-user-info', JSON.stringify(currentUser))
    })
    // 有新用户上线给出提示
    socket.on('join-user', (userList, userOnlineMsg) => {
        showUserList(userList)
        showMessageList(userOnlineMsg)
    })
    // 当有用户下线给出提示
    socket.on('leave-user', (userList, userLeaveMsg) => {
        showUserList(userList)
        showMessageList(userLeaveMsg)
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

    /**
     *  展示消息框
     *  type: 0 消息类数据
     *  type: 1 用户上线信息
     *  type: 2 用户下线信息 
     */
    function showMessageList (desc) {
        const { type = 0, userId, userName, avatar, message } = desc
        const self = userInfo.userId === userId
        type === 0
        ? $messageList.appendChild(appendHtml(`<div class="each-message ${self ? 'self-message' : ''}">
            <div class="msg-avatar">
                <img src="./images/${avatar || 'avatar1.png'}" />
            </div>
            <div class="msg-content">
                <div class="author ${self ? 'none' : ''}">${userName}</div>
                <div class="msg">${message}</div>
            </div>
        </div>`))
        : $messageList.appendChild(appendHtml(`<div class="tips-message">
            用户【${userName}】${type === 1 ? '已上线' : '已下线'}
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
        userList.forEach(item => {
            const { userId, userName } = item
            result += `<div data-id="${userId}" class="each-user">
                <img src="./images/default.png"></img>
                <span class="user-name">${userName}</span>
            </div>`
        })
        return result
    }
}
