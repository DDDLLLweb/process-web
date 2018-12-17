import { config, networkUtils } from '../../utils'

const { request } = networkUtils
const { api } = config
const { app } = api
const { roles } = app

export async function pages(payload) {
  return request({
    url: roles,
    method: 'get',
    data: payload,
  })
}
