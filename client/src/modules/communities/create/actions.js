import  FetchAPIService from '../../../services/fetch-service'

export const createCommunity = async (data) => {
    let response
    try {
      response = await FetchAPIService.post('/api/v1/community', { body: JSON.stringify(data) })
    }
    catch(err) {
      return err
    }
    
    return response
  };
