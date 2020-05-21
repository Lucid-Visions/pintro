import messagesDB from '../firebase';
import * as firebase from 'firebase';
import jwt from "jsonwebtoken";
import jwtData from "../bin/jwtData";

const Messaging = {

    /**
     * Get all data from a given groupchat.
     * @param {string} req the id of the groupchat. 
     * @param {*} res the creator, creation timestamp and messages of the groupchat.
     */
    getGroupchats(req, res) {
        let id = req.query.id;
        messagesDB.collection('groupchats')
            .doc(id)
            .get()
            .then(doc => {
                if (!doc.exists) {
                    return res.status(400).send("Document doesn't exist!")
                }
                else {
                    return res.status(200).json(doc.data());
                }
            })
            .catch(error => console.log(error))
    },

    /**
     * Get all private chats the given user has created or is part of. 
     * @param {string} req the id of the user.
     * @param {Array} res an array containing all the chats.
     */
    async getChats(req, res) {
        let chats = [];
        const decoded = jwt.verify(
            req.token,
            jwtData.publicKEY,
            jwtData.verifyOptions);
    
        const uid = decoded.user.uid;
        try {
            // Find the chats the user has created.
            let createdChats = await messagesDB.collection('chats')
                .where('uid', '==', uid)
                .get();
            createdChats.docs.map(doc => chats.push(doc.data()));
            // Find the chats the user is part of.
            let inChats = await messagesDB.collection('chats')
                .where('recipientid', '==', uid)
                .get()
            inChats.docs.map(doc => chats.push(doc.data()));
        }
        catch (error) {
            console.log(error);
            return res.status(400).send("Error!");
        }
        return res.status(200).send(chats)
    },

    /**
     * Get all groupchats the user has created or is part of.
     * @param {string} req the id of the user
     * @param {Array} res an array containing all the groupchats.
     */
    async getAllGroupchats(req, res) {
        let chats = [];
        const decoded = jwt.verify(
            req.token,
            jwtData.publicKEY,
            jwtData.verifyOptions);
    
        const uid = decoded.user.uid;
        try {
            let createdChats = await messagesDB.collection('groupchats')
                .where('uid', '==', uid)
                .get();
            createdChats.docs.map(doc => chats.push(doc.data()));
            let inChats = await messagesDB.collection('groupchats')
                .where('participants', 'array-contains', uid)
                .get();
            inChats.docs.map(doc => chats.push(doc.data()));
            return res.status(200).send(chats);
        }
        catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    },

    /**
     * Update the messages with the one the user has input.
     * Also return the updated messages.
     * @param {any} req the chat with the messages to update the current user id.
     * @param {void} res success or error warning
     */
    async updateChat(req, res) {
        let messages = JSON.parse(req.query.messages);
        const decoded = jwt.verify(
            req.token,
            jwtData.publicKEY,
            jwtData.verifyOptions);
    
        const uid = decoded.user.uid;
        try {
            let docs = await messagesDB.collection('chats')
                .where('uid', '==', uid)
                .get();
            if (docs) {
                let docRef = docs.docs[0].ref;
                // Delete fist and then add to avoid duplicates.
                await docRef.update({ messages: [] });
                await docRef.update({ messages: messages });
                return res.status(200).send("Messages successfully updated.");
            }
            else {
                console.log("Error");
            }
        }
        catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    },

    /**
     * Create a new chat document.
     * @param {any} req the chat content.
     * @param {*} res success or error.
     */
    async createChat(req, res) {
        const decoded = jwt.verify(
            req.token,
            jwtData.publicKEY,
            jwtData.verifyOptions);
    
        const uid = decoded.user.uid;
        let { type, context, recipientid } = req.body;
        if (type && uid && recipientid) {
            try {
                let ref = await messagesDB.collection('chats').add({
                    context: context || "",
                    type: type,
                    uid: uid,
                    recipientid: recipientid,
                    messages: []
                });
                res.status(200).send('Successfully created chat document with id ' + ref.id);
            }
            catch (error) {
                res.status(400).send("Error creating the chat!");
                console.log(error);
            }
        }
        else {
            res.status(400).send("User id or recipient id parameters missing!")
        }
    }

}

export default Messaging;