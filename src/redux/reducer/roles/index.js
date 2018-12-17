import { REC_GET_ROLES } from '../../action/roles'
const pages = (state, payload) => {
  const newRoles = Object.assign({}, state, payload)
  return newRoles
}

const roles = (state = {}, {
  type,
  payload,
}) => {
  switch (type) {
    case REC_GET_ROLES:
      return pages(state, payload)
    default:
      return state
  }
}
export default roles
