import mongoose from 'mongoose'

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
   *
   * @param {string} id
   */
  async get(id) {
    return this.collection.find({ _id: mongoose.Types.ObjectId(id) }).toArray()
  }

  /**
     * Other CRUDs
     */

  // getAll() {

  // }

  // update() {

  // }

}

export default BaseRepository
