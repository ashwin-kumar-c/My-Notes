import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startGetNotes } from '../../actions/notesAction'
import Heading from '../../resuables/Heading'
import NotesList from './NotesList'
import AddNote from './AddNote'

const Notes = (props) => {
    const dispatch = useDispatch()

    useEffect(() => {
        const token = localStorage.getItem('token')
        dispatch(startGetNotes(token))
    }, [])

    const notes = useSelector((state) => {
        return state.notes
    })

    return ( 
        <div className="container justify-content-center align-items-center">
            <Heading 
                className="my-5"
                type="h3" 
                title={ `Notes - ${ notes.data.length }` }
            />
            <div className="row"> 
                <div className="col-sm-6">
                    <NotesList/>
                </div>
                <div className="col-sm-6">
                    <AddNote/>
                </div>
            </div> 
            { notes.errors.allNotes && <div className="text-danger">{ notes.errors.allNotes }</div> }
        </div>
    )
} 

export default Notes