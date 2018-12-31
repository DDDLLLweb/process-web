/**
 * 开发环境后端配置
 */
const PROTOCOL = 'http'
const PREFIX = 'process'
/* 后端服务器地址IP */
const IP = 'localhost'
// const IP = '39.108.225.237'
/* 后端服务器端口 */
const PORT = '9001'
const devHost = `${PROTOCOL}://${IP}:${PORT}/${PREFIX}`
const prodHost = 'process'

export {
  devHost,
  prodHost,
}
