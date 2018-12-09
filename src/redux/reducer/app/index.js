
import { API_XSRF, STATE_PRINCIPAL, API_LOGINOUT, STATE_MENU} from '../../action/app/'

const handleLogOut = (state) => {
  const { app } = state
  const newApp = Object.assign({},app,{user:null})
  return Object.assign({},state,newApp)
}

const app = (state = {}, {type,payload}) => {
  switch (type) {
    case API_XSRF:
      return {
        ...state,
      }
    case STATE_PRINCIPAL: 
      return {
        ...state,
        ...payload,
      }
    case API_LOGINOUT: 
      return handleLogOut(state)
    case STATE_MENU:
      return {
        ...state,
        ...payload,
      }
    default:
      return { ...state }
  }
}
export default app