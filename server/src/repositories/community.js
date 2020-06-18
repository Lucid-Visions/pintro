import mongoose from 'mongoose'

import BaseRepository from './base'

class CommunityRepository extends BaseRepository {

  /**
   *
   * @param {string} name Community name
   */
  getByName(name) {
    return this.collection.find({ name }).toArray()
  }

  /**
   * getUserCommunities
   *
   * Get communities where userId is a user or admin
   *
   * @param {string} userId Id of user to
   */
  async getUserCommunities(userId) {
    let response
    try {
      const collection = await this.collection.find({ $or: [{ users: { $in: [ userId ] }}, { admins: { $in: [ userId ] }}] })

      if (await collection.count() === 0) {
        return { error: 'Records not found' }
      }

      response = { data: await collection.toArray() }

    } catch (error) {
      response = { error }
    }

    return response
  }

  /**
   * update
   *
   * @param {string} userId Id of user that should be admin
   * @param {string} communityId Id of community to be updated
   * @param {Object} data Data to overwrite existing data
   */
  async update(userId, communityId, data) {
    let response
    try {

      response = await this.collection.updateOne({ admins: userId, _id: mongoose.Types.ObjectId(communityId) }, { $set: { ...data } })

      if (response.result.nModified === 0) {
        return { error: 'Could not update community' }
      }

    } catch (error) {
      response = { error }
    }

    return response
  }

  /**
   * delete
   *
   * @param {string} userId @param {string} userId Id of user that should be admin
   * @param {string} communityId Id of community to be deleted
   */
  async deleteCommunity(userId, communityId) {
    let response
    try {

      console.log({ userId })
      response = await this.collection.deleteOne({ admins: userId, _id: mongoose.Types.ObjectId(communityId) })

      if (response.deletedCount === 0) {
        return { error: 'Could not delete community' }
      }

    } catch (error) {
      response = { error }
    }

    return response
  }
}

export default CommunityRepository
