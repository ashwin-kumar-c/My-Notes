import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Heading from '../../resuables/Heading'
import NoteForm from './NoteForm'
import { startCreateNote } from '../../actions/notesAction'

const AddNote = (props) => {

    const dispatch = useDispatch()

    const serverErrors = useSelector((state) => {
        return state.notes.errors
    })

    const formSubmit = (note, resetForm) => {
        dispatch(startCreateNote(note, resetForm))
    }

    return (
        <div>
            <Heading
                type="h2"
                title="Add Note"
            />
            <NoteForm formSubmit={formSubmit}/>
            { serverErrors.addNote && <div className="text-danger">{serverErrors.addNote}</div> }
        </div>
    )
}

export default AddNote