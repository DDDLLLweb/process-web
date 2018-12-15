import { REC_GET_USERS } from '../../action/users'

const pages = (state, payload) => {
  const { users }  = state
  const newUsers = Object.assign({}, users, payload)
  return updateState(users, newUsers)
}

const updateState = (state, payload) => {
  return {
    ...state,
    ...payload,
  }
}

const users = (state, { type, payload }) => {
  switch (type) {
    case REC_GET_USERS:
      return pages(state, payload)
    default:
      return { ...users, ...payload }
  }
}
export default users