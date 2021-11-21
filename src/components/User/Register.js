import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import validator from 'validator'
import Heading from '../../resuables/Heading'
import Input from '../../resuables/Input'
import Button from '../../resuables/Button'
import { startRegisterUser } from '../../actions/userAction'

const Register = (props) => {
    const [user, setUser] = useState({ 
        username: '',
        email: '',
        password: '',
        formErrors: {} 
    })
    const errors = {}

    const dispatch = useDispatch()

    const serverErrors = useSelector((state) => {
        return state.user.errors
    })

    const runValidations = () => {
        // username
        if(user.username.trim().length === 0) {
            errors.username = "username can't be blank"
        }

        // email
        if(user.email.trim().length === 0) {
            errors.email = "email can't be blank"
        } else if (!validator.isEmail(user.email)) {
            errors.email = "invalid email format"
        }

        // password
        if(user.password.length === 0) {
            errors.password = "password can't be blank"
        }   else if (user.password.length < 6 || user.password.length > 128) {
            errors.password = "password characters should be greater than 6 & less than 128"
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        runValidations()

        if(Object.keys(errors).length === 0) {
            setUser({...user, formErrors: {}})
            const { username, email, password } = user

           /* es6 - concise properties - when the property name and the variable name is the same, 
            we can only use the variable name */
            const formData = {
                username,
                email,
                password
            }

            const redirect = () => {
                props.history.push('/login')
            }

            const resetForm = () => {
                setUser({
                    username: '',
                    email: '',
                    password: '',
                    formErrors: {} 
                })
            }

            dispatch(startRegisterUser(formData, redirect, resetForm))

        }   else {
            setUser({...user, formErrors: {...errors}})
        }
    }

    const handleChange = (e) => {
        if(e.target.name === 'username') {
            setUser({...user, username: e.target.value })
        } else if(e.target.name === 'email') {
            setUser({...user, email: e.target.value })
        } else if(e.target.name === 'password') {
            setUser({...user, password: e.target.value })
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
                title='Register with us '
            />
            
            <form onSubmit={handleSubmit}>
                <div className="mb-3 row">
                    <div className="col-sm-4">
                    <Input 
                        type="text"
                        className="form-control"
                        value={user.username}
                        handleChange={handleChange}
                        name="username"
                        placeholder="Enter username"
                    />
                    { user.formErrors.username && <div className="form-text"> {user.formErrors.username} </div> }
                    </div>
                </div>
                
        
                <div className="mb-3 row">
                    <div className="col-sm-4">
                        <Input
                            type="text"
                            className="form-control"
                            value={user.email}
                            handleChange={handleChange}
                            name="email"
                            placeholder="Enter email"
                        />
                        { user.formErrors.email && <div className="form-text"> {user.formErrors.email} </div> }
                    </div>
                </div>

                <div className="mb-3 row">
                    <div className="col-sm-4">
                    <Input
                        type="text"
                        className="form-control"
                        value={user.password}
                        handleChange={handleChange}
                        name="password"
                        placeholder="Enter password"
                    />
                    { user.formErrors.password && <div className="form-text"> {user.formErrors.password} </div> }
                    </div>
                </div>

                <Input
                    type="submit"
                    className="btn btn-primary my-3"
                    value="Register"
                />

                <Button
                    value="Cancel"
                    className="btn btn-secondary ms-4"
                    handleClick={handleClick}
                />   
            </form>  
            <div>{serverErrors.register && <div className="text-danger">{serverErrors.register}</div>}</div>       
        </div>
    )
}

export default Register