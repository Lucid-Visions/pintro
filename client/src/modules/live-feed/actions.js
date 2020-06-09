import  FetchAPIService from '../../services/fetch-service'

export const getFeed = async (limit = 10, date_stamp = Date.now(), filter = undefined) => {

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
