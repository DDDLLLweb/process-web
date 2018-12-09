import { DO_GET_CAPTCHA } from '../../action/login/';

const login = (state = {}, {type,payload}) => {
    switch (type) {
        case DO_GET_CAPTCHA:
            return {
                ...state,
                ...payload
            }
        default:
            return { ...state };
    }
};
export default login;