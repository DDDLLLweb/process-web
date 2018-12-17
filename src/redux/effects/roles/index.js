import { call, put } from 'redux-saga/effects'
import * as roleService from '../../../service/roles'
import { DO_ROLE_QUERY } from '../../action/roles'

export function* loadRoles( {payload} ){
  const response = yield call(roleService.pages,payload)
  if(response.sucess){
    const { rows, total } = response.data
    yield put({
      type: DO_ROLE_QUERY,
      payload: {
        list: rows,
        total: total,
      },
    })
  }
}