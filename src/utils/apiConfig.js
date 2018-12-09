/**
 * 开发环境后端配置
 */
const PROTOCOL = 'http'
const PREFIX = 'excute'
/* 后端服务器地址IP */
const IP = 'localhost'

/* 后端服务器端口 */
const PORT = '8899'
const devHost = `${PROTOCOL}://${IP}:${PORT}/${PREFIX}`
const prodHost = '/excute'

export {
  devHost,
  prodHost,
}
