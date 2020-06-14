import express from 'express'

import Database from '../database'

import SignIn from '../controllers/Signin'
import User from '../controllers/User'
import Search from '../controllers/Search'
import Business from '../controllers/Business'
import Hub from '../controllers/Hub'
import Connection from '../controllers/Connection'
import { Article, ArticleLike, ArticleComment } from '../controllers/Article'
import { Status, StatusLike, StatusComment } from '../controllers/Status'

import Feed from '../controllers/Feed'
import Map from '../controllers/Map'

import Tags from '../controllers/Tags'
import jwtData from '../bin/jwtData'
import Messaging from '../controllers/Messaging'
import Panel from '../controllers/Panel'
import ActionButtons from '../controllers/ActionButtons'
import Notifications from '../controllers/Notification'
import ResetPassword from '../controllers/ResetPassword'
import CommunityController from '../controllers/community'

const router = express.Router()
const connection = new Database()
const communityController = new CommunityController(connection.getDatabase())


/* ------------- Register -------------*/
router.post('/register/email_and_password', SignIn.registerEmailAndPassword)
router.post('/verify/email_and_password', jwtData.verifyToken, SignIn.verifyEmailAndPassword)

/* ------------- SignIn -------------*/

router.post('/signin/email_and_password', SignIn.emailAndPassword)
router.post('/signin/linked_in', SignIn.linkedIn)
router.post('/signin/facebook', SignIn.facebook)
router.post('/signin/google', SignIn.google)

/* ------------- User Data -------------*/

router.get('/user/data', jwtData.verifyToken, User.getUserData)
router.patch('/user/data', jwtData.verifyToken, User.userUpdate)
router.delete('/user/data', jwtData.verifyToken, User.userDelete)

router.put('/user/checkin', jwtData.verifyToken, User.checkInLocation)

router.patch('/user/circle', jwtData.verifyToken, User.updateCircles)

/* ------------- Check User Password -------------*/

router.post('/user/checkPassword', jwtData.verifyToken, User.checkUserPass)

/* ------------- Search -------------*/

router.get('/search', Search.searchData)

/* ------------- Connection -------------*/
router.put('/connection', jwtData.verifyToken, Connection.toggleConnection) // Request to follow, Unfollow, Cancel request
router.put('/connection/block', jwtData.verifyToken, Connection.toggleBlockUser) // Request to follow, Unfollow, Cancel request
router.get('/connection/connected', jwtData.verifyToken, Connection.getConnected) // get all users that you are connected with
router.get('/connection/pending', jwtData.verifyToken, Connection.getPending) // get pending requests
router.post('/connection/respond', jwtData.verifyToken, Connection.acceptRequest) // accept/decline follow request
router.get('/connection', jwtData.verifyToken, Connection.getRelations) // get all relationships this user is involved in
router.delete('/connection', jwtData.verifyToken, Connection.deleteRelation) // delete a relation with a user you are connected with

/* ------------- Business -------------*/
router.get('/business/my', jwtData.verifyToken, Business.getMyBusinesses)
router.get('/business/all', Business.getAllBusinesses)
router.get('/business', Business.getBusinessData)
router.post('/business', jwtData.verifyToken, Business.postBusinessData)
router.patch('/business/:id', jwtData.verifyToken, Business.updateBusinessData)
router.delete('/business/:id', jwtData.verifyToken, Business.deleteBusinessData)


/* ------------- Hub -------------*/

router.get('/hub', Hub.getHubData)
router.post('/hub', jwtData.verifyToken, Hub.postHubData)
router.patch('/hub/:id', jwtData.verifyToken, Hub.updateHubData)
router.delete('/hub/:id', jwtData.verifyToken, Hub.deleteHubData)

/* ---------- Firebase ---------*/
router.get('/chat/gc', jwtData.verifyToken, Messaging.getGroupchats)
router.get('/chat/chat', jwtData.verifyToken, Messaging.getChats)
router.patch('/chat/update', jwtData.verifyToken, Messaging.updateChat)
router.get('/chat/gcAll', jwtData.verifyToken, Messaging.getAllGroupchats)
router.put('/chat', jwtData.verifyToken, Messaging.createChat)

/* ------------- Article -------------*/
router.get('/article', Article.getArticleData)
router.post('/article', jwtData.verifyToken, Article.postArticleData)
router.patch('/article/:id', jwtData.verifyToken, Article.updateArticleData)
router.delete('/article/:id', jwtData.verifyToken, Article.deleteArticleData)

router.post('/article/:id/like', jwtData.verifyToken, ArticleLike.postLike)
router.delete('/article/:id/like', jwtData.verifyToken, ArticleLike.deleteLike)

router.post('/article/:id/comment', jwtData.verifyToken, ArticleComment.postComment)
router.patch('/article/:articleId/comment/:commentId', jwtData.verifyToken, ArticleComment.updateComment)
router.delete('/article/:articleId/comment/:commentId', jwtData.verifyToken, ArticleComment.deleteComment)


/* ------------- Status -------------*/
router.get('/status', Status.getStatusData)
router.post('/status', jwtData.verifyToken, Status.postStatusData)
router.patch('/status/:id', jwtData.verifyToken, Status.updateStatusData)
router.delete('/status/:id', jwtData.verifyToken, Status.deleteStatusData)

router.post('/status/:id/like', jwtData.verifyToken, StatusLike.postLike)
router.delete('/status/:id/like', jwtData.verifyToken, StatusLike.deleteLike)

router.post('/status/:id/comment', jwtData.verifyToken, StatusComment.postComment)
router.patch('/status/:statusId/comment/:commentId', jwtData.verifyToken, StatusComment.updateComment)
router.delete('/status/:statusId/comment/:commentId', jwtData.verifyToken, StatusComment.deleteComment)

/* ------------ Admin panel ----------*/
router.get('/panel/getAllUsers', Panel.getAllUsers)
router.patch('/panel/reset/:id', Panel.resetPassword)
router.put('/panel/status/:id/:status', Panel.changeStatus)

/* ------------- Tags -------------*/
router.get('/tags', Tags.getTags)

/* ------------- ActionButtons -------------*/
router.post('/actionbutton', jwtData.verifyToken, ActionButtons.create)

/* ------------- Feed -------------*/
router.get('/feed', jwtData.verifyToken, Feed.getFeedData)

/* ------------- Map -------------*/
router.get('/map', jwtData.verifyToken, Map.getMapData)

/* ------------- Notifications -------------*/
router.get('/notification', jwtData.verifyToken, Notifications.getNotifications)
router.delete('/notification', jwtData.verifyToken, Notifications.deleteNotification)

/* ------------- Send password reset email -------------*/
router.get('/resetpassword', ResetPassword.requestEmailToken)
router.post('/resetpassword', ResetPassword.verifyAndReset)
router.post('/changePass', jwtData.verifyToken, ResetPassword.changePass)
router.get('/newpassword', ResetPassword.newPasswordPage)

/**
 *  Community
 */
router.post('/community', jwtData.verifyToken, communityController.createCommunity.bind(communityController))
router.get('/community/:id', jwtData.verifyToken, communityController.getCommunity.bind(communityController))
router.get('/community', jwtData.verifyToken, communityController.getCommunities.bind(communityController))

export default router
