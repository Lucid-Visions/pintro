import * as firebase from 'firebase';

// Import environment variables
require("dotenv").config();

const config = {
    apiKey: process.env.FIREBASE_APIKEY,
    authDomain: process.envFIREBASE_AUTHDOMAIN,
    databaseURL: process.env.FIREBASE_DBURL,
    projectId: process.env.FIREBASE_PROJECTID,
    storageBucket: process.env.FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
    appId: process.env.FIREBASE_APPID,
    measurementId: process.env.FIREBASE_MEASUREMENTID
}

const app = firebase.initializeApp(config);
// Sign in anonymously for testing purposes.
try {
    const signIn = async () => await firebase.auth().signInAnonymously();
    signIn();
}
catch (error) {
    console.log(error)
}

const messagesDB = app.firestore();

export default messagesDB;