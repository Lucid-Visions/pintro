import { useReducer } from 'react'

/**
 * 
 * @param {Object} state 
 * @param Object { field: name of field that has changed, value: new value of field} 
 */
const formReducer = (state, { field, value}) => {
    return {
        ...state,
        [field]: value
    }
};

const useForm = initialState => {
    const [ state, dispatch ] = useReducer(formReducer, initialState)

    const onChange = (field, value) => {
        dispatch({ field, value })
    };

    return [ state, onChange ]
}

export default useForm

