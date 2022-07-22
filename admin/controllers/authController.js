class AuthController {
    async login(req, res) {
        console.log('login')
        res.send('login')
    }

    async register(req, res) {
        console.log('login')
        res.send('register')
    }
}

export default new AuthController()
