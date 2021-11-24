import axios from 'axios'
import swal from 'sweetalert'
import { startGetNotes } from './notesAction'

export const startRegisterUser = (registerData, redirect, resetForm) => {
    return (dispatch) => {
        axios.post('http://dct-user-auth.herokuapp.com/users/register', registerData)
        .then((response) => {
            const result = response.data
            if(result.hasOwnProperty('errors')) {
                swal({
                    title: result.message,
                    button: 'Cancel'
                })
            } else {
                swal({
                    title:'Your account has been successfully created',
                    button: 'Cancel'
                })
                resetForm()
                redirect()
            } 
        })
        .catch((err) => {
            dispatch(registerError(err.message))
        })
    } 
}

export const registerError = (message) => {
    return {
        type: 'REGISTER_ERROR',
        payload: message
    }
}

export const startLoginUser = (loginData, redirect, resetForm) => {
    return (dispatch) => {
        axios.post('http://dct-user-auth.herokuapp.com/users/login', loginData)
        .then((response) => {
            const result = response.data
            if(result.hasOwnProperty('errors')) {
                swal({
                    title: result.errors,
                    button: 'Cancel'
                })
            } else {
                swal({
                    title:'Successfully logged in',
                    button: 'Cancel'
                })
                localStorage.setItem('token', result.token)
                dispatch(startGetUser(result.token))   // immediately after login, get user account details
                dispatch(startGetNotes(result.token))  // immediately after login, get notes of that perticular user (token) 
                resetForm()
                redirect()
            }
        })
        .catch((err) => {
            dispatch(loginError(err.message))
        })
    }
}

export const loginError = (message) => {
    return {
        type: 'LOGIN_ERROR',
        payload: message
    }
}

export const startGetUser = (token) => {
    return (dispatch) => {
        axios.get('http://dct-user-auth.herokuapp.com/users/account', {
            headers: {
                "x-auth": token
            }
        })
        .then((response) => {
            const result = response.data
            dispatch(setUser(result))
        })
        .catch((err) => {
            console.log(err.message);
            dispatch(accountError(err.message))
        }) 
    }
}

export const setUser = (user) => {
    return {
        type: 'SET_USER',
        payload: user
    }
}

export const accountError = (message) => {
    return {
        type: 'ACCOUNT_ERROR',
        payload: message
    }
}