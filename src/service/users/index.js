import { config, networkUtils } from '../../utils'

const { request } = networkUtils
const { api } = config
const { app } = api
const { users } = app

export async function pages(payload) {
  return request({
    url: users,
    method: 'get',
    data: payload,
  })
}