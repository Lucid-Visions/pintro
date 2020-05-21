import express from 'express'
import { json, urlencoded } from "body-parser"
import SignIn from "./controllers/Signin"
import User from "./controllers/User"
import Search from "./controllers/Search"
import Business from "./controllers/Business"
import Hub from "./controllers/Hub"
import Connection from "./controllers/Connection"
import { Article, ArticleLike, ArticleComment } from "./controllers/Article"
import { Status, StatusLike, StatusComment } from "./controllers/Status"

import Feed from "./controllers/Feed"
import Map from "./controllers/Map"

import Tags from "./controllers/Tags"
import Database from "./database"
import jwtData from "./bin/jwtData"
import jwt from "jsonwebtoken"
import Messaging from './controllers/Messaging';
import Panel from './controllers/Panel'
import ActionButtons from "./controllers/ActionButtons"
import Notifications from "./controllers/Notification"
import ResetPassword from "./controllers/ResetPassword"

const app = express()

app.use(urlencoded({ extended: true }));
app.use(json());


/*------------- Endpoints -------------*/

/*------------- Register -------------*/
app.post("/api/v1/register/email_and_password", SignIn.registerEmailAndPassword)
app.post("/api/v1/verify/email_and_password", jwtData.verifyToken, SignIn.verifyEmailAndPassword)

/*------------- SignIn -------------*/

app.post("/api/v1/signin/email_and_password", SignIn.emailAndPassword)
app.post("/api/v1/signin/linked_in", SignIn.linkedIn)
app.post("/api/v1/signin/facebook", SignIn.facebook)
app.post("/api/v1/signin/google", SignIn.google)

/*------------- User Data -------------*/

app.get("/api/v1/user/data", jwtData.verifyToken, User.getUserData)
app.patch("/api/v1/user/data", jwtData.verifyToken, User.userUpdate)
app.delete("/api/v1/user/data", jwtData.verifyToken, User.userDelete)

app.put("/api/v1/user/checkin", jwtData.verifyToken, User.checkInLocation)

app.patch("/api/v1/user/circle", jwtData.verifyToken, User.updateCircles)

/*------------- Check User Password -------------*/

app.post("/api/v1/user/checkPassword", jwtData.verifyToken, User.checkUserPass)

/*------------- Search -------------*/

app.get("/api/v1/search", Search.searchData)

/*------------- Connection -------------*/
app.put("/api/v1/connection",jwtData.verifyToken, Connection.toggleConnection) //Request to follow, Unfollow, Cancel request
app.put("/api/v1/connection/block",jwtData.verifyToken, Connection.toggleBlockUser) //Request to follow, Unfollow, Cancel request
app.get("/api/v1/connection/connected",jwtData.verifyToken, Connection.getConnected) //get all users that you are connected with
app.get("/api/v1/connection/pending",jwtData.verifyToken, Connection.getPending) //get pending requests
app.post("/api/v1/connection/respond",jwtData.verifyToken, Connection.acceptRequest) //accept/decline follow request
app.get("/api/v1/connection",jwtData.verifyToken, Connection.getRelations) //get all relationships this user is involved in
app.delete("/api/v1/connection",jwtData.verifyToken, Connection.deleteRelation) //delete a relation with a user you are connected with

/*------------- Business -------------*/
app.get("/api/v1/business/my",jwtData.verifyToken, Business.getMyBusinesses);
app.get("/api/v1/business/all", Business.getAllBusinesses);
app.get("/api/v1/business", Business.getBusinessData);
app.post("/api/v1/business", jwtData.verifyToken, Business.postBusinessData);
app.patch("/api/v1/business/:id", jwtData.verifyToken, Business.updateBusinessData);
app.delete("/api/v1/business/:id", jwtData.verifyToken, Business.deleteBusinessData);


/*------------- Hub -------------*/

app.get("/api/v1/hub", Hub.getHubData);
app.post("/api/v1/hub", jwtData.verifyToken, Hub.postHubData);
app.patch("/api/v1/hub/:id", jwtData.verifyToken, Hub.updateHubData);
app.delete("/api/v1/hub/:id", jwtData.verifyToken, Hub.deleteHubData);

/*---------- Firebase ---------*/
app.get("/api/v1/chat/gc", jwtData.verifyToken, Messaging.getGroupchats);
app.get("/api/v1/chat/chat", jwtData.verifyToken, Messaging.getChats);
app.patch("/api/v1/chat/update", jwtData.verifyToken, Messaging.updateChat);
app.get("/api/v1/chat/gcAll", jwtData.verifyToken, Messaging.getAllGroupchats)
app.put("/api/v1/chat", jwtData.verifyToken, Messaging.createChat);

/*------------- Article -------------*/
app.get("/api/v1/article", Article.getArticleData);
app.post("/api/v1/article", jwtData.verifyToken, Article.postArticleData);
app.patch("/api/v1/article/:id", jwtData.verifyToken, Article.updateArticleData);
app.delete("/api/v1/article/:id", jwtData.verifyToken, Article.deleteArticleData);

app.post("/api/v1/article/:id/like", jwtData.verifyToken, ArticleLike.postLike);
app.delete("/api/v1/article/:id/like", jwtData.verifyToken, ArticleLike.deleteLike);

app.post("/api/v1/article/:id/comment", jwtData.verifyToken, ArticleComment.postComment);
app.patch("/api/v1/article/:articleId/comment/:commentId", jwtData.verifyToken, ArticleComment.updateComment);
app.delete("/api/v1/article/:articleId/comment/:commentId", jwtData.verifyToken, ArticleComment.deleteComment);


/*------------- Status -------------*/
app.get("/api/v1/status", Status.getStatusData);
app.post("/api/v1/status", jwtData.verifyToken, Status.postStatusData);
app.patch("/api/v1/status/:id", jwtData.verifyToken, Status.updateStatusData);
app.delete("/api/v1/status/:id", jwtData.verifyToken, Status.deleteStatusData);

app.post("/api/v1/status/:id/like", jwtData.verifyToken, StatusLike.postLike);
app.delete("/api/v1/status/:id/like", jwtData.verifyToken, StatusLike.deleteLike);

app.post("/api/v1/status/:id/comment", jwtData.verifyToken, StatusComment.postComment);
app.patch("/api/v1/status/:statusId/comment/:commentId", jwtData.verifyToken, StatusComment.updateComment);
app.delete("/api/v1/status/:statusId/comment/:commentId", jwtData.verifyToken, StatusComment.deleteComment);

/*------------ Admin panel ----------*/
app.get("/api/v1/panel/getAllUsers", Panel.getAllUsers);
app.patch("/api/v1/panel/reset/:id", Panel.resetPassword);
app.put("/api/v1/panel/status/:id/:status", Panel.changeStatus)

/*------------- Tags -------------*/
app.get("/api/v1/tags", Tags.getTags)

/*------------- ActionButtons -------------*/
app.post("/api/v1/actionbutton", jwtData.verifyToken, ActionButtons.create)

/*------------- Feed -------------*/
app.get("/api/v1/feed", jwtData.verifyToken, Feed.getFeedData)

/*------------- Map -------------*/
app.get("/api/v1/map", jwtData.verifyToken, Map.getMapData)

/*------------- Notifications -------------*/
app.get("/api/v1/notification", jwtData.verifyToken, Notifications.getNotifications)
app.delete("/api/v1/notification", jwtData.verifyToken, Notifications.deleteNotification)

/*------------- Send password reset email -------------*/
app.get("/api/v1/resetpassword",  ResetPassword.requestEmailToken)
app.post("/api/v1/resetpassword",  ResetPassword.verifyAndReset)
app.post("/api/v1/changePass", jwtData.verifyToken,  ResetPassword.changePass)
app.get("/newpassword",  ResetPassword.newPasswordPage)


/*------------- Start Listening -------------*/

// const port = 3001;
// app.listen(port);
//
// console.log(`API listening on ${port}`);


export default app;
