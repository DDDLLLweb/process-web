const apiConfig = require('./apiConfig');

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
      csrf: '/sec/xsrf', // CSRF检查
      userLogin: '/sec/login', // 登录
      userLogout: '/sec/logout', // 退出
      captcha: '/sec/captcha', // 验证码
      principal: '/sec/principal', // 登录用户上下文
      resetPW: 'api/ui/password/update',
    },
    app: {
      menus: '/api/menus',// 获取菜单

      metaq: '/api/metaqs'
    },
  },
}