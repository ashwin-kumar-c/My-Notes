import React from 'react'

const Paragraph = (props) => {
    const {text, className} = props
    return (
        <p className={className}>{text}</p>
    )
}

export default Paragraph