import React from 'react';
import {
  StyleSheet, View, Image, Text,
  TouchableOpacity, Platform, StatusBar, KeyboardAvoidingView
} from 'react-native';
import Constants from "expo-constants";
import ActionButtonComponent from '../components/ActionButton';
import Chat from "../components/Chat";

/**
 * Main screen of the Chat tab.
 */
export default class ChatScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      socket: props.route.params.socket,
      user: props.route.params.user,
      chat: props.route.params.chat
    };
  };

  renderHeader() {
    let pictureUri = this.state.chat.pictureUri;
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerInnerContainer}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image
              style={styles.headerImages}
              source={require('../assets/leftArrow.png')}
              resizeMode={"center"}
            />
          </TouchableOpacity>

          <Image
            style={[styles.headerImages, { marginLeft: 10, marginRight: 10 }]}
            source={pictureUri !== undefined ? { uri: pictureUri } : require('../assets/empty-profile-picture.png')}
          />

          <Text style={styles.headerTitle}>{this.state.chat.name}</Text>
        </View>
      </View>
    );
  }

  renderTopComponent() {
    if (this.state.chat.type !== undefined) {
      let chatType = this.state.chat.type;
      let chatTypeContext = this.state.chat.context;
      if (chatType && chatTypeContext) {
        return (
          <View style={styles.chatInfoContainer}>
            <ActionButtonComponent type={chatType} context={chatTypeContext} />
          </View>
        );
      }
    }
    else {
      return;
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'android' ? "height" : null}>
        <View style={styles.container}>
          {this.renderHeader()}
          {this.renderTopComponent()}
          <Chat user={this.state.user} chat={this.state.chat} socket={this.state.socket} style={styles.chat} />
          <View />
        </View>
      </KeyboardAvoidingView>
    )
  };
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0   // on Android, the content has to be lowered below the status bar
  },
  headerContainer: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    borderColor: 'lightgray',
    borderBottomWidth: 1.0
  },
  headerInnerContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  headerImages: {
    height: 45,
    width: 45,
    borderRadius: 60,
  },
  headerTitle: {
    fontFamily: "poppins-medium",
    fontSize: 18
  },
  chatInfoContainer: {
    height: 130,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "lightgray",
    borderBottomWidth: 1,
    backgroundColor: "#f2f2f2"
  },
  chat: {
    justifyContent: "flex-end"
  }
})
