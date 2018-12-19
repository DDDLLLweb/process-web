import { REC_GET_ROLES, REC_SHOW_MODAL, REC_HIDE_MODAL,REC_ROLE_SINGLE } from '../../action/roles'
const pages = (state, payload) => {
  const newRoles = Object.assign({}, state, payload)
  return newRoles
}
const updateState = (state,payload) => {
  return {
    ...state,
    ...payload,
  }
}
const roles = (state = {}, {
  type,
  payload,
}) => {
  switch (type) {
    case REC_GET_ROLES:
      return pages(state, payload)
    case REC_SHOW_MODAL:
      return updateState(state, payload)
    case REC_HIDE_MODAL:
      return updateState(state, payload)
    case REC_ROLE_SINGLE:
      return Object.assign({}, state, {currentItem: payload})
    default:
      return state
  }
}
export default roles
