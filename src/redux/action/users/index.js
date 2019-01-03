export const DO_USER_QUERY = 'DO_USER_QUERY'   // 查询用户列表
export const DO_USER_INSERT = 'DO_USER_INSERT' // 新增用户
export const DO_USER_SINGLE = 'DO_USER_SINGLE' // 查询单个用户信息
export const DO_USER_DELETE = 'DO_USER_DELETE'
export const DO_USER_REFRESH_PWD = 'DO_USER_REFRESH_PWD'
export const REC_GET_USERS = 'REC_GET_USERS'
export const REC_SHOW_MODAL = 'REC_SHOW_MODAL'
export const REC_HIDE_MODAL = 'REC_HIDE_MODAL'

export const REC_USER_SINGLE = 'REC_USER_SINGLE'
export const showModal = (type) => ({
  type: REC_SHOW_MODAL,
  payload: {
    modalVisible: true,
    mode: type,
  },
})
export const hideModal = () => ({
  type: REC_HIDE_MODAL,
  payload: {
    modalVisible: false,
    mode: 'create',
    currentItem: {},
  },
}) 
