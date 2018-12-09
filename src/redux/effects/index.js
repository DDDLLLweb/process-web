import { all, fork, takeEvery } from 'redux-saga/effects';
import {principal,doLogin,doLoginOut,doGetMenu} from './app'
import { doCaptcha } from './login'
import { doLoadMetaqData } from './metaq'

import { API_PRINCIPAL, DO_LOGIN, API_LOGINOUT, DO_GETMENU } from '../action/app'
import { DO_CAPTCHA } from '../action/login'
import { DO_LOAD_METAQ_DATA } from '../action/metaq'
function* watchCreateLesson() {
    yield takeEvery(API_PRINCIPAL, principal);
    yield takeEvery(DO_LOGIN, doLogin);
    yield takeEvery(API_LOGINOUT, doLoginOut);
    yield takeEvery(DO_GETMENU,doGetMenu);
    yield takeEvery(DO_CAPTCHA,doCaptcha);
    yield takeEvery(DO_LOAD_METAQ_DATA,doLoadMetaqData);
}
  
function* rootSaga() {
    yield all(
        [
          fork(watchCreateLesson),
        ]
    )
}

export default rootSaga;