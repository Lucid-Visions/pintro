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
}

export default CommunityRepository
