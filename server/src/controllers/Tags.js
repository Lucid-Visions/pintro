import TagModel from '../models/tags_model'
const Feed = {
  /**
     * Use this endpoint like this (GET) http://localhost:3000/api/v1/tags?job_title=true&passions=false
     * more complex queries can be used like this (GET) http://localhost:3000/api/v1/tags?query={"$or": [{ "_id": "5e7135004bfdff000770dcda" }, { "passions": "false" }]}
     * @param {*} req fields to search for in the tags collection
     * @param {*} res array of tags that match the search query or error message
     */
  async getTags(req, res) {
    let query = req.query
    if (query['query']){
      query = JSON.parse(query['query'])
    }
    console.log('Search for', query)
    await TagModel.find(query, (error, doc) => {
      if (error) {
        res
          .status(400)
          .send({
            err: 'Wrong format for some of the search parameters.',
            message: error,
          })
      } else {
        res.status(200).send(doc)
      }
    })
  },
}

export default Feed
