import { config, networkUtils } from '../../utils';

const { request } = networkUtils;
const { api } = config;
const { basic } = api;
const { captcha } = basic

export async function getCaptcha() {
  return request({
    url: captcha,
    method: 'get',
  });
}