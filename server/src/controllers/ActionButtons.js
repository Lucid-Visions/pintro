import jwt from 'jsonwebtoken'
import jwtData from '../bin/jwtData'
import ActionButtonModel from '../models/actionButton_model'
import UserModel from '../models/user_model'
require('dotenv').config()

const ActionButtons = {
  /**
   *
   * @param {*} req payload should include type and context
   * @param {*} res
   */
  create(req, res) {
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
    })
    newButton
      .save()
      .then(doc => {
        // Add action button to users profile
        UserModel.findOneAndUpdate(
          { _id: authorId },
          { $push: { action_buttons: doc._id } },
          function(error, success) {
            if (error) {
              console.log(error)
            }
          }
        )

        return res.status(201).send({ message: 'Button saved', doc })
      })
      .catch(error => {
        return res.status(400).send({ error, message: error.message })
      })
  },

  delete(req, res) {
    const decoded = jwt.verify(
      req.token,
      jwtData.publicKEY,
      jwtData.verifyOptions
    )

    const userId = decoded.user.uid // id of the user deleting the record
    const helpRequestId = req.params.id // id of the article being deleted

    ActionButtonModel.findById(helpRequestId).exec(function(error, helpRequest){
      if (error || helpRequest === null) {
        res.status(404).send('No record matching the specified id found')
      } else {

        // only the author can delete the article from the database
        if (helpRequest.author._id.toString() !== userId.toString()) {
          res.status(403).send('You are not authorised to delete the specified record')
        } else {
          // actual deleting of the record
          ActionButtonModel.findByIdAndRemove(helpRequestId).then(function(deletedDoc){
            return res.status(200).send(deletedDoc)
          })
        }
      }
    })
  },
}

export default ActionButtons
