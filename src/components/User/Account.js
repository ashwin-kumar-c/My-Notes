import React from 'react'
import { useSelector, useStore } from 'react-redux'
import Heading from '../../resuables/Heading'
import Paragraph from '../../resuables/Paragraph'
import Loader from '../../resuables/Loader'

const Account = (props) => {

    const user = useSelector((state) => {
        return state.user
    })
    
    return ( 
        <div className="container">
            <Heading 
                className="my-4"
                type="h2"
                title="User Account"
            />

            { Object.keys(user.data).length > 0 ? (
                <>
                    <Paragraph
                        className="lead"
                        text = { `Name - ${ user.data.username }` }
                    /> 
                    <Paragraph
                        className="lead"
                        text = { `Email - ${ user.data.email }` }
                    />
                </>
            ) : (
                <Loader/>
            )}

            { user.errors.account && <div className="text-danger">{user.errors.account}</div> }
        </div>
    )    
}

export default Account