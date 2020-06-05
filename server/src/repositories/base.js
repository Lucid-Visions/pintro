
class BaseRepository {

  constructor(db, collectionName) {
    this.collection = db.collection(collectionName)
  }

  /**
     *
     * @param {Object} record New database entry
     * 
     * @returns {boolean} Operation success status
     */
  async create(record) {
    const response = await this.collection.insertOne(record)

    return Boolean(response.result.ok)
  }

  /**
     * Other CRUDs
     */

  // getAll() {

  // }

  // get(id) {

  // }

  // update() {

  // }

}

export default BaseRepository
