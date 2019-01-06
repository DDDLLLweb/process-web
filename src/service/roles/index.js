import { config, networkUtils } from '../../utils'

const { request } = networkUtils
const { api } = config
const { app } = api
const { role, roles, roleMenu } = app

export async function pages(payload) {
  return request({
    url: roles,
    method: 'get',
    data: payload,
  })
}
// 新增|修改角色
export async function optRole(payload){
  return request({
    url: role,
    method: 'put',
    data: payload,
  })
}

export async function getSingleRole(payload){
  return request({
    url: `${roles}/${payload}`,
    method: 'get',
  })
}

export async function delRoles(payload) {
  return request({
    url: roles,
    method: 'delete',
    data: payload,
  })
}
//菜单权限管理 updateRoleMenu
export async function updateRoleMenu(payload) {
  return request({
    url: roleMenu,
    method: 'post',
    data: payload,
  })
}