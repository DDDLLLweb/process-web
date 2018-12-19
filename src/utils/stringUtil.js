/**
 * Created by hao.cheng on 2017/4/28.
 */
// 获取url的参数
export const queryString = () => {
  let _queryString = {}
  const _query = window.location.search.substr(1)
  const _vars = _query.split('&')
  _vars.forEach((v, i) => {
    const _pair = v.split('=')
    if (!_queryString.hasOwnProperty(_pair[0])) {
      _queryString[_pair[0]] = decodeURIComponent(_pair[1])
    } else if (typeof _queryString[_pair[0]] === 'string') {
      const _arr = [ _queryString[_pair[0]], decodeURIComponent(_pair[1])]
      _queryString[_pair[0]] = _arr
    } else {
      _queryString[_pair[0]].push(decodeURIComponent(_pair[1]))
    }
  })
  return _queryString
}
export const getGuid = id =>
  (id && id + '-') +
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })