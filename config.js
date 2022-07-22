export const SYSTEM = {
    hostname: '192.168.0.193',
    port: 8090,
    pageSize: 20
}

export const DATABASE = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'chat'
}

// 设置token加密解密的密钥
export const jwtSecretKey = 'c^_^h'
// 设置token有效期
export const expiresIn = '10h'
