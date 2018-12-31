const apiConfig = require('./apiConfig')

export default {
  name: '进击之路',
  prefix: 'excute',
  footerText: '© 2003-2017 Elitesland.com 版权所有',
  loginLogo: '/assets/img/login.png',
  logo: '/assets/img/login.png',
  logoSmall: '/assets/img/logoSmall.png',
  iconFontCSS: '/assets/font/iconfont.css',
  iconFontJS: '/assets/font/iconfont.js',
  baseURL: process.env.NODE_ENV === 'development' ? apiConfig.devHost : apiConfig.prodHost,
  YQL: ['http://www.zuimeitianqi.com'],
  CORS: ['http://localhost:7000'],
  openPages: ['/login'],
  apiPrefix: '/api',
  api: {
    basic: {
      csrf: '/api/sec/csrf', // CSRF检查
      userLogin: '/api/sec/login', // 登录
      userLogout: '/sec/logout', // 退出
      captcha: '/sec/captcha', // 验证码
      principal: '/auth/api/sec/principal', // 登录用户上下文
      resetPW: 'api/ui/password/update',
    },
    common: {
      suggest: {
        roles: '/auth/api/roles/suggest', // 角色下拉
      },
    },
    app: {
      menus: '/auth/api/menus',// 获取菜单
      users: '/auth/api/users',// 获取系统用户
      user: '/auth/api/user', // 用户新增或修改
      roles: '/auth/api/roles', //获取角色
      role: '/auth/api/role', //角色修改
    },
  },
}