import React from 'react'

const Image = (props) => {
    const {src, alt, className} = props
    return (
        <img className={className} src={src} alt={alt}/>
    )
}

export default Image