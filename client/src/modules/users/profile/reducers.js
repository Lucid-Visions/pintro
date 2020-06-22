import { handleActions } from 'redux-actions'

import { ActionTypes, initialState } from './constants'

const reducer = handleActions({
  [ActionTypes.FETCHED_COMMUNITIES]: (state, action) => ({
    ...state, communities: action.payload.data
  })
}, initialState)


export default reducer