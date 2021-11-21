import React from 'react'

const Input = (props) => {
    const { value, handleChange, name, placeholder, type, className } = props

    let input
    if(type === 'text') {
        input = (
            <input
                type={type}
                value={value}
                onChange={handleChange}
                name={name}
                placeholder={placeholder}
                className={className}
            />
        )
    }   else if (type === 'submit') {
        input = (
            <input
                type={type}
                value={value}
                className={className}
            />
        )
    }

    return input
    
}

export default Input