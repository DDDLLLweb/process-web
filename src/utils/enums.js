// 返回代码枚举
const codeMap = [
  { code: 'OK', message: '操作成功' },
  { code: 'NG', message: '操作失败' },

  { code: 'NG_CAPTCHA', message: '验证码输入错误' },
  { code: 'NG_ACCOUNT', message: '用户名或密码错误' },
  { code: 'NG_USER_NOT_FOUND', message: '用户未找到' },
  { code: 'NG_NEW_PWD_IS_OLD', message: '新密码与旧密码重复' },
  { code: 'NG_NEW_PWD_IS_POOR', message: '新密码强度不够' },
  { code: 'NG_OLD_PWD_IS_WRONG', message: '旧密码错误' },
  { code: 'NG_USER_ALREADY_EXISTS', message: '用户已存在' },
  { code: 'NG_EMAIL_FORMAT_ERROR', message: '邮箱格式验证错误' },
  { code: 'NG_MOBILE_FORMAT_ERROR', message: '手机号格式验证错误' },
]

const UDC = {
  base: [],
}

module.exports = {
  codeMap,
  UDC,
}
