import { API_METAQ_DATASOURCE } from '../../action/metaq'


const handleMetaqs = (state,payload) => {
  const { app } = state
  const newApp = Object.assign({},app,{metaq:{ dataSource: payload }})
  return Object.assign({},state,newApp)
}

const metaq = (state = {}, {type,payload}) => {
  switch (type) {
    case API_METAQ_DATASOURCE:
      return handleMetaqs(state,payload)
    default:
      return { ...state }
  }
}
export default metaq