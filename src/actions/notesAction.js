import axios from 'axios'
import swal from 'sweetalert'

export const startGetNotes = (token) => {
    return (dispatch) => {   
        dispatch(notesLoading())
        axios.get('http://dct-user-auth.herokuapp.com/api/notes', {
            headers: {
                "x-auth": token
            }
        })
        .then((response) => {
            const result = response.data
            dispatch(setNotes(result))
        })
        .catch((err) => {
            dispatch(allNotesError(err.message))
        }) 
    }
}

export const setNotes = (notes) => {
    return {
        type: 'SET_NOTES',
        payload: notes
    } 
}

export const notesLoading = () => {
    return {
        type: 'NOTES_LOADING'
    }
}

export const allNotesError = (message) => {
    return {
        type: 'ALL_NOTES_ERROR',
        payload: message
    }
}

export const startCreateNote = (note, resetForm) => {
    return (dispatch) => {
        const confirmAdd = window.confirm('Are you sure')
        if(confirmAdd) {
            axios.post('http://dct-user-auth.herokuapp.com/api/notes', note, {
            headers: {
                "x-auth": localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                dispatch(addNote(result))
                resetForm()
            })
            .catch((err) => {
                dispatch(addNoteError(err.message))
            })
        }
        
    }
}

export const addNote = (note) => {
    return {
        type: 'ADD_NOTE',
        payload: note
    }
}

export const addNoteError = (message) => {
    return {
        type: 'ADD_NOTE_ERROR',
        payload: message
    }
}

export const startDeleteNote = (_id) => {
    return (dispatch) => {
        const confirmRemove = window.confirm('Are you sure')
        if(confirmRemove) {
            axios.delete(`http://dct-user-auth.herokuapp.com/api/notes/${_id}`, {
            headers : {
                "x-auth": localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                dispatch(removeNote(result._id))
            })
            .catch((err) => {
                dispatch(removeNoteError(err.message))
            })
        }
    }
}

export const removeNote = (_id) => {
    return {
        type: 'REMOVE_NOTE',
        payload: _id
    }
}

export const removeNoteError = (message) => {
    return {
        type: 'REMOVE_NOTE_ERROR',
        payload: message
    }
}

export const startUpdateNote = (note, props, resetForm) => {
    return (dispatch) => {
        axios.put(`http://dct-user-auth.herokuapp.com/api/notes/${props._id}`, note, {
            headers: {
                "x-auth": localStorage.getItem('token')
            }
        })
        .then((response) => {
            const result = response.data
            dispatch(editNote(result))
            resetForm()
            props.handleToggle()
        })
        .catch((err) => {
            dispatch(editNoteError(err.message))
        })
    }
}

export const editNote = (note) => {
    return {
        type: 'EDIT_NOTE',
        payload: note
    }
}

export const editNoteError = (message) => {
    return {
        type: 'EDIT_NOTE_ERROR',
        payload: message
    }
}

export const startGetSingleNote = (_id) => {
    return (dispatch) => {
        axios.get(`http://dct-user-auth.herokuapp.com/api/notes/${_id}`, {
            headers: {
                "x-auth" : localStorage.getItem('token')
            }
        })
        .then((response) => {
            const result = response.data
            swal({
                title: result.title,
                text: result.body,
                button: "Cancel"
            })
        })
        .catch((err) => {
            dispatch(singleNoteError(err.message))
        })
    }
} 

export const singleNoteError = (message) => {
    return {
        type: 'SINGLE_NOTE_ERROR',
        payload: message
    }
}