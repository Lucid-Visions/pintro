import jwt from 'jsonwebtoken'
import jwtData from '../bin/jwtData'
import ActionButtonModel from '../models/actionButton_model'

require('dotenv').config()

const ActionButtons = {
  /**
   *
   * @param {*} req payload should include type and context
   * @param {*} res
   */
  async create(req, res) {
    const decoded = jwt.verify(
      req.token,
      jwtData.publicKEY,
      jwtData.verifyOptions
    )
    const buttonData = req.body
    const authorId = decoded.user.uid
    if (!['help', 'introduce', 'talktomeabout', 'promoteme'].includes(buttonData.type)) {
      return res
        .status(400)
        .send({
          error: 'incorrect datatype',
          message: "Type must be 'help' or 'introduce' or 'talktomeabout' or 'promoteme'",
        })
    }
    let newButton = new ActionButtonModel({
      author: authorId,
      date_stamp: Date.now(),
      type: buttonData.type,
      context: buttonData.context,
      tags: buttonData.tags,
      communityIds: buttonData.communityIds,
    })

    await newButton.save()

    return res.status(201).json({ data: 'OK' })
  },
}

export default ActionButtons
