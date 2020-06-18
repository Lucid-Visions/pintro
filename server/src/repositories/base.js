import mongoose from 'mongoose'

class BaseRepository {

  constructor(db, collectionName) {
    this.collection = db.collection(collectionName)
  }

  /**
     * create
     *
     * @param {Object} record New database entry
     *
     * @returns {boolean} Operation success status
     */
  async create(record) {
    return this.collection.insertOne(record)
  }

  /**
   * get
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
}

export default BaseRepository
