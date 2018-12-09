import { call, put } from 'redux-saga/effects'
import { DO_GET_CAPTCHA } from '../../action/login'
import * as loginService from '../../../service/login'

export function* doCaptcha() {
    const data = yield call(loginService.getCaptcha);
      if(data.success) {
        yield put({
          type: DO_GET_CAPTCHA,
          payload: { captcha: `data:image/jpeg;base64,${data.data}` },
        });
      }
}

  