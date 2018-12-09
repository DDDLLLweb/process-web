import { config, networkUtils } from '../../utils'

const { request } = networkUtils
const { api } = config
const { app } = api
const { metaq } = app

export async function getMetaqData() {
  return request({
    url: metaq,
    method: 'get',
  })
}