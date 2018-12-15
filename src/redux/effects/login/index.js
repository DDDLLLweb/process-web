import { call } from 'redux-saga/effects'
import svgCaptcha from 'svg-captcha'
// import { DO_GET_CAPTCHA } from '../../action/login'
// import * as loginService from '../../../service/login'

export function* doCaptcha() {
  // const data = yield call(loginService.getCaptcha)
  yield call(new Promise((resolve, reject) => { setTimeout(() => { 
    resolve('ag12')
  }, 3000) }))
  svgCaptcha.create({color: true,noise:1,size: 4})
  // if (data.success) {
  //   yield put({
  //     type: DO_GET_CAPTCHA,
  //     // payload: { captcha: `data:image/jpeg;base64,${data.data}` },
  //     payload: { captcha: svgCaptcha.create({color: true,noise:1,size: 4}) },
  //   })
  // }
 
}

