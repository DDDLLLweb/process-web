export const DO_ROLE_QUERY = 'DO_ROLE_QUERY'  //查询角色列表
export const DO_ROLE_INSERT = 'DO_ROLE_INSERT' //插入角色
export const DO_ROLE_SINGLE = 'DO_ROLE_SINGLE' //// 查询单个角色信息
export const DO_ROLE_DELETE = 'DO_ROLE_DELETE' //// 查询单个角色信息


export const REC_ROLE_SINGLE = 'REC_ROLE_SINGLE' //// 查询单个角色信息
export const REC_GET_ROLES = 'REC_GET_ROLES' 
export const REC_SHOW_MODAL = 'REC_SHOW_MODAL'
export const REC_HIDE_MODAL = 'REC_HIDE_MODAL'
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