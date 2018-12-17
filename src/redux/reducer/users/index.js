import { REC_GET_USERS, REC_SHOW_MODAL, REC_HIDE_MODAL, REC_USER_SINGLE } from '../../action/users'

const pages = (state, payload) => {
  const newUsers = Object.assign({}, state, payload)
  return updateState(state,newUsers)
}

const updateState = (state, payload) => {
  return {
    ...state,
    ...payload,
  }
}

const updateItem = (state,payload) => {
  const newUser = Object.assign({}, state, {currentItem: payload})
  return newUser
}

const users = (state = {}, { type, payload }) => {
  switch (type) {
    case REC_GET_USERS:
      return pages(state, payload)
    case REC_SHOW_MODAL:
      return updateState(state, payload)
    case REC_HIDE_MODAL:
      return updateState(state, payload)
    case REC_USER_SINGLE:
      // return Object.assign({}, state, {currentItem: payload})
      return updateItem(state,payload)
    default:
      return state
  }
}
export default users