const notesInitialState = {
    isLoading: false,
    data: [],
    errors: {}
}

const notesReducer = (state = notesInitialState, action) => {
    switch(action.type) {
        case 'NOTES_LOADING': {
            return {...state, isLoading: true}
        }
        case 'SET_NOTES': {
            return {...state, data: [...action.payload].reverse(), isLoading: false}
        }
        case 'ADD_NOTE': {
            return {...state, data: [{...action.payload}, ...state.data]}
        }
        case 'REMOVE_NOTE': {
            const result = state.data.filter((ele) => {
                return ele._id !== action.payload
            })
            return {...state, data: [...result]}
        }
        case 'EDIT_NOTE': {
            const result = state.data.map((ele) => { 
                if(ele._id === action.payload._id) {
                    return {...ele, ...action.payload}
                } else {
                    return {...ele}
                }
            })
            return {...state, data: [...result]}
        } 
        case 'ALL_NOTES_ERROR': {
            return {...state, errors: {...state.errors, allNotes: action.payload}}
        }
        case 'ADD_NOTE_ERROR': {
            return {...state, errors: {...state.errors, addNote: action.payload}}
        }
        case 'REMOVE_NOTE_ERROR': {
            return {...state, errors: {...state.errors, removeNote: action.payload}}
        }
        case 'EDIT_NOTE_ERROR': {
            return {...state, errors: {...state.errors, editNote: action.payload}}
        }
        case 'SINGLE_NOTE_ERROR': {
            return {...state, errors: {...state.errors, singleNote: action.payload}}
        }
        default : {
            return {...state}
        }
    }
}

export default notesReducer 