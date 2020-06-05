import CommunityRepository from '../repositories/community'

class CommunityController {

  constructor(db) {
    this.repository = new CommunityRepository(db, 'communities')
  }

  /**
     *
     * @param {Request} req HTTP request send from client
     * @param {Response} res HTTP response that is returned
     */
  async create(req, res) {

    // Return error if community already exsits
    const dupeUsers = await this.repository.getByName(req.body.name)
    if (dupeUsers && dupeUsers.length > 0) {

      console.log({ dupeUsers })
      return res.status(400).json({ error: { message: 'Record already exists' }})
    }
  
    const isCreated = await this.repository.create(req.body)
    
    console.log({ isCreated })
    // Return error if there is a DB issue on creation
    if (!isCreated) {
      return res.status(400).json({ error: { message: 'Record could not be created' }})
    }

    res.status(201).send('Community created')
  }
}

export default CommunityController
