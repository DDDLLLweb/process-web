import { call, put } from 'redux-saga/effects'
import * as roleService from '../../../service/roles'
import { REC_GET_ROLES } from '../../action/roles'

export function* loadRoles( {payload} ){
  const response = yield call(roleService.pages,payload)
  if(response.sucess){
    const { rows, total } = response.data
    console.log("+++++++++++++++++++")
    console.log("---------",response.data)
    yield put({
      type: REC_GET_ROLES,
      payload: {
        list: rows,
        total: total,
      },
    })
  }
}