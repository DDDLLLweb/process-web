import { all, fork, takeEvery } from 'redux-saga/effects'
import {principal,doLogin,doLoginOut,doGetMenu} from './app'
import { doCaptcha } from './login'
import { doLoadMetaqData } from './metaq'
import { loadUsers, loadSingleUser, optUser, delUsers, refreshPwd } from './users'
import { API_PRINCIPAL, DO_LOGIN, API_LOGINOUT, DO_GETMENU } from '../action/app'
import { DO_CAPTCHA } from '../action/login'
import { DO_LOAD_METAQ_DATA } from '../action/metaq'
import { DO_USER_QUERY,DO_USER_INSERT,DO_USER_SINGLE,DO_USER_DELETE,DO_USER_REFRESH_PWD } from '../action/users'

function* watchCreateLesson() {
  yield takeEvery(API_PRINCIPAL, principal)
  yield takeEvery(DO_LOGIN, doLogin)
  yield takeEvery(API_LOGINOUT, doLoginOut)
  yield takeEvery(DO_GETMENU,doGetMenu)
  yield takeEvery(DO_CAPTCHA,doCaptcha)
  yield takeEvery(DO_LOAD_METAQ_DATA,doLoadMetaqData)
  // ------ 系统用户管理
  yield takeEvery(DO_USER_QUERY,loadUsers)
  yield takeEvery(DO_USER_INSERT,optUser)
  yield takeEvery(DO_USER_SINGLE,loadSingleUser)
  yield takeEvery(DO_USER_DELETE,delUsers)
  yield takeEvery(DO_USER_REFRESH_PWD,refreshPwd)
  
}
  
function* rootSaga() {
  yield all(
    [
      fork(watchCreateLesson),
    ]
  )
}

export default rootSaga