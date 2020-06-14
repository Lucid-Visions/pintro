import { handleActions } from 'redux-actions'

import { ActionTypes, initialState } from './constants'

const reducer = handleActions({
  [ActionTypes.FETCHED_COMMUNITY]: (state, action) => ({
    ...state,
    communities: { ...state.communities, currentProfile: action.payload.data }
  })
}, initialState)


export default reducer