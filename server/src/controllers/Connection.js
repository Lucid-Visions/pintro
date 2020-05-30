import RelationshipModal from '../models/relationship_model'
import jwt from 'jsonwebtoken'
import jwtData from '../bin/jwtData'
import Notifications from './Notification'
import UserModel from '../models/user_model'
const Connection = {
  validTypes: ['USER', 'BUSINESS'],
  /**
   * Required bearer token
   * @param {*} req req.body should contain the id of the followee(person we are trying to follow) and followeeType (type of account we are following [user,business])
   * @param {*} res {message,doc}
   */
  async toggleConnection(req, res) {
    var body = req.body
    var followee = body.followee // connection to x
    var followeeType = body.followeeType // connection to x who is a [user/business]
    var intent = body.intent // intent by follower
    var message = body.message // message by follower

    if (!Connection.validTypes.includes(followeeType)) {
      return res.status(400).send({
        message:
          'Invalid account type: ' +
          followeeType +
          '. Valid types are: ' +
          Connection.validTypes.toString(),
      })
    }
    var decoded = jwt.verify(
      req.token,
      jwtData.publicKEY,
      jwtData.verifyOptions
    )
    var follower = decoded.user.uid
    if (follower === followee) {
      return res.status(200).send({ message: 'You cant follow yourself' })
    }
    let followerDoc = await UserModel.findById(follower).catch((e) =>
      console.log(e)
    )

    // check if blocked
    RelationshipModal.findOne(
      { follower: followee, followee: follower },
      function(_, relationReverse) {
        if (relationReverse === null || relationReverse.status !== 'BLOCKED') {
          RelationshipModal.findOne(
            {
              $or: [
                {
                  follower: follower,
                  followee: followee,
                  followeeType: followeeType,
                },
                {
                  follower: followee,
                  followee: follower,
                  followeeType: followeeType,
                },
              ],
            },
            function(_, relation) {
              if (relation === null) {
                // TODO check if user exists
                // request to follow
                let newConnection = new RelationshipModal({
                  follower: follower, // user id the invitation is from
                  followee: followee, // 0 => pending 1=> accepted 2=> declined
                  followeeType: followeeType, // the type of account being followed
                  startTime: new Date(), // time the request was sent
                  status: 'PENDING',
                  intent: intent,
                  message: message,
                })

                newConnection
                  .save()
                  .then((doc) => {
                    Notifications.create(
                      followee,
                      followerDoc.name + ' sent you a follow request.',
                      'relationship',
                      doc._id
                    )
                    return res
                      .status(200)
                      .send({ message: 'Follow Requested.', doc })
                  })
                  .catch((err) => {
                    console.log(err)
                    return res.status(400).send({ error: err })
                  })
              } else {
                var relationship = relation
                var status = relationship.status
                switch (status) {
                  case 'CONNECTED': {
                    // Unfollow
                    RelationshipModal.deleteOne(
                      { _id: relationship._id },
                      (err) => {
                        if (err) {
                          return res.status(500).send({ err })
                        }
                        return res.status(200).send({ message: 'Unfollowed.' })
                      }
                    )

                    Connection.removeLoggedUserFromUserCircle(followee, follower)
                    Connection.removeLoggedUserFromUserCircle(follower, followee)
                    break
                  }
                  case 'PENDING': {
                    // cancel request
                    RelationshipModal.deleteOne(
                      { _id: relationship._id },
                      (err) => {
                        if (err) {
                          return res.status(500).send({ err })
                        }
                        return res
                          .status(200)
                          .send({ message: 'Request canceled.' })
                      }
                    )
                    break
                  }
                  case 'BLOCKED':
                  case 'DECLINED': {
                    // re-follow
                    RelationshipModal.update(
                      { _id: relationship._id },
                      {
                        $set: {
                          startTime: new Date(),
                          endTime: null,
                          status: 'PENDING',
                        },
                      },
                      (_, doc) => {
                        return res
                          .status(200)
                          .send({ message: 'Follow Requested.', doc })
                      }
                    )
                    break
                  }
                  default: {
                    return res
                      .status(500)
                      .send({ message: 'Unable to handle connection status.' })
                  }
                }
              }
            }
          )
        } else {
          return res.status(400).send({
            error: 'BLOCKED',
            message: 'You have been blocked by this user',
          })
        }
      }
    )
  },

  toggleBlockUser(req, res) {
    var body = req.body
    var followee = body.followee // connection to x
    var followeeType = body.followeeType // connection to x who is a [user/business]

    if (!Connection.validTypes.includes(followeeType)) {
      return res.status(400).send({
        message:
          'Invalid account type: ' +
          followeeType +
          '. Valid types are: ' +
          Connection.validTypes.toString(),
      })
    }
    var decoded = jwt.verify(
      req.token,
      jwtData.publicKEY,
      jwtData.verifyOptions
    )
    var follower = decoded.user.uid
    if (follower === followee) {
      return res.status(200).send({ message: 'You cant block yourself' })
    }
    RelationshipModal.findOne(
      {
        $or: [
          {
            follower: follower,
            followee: followee,
            followeeType: followeeType,
          },
          {
            follower: followee,
            followee: follower,
            followeeType: followeeType,
          },
        ],
      },
      function(_, relation) {
        if (relation == null) {
          relation = { status: null }
        }
        switch (relation.status) {
          case 'BLOCKED': {
            RelationshipModal.deleteOne({ _id: relation._id }, (err) => {
              if (err) {
                return res.status(500).send({ err })
              }
              return res.status(200).send({ message: 'Unblocked.' })
            })
            break
          }
          default: {
            RelationshipModal.update(
              { _id: relation._id },
              {
                $set: {
                  follower,
                  followee,
                  followeeType,
                  startTime: new Date(),
                  endTime: null,
                  status: 'BLOCKED',
                },
              },
              { upsert: true },
              (_, doc) => {
                return res.status(200).send({ message: 'Blocked.', doc })
              }
            )
          }
        }
      }
    )
  },

  // get all users that the user is connected with
  getConnected(req, res) {
    var decoded = jwt.verify(
      req.token,
      jwtData.publicKEY,
      jwtData.verifyOptions
    )
    var uid = decoded.user.uid
    RelationshipModal
      .find(
        {
          $or: [
            { follower: uid, status: 'CONNECTED' },
            { followee: uid, status: 'CONNECTED' },
          ],
        },
        function(err, relations) {
          if (err) {
            console.log(err)
            return res.status(500).send({ message: err })
          } else {
            res.status(200).send(relations)
          }
        }
      )
      .populate('follower')
  },

  // relationships to and from. It does not matter if they are active or not
  getRelations(req, res) {
    var decoded = jwt.verify(
      req.token,
      jwtData.publicKEY,
      jwtData.verifyOptions
    )
    var uid = decoded.user.uid
    RelationshipModal.find(
      {
        $or: [{ follower: uid }, { followee: uid }],
      },
      function(err, relations) {
        if (err) {
          console.log(err)
          return res.status(500).send({ message: err })
        } else {
          res.status(200).send(relations)
        }
      }
    )
  },

  getPending(req, res) {
    var decoded = jwt.verify(
      req.token,
      jwtData.publicKEY,
      jwtData.verifyOptions
    )
    var uid = decoded.user.uid
    RelationshipModal.find({ follower: uid, status: 'PENDING' }, function(
      err,
      relations
    ) {
      if (err) {
        console.log(err)
        return res.status(500).send({ message: err })
      } else {
        res.status(200).send(relations)
      }
    })
  },

  async acceptRequest(req, res) {
    var decoded = jwt.verify(
      req.token,
      jwtData.publicKEY,
      jwtData.verifyOptions
    )
    var body = req.body
    var uid = decoded.user.uid
    var follower = body.follower // we are accepting the follow request from follower
    var response = body.response // either true => accept request or null/false => decline request
    let followerDoc = await UserModel.findById(uid).catch((e) =>
      console.log(e)
    )
    // the request must be PENDING if we want to modify it
    if (response) {
      // accept request
      RelationshipModal.findOneAndUpdate(
        { follower: follower, followee: uid, status: 'PENDING' },
        {
          $set: { status: 'CONNECTED', endTime: null },
        },
        (err, doc) => {
          if (err || doc == null) {
            return res.status(500).send({
              message: 'Unable to accept request. Please try again later.',
            })
          }
          if (doc.nModified === 0) {
            return res.status(200).send({ message: 'No modification.', doc })
          }
          Notifications.create(
            follower,
            followerDoc.name + ' accepted your follow request',
            'relationship',
            doc._id
          )
          return res.status(200).send({ message: 'Request accepted.', doc })
        }
      )
    } else {
      // decline request
      RelationshipModal.deleteOne(
        { follower: follower, followee: uid, status: 'PENDING' },
        (err, doc) => {
          if (err || doc == null) {
            return res.status(500).send({
              message: 'Unable to decline request. Please try again later.',
            })
          }
          if (doc.nModified === 0) {
            return res.status(200).send({ message: 'No modification.', doc })
          }
          return res.status(200).send({ message: 'Request declined.', doc })
        }
      )
    }
  },

  async deleteRelation(req, res) {
    var decoded = jwt.verify(
      req.token,
      jwtData.publicKEY,
      jwtData.verifyOptions
    )
    var body = req.body
    var loggedUser = decoded.user.uid
    const userToDelete = body.uid

    const response = await RelationshipModal
      .deleteOne({
        $or: [
          { follower: loggedUser, followee: userToDelete, status: 'CONNECTED' },
          { follower: userToDelete, followee: loggedUser, status: 'CONNECTED' },
        ],
      })
      .catch((err) => console.log(err))

    Connection.removeLoggedUserFromUserCircle(userToDelete, loggedUser)

    if (response === null || response.acknowledged === false)
      return res.status(500)

    return res.status(200).json({
      message:
        'Successfully deleted this person from your connections',
    })
  },

  async removeLoggedUserFromUserCircle(userId, loggedUser) {

    const response = await UserModel.updateOne({_id: userId}, {
      $pull: {'circles.innerCircle': loggedUser, 'circles.friendsCircle': loggedUser, 'circles.followersCircle': loggedUser},
    }).catch(err => console.log(err))

    if (response == null) {
      console.log('There was an error while removing the logged user form the other user circles')
    } else {
      console.log('Successfully removed logged user from other user circles lists')
    }
  },
}

export default Connection
