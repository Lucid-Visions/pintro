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
    let response
    try {
      const collection = await this.collection.find({ _id: mongoose.Types.ObjectId(id) })

      if (await collection.count() === 0) {
        return { error: 'Record not found' }
      }

      response = { data: await collection.toArray() }

    } catch (error) {
      response = { error }
    }

    return response
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
