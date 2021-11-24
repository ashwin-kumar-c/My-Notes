import React from 'react'
import Image from '../../resuables/Image'
import notes from '../../assets/notes.svg'

const Home = (props) => {
    return (
        <div className="container">
            <div className="text-center">
                <Image className="img-fluid" src={ notes } alt="notes2"/>
            </div>
        </div>
    )
}

export default Home