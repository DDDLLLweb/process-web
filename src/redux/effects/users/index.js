import { call, put } from 'redux-saga/effects'
import * as userService from '../../../service/users'
import { REC_GET_USERS } from '../../action/users'

export function* loadUsers(payload) {
  const data = yield call(userService.pages,payload)
  if (data.success) {
    const { rows, total } = data.data
    yield put({
      type: REC_GET_USERS,
      payload: {
        list: rows,
        total: total,
      },
    }) 
  }
}

