import React from 'react';
import { StyleSheet, View, FlatList, Text, Image, AsyncStorage } from 'react-native';
import ChatInputToolbar from './ChatInputToolbar';
const io = require('socket.io-client');


/**
 * Chat component
 */
export default class Chat extends React.Component {
  static MAX_MESSAGE_TIME_DIFFERENCE = 20; // in minutes
  static MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  constructor(props) {
    super(props);
    this.socket = props.socket;
    this.messages = React.createRef();
    this.state = {
      user: props.user,
      chat: props.chat,
    };
  };  

  /**
   * Create a new message with a timestamp the id of the user that sent it
   * @param {string} message the new message plaintext.
   */
  createNewMessage(message) {
    let newMessage = {
      content: message,
      createdAt: new Date(),
      uid: this.state.user._id
    };
    // Inform the message has been sent.
    this.socket.emit('message', newMessage);
  }

  renderPicture(message) {
    if (message.uid !== this.state.user._id) {
      let pictureUri = this.state.chat.pictureUri;
      return (
        <Image
          style={{ height: 40, width: 40, borderRadius: 60 }}
          source={pictureUri !== undefined ? { uri: pictureUri } : require('../assets/empty-profile-picture.png')}
        />
      );
    }
  }

  renderDate(index) {
    let currentMessageDateStamp = this.state.chat.messages[index].createdAt;
    let shouldRenderDate = false;
    let firstMessage = false;

    if (index === 0) {
      shouldRenderDate = true;
      firstMessage = true;
    }
    else if (index > 0) {
      let previousMessageDateStamp = this.state.chat.messages[index - 1].createdAt;
      let timeDifference = currentMessageDateStamp.getTime() - previousMessageDateStamp.getTime();
      let timeDifferenceMins = timeDifference / 60000;

      if (timeDifferenceMins > Chat.MAX_MESSAGE_TIME_DIFFERENCE) shouldRenderDate = true;
    }

    if (shouldRenderDate) {
      let text = currentMessageDateStamp.getDate() + " " +    // day of the month
        Chat.MONTHS[currentMessageDateStamp.getMonth()] + ", " +    // month
        currentMessageDateStamp.getHours() + ":";   // hour
      let minutes = currentMessageDateStamp.getMinutes();

      if (minutes < 10)
        text = text + "0" + minutes;
      else
        text = text + minutes;

      return (
        <View style={{
          marginTop: firstMessage ? 20 : 5,
          marginBottom: 5,
          alignItems: "center"
        }}>
          <Text style={{ fontFamily: "poppins-light", fontSize: 11 }}>{text}</Text>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <FlatList
          data={this.state.chat ? this.state.chat.messages : []}
          ref={this.messages}
          contentContainerStyle={styles.messagesContainer}
          renderItem={({ item, index }) => {
            let isAuthorCurrentUser = false;
            if (item.uid === this.state.user._id) {
              isAuthorCurrentUser = true;
            }
            return (
              <View>
                {/** this.renderDate(index) */}
                <View style={{
                  marginBottom: 5, marginTop: 5,
                  alignItems: isAuthorCurrentUser ? "flex-end" : "flex-start"
                }}>
                  <View style={{ flex: 1, flexDirection: "row", alignItems: "flex-end" }}>
                    {this.renderPicture(item)}
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
            this.createNewMessage(message);
            this.messages.current.scrollToEnd();
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
