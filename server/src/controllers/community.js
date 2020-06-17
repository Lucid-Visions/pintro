import http from 'http-status-codes'

import jwt from 'jsonwebtoken'
import jwtData from '../bin/jwtData'
import CommunityRepository from '../repositories/community'

import { isEmpty } from '../utils'

class CommunityController {

  constructor(db) {
    this.repository = new CommunityRepository(db, 'communities')
  }

  /**
     *
     * @param {Request} req HTTP request send from client
     * @param {Response} res HTTP response that is returned
     */
  async createCommunity(req, res) {

    // Return error if body is missing
    if (isEmpty(req.body)) {
      return res.status(http.BAD_REQUEST).json({ error: { message: 'Communty request body missing' }})
    }

    // Decode jwt
    const decodedJwt = jwt.verify(
      req.token,
      jwtData.publicKEY,
      jwtData.verifyOptions
    )

    // Return error if userId is not present
    if (!decodedJwt.user.uid) {
      return res.status(http.BAD_REQUEST).json({ error: { message: 'Could not read user token' }})
    }

    // Return error if community already exsits
    const dupecommunities = await this.repository.getByName(req.body.name)

    if (dupecommunities && dupecommunities.length > 0) {
      return res.status(http.BAD_REQUEST).json({ error: { message: 'Community already exists' }})
    }

    const community = { ...req.body, users: [ decodedJwt.user.uid ], admins: [ decodedJwt.user.uid ] }
    const createResult = await this.repository.create(community)

    // Return error if there is a DB issue on creation
    if (!createResult.result.ok) {
      return res.status(http.BAD_REQUEST).json({ error: { message: 'Community could not be created' }})
    }

    res.status(http.CREATED).json({
      data: {
        insertedId: createResult.insertedId,
        insertedCount: createResult.insertedCount,
      },
    })
  }

  /**
   *
   * @param {Request} req HTTP request send from client
   * @param {Response} res HTTP response that is returned
   */
  async getCommunity(req, res) {
    const id = req.params.id

    const response = await this.repository.get(id)

    if (response.error) {
      return res.status(http.BAD_REQUEST).json({ error: { message: 'Could not retrieve community' }})
    }

    const [ community ] = response.data
    return res.status(http.OK).json({ data: community })
  }

  /**
   *
   * @param {Request} req HTTP request send from client
   * @param {Response} res HTTP response that is returned
   */
  async getCommunities(req, res) {

    // Decode jwt
    const decodedJwt = jwt.verify(
      req.token,
      jwtData.publicKEY,
      jwtData.verifyOptions
    )

    // Return error if userId is not present
    if (!decodedJwt.user.uid) {
      return res.status(http.BAD_REQUEST).json({ error: { message: 'Could not read user token' }})
    }

    const response = await this.repository.getUserCommunities(decodedJwt.user.uid)

    if (response.error) {
      return res.status(http.BAD_REQUEST).json({ error: { message: 'Could not retrieve communities for user' }})
    }

    return res.status(http.OK).json({ data: response.data })
  }
}

export default CommunityController
