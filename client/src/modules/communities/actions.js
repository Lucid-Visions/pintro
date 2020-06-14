import  FetchAPIService from '../../services/fetch-service'
import { ActionTypes as GlobalActionTypes } from '../../constants'
import { ActionTypes } from './constants'

export const createCommunity = async (dispatch, data) => {
    const response = await FetchAPIService.post('/api/v1/community', { body: JSON.stringify(data) })

    if (response.error) {
      dispatch({ type: GlobalActionTypes.SET_ERROR, payload: response.error })
    }

    // TODO: Add dispatch function here when there is an endpoint to get all communities.
    return response
  };

export const getCommunity = async (dispatch, id) => {
  const response = await FetchAPIService.get(`/api/v1/community/${id}`)

  if (response.error) {
    dispatch({ type: GlobalActionTypes.SET_ERROR, payload: response.error })
  }

  dispatch({ type: ActionTypes.FETCHED_COMMUNITY, payload: response })
}