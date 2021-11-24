const userInitialState = {
    isLoading: false,
    data: {},
    errors: {}
}
const userReducer = (state = userInitialState, action) => {
    switch(action.type) { 
        case 'SET_USER': {
            return {...state, data: {...action.payload}}
        } 
        case 'REGISTER_ERROR': {
            return {...state, errors: {...state.errors, register: action.payload}}
        }
        case 'LOGIN_ERROR': {
            return {...state, errors: {...state.errors, login: action.payload}}
        }
        case 'ACCOUNT_ERROR': {
            return {...state, errors: {...state.errors, account: action.payload}}
        }
        default: {
            return {...state}
        } 
    }
}

export default userReducer 