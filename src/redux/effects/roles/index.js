import { call, put } from 'redux-saga/effects'
import * as roleService from '../../../service/roles'
import { REC_GET_ROLES, REC_ROLE_SINGLE, hideModal, DO_ROLE_QUERY,hideMenuModal } from '../../action/roles'
import { message } from 'antd'
export function* loadRoles( {payload} ){
  const response = yield call(roleService.pages,payload)
  if(response.success){
    const { rows, total } = response.data
    yield put({
      type: REC_GET_ROLES,
      payload: {
        list: rows,
        total: total,
      },
    })
  }
}

export function* optRole({payload}){
  const response  = yield call(roleService.optRole,payload)
  if(response.success){
    yield put(hideModal())
    yield put({
      type: DO_ROLE_QUERY,
    })
  }
}

export function* loadSingleRole({payload}){
  const response  = yield call(roleService.getSingleRole,payload)
  if(response.success){
    yield put({
      type: REC_ROLE_SINGLE,
      payload: response.data,
    })
  }
}

export function* delRoles({payload}){
  const response = yield call(roleService.delRoles,payload)
  if (response.success) {
    message.success('删除成功！')
    yield put({
      type: DO_ROLE_QUERY,
    })
  }
}
//
export function* updateRoleMenu({payload}){
  const response = yield call(roleService.updateRoleMenu,payload)
  if (response.success) {
    message.success('更新成功')
    yield put(hideMenuModal())
  }
}