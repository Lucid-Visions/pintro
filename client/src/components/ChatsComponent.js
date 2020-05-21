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
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo();


const io = require('socket.io-client');

class Chats extends React.Component {
  static MAX_COMMUNITY_CHAT_NAME = 11;  // maximum community chat name length to be displayed
  static MAX_MESSAGE_LENGTH = 25;   // maximum message length to be displayed

  static MINUTE = 60;
  static HOUR = 60 * Chats.MINUTE;
  static DAY = 24 * Chats.HOUR;
  static YEAR = 365 * Chats.DAY;

  // Checker to avoid setting the state while the component is mounting again.
  _isMounted = false;
  // Initialize socket.
  socket = io(`http://${env.host}:${env.port}`, { transports: ['websocket'] });
  state = {
    refreshing: false,
    user: {},
    // Community chats are not implemented, but a placeholder is set.
    communityChats: [
      {
        name: "Like Minded Females"
      },
      {
        name: "Google LDN",
        pictureUri: "https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Google-512.png"
      },
      {
        name: "Designer Network"
      },
      {
        name: "King's College",
        pictureUri: "https://thebigcoffee.com/wp-content/uploads/2016/06/KCL_logo.jpg"
      },
      {
        name: "King's College",
        pictureUri: "https://thebigcoffee.com/wp-content/uploads/2016/06/KCL_logo.jpg"
      },
      {
        name: "Designer Network"
      }
    ],
    directChats: [],
    // Community chats are not implemented, but a placeholder is set.
    displayedCommunityChats: [],
    displayedDirectChats: [],
    viewingAllCommunityChats: false,
    resultsFiltered: false,
    isLoading: true
  };

  async componentDidMount() {
    // Community chats are not implemented, but a placeholder is set.
    this.setState({ displayedCommunityChats: this.state.communityChats.slice(0, 4) });

    this._isMounted = true;
    await this.getCurrentUser();
    // Load all chats and format them.
    this.loadData();
    // State the fact that 
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

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
      headers: myHeaders,
      redirect: "follow"
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
  loadData() {
    this.getAllChats().then(async (chats) => {
      let namesMap = await this.fetchUsernamesAndPictures(chats);
      let formattedChats = this.formatChats(chats, namesMap);
      this.setState({ directChats: formattedChats, displayedDirectChats: formattedChats });
      this.connectSocket();
      this.setState({ isLoading: false });
    });
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
      headers: myHeaders,
      redirect: "follow"
    };

    let res = await fetch(`http://${env.host}:${env.port}/api/v1/chat/chat`, requestOptions);
    // Parse string into array
    let chats = await res.json();
    return chats;
  }

  /**
   * Gets all names of users involved in the chat.
   * @param {any} chats an array of all chats.
  */
  async fetchUsernamesAndPictures(chats) {
    let currentUser_id = this.state.user._id;
    let ids = [];
    chats.forEach(chat => {
      // Avoid fetching the logged in user.
      if (chat.uid !== currentUser_id) {
        ids.push(chat.uid);
      }
      else {
        ids.push(chat.recipientid);
      }
    });
    // Get id, name and picture url from an user given its id.
    const getRelevantData = async id => {
      let user = await this.fetchUserData(id);
      let name = user.name;
      let pictureUri = user.profile_picture;
      return { id: id, name: name, pictureUri: pictureUri };
    };
    // Map the ids to the names.
    let namesMap = Promise.all(ids.map(id => getRelevantData(id)));
    let mapResolved = await namesMap;
    return mapResolved;
  }

  /**
   * Format a chat to store only relevant information: 
   * recipient name, picture url, type of chat, context of chat, and an array of messages.
   * @param {any} chats an array containing all chats.
   * @param {any} namesMap array containing id, name and picture url from recipients.
   */
  formatChats(chats, namesMap) {
    let newChats = chats.map(chat => {
      let targetMapItem;
      // Figure out whether the user created or is the recipient of the chat to display the correct name.
      if (chat.recipientid !== this.state.user._id) {
        targetMapItem = namesMap.find(value => value.id === chat.recipientid);
      }
      else {
        targetMapItem = namesMap.find(value => value.id === chat.uid);
      }
      return {
        recipientid: targetMapItem.id,
        recipientName: targetMapItem.name,
        pictureUri: targetMapItem.pictureUri,
        type: chat.type,
        context: chat.context,
        messages: chat.messages
      }
    });
    return newChats;
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

  /**
   * Store the new chat.
   * @param {any} message the new message.
   */
  async updateChat(message) {
    let chat = this.state.directChats.find(chat => chat.recipientid === message.uid || this.state.user._id === message.uid);
    chats = chat.messages.push(message);
    // Set state here to the new chat here.
    this.setState({ directChats: chats });
    await this.updateMessages(chat.messages);
  }

  /**
  * Save any new messages in the database.
  */
  async updateMessages(messages) {
    var myHeaders = new Headers();
    var userToken = await AsyncStorage.getItem("token");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", userToken);

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      redirect: "follow"
    };

    try {
      await fetch(`http://${env.host}:${env.port}/api/v1/chat/update?messages=${JSON.stringify(messages)}`, requestOptions);
    } catch (error) {
      console.log(error);
    }
  }

  // ------------------------------- main rendering functions -------------------------------

  renderCommunityChats = () => {
    let displayedChats = [];
    for (let i = 0; i < this.state.displayedCommunityChats.length; i++) {
      let chat = this.state.displayedCommunityChats[i];
      let chatComponent = (
        <TouchableOpacity style={styles.communityChatContainer} onPress={() => this.props.navigation.navigate("Chat", { user: this.state.user, chat: chat })}>
          <ImageBackground
            source={chat.pictureUri ?
              { uri: chat.pictureUri } :
              require('../assets/empty-profile-picture.png')
            }
            style={styles.img}
            borderRadius={16}
          >
            { // display an orange dot when there are unread messages, not implemented yet
              /*<View style={styles.orangeDot}/>*/
            }
          </ImageBackground>
          <Text style={styles.communityChatTitle} >
            {
              chat.name.length > Chats.MAX_COMMUNITY_CHAT_NAME ?
                chat.name.substring(0, Chats.MAX_COMMUNITY_CHAT_NAME) + "..." :   // name too long to display it entirely
                chat.name
            }
          </Text>
        </TouchableOpacity>
      );
      displayedChats.push(chatComponent);
    }
    return displayedChats;
  }

  renderPrivateChats = () => {
    let displayedChats = [];
    for (let i = 0; i < this.state.displayedDirectChats.length; i++) {
      let chat = this.state.displayedDirectChats[i];
      let chatComponent = (
        <TouchableOpacity style={styles.directChatContainer} onPress={() => this.props.navigation.navigate("Chat", { user: this.state.user, chat: chat, socket: this.socket })}>
          <Image
            style={styles.directChatPicture}
            source={chat.pictureUri ?
              { uri: chat.pictureUri } :
              require('../assets/empty-profile-picture.png')
            }
          />
          <View style={styles.auxiliaryContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.chatName}>
                {chat.recipientName}
              </Text>
              { // render the last message from the chat if such exists
                chat.messages.length > 0 ?
                  this.renderLastMesssage(chat.messages[chat.messages.length - 1]) :
                  null
              }
            </View>
            { // display an orange dot when there are unread messages, not implemented yet
              /*<View style={[styles.orangeDot, { marginRight: 10 }]} />*/
            }
          </View>
        </TouchableOpacity>
      );
      displayedChats.push(chatComponent);
    }
    return displayedChats;
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => console.log("Refreshing")}
            />
          }
        >
          {this.renderSearchBar()}
          <View style={styles.communityChatsContainer}>
            <Text style={styles.chatsTitle}>Community Chats</Text>
            {
              this.state.resultsFiltered || this.state.communityChats.length <= 4 ?
                null :
                this.renderToggleButton()
            }
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {this.renderPadding()}
            {this.renderCommunityChats()}
          </ScrollView>
          <Text style={[styles.chatsTitle, styles.directChatsTitle]}>Direct Chats</Text>
          {this.renderPrivateChats()}
        </ScrollView>
      </View>
    );
  }


  // ------------------------------- auxiliary rendering functions -------------------------------

  renderLastMesssage(message) {
    let messageText = message.content;
    if (!messageText)  // in case the content field was not provided
      return null;
    let displayedText = messageText.length > Chats.MAX_MESSAGE_LENGTH ?
      messageText.substring(0, Chats.MAX_MESSAGE_LENGTH) + "..." :
      messageText;
    let displayedTimestamp = this.getMessageTimestamp(message.createdAt);
    let component = (
      <Text style={styles.chatMessage}>
        {displayedText}  &middot;  {displayedTimestamp}
      </Text>
    );
    return component;
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
        displayedDirectChats: this.state.directChats,
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
        displayedDirectChats: newDisplayedDirectChats,
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

export default Chats;
