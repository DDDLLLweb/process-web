import { call, put } from 'redux-saga/effects'
import { STATE_PRINCIPAL, STATE_MENU} from '../../action/app'
import * as appService from '../../../service/app/app'
import { push } from 'react-router-redux'
import { message } from 'antd'

export function* principal() {
  const data = yield call(appService.getPrincipal)
  if (data.success && data.data) {
    yield put({
      type: STATE_PRINCIPAL,
      payload: { user: data.data },
    })
  } else {
    yield put(push('/login'))
  }
}
export function* doLogin({payload}) {
  const user = Object.assign({},{grantType: 'password',scope: 'app'},payload)
  const data = yield call(appService.login,user)
  if(data.success) {
    localStorage.setItem("PS_ACCESS_TOKEN",data.data.access_token)
    yield put(push('/'))
  } else {
    message.warning(data.message,3)
  }
}

export function* doLoginOut() {
  const data = yield call(appService.loginOut)
  if(data.success) {
    localStorage.removeItem("PS_ACCESS_TOKEN")
    yield put(push('/login'))
  }
}

export function* doGetMenu() {
  const data = yield call(appService.getMenuItem)
  if(data.success) {
    yield put({
      type: STATE_MENU ,
      payload: { menu: data.data },
    })
  }
}

