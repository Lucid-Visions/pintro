import  FetchAPIService from '../../../services/fetch-service'

export const createCommunity = async (data) => {
    let response
    try {
      response = await FetchAPIService.post('/api/v1/community', { body: JSON.stringify(data) })
    }
    catch(err) {
      return { error: true }
    }
    
    return response
  };
