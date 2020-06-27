import ActionButtonModel from '../models/actionButton_model'
import StatusModel from '../models/status_model'
require('dotenv').config()

const Feed = {
  /**
   * @param {*} req payload may include start date and limit. If not defined, current timestamp and limit of 10 is used respectively
   * @param {*} res returns array of Articles and Actions of max length [limit]. Array is sorted by time.
   * To get the next page, call this endpoint again with the timestamp of the last element in the previous response.
   */
  // search feed posts with the given parameters
  async getFeedData(req, res) {
    const payload = req.query
    payload.limit = parseInt(payload.limit, 10)
    payload.date_stamp = parseInt(payload.date_stamp, 10)
    if (payload.filter == null){
      payload.filter = -1
    }
    payload.filter = parseInt(payload.filter, 10)

    if (typeof payload.limit !== 'number' && payload.limit) {
      return res.status(400).send({
        error: 'type error',
        message: 'Limit must be a number or undefined',
      })
    }
    if (typeof payload.date_stamp !== 'number' && payload.date_stamp) {
      return res.status(400).send({
        error: 'type error',
        message: 'Date_stamp must be a number or undefined',
      })
    }

    let articleData = []
    let actionButtonData = []
    let statusData = []

    switch (payload.filter) {
      case 5: {
        actionButtonData = await Feed.getDataFromCollection(
          ActionButtonModel,
          'ACTION',
          payload
        )
        break
      }
      case 4: {
        actionButtonData = await Feed.getDataFromCollection(
          ActionButtonModel,
          'ACTION',
          payload
        )
        break
      }
      case 3: {
        actionButtonData = await Feed.getDataFromCollection(
          ActionButtonModel,
          'ACTION',
          payload
        )
        break
      }
      case 2: {
        actionButtonData = await Feed.getDataFromCollection(
          ActionButtonModel,
          'ACTION',
          payload
        )
        break
      }
      case 1: {
        statusData = await Feed.getDataFromCollection(
          StatusModel,
          'STATUS',
          payload
        )
        break
      }
      default: {
        actionButtonData = await Feed.getDataFromCollection(
          ActionButtonModel,
          'ACTION',
          payload
        )
        actionButtonData = await Feed.getDataFromCollection(
          ActionButtonModel,
          'ACTION',
          payload
        )
        statusData = await Feed.getDataFromCollection(
          StatusModel,
          'STATUS',
          payload
        )
      }
    }

    let tempFeed = Feed.mergeSortedArrays(
      articleData,
      actionButtonData,
      payload
    )
    let finalFeed = Feed.mergeSortedArrays(statusData, tempFeed, payload)

    const generatedFeed = finalFeed.slice(0, payload.limit || 10)
    res.status(200).send(generatedFeed)
  },

  mergeSortedArrays(arr1, arr2, payload) {
    let tempFeed = []
    for (let i = 0; i < payload.limit || 10; i++) {
      if (arr1.length === 0) {
        tempFeed.push(...arr2)
        break
      }
      if (arr2.length === 0) {
        tempFeed.push(...arr1)
        break
      }

      if (arr1[0].date_stamp > arr2[0].date_stamp) {
        tempFeed.push(arr1[0])
        arr1.shift()
      } else {
        tempFeed.push(arr2[0])
        arr2.shift()
      }
    }
    return tempFeed
  },

  async getDataFromCollection(model, type, payload, methods) {
    let response = {}
    let filterType = ''
    switch (payload.filter){
      case 2: { filterType = 'help'; break }
      case 3: { filterType = 'introduce'; break }
      case 4: { filterType = 'talktomeabout'; break }
      case 5: { filterType = 'promoteme'; break }
    }
    switch (type) {
      case 'ACTION': {
        response = await model
          .find({
            ...({date_stamp: { $lt: payload.date_stamp || Date.now() }}),
            ...(payload.filter !== -1 ? {type: filterType} : {}),
          })
          .limit(payload.limit || 10)
          .populate('author', '_id name profile_picture')
          .sort({ date_stamp: -1 })
          .catch(err => {
            console.log(err)
            return []
          })
        break
      }

      case 'STATUS': {
        response = await model
          .find({
            ...({date_stamp: { $lt: payload.date_stamp || Date.now() }}),
          })
          .limit(payload.limit || 10)
          .populate('author.author_id', '_id name profile_picture')
          .sort({ date_stamp: -1 })
          .catch(err => {
            console.log(err)
            return []
          })
        break
      }

      default: {
        response = await model
          .find({
            date_stamp: { $lt: payload.date_stamp || Date.now() },
          })
          .limit(payload.limit || 10)
          .sort({ date_stamp: -1 })
          .catch(err => {
            console.log(err)
            return []
          })
      }
    }

    const toReturn = response.map(x => ({
      ...x._doc,
      _type: type,
    }))
    return toReturn
  },
}

export default Feed
