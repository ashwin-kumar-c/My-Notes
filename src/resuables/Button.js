import React from 'react'

const Button = (props) => {
    const { value, handleClick, className } = props
    return (
        <button className={className} onClick={ handleClick }>
            { value }
        </button>
    )
}

export default Button