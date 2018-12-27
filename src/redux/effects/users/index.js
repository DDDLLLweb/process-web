import { call, put } from 'redux-saga/effects'
import * as userService from '../../../service/users'
import { REC_GET_USERS, REC_USER_SINGLE, hideModal,DO_USER_QUERY } from '../../action/users'
import { message } from 'antd'

export function* loadUsers({ payload }) {
  const response = yield call(userService.pages,payload)
  if (response.success) {
    const { rows, total } = response.data
    yield put({
      type: REC_GET_USERS,
      payload: {
        list: rows,
        total: total,
      },
    }) 
  }
}
export function* optUser({payload}) {
  const response = yield call(userService.optUser,payload)
  if (response.success) {
    yield put(hideModal())
    yield put({
      type: DO_USER_QUERY,
    })
  }
}

export function* loadSingleUser({payload}) {
  const response = yield call(userService.getSingleUser,payload)
  if (response.success) {
    yield put({
      type: REC_USER_SINGLE,
      payload: response.data,
    })
  }
}

export function* delUsers({payload}) {
  const response = yield call(userService.delUsers,payload)
  if (response.success) {
    message.success('删除成功！')
    yield put({
      type: DO_USER_QUERY,
    })
  }
}

export function* refreshPwd({payload}) {
  const response = yield call(userService.refreshPwd,payload)
  if (response.success) {
    message.success('密码重置成功！')
  }
}

