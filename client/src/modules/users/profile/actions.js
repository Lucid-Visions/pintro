import  FetchAPIService from '../../../services/fetch-service'
import { ActionTypes as GlobalActionTypes } from '../../../constants'
import { ActionTypes } from './constants'

export const getCommunities = async (dispatch) => {
  const response = await FetchAPIService.get('/api/v1/community')

  if (response.error) {
    dispatch({ type: GlobalActionTypes.SET_ERROR, payload: response.error })
  }

  dispatch({ type: ActionTypes.FETCHED_COMMUNITIES, payload: response.data })
}