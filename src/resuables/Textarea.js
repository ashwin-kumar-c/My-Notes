import React from 'react-redux'

const Textarea = (props) => {
    const {value, handleChange, name, placeholder, className} = props

    return (
        <textarea 
            className={className}
            value={value}
            onChange={handleChange}
            name={name}
            placeholder={placeholder}
        ></textarea>
    )
}

export default Textarea