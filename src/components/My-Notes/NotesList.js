import React from 'react'
import { useSelector } from 'react-redux'
import Paragraph from '../../resuables/Paragraph'
import NoteItem from './NoteItem'
import Loader from '../../resuables/Loader'

const NotesList = (props) => {

    const notes = useSelector((state) => {
        return state.notes
    })
    
    return (
        <div>
            { notes.isLoading ? ( 
                <Loader/>
            ) : (
                <>
                    { notes.data.length === 0 ? (
                        <Paragraph
                            text="No notes found, add your first note"
                        />
                    ) : (
                        <div>
                            { notes.data.map((ele) => {
                                return (
                                    <NoteItem
                                        key={ele._id}
                                        {...ele}
                                    />
                                )
                            }) }
                        </div>
                    ) }
                </>
            )}
            { notes.errors.removeNote && <div className="text-danger">{notes.errors.removeNote}</div> }
            { notes.errors.editNote && <div className="text-danger">{notes.errors.editNote}</div> }
            { notes.errors.singleNote && <div className="text-danger">{notes.errors.singleNote}</div> }
        </div>
    )
}

export default NotesList