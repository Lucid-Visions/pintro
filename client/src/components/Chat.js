import React from 'react';
import { StyleSheet, View, FlatList, Text, AsyncStorage } from 'react-native';
import ChatInputToolbar from './ChatInputToolbar';

import SocketService from '../services/socket-service'

/**
 * Chat component
 */
export default class Chat extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      chat: null
    }
  }

  async componentDidMount() {
    this.socket = SocketService.getSocket(this.props.user._id, 'sentMsg', this.loadData)
    await this.loadData()
  }

  getChat = async () => {

    var myHeaders = new Headers();
    var userToken = await AsyncStorage.getItem("token");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", userToken);

    var requestOptions = {
      method: "GET",
      headers: myHeaders
    };

    let res = await fetch(`http://${env.host}:${env.port}/api/v1/chat/${this.props.chat.id}`, requestOptions);

    // Parse string into array
    let chat = await res.json();

    return chat.data;
  }

  loadData = async () => {
    const chat = await this.getChat()

    this.setState({ chat });
  }


  /**
   * Store the new chat.
   * @param {any} message the new message.
   */
  async updateChat(message) {
    await this.updateMessages(message);
  }

  /**
     * Retrieve all the chats the user is part of from the database.
     * @returns an array containing all the chats.
     */
    async getChat() {
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
  * Save any new messages in the database.
  */
  async updateMessages(message) {
    var myHeaders = new Headers();
    var userToken = await AsyncStorage.getItem("token");

    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", userToken);

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: JSON.stringify(message)
    };

    try {
      await fetch(`http://${env.host}:${env.port}/api/v1/chat/${this.props.chat.id}`, requestOptions)
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Create a new message with a timestamp the id of the user that sent it
   * @param {string} message the new message plaintext.
   */
  async sendMessage(message) {
    const [ otherUserId ] = this.props.chat.userIds.filter(uid => uid !== this.props.user._id)

    let newMessage = {
      content: message,
      sentby: this.props.user._id,
      sentto: otherUserId
    };

    // Inform the message has been sent.
    this.socket.emit('message', newMessage);
    await this.updateChat(newMessage);
    await this.loadData()
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.chat && (
          <FlatList
            data={this.state.chat.messages || []}
            contentContainerStyle={styles.messagesContainer}
            ref={ref => this.flatList = ref}
            onContentSizeChange={() => this.flatList.scrollToEnd({animated: true})}
            onLayout={() => this.flatList.scrollToEnd({animated: true})}
            renderItem={({ item }) => {

              const currentUser = this.props.user
              const isAuthorCurrentUser = item.sentby === currentUser._id;
        
              return (
                <View>
                  <View style={{
                    marginBottom: 5, marginTop: 5,
                    alignItems: isAuthorCurrentUser ? "flex-end" : "flex-start"
                  }}>
                    <View style={{ flex: 1, flexDirection: "row", alignItems: "flex-end" }}>

                      <View style={{
                        paddingTop: 15, paddingBottom: 15, paddingRight: 15, paddingLeft: 15,
                        maxWidth: 250, marginLeft: 10, borderRadius: 15,
                        backgroundColor: isAuthorCurrentUser ? "black" : "lightgray"
                      }}>
                        <Text style={{ fontFamily: "poppins-regular", fontSize: 12, color: isAuthorCurrentUser ? "white" : "black" }}>
                          {item.content}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              )
            }
            }
            keyExtractor={(item, index) => index.toString()}
          />
        )}

        <ChatInputToolbar style={{ justifyContent: "flex-end" }}
          onSend={message => {
            this.sendMessage(message);
          }}
        />

      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  messagesContainer: {
    marginRight: 25,
    marginLeft: 25
  }
})
