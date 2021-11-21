import React from 'react'
import { useDispatch } from 'react-redux'
import Heading from '../../resuables/Heading'
import NoteForm from './NoteForm'
import { startUpdateNote } from '../../actions/notesAction'

const EditNote = (props) => {
    const { _id, title, body, handleToggle } = props 

    const dispatch = useDispatch()

    const formSubmit = (note, resetForm) => {
        dispatch(startUpdateNote(note, props, resetForm)) 
    }

    return (
        <div>
            <Heading
                type="h2"
                title="Edit Note"
            />
            <NoteForm
                _id={_id}
                title={title}
                body={body}
                formSubmit={formSubmit}
            />
        </div>
    )
}

export default EditNote