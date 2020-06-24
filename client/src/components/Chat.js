import React from 'react';
import { StyleSheet, View, FlatList, Text, AsyncStorage } from 'react-native';
import ChatInputToolbar from './ChatInputToolbar';

/**
 * Chat component
 */
export default class Chat extends React.Component {
  static MAX_MESSAGE_TIME_DIFFERENCE = 20; // in minutes
  static MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  constructor(props) {
    super(props);
    this.socket = props.socket;
  };  

  componentDidMount() {
    this.connectSocket()
  }

  /**
   * Listen for new messages.
   */
  connectSocket() {
    this.socket.on('sentMsg', () => {
      this.setState({ state: this.state });
    });
  }

  /**
   * Store the new chat.
   * @param {any} message the new message.
   */
  async updateChat(message) {
    await this.updateMessages(message);
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
      await fetch(`http://${env.host}:${env.port}/api/v1/chat/update`, requestOptions);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Create a new message with a timestamp the id of the user that sent it
   * @param {string} message the new message plaintext.
   */
  sendMessage(message) {
    const [ otherUserId ] = this.props.chat.userIds.filter(uid => uid !== this.props.user._id)

    let newMessage = {
      content: message,
      sentby: this.props.user._id,
      sentto: otherUserId
    };

    // Inform the message has been sent.
    this.socket.emit('message', newMessage);
    this.updateChat(newMessage);
  }

  render() {
    return (
      <View style={styles.container}>

        <FlatList
          data={this.props.chat.messages || []}
          contentContainerStyle={styles.messagesContainer}
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
