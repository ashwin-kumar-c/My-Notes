import React from 'react'

const Heading = (props) => {
    const { title, type, handleDisplay, className } = props

    let heading
    if(type === 'h1') {
        heading = <h1 className={className} >{title}</h1>
    } else if(type === 'h2') {
        heading = <h2 className={className} >{title}</h2>
    } else if(type === 'h3') {
        heading = <h3 className={className} >{title}</h3>
    } else if(type === 'h4') {
        heading = (
            <h4 onClick={handleDisplay} className={className} >
                {title}
            </h4>
        )       
    }

    return heading
}

export default Heading