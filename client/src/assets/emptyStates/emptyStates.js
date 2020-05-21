import { Linking } from 'react-native'

const sources = {
  internet: require("./noInternet.png"),
  message: require("./noMessages.png"),
  location: require("./noLocation.png"),
  notification: require("./noNotifications.png"),
  results: require("./noResults.png"),
  oops: require("./oops.png")
};

export const text = {
  internet: {
    h1: "No internet connection",
    h2: "Please check your connection settings",
    button: "Internet Settings"
  },
  message: {
    h1: "No messages",
    h2: "Connect with someone and get the conversation going!",
    button: "Start new chat"
  },
  location: {
    h1: "No GPS connection",
    h2: "Please check your location settings",
    button: "Location settings"
  },
  notification: {
    h1: "No notifications",
    h2: "You're all caught up. Check back later",
    button: "Go Home"
  },
  results: {
    h1: "No results found",
    h2: "Try adjusting your search to find what you're looking for.",
    button: "Search again"
  },
  oops: {
    h1: "Oops!",
    h2: "Something went wrong. Please try again",
    button: "Retry"
  }
};

export const actions = {
  internet: ()=>Linking.openURL('App-Prefs://root=WIFI'),
  message: ()=>{},
  location: ()=>Linking.openURL('App-Prefs:'),
  notification: ()=>{},
  results: ()=>{},
  oops: ()=>{}
};

export default sources;
