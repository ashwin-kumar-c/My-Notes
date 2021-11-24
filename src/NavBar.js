import React, { useEffect } from 'react'
import { Link, Route, withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import swal from 'sweetalert'
import Heading from './resuables/Heading'
import Home from './components/User/Home'
import Register from './components/User/Register'
import Login from './components/User/Login'
import Account from './components/User/Account'
import Notes from  './components/My-Notes/Notes'
import { setUser } from './actions/userAction'
import { startGetUser } from './actions/userAction'

const NavBar = (props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token) {
            dispatch(startGetUser(token))
        }
    }, [])

    const user = useSelector((state) => {
        return state.user.data
    })

    const handleLogout = () => {
        localStorage.removeItem('token')
        swal({
            title:'Successfully logged out',
            button: 'Cancel'
        })
        dispatch(setUser({})) 
        props.history.push('/')
    }

    return (  
        <div>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <div className="container">
                    <Heading
                        className="navbar-brand"
                        type="h2"
                        title="My Notes"
                    />
                    <button 
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarMenu"
                        >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    
                    <div className="collapse navbar-collapse" id="navbarMenu">                   
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/"> Home </Link>
                            </li>
                            { Object.keys(user).length > 0 ? (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/account"> Account </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/notes"> Notes </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="#" onClick={ handleLogout }> Logout </Link>
                                    </li>         
                                </>    
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/register"> Register </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login"> Login </Link>
                                    </li>
                                </> 
                            ) }
                        </ul>
                    </div>   
                </div> 
            </nav>
        
            <Route path="/" component={Home} exact />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/account" component={Account} />
            <Route path="/notes" component={Notes} />
        </div>
    )
}    

export default withRouter(NavBar)