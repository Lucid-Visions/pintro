
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
    return this.collection.insertOne(record)
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
