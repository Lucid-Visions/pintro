import BaseRepository from './base'

class CommunityRepository extends BaseRepository {

  /**
     *
     * @param {string} name Community name
     */
  getByName(name) {
    return this.collection.find({ name }).toArray()
  }
}

export default CommunityRepository
