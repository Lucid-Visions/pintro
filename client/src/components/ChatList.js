/**
 * Index of functions in the class:
 *  - main rendering functions:
 *    * renderCommunityChats
 *    * renderDirectChats
 *    * render
 *  - auxiliary rendering functions:
 *    * renderLastMesssage  <- last message in a direct chat
 *    * renderToggleButton  <- "see all/see less" button for community chats
 *    * renderSearchBar
 *    * renderPadding   <- padding for the community chats list
 *  - other auxiliary functions:
 *    * filterResults  <- filter chats
 *    * toggleDisplayedCommunityChats
 *    * getMessageTimestamp   <- formats the timestamp displayed with a direct chat message
 */

import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  TextInput,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
  Platform,
  StatusBar,
  RefreshControl,
  AsyncStorage
} from "react-native";
import ElevatedView from 'react-native-elevated-view';
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ImageCard from "../modules/shared/image-card";
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo();


const io = require('socket.io-client');

class ChatList extends React.Component {
  static MAX_COMMUNITY_CHAT_NAME = 11;  // maximum community chat name length to be displayed
  static MAX_MESSAGE_LENGTH = 25;   // maximum message length to be displayed

  static MINUTE = 60;
  static HOUR = 60 * ChatList.MINUTE;
  static DAY = 24 * ChatList.HOUR;
  static YEAR = 365 * ChatList.DAY;

  // Initialize socket.
  socket = io(`http://${env.host}:${env.port}`, { transports: ['websocket'] });
  state = {
    refreshing: false,
    user: {},
    // Community chats are not implemented, but a placeholder is set.
    directChats: [],
    displayedDirectChats: [],
    resultsFiltered: false,
    isLoading: true
  };

  async componentDidMount() {
    await this.getCurrentUser();
    // Load all chats and format them.
    await this.loadData();
    // State the fact that 
  }

  // async refresh() {
    
  // }

  // async componentDidUpdate() {

  // }

  /**
   * Retrieve the current user from local storage.
   */
  async getCurrentUser() {
    var myHeaders = new Headers();
    var userToken = await AsyncStorage.getItem("token");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", userToken);

    var requestOptions = {
      method: "GET",
      headers: myHeaders
    };

    var response = await fetch(
      `http://${env.host}:${env.port}/api/v1/user/data?` +
      (this.state.uid ? `id=${this.state.uid}` : ""),
      requestOptions
    )

    let responseJson = await response.json()
    if (responseJson.error) {
      alert(responseJson.message)
      return
    }
    this.setState({ user: responseJson });
  }

  /**
   * Load all messages.
   */
  async loadData() {
    const response = await this.getAllChats()
    this.setState({ directChats: response.data, isLoading: false });
    // this.connectSocket();
  }

  /**
     * Retrieve all the chats the user is part of from the database.
     * @returns an array containing all the chats.
     */
  async getAllChats() {
    var myHeaders = new Headers();
    var userToken = await AsyncStorage.getItem("token");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", userToken);

    var requestOptions = {
      method: "GET",
      headers: myHeaders
    };

    let res = await fetch(`http://${env.host}:${env.port}/api/v1/chat`, requestOptions);

    // Parse string into array
    let chats = await res.json();

    return chats;
  }

  /**
   * Get the data of an user given its id.
   * @param {string} id the id of the user.
   */
  async fetchUserData(id) {
    let userToken = await AsyncStorage.getItem("token");
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization": userToken
    });
    let res = await fetch(`http://${env.host}:${env.port}/api/v1/user/data?id=${id}`, {
      method: "GET",
      headers: headers
    });
    let user = await res.json();
    return user;
  }

  /**
   * Listen for new messages.
   */
  connectSocket() {
    this.socket.on('newMessage', async message => {
      // Store message.
      await this.updateChat(message);
    });
  }

  render() {
    const directChats = this.state.directChats.length > 0 && this.state.directChats.map(chat => {
      // Get last message and user that sent it
      const lastMessage = chat.messages[chat.messages.length - 1]
      const [ lastSender ] = chat.users.filter(u => lastMessage.sentby === u._id)

      return (
        <ImageCard
          title={lastSender.name}
          subtitle={lastMessage.content}
          imgSrc={{ uri: lastSender.profile_picture }}
          onPress={() => this.props.navigation.navigate("Chat", { user: this.state.user, chat })}
        />
      )
    })

    const refreshControl = (
      <RefreshControl refreshing={this.state.refreshing} onRefresh={() => console.log("Refreshing")} />
    )

    return (
      <View style={styles.mainContainer}>
        <ScrollView refreshControl={refreshControl}>
          {this.renderSearchBar()}

          <Text style={[styles.chatsTitle, styles.directChatsTitle]}>Direct Chats</Text>
          {directChats && directChats}
        </ScrollView>
      </View>
    );
  }

  renderToggleButton = () => {
    return (
      <TouchableOpacity onPress={this.toggleDisplayedCommunityChats}>
        <Text style={styles.communityChatsToggle}>
          {
            this.state.viewingAllCommunityChats ?
              "See less" :
              `See all (${this.state.communityChats.length})`
          }
        </Text>
      </TouchableOpacity>
    );
  }

  renderSearchBar() {
    return (
      <ElevatedView style={styles.searchBarContainer} elevation={20}>
        <TextInput
          placeholder={"Tap to search..."}
          onChangeText={this.filterResults}
          style={styles.searchBarInput}
        />
      </ElevatedView>
    );
  }

  renderPadding() {
    return (
      <View style={{ width: 20 }} />
    );
  }


  // ------------------------------- other auxiliary function -------------------------------

  /*
   * Filter the displayed chats according to user's input.
   * The function only filters the currently loaded chats,
   * i.e. no calls to the backend API are involved.
   */
  filterResults = (text) => {
    if (text === "") {   // clear the filter
      this.setState({
        displayedCommunityChats: this.state.communityChats.slice(0, 4),
        directChats: this.state.directChats,
        viewingAllCommunityChats: false,
        resultsFiltered: false
      });
    } else {
      // filter the list of displayed community chats for the ones containing the input text
      let newDisplayedCommunityChats = this.state.communityChats.filter((item) => item.name.toLowerCase().includes(text.toLowerCase()));

      // filter the list of direct chats for the ones containing the input text
      let newDisplayedDirectChats = this.state.directChats.filter((item) => item.recipientName.toLowerCase().includes(text.toLowerCase()));

      this.setState({
        displayedCommunityChats: newDisplayedCommunityChats,
        directChats: newDisplayedDirectChats,
        resultsFiltered: true
      });
    }
  }

  /**
   * Show shorter version (4 previews) or all preview of the community chats.
   */
  toggleDisplayedCommunityChats = () => {
    if (this.state.viewingAllCommunityChats) {
      this.setState({
        displayedCommunityChats: this.state.communityChats.slice(0, 4),
        viewingAllCommunityChats: false
      });
    } else {
      this.setState({
        displayedCommunityChats: this.state.communityChats,
        viewingAllCommunityChats: true
      });
    }
  }

  /**
   * Format message date to display in the preview.
   * @param {Date} date the date the message was sent.
   */
  getMessageTimestamp(date) {
    let messageDate = new Date(date);
    return timeAgo.format(messageDate);
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0   // TO BE DELETED WHEN THE COMPONENT ADDED TO TAB SCREEN
  },
  communityChatsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20
  },
  chatsTitle: {
    fontSize: 17,
    fontFamily: "poppins-medium"
  },
  directChatsTitle: {
    marginTop: 30,
    marginLeft: 20
  },
  searchBarContainer: {
    justifyContent: "center",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 25,
    marginBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 30
  },
  searchBarInput: {
    height: 50,
    fontFamily: "poppins-light"
  },
  communityChatsToggle: {
    fontSize: 11,
    fontFamily: "poppins-light"
  },
  communityChatTitle: {
    fontSize: 11,
    fontFamily: "poppins-medium"
  },
  communityChatContainer: {
    borderRadius: 20 / 2,
    marginRight: 10,
    alignItems: "center"
  },
  img: {
    alignItems: "flex-end",
    width: 85,
    height: 85
  },
  directChatContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 10,
    paddingLeft: 10,
    marginRight: 10,
    paddingRight: 10,
    borderBottomWidth: 0.5,
    borderColor: "lightgray"
  },
  directChatPicture: {
    height: 45,
    width: 45,
    borderRadius: 60
  },
  auxiliaryContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  textContainer: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 25,
    marginRight: 25
  },
  chatName: {
    fontSize: 14,
    fontFamily: "poppins-medium"
  },
  chatMessage: {
    fontSize: 11,
    fontFamily: "poppins-light",
    opacity: 0.8
  },
  orangeDot: {
    height: 12,
    width: 12,
    borderRadius: 120,
    backgroundColor: "orange"
  }
});

export default ChatList;
