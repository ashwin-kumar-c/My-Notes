import React from 'react'

const Input = (props) => {
    const { value, handleChange, name, placeholder, type, className } = props

    return (
        <input
            type={type}
            value={value}
            onChange={handleChange}
            name={name}
            placeholder={placeholder}
            className={className}
        />
    )
}

export default Input