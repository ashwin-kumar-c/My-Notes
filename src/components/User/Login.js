import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import validator from 'validator'
import Input from '../../resuables/Input'
import Heading from '../../resuables/Heading'
import Button from '../../resuables/Button'
import { startLoginUser } from '../../actions/userAction'

const Login = (props) => {
    const [ user, setUser ] = useState({
        email : '',
        password : '',
        formErrors : {}
    })
    const errors = {}

    const dispatch = useDispatch()

    const serverErrors = useSelector((state) => {
        return state.user.errors
    })

    const runValidations = () => {
        // email
        if(user.email.trim().length === 0) {
            errors.email = "email can't be blank"
        } else if(!validator.isEmail(user.email)) {
            errors.email = "invalid email format"
        }

        // password
        if(user.password.length === 0) {
            errors.password = "password can't be blank"
        } else if(user.password.length < 6 || user.password.length > 128) {
            errors.password = "password characters should be greater than 6 and less than 128"
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        runValidations()

        if(Object.keys(errors).length === 0) {
            setUser({...user, formErrors : {}})
            const { email, password } = user
            const formData = {
                email,
                password
            }

            const redirect = () => {
                props.history.push('/')
            }

            const resetForm = () => {
                setUser({
                    email : '',
                    password : '',
                    formErrors : {}
                })
            }
            
            dispatch(startLoginUser(formData, redirect, resetForm))
        } else {
            setUser({...user, formErrors : errors})
        }
    }

    const handleChange = (e) => {
        if(e.target.name === 'email') {
            setUser({...user, email : e.target.value})
        } else if (e.target.name === 'password') {
            setUser({...user, password : e.target.value})
        }
    }

    const handleClick = () => {
        props.history.push('/')
    }

    return (
        <div className="container">
            <Heading 
                className="my-4" 
                type="h2"
                title="Login to your account"    
            />

            <form onSubmit={ handleSubmit }>
                <div className="mb-3 row">
                    <div className="col-sm-4">
                        <Input
                            type="text"
                            className="form-control"
                            value={ user.email }
                            handleChange={ handleChange }
                            name="email"
                            placeholder="email"
                        />
                        { user.formErrors.email && <div className="form-text">{ user.formErrors.email }</div> }
                    </div>        
                </div>

                <div className="mb-3 row">
                    <div className="col-sm-4">
                        <Input
                        type="text"
                        className="form-control"
                        value={ user.password }
                        handleChange={ handleChange }
                        name="password"
                        placeholder="password"
                    />
                    { user.formErrors.password && <div className="form-text">{ user.formErrors.password }</div> }
                    </div>
                </div>
                
                <Input
                    type="submit"
                    className="btn btn-primary my-3"
                    value="Login"

                />

                <Button
                    value="Cancel"
                    className="btn btn-secondary ms-4"
                    handleClick={handleClick}
                />                  
            </form>

            { serverErrors.login && <div className="text-danger">{ serverErrors.login }</div> } 
        </div>
    )
}

export default Login