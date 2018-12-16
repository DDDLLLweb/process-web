import { config, networkUtils } from '../../utils'

const { request } = networkUtils
const { api } = config
const { app } = api
const { users,user } = app

export async function pages(payload) {
  return request({
    url: users,
    method: 'get',
    data: payload,
  })
}

export async function optUser(payload) {
  return request({
    url: user,
    method: 'put',
    data: payload,
  })
}

export async function getSingleUser(payload) {
  return request({
    url: `${users}/${payload}`,
    method: 'get',
  })
}

export async function delUsers(payload) {
  return request({
    url: users,
    method: 'delete',
    data: payload,
  })
}

export async function refreshPwd(payload) {
  return request({
    url: `${user}/${payload}`,
    method: 'patch',
  })
}