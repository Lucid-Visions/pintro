import { post } from '../../services/fetch-service'

export const createCommunity = async (data) => {
    try {
      response = await post(`/api/v1/feed?${params}`, { body: data })
    }
    catch(err) {
      return { error: true }
    }
    
    return response
  };
