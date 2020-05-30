import jwt from 'jsonwebtoken'
import jwtData from '../bin/jwtData'
import UserModel from '../models/user_model'
import relationship_model from '../models/relationship_model'

import PasswordHasher from '../controllers/PasswordHashing'

require('dotenv').config()

const User = {
  /**
   * get the data for the user with the provided id as param
   * @param {*} userId should contain the id of the user we want to get the data for
   */
  async search(userId) {
    // search for user with the given userId
    const res = await UserModel.findOne({ _id: userId }, (err, doc) => {
      if (err) {
        console.log(err)
        return {
          err: {
            error: 'Wrong format for some of the search parameters.',
          },
          status: 500,
        }
      } else {
        if (doc) {
          return doc
        } else {
          return {
            err: {
              error: 'User does not exist',
            },
            status: 404,
          }
        }
      }
    })
      .select(
        '-password_hash -password -linked_in_id -google_id -facebook_id -user_id'
      )
      .populate('action_buttons circles.innerCircle circles.friendsCircle circles.followersCircle')

    return res
  },

  /**
   * method to be called from the GET api endpoint with jwtData, req, and res
   * @param {*} req contains as a parameter the id of the user we want the data for
   * @param {*} res
   */
  async getUserData(req, res) {
    // verify the jwt token
    var decoded = jwt.verify(
      req.token,
      jwtData.publicKEY,
      jwtData.verifyOptions
    )

    // get the currently logged user id
    const loggedUserId = decoded.user.uid

    // get the user id we want info for
    let userDataToGet = req.query.id
    if (typeof userDataToGet === 'undefined') {
      console.log('Search for logged user')
      // If no ID is given get the logged user data
      if (loggedUserId == null)
        return res.status(500).json({ error: 'No user is logged in!' })
      else {
        const result = await User.search(loggedUserId).catch(err => {
          return res.status(500).send(err)
        })

        if (result.err) {
          return res.status(500).send(result.err)
        } else {
          return res.status(200).send(result)
        }
      }
    } else {
      console.log('Search for user with id', userDataToGet)
      const result = await User.search(userDataToGet).catch(err => {
        return res.status(500).send(err)
      })

      if (result == null || result.err) {
        return res.status(500).send({error: 'Document not found', message: 'Document not found'})
      } else {
        // cast the Mongoose schema model result to a JSON Object
        // so we can assign the followee status later
        let userData = result.toObject()
        let relationshipData = {status: 'NOT CONNECTED'}

        // get the relationship between loggedUserId and userDataId
        const relationshipResult = await User.getUserRelationshipStatus(
          loggedUserId,
          userDataToGet
        ).catch(err => console.log(err))

        if (relationshipResult) {
          relationshipData = relationshipResult
        }

        userData.relationshipData = relationshipData
        return res.status(200).send(userData)
      }
    }
  },

  /**
   * method to be called from the PATCH api endpoint to update the currently logged user data
   * @param {*} req should contain the id of the user data to update
   * @param {*} res
   */
  userUpdate(req, res) {
    // verify the jwt token
    var decoded = jwt.verify(
      req.token,
      jwtData.publicKEY,
      jwtData.verifyOptions
    )

    // get the logged user id from the jwt token
    var userId = decoded.user.uid

    // get props to update and make sure to filter sensitive fields
    const props = req.body

    if (
      props.linked_in_id ||
      props.user_id ||
      props.google_id ||
      props.facebook_id
    ) {
      return res.status(401).json({
        error: 'Unauthorized update of protected fields',
      })
    }

    // update user details for the currently logged user
    UserModel.updateOne({ _id: userId }, props, (err, doc) => {
      if (err) {
        console.log(err)
        return res.status(500).json({ error: 'Wrong id parameter format.' })
      } else {
        if (doc !== '') {
          console.log(`User with id: ${userId} updated successfully.`)
          return res.status(200).json(doc)
        } else {
          return res.status(404).json({ error: 'User with id not found' })
        }
      }
    })
  },

  /**
   * method to be called form the DELETE api endpoint to delete the currently logged user
   * @param {*} req
   * @param {*} res
   */
  userDelete(req, res) {
    // verify the jwt token
    var decoded = jwt.verify(
      req.token,
      jwtData.publicKEY,
      jwtData.verifyOptions
    )

    const loggedUserId = decoded.user.uid

    const response = UserModel.deleteOne({ _id: loggedUserId }).catch(err =>
      console.log(err)
    )

    if (response === null || response.acknowledged === false)
      return res.status(500)

    return res.status(200).json({
      message:
        'Successfully deleted your account and all your data in our system.',
    })
  },

  /**
   * Return the relationship between two users, usually the logged user
   * and some other user. can be used for business accounts as well.
   * @param {*} followerID the currently logged user ID
   * @param {*} followeeID check the relationship with the user with this ID
   */
  async getUserRelationshipStatus(loggedUser, otherUser) {

    const res = await relationship_model.findOne(
      {
        $or: [
          { follower: loggedUser, followee: otherUser },
          { follower: otherUser, followee: loggedUser },
        ],
      },
      (err, doc) => {
        if (err) {
          console.log(err)
          return null
        }
        if (doc) {
          return doc
        } else {
          return null
        }
      }
    ).populate('follower')

    if (res === null) return null

    if (res.status === 'PENDING' && res.followee === loggedUser)
      res.status = 'RESPONSE'

    // return just the relationship status with the followee
    return res || null
  },

  checkInLocation(req, res) {
    var decoded = jwt.verify(
      req.token,
      jwtData.publicKEY,
      jwtData.verifyOptions
    )

    const loggedUserId = decoded.user.uid
    UserModel.updateOne(
      { _id: loggedUserId },
      {
        location: {
          type: 'Point',
          coordinates: [req.body.longitude, req.body.latitude],
        },
      },
      (err, doc) => {
        if (err) {
          console.log(err)
          return res.status(500).json({ error: 'Wrong id parameter format.' })
        } else {
          if (doc !== '') {
            console.log(`User with id: ${loggedUserId} updated successfully.`)
            return res.status(200).json(doc)
          } else {
            return res.status(404).json({ error: 'User with id not found' })
          }
        }
      }
    )
  },

  /**
   * Finds the password of the currently logged user,
   * used in Settings -> Account to compare entered
   * old pass with current password
   * @param {*} req
   * @param {*} res
   */
  async checkUserPass(req, res) {
    var decoded = jwt.verify(
      req.token,
      jwtData.publicKEY,
      jwtData.verifyOptions
    )

    const loggedUid = decoded.user.uid
    const passToCheck = req.body.currentPass

    const response = await UserModel.findOne({ _id: loggedUid }, (err, doc) => {
      if (err) {
        console.log(err)
        return {error: err}
      }
      return doc
    }).select('password_hash')

    if (response.error){
      return res.status(500).send({error: response.error})
    } else {
      const verified = PasswordHasher.verifyPassword(passToCheck, response.password_hash)
      return res.status(200).json({verified: verified})
    }
  },

  async updateCircles(req, res) {
    // verify the jwt token
    const decoded = jwt.verify(
      req.token,
      jwtData.publicKEY,
      jwtData.verifyOptions
    )

    // get the logged user id from the jwt token
    const uid = decoded.user.uid

    // get props to update
    const props = req.body
    const follower = props.follower
    let itemToPush = {}

    switch (props.circle){
      case 0:
        itemToPush = { 'circles.innerCircle': follower }
        break
      case 1:
        itemToPush = { 'circles.friendsCircle': follower }
        break
      case 2:
        itemToPush = { 'circles.followersCircle': follower }
        break
      default: itemToPush = { 'circles.followersCircle': follower }
    }

    const responseOne = await UserModel.updateOne(
      { _id: uid },
      {$addToSet: itemToPush },
      (err, doc) => {
        if (err){
          return res.status(500).send({error: 'Unable to assign circle. Please try again later.'})
        }
        if (doc.nModified === 0){
          return false
        }
        return true
      }
    )

    const responseTwo = await UserModel.updateOne(
      { _id: follower },
      {$addToSet: { 'circles.followersCircle': uid } },
      (err, doc) => {
        if (err){
          return res.status(500).send({error: 'Unable to assign circle. Please try again later.'})
        }
        if (doc.nModified === 0){
          return false
        }
        return true
      }
    )

    if (!responseOne || !responseTwo){
      return res.status(404).json({error: "Couldn't add users to circles"})
    } else return res.status(200).json({message: 'Users added to circles'})

  },
}

export default User
