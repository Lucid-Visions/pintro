import  FetchAPIService from '../../services/fetch-service'

export const getFeed = async ({limit = 10, date_stamp = Date.now(), filter = undefined}) => {

  let filterParam = ''
  if (filter) {
    filterParam = `&filter=${filter}`
  }

  const params = `?limit=${limit}&date_stamp=${date_stamp}${filterParam}}`
  let response

  try {
    response = await FetchAPIService.get(`/api/v1/feed?${params}`)
  }
  catch(err) {
    return err
  }
  
  return response
};

export const deleteHelpRequest = async (id) => {
  const response = await FetchAPIService.delete(`/api/v1/actionbutton/${id}`)

  if (response.error) {
    dispatch({ type: GlobalActionTypes.SET_ERROR, payload: response.error })
  }

  return response
}

export const deletePost = async (id) => {
  const response = await FetchAPIService.delete(`/api/v1/status/${id}`)

  if (response.error) {
    dispatch({ type: GlobalActionTypes.SET_ERROR, payload: response.error })
  }

  return response
}