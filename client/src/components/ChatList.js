
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
import { withNavigationFocus } from '@react-navigation/compat';
import ElevatedView from 'react-native-elevated-view';
import ImageCard from "../modules/shared/image-card";

import SocketService from '../services/socket-service'

class ChatList extends React.Component {
  static MAX_MESSAGE_LENGTH = 25;   // maximum message length to be displayed

  static MINUTE = 60;
  static HOUR = 60 * ChatList.MINUTE;
  static DAY = 24 * ChatList.HOUR;
  static YEAR = 365 * ChatList.DAY;

  state = {
    refreshing: false,
    user: {},
    directChats: [],
    displayedDirectChats: [],
    resultsFiltered: false,
    isLoading: true
  };

  async componentDidMount() {
    await this.getData()

    this.socket = SocketService.getSocket(this.state.user._id, 'sentMsg', this.onRefresh)
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      await this.getCurrentUser();
      await this.loadData();
    }
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

  getData = async () => {
    await this.getCurrentUser();
    await this.loadData();
  }

  onRefresh = () => {
    this.getData()
  }

  render() {
    const directChats = this.state.directChats.length > 0 && this.state.directChats.map(chat => {
      // Get last message and user that sent it
      const lastMessage = chat.messages[chat.messages.length - 1]
      const [ otherUser ] = chat.users.filter(u => u._id !== this.state.user._id)

      return (
        <View style={styles.directChatContainer}>
          <View style={{flex:10}}>
            <ImageCard
              title={otherUser.name}
              subtitle={lastMessage.content.substring(0,35)+(lastMessage.content.length > 35?"...":"")}
              imgSrc={{ uri: otherUser.profile_picture }}
              onPress={() => this.props.navigation.navigate("Chat", { user: this.state.user, chat, socket: this.socket, refresh: this.onRefresh })}
            />
          </View>
          <View style={{flex:1}}>
            {lastMessage.sentto == this.state.user._id ? 
              <Image
                style={{height: 10, width: 10, marginTop: 50}}
                source={require('../assets/unreadMessage.png')}>
              </Image>
            : null}
          </View>
        </View>
      )
    })

    const refreshControl = (
      <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
    )

    return (
      <View style={styles.mainContainer}>
        <ScrollView refreshControl={refreshControl}>
          {this.renderSearchBar()}

          <Text style={[styles.chatsTitle, styles.directChatsTitle]}>Direct Chats</Text>
          {directChats}
        </ScrollView>
      </View>
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
        directChats: this.state.directChats,
        resultsFiltered: false
      });
    } else {

      // filter the list of direct chats for the ones containing the input text
      let newDisplayedDirectChats = this.state.directChats.filter((item) => item.recipientName.toLowerCase().includes(text.toLowerCase()));

      this.setState({
        directChats: newDisplayedDirectChats,
        resultsFiltered: true
      });
    }
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0   // TO BE DELETED WHEN THE COMPONENT ADDED TO TAB SCREEN
  },
  chatsTitle: {
    fontSize: 17,
    fontFamily: "poppins-medium"
  },
  directChatsTitle: {
    marginTop: 20,
    marginLeft: 20
  },
  searchBarContainer: {
    justifyContent: "center",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    marginBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 30
  },
  searchBarInput: {
    height: 50,
    fontFamily: "poppins-light"
  },
  img: {
    alignItems: "flex-end",
    width: 85,
    height: 85
  },
  directChatContainer: {
    paddingBottom: 2,
    paddingTop: 1,
    borderBottomWidth: 0.5,
    borderColor: "lightgray",
    flexDirection: "row"
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

export default withNavigationFocus(ChatList);
