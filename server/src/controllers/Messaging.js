import messagesDB from '../firebase'
import jwt from 'jsonwebtoken'
import jwtData from '../bin/jwtData'

import UserModel from '../models/user_model'

const Messaging = {

  /**
     * Get all private chats the given user has created or is part of.
     * @param {string} req the id of the user.
     * @param {Array} res an array containing all the chats.
     */
  async getChats(req, res) {
    const decoded = jwt.verify(
      req.token,
      jwtData.publicKEY,
      jwtData.verifyOptions)

    const uid = decoded.user.uid
    try {
      // Read chats from Firestore that this user belongs to
      let chats = []
      const chatData = await messagesDB.collection('chats')
        .where('userIds', 'array-contains', uid)
        .get()

      chatData.docs.map(doc => chats.push({ id: doc.id, ...doc.data()}))

      for (let i = 0; i < chats.length; i++) {
        const users = await UserModel.find({ _id: chats[i].userIds })

        chats[i] = { ...chats[i], users }
      }

      return res.status(200).json({ data: chats })

    } catch (error) {
      console.log(error)
      return res.status(400).send('Error!')
    }
  },

  async getChat(req, res) {
    const decoded = jwt.verify(
      req.token,
      jwtData.publicKEY,
      jwtData.verifyOptions)

    const uid = decoded.user.uid
    const chatId = req.params.id

    try {
      let doc = await messagesDB.collection("chats").doc(chatId).get();
      const users = await UserModel.find({ _id: doc.data().userIds })
      const chat = { id: doc.id, ...doc.data(), users }
      
      return res.status(200).json({ data: chat })

    } catch (error) {
      console.log(error)
      return res.status(400).send('Error!')
    }
  },

  /**
     * Update the messages with the one the user has input.
     * Also return the updated messages.
     * @param {any} req the chat with the messages to update the current user id.
     * @param {void} res success or error warning
     */
  async updateChat(req, res) {
    const chatId = req.params.id
    const message = req.body

    const decoded = jwt.verify(
      req.token,
      jwtData.publicKEY,
      jwtData.verifyOptions)

    const uid = decoded.user.uid

    try {
      
      let chat = await messagesDB.collection("chats").doc(chatId).get();

      const messages = [ ...chat.data().messages, message ]

      if (chat) {
        await chat.ref.update({ messages: messages })

        return res.status(200).send('Messages successfully updated.')
      } else {
        console.log('Error')
      }
    } catch (error) {
      console.log(error)
      res.status(400).send(error)
    }
  },

  /**
     * Create a new chat document.
     * @param {any} req the chat content.
     * @param {*} res success or error.
     */
  async createChat(req, res) {
    try {

      let ref = await messagesDB.collection('chats').add(req.body)

      res.status(200).json({ data: 'Successfully created chat document with id ' + ref.id })
    } catch (error) {
      res.status(400).json({ error: 'There was a problem sending this message.' })
    }
  },
}

export default Messaging
