import NotificationModel from '../models/notification_model'
import jwt from 'jsonwebtoken'
import jwtData from '../bin/jwtData'
import { Expo } from 'expo-server-sdk'
import UserModel from '../models/user_model'
require('dotenv').config()

// Create a new Expo SDK client
let expo = new Expo()

const Notification = {
  capitalize(s) {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
  },
  /**
   * Call this method to create a new notification
   * @param {*} user -> id of the user this notification is for
   * @param {*} text -> text to be displayed
   * @param {*} notification_type -> what type of notification is it [status, badge, relationship] (more can be added)
   * @param {*} documentId -> the id of the document this notification is referencing. If notification_type is status, documentId should ref a status
   */
  async create(user, text, notification_type, documentId, sendPush = true) {
    let notification = new NotificationModel({
      user,
      notification_type,
      timestamp: Date.now(),
      text,
      status: notification_type === 'status' ? documentId : null,
      badge: notification_type === 'badge' ? documentId : null,
      relationship: notification_type === 'relationship' ? documentId : null,
    })
    let pushToken = await Notification.getPushToken(user)
    if (sendPush)
      Notification.sendNotificationToTokens(
        [pushToken],
        `${notification_type} update`,
        text
      )
    let result = await notification
      .save()
      .then((doc) => {
        return true
      })
      .catch((error) => {
        console.log(error)
        return false
      })

    return result
  },

  getNotifications(req, res) {
    const decoded = jwt.verify(
      req.token,
      jwtData.publicKEY,
      jwtData.verifyOptions
    )
    const authorId = decoded.user.uid
    NotificationModel.find({ user: authorId }, (err, doc) => {
      if (err) {
        console.log(err)
        return res.status(500).send({ error: err })
      }
      return res.status(200).json(doc)
    })
      .populate({
        path: 'badge relationship status.user status.status',
        populate: { path: 'follower' },
      })
      .sort({ timestamp: -1 })
  },

  async deleteNotification(req, res) {
    const decoded = jwt.verify(
      req.token,
      jwtData.publicKEY,
      jwtData.verifyOptions
    )
    const authorId = decoded.user.uid
    const notificationId = req.body.id
    console.log(authorId, notificationId)
    const response = await NotificationModel.deleteOne({
      _id: notificationId,
      user: authorId,
    }).catch((err) => console.log(err))
    if (response) {
      res.status(200).send(response)
    } else {
      res.status(500).send()
    }
  },

  /**
   *
   * @param {*} pushToken Token to push notification to. Should be of type array
   */
  sendNotificationToTokens(pushTokens, title, body) {
    if (!Array.isArray(pushTokens)) {
      throw Error('Please pass an array of tokens to pushTokens')
    }
    title = Notification.capitalize(title)
    let messages = []
    for (let pushToken of pushTokens) {
      // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

      // Check that all your push tokens appear to be valid Expo push tokens
      if (!Expo.isExpoPushToken(pushToken)) {
        console.error(`Push token ${pushToken} is not a valid Expo push token`)
        continue
      }

      // Construct a message (see https://docs.expo.io/versions/latest/guides/push-notifications)
      messages.push({
        to: pushToken,
        sound: 'default',
        title,
        body,
        data: { title, body },
      })
    }

    let chunks = expo.chunkPushNotifications(messages)
    let tickets = [];
    (async() => {
      for (let chunk of chunks) {
        try {
          let ticketChunk = await expo.sendPushNotificationsAsync(chunk)
          console.log(ticketChunk)
          tickets.push(...ticketChunk)
        } catch (error) {
          console.error(error)
        }
      }
    })()
  },

  async getPushToken(uid) {
    let res = {}
    await UserModel.findOne({ _id: uid }, (err, doc) => {
      if (err) {
        res = null
        return
      }
      if (!doc) {
        res = null
      } else {
        res = doc.pushToken
      }
    }).select('pushToken')
    return res
  },
}

export default Notification
