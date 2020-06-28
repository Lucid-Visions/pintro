import  FetchAPIService from '../../services/fetch-service'

export const getFeed = async ({limit = 10, date_stamp = Date.now(), filter = undefined}) => {

    let filterParam = ''
    if (filter) {
      filterParam = `&filter=${filter}`
    }

    const params = `?limit=${limit}&date_stamp=${date_stamp}${filterParam}}`
    let response

    try {
      const feedResp = await FetchAPIService.get(`/api/v1/feed?${params}`)
      const commResp = await FetchAPIService.get(`/api/v1/community`)

      // Filter feed by communities the user is a member of (This should be done in the BE but it is easier to do it here for MVP-1)
      const communityIds = commResp.data.data.map(c => c._id)

      let feed = []
      feedResp.data.forEach(f => {
        if (communityIds.some(c => f.communityIds && f.communityIds.includes(c))) {
          feed.push(f)
        }
      })

      response = { data: feed }

    }
    catch(err) {
      return err
    }
    
    return response
  };
