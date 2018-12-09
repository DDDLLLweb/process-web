import { config, networkUtils } from '../../utils'

const { request } = networkUtils
const { api } = config
const { basic,app } = api
const { principal, userLogin,userLogout } = basic
const { menus } = app
export async function getPrincipal() {
  return request({
    url: principal,
    method: 'get',
  })
}
export async function login(data) {
  return request({
    url: userLogin,
    method: 'form',
    data: data,
  })
}

export async function loginOut() {
  return request({
    url: userLogout,
    method: 'post',
  })
}

export async function getMenuItem() {
  return request({
    url: menus,
    method:'get',
  })
}