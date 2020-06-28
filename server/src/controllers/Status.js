import jwt from 'jsonwebtoken'
import jwtData from '../bin/jwtData'
import StatusModel from '../models/status_model'
import UserModel from '../models/user_model'
import Notifications from './Notification'

require('dotenv').config()

const Status = {
  /**
   * get all articles or filter with parameters given
   * @param {*} req req query should contain parameters to search for
   * @param {*} res
   */
  getStatusData(req, res){
    // get the request parameters
    const query = req.query
    console.log('Search for', query)

    // search for articles according to the given parameters
    StatusModel.find(query, (error, doc) => {
      if (error) {
        console.log(error)
        return res.status(400).send('Wrong format for some of the search parameters.')
      } else {
        if (doc.length > 0){
          console.log('Successfully getting statuses')
          return res.status(200).json(doc)
        } else {
          return res.status(404).send('Status not found')
        }
      }
    })
  }, // end of getArticleData

  /**
   * post a new article
   * @param {*} req req query should contain data of the new post
   * @param {*} res
   */
  postStatusData(req, res){
    // decode the JWT token - authorise only registered users
    // to create articles and get id of the author
    const decoded = jwt.verify(
      req.token,
      jwtData.publicKEY,
      jwtData.verifyOptions)

    // get the user id, this user will be the author of the article
    const authorId = decoded.user.uid

    // get data of the new article
    const statusData = req.body

    if (statusData.tags == null){
      statusData.tags = []
    }

    UserModel.findById(authorId).exec(function(error, author){
      if (error || author == null){ // user not found, only a registered user can create an article
        res.status(401).send('Could not create the record')
      } else {
        let status = new StatusModel(
          {
            author: {
              author_id: author._id,
              name: author.name,
            },
            date_stamp: Date.now(),
            text: statusData.text,
            tags: [...statusData.tags],
            likes: [],
            comments: [],
            communityIds: [...statusData.communityIds],
          }
        )


        status.save().then(doc => {
          // console.log("Data saved"); // for debugging only
          console.log('Record successfully saved', doc)
          res.status(201).send(doc)
          // console.log("Response sent"); // for debugging only
        }).catch(error => {
          console.log(error)
          res.status(500).send('An error occurred while saving the data')
        })

      }
    })
  }, // end of postArticleData

  /**
   * update an existing article (PATCH - only update specified fields)
   * @param {*} req req query should contain the fields to be updated
   * @param {*} res
   */
  updateStatusData(req, res){
    // decode the JWT token to get user id
    const decoded = jwt.verify(
      req.token,
      jwtData.publicKEY,
      jwtData.verifyOptions)

    const userId = decoded.user.uid // id of the user making the update
    const statusId = req.params.id // id of the article being updated

    // get data to be updated
    const props = req.body

    // TODO: implement validation of likes and comments array fields;
    // updated records of each like and comment MUST
    // contain the required fields;
    // requiring the field in the schema does not work as expected;
    // needs to be hardcoded for now
    // update: writing custom validator for the arrays
    // could potentially solve the problem

    StatusModel.findById(statusId).exec(function(error, status){
      if (error || status === null) {
        res.status(404).send('No record matching the specified id found')
      } else {

        // check if the user is the author of the article
        // unauthorised users cannot update the article data
        if (status.author.author_id.toString() !== userId.toString()) {
          res.status(403).send('You are not authorised to update the specified record')
        } else {
          // actual updating of the record
          status.updateOne(props).exec(function(updateError, confirmation){
            if (updateError) {
              console.log(updateError)
              return res.status(500).send('Could not update the record')
            } else {
              return res.status(200).send(confirmation)
            }
          })
        }
      }
    })
  }, // end of updateArticleData

  /**
   * delete the specified article
   * @param {*} req req query should contain the id of the artile to be deleted
   * @param {*} res returns the deleted document
   */
  deleteStatusData(req, res){
    // decode the JWT token to get user id
    const decoded = jwt.verify(
      req.token,
      jwtData.publicKEY,
      jwtData.verifyOptions)

    const userId = decoded.user.uid // id of the user deleting the record
    const statusId = req.params.id // id of the article being deleted


    StatusModel.findById(statusId).exec(function(error, status){
      if (error || status === null) {
        res.status(404).send('No record matching the specified id found')
      } else {

        // only the author can delete the article from the database
        if (status.author.author_id.toString() !== userId.toString()) {
          res.status(403).send('You are not authorised to delete the specified record')
        } else {
          // actual deleting of the record
          StatusModel.findByIdAndRemove(statusId).then(function(deletedDoc){
            return res.status(200).send(deletedDoc)
          })
        }
      }
    })
  }, // end of deleteArticleData
}

const StatusLike = {
  /**
   * like an article
   * @param {*} req req params should contain the id of the article to add the new like to
   * @param {*} res
   */
  postLike(req, res){
    // decode the JWT token - authorise only registered users
    // to like articles and get id of the user
    const decoded = jwt.verify(
      req.token,
      jwtData.publicKEY,
      jwtData.verifyOptions)

    // get the user id
    const userId = decoded.user.uid

    // get data of the article
    const statusId = req.params.id

    UserModel.findById(userId).exec(function(error, user){
      if (error){ // user not found
        res.status(401).send('Incorrect user id.')
      } else {

        StatusModel.findById(statusId).exec(function(statusError, status){
          if (statusError || status === null) {
            res.status(401).send('The article could not be found')
          } else {
            // console.log(article);  // for debugging only
            let like = {
              user_id: user._id,
              user_name: user.name,
            }

            // make sure the user has not already liked the post
            if (status.likes.find((item) => item.user_id.toString() === like.user_id.toString())){
              res.status(200).send('Nothing changed')
              return
            }

            // if we get here, new like to be added to the array
            status.likes.push(like)

            status.save().then(doc => {
              Notifications.create(status.author.author_id, user.name + ' liked your status.', 'status', {status, user: userId})
              console.log('Record successfully updated. Like was added', doc)
              res.status(200).send(doc)
            }).catch(error => {
              console.log(error)
              res.status(500).send('An error occurred while saving the data')
            })

          }
        })

      }
    })
  }, // end of postLike

  /**
   * remove a like from the likes array
   * @param {*} req req params should contain the id of the article to unlike
   * @param {*} res
   */
  deleteLike(req, res){
    // decode the JWT token to get user id
    const decoded = jwt.verify(
      req.token,
      jwtData.publicKEY,
      jwtData.verifyOptions)

    const userId = decoded.user.uid // id of the user deleting the like
    const statusId = req.params.id // id of the article updated


    StatusModel.findById(statusId).exec(function(error, status){
      if (error || status === null) { // article not found
        res.status(404).send('No record matching the specified id found')
      } else {

        // find the index of the like in the array
        let likeIndex = status.likes.findIndex((item) => item.user_id.toString() === userId)

        if (likeIndex < 0){
          res.status(200).send('Nothing changed')
          return
        }

        // if we get here, there is a like to delete
        status.likes.splice(likeIndex, 1) // delete the like

        status.save().then(doc => {
          console.log('Record successfully updated. Like was removed', doc)
          res.status(200).send(doc)
        }).catch(error => {
          console.log(error)
          res.status(500).send('An error occurred while saving the data')
        })

      }
    })
  }, // end of deleteLike
}

const StatusComment = {
  /**
   * comment on an article
   * @param {*} req req params should contain the id of the article to comment on
   * @param {*} res
   */
  postComment(req, res){
    // decode the JWT token - authorise only registered users
    // to comment on articles and get id of the user
    const decoded = jwt.verify(
      req.token,
      jwtData.publicKEY,
      jwtData.verifyOptions)

    // get the user id
    const userId = decoded.user.uid

    // get the id of the article
    const statusId = req.params.id

    const commentText = req.body.text
    if (commentText === undefined || commentText === ''){ // comment text cannot be empty
      res.status(400).send('Comment text missing!')
      return
    }

    UserModel.findById(userId).exec(function(error, user){
      if (error || user === null){ // user not found
        return res.status(400).send('Incorrect user id.')
      } else {

        StatusModel.findById(statusId).exec(function(statusError, status){
          if (statusError || status === null) {
            return res.status(404).send('Article not found')
          } else {

            let comment = {
              user_id: user._id,
              user_name: user.name,
              profile_picture: user.profile_picture,
              text: commentText,
            }

            // add the new comment to the array
            status.comments.push(comment)

            status.save().then(doc => {
              Notifications.create(status.author.author_id, user.name + ' commented on your status', 'status', {status, user: userId})
              console.log('Record successfully updated. Comment was posted', doc)
              return res.status(200).send(doc)
            }).catch(error => {
              console.log(error)
              return res.status(500).send('An error occurred while saving the data')
            })

          }
        })

      }
    })
  }, // end of postComment

  /**
   * update an article comment
   * @param {*} req req params should contain the ids of the article and the comment to update
   * @param {*} res
   */
  updateComment(req, res){
    // decode the JWT token - authorise only registered users
    // to edit article comments and get id of the user
    const decoded = jwt.verify(
      req.token,
      jwtData.publicKEY,
      jwtData.verifyOptions)

    // get the user id
    const userId = decoded.user.uid

    // get the id of the article
    const statusId = req.params.statusId

    // get the id of the comment to edit
    const commentId = req.params.commentId

    const commentText = req.body.text
    if (commentText === undefined || commentText === ''){ // comment text cannot be empty
      res.status(400).send('Comment text cannot be empty')
      return
    }

    UserModel.findById(userId).exec(function(error, user){
      if (error || user === null){ // user not found
        res.status(400).send('Incorrect user id')
      } else {

        StatusModel.findById(statusId).exec(function(statusError, status){
          if (statusError || status === null) {
            res.status(404).send('Article not found')
          } else {

            let comment = status.comments.find(item => item._id.toString() === commentId)

            // check if the comment exists and was found
            if (comment === undefined){
              res.status(404).send('Comment not found')
              return
            }

            // check if the user can edit the comment, i.e they are the author
            if (comment.user_id.toString() !== userId){
              res.status(403).send('Not allowed to edit this comment')
              return
            }

            // if we get here, the comment can be updated
            comment.text = commentText

            status.save().then(doc => {
              console.log('Record successfully updated. Comment was updated', doc)
              res.status(200).send(doc)
            }).catch(error => {
              console.log(error)
              res.status(500).send('An error occurred while saving the data')
            })

          }
        })

      }
    })
  }, // end of updateComment

  /**
   * remove a comment from the comments array
   * @param {*} req req params should contain the id of the article and the comment to delete
   * @param {*} res
   */
  deleteComment(req, res){
    // decode the JWT token to get user id
    const decoded = jwt.verify(
      req.token,
      jwtData.publicKEY,
      jwtData.verifyOptions)

    // get the user id
    const userId = decoded.user.uid

    // get the id of the article
    const statusId = req.params.statusId

    // get the id of the comment to delete
    const commentId = req.params.commentId


    StatusModel.findById(statusId).exec(function(error, status){
      if (error || status === null) { // article not found
        res.status(404).send('No record matching the specified id found')
      } else {

        // find the comment in the array
        let comment = status.comments.find((item) => item._id.toString() === commentId)
        let commentIndex = status.comments.indexOf(comment)

        // check if comment found
        if (comment === undefined){
          res.status(404).send('Comment not found')
          return
        }

        // check if the user can delete the comment
        // only the author of the comment and the author of the article can delete the comment
        if (comment.user_id.toString() !== userId && status.author.author_id.toString() !== userId){
          res.status(403).send('Not allowed to delete this comment')
          return
        }

        // if we get here, the comment was found and the user can delete it
        status.comments.splice(commentIndex, 1) // delete the comment

        status.save().then(doc => {
          console.log('Record successfully updated. Comment was removed', doc)
          res.status(200).send(doc)
        }).catch(error => {
          console.log(error)
          res.status(500).send('An error occurred while saving the data')
        })

      }
    })
  }, // end of deleteComment
}

export {Status, StatusLike, StatusComment}
