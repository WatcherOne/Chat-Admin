window.onload = function () {
    const userInfo = { userId: 0, userName: '', avatar: '' }
    const $input = document.getElementById('name')
    const $avatarList = document.getElementById('avatar-select')
    const $loginBtn = document.getElementById('login-submit')
    
    $input.addEventListener('keyup', event => {
        if (event.keyCode === 13) {
            login()
        }
        return false
    })
    $avatarList.addEventListener('click', selectAvatar)
    $loginBtn.addEventListener('click', login)

    function selectAvatar () {
        event.preventDefault()
        const target = event.target
        const index = target.dataset.index
        if (!index) return
        checkSelected(index)
        userInfo.avatar = `avatar${index}.png`
    }

    function checkSelected (index) {
        const nodeList = $avatarList.querySelectorAll('img')
        Array.prototype.forEach.call(nodeList, el => {
            el.classList.remove('selected')
        })
        nodeList[index - 1].classList.add('selected')
    }

    function login () {
        event.preventDefault()
        const userName = $input.value
        if (!userName) {
            alert('请先输入用户名')
            return
        }
        userInfo.userName = userName
        sessionStorage.setItem('z-user-info', JSON.stringify(userInfo))
        window.location.replace('/index')
    }
}
