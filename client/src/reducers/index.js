import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'

import { ActionTypes } from '../constants'
import communities from '../modules/communities/reducers'
import userProfile from '../modules/users/profile/reducers'

/**
 * Global error handling
 */
const errors = handleActions({
  [ActionTypes.SET_ERROR]: (state, action) => ({
    ...state,
    error: action.payload
  })
}, { error: '' })


export default combineReducers({
  communities,
  userProfile,
  errors
})