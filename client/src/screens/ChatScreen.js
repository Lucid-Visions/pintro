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
      user: props.route.params.user,
      chat: props.route.params.chat,
      refresh: props.route.params.refresh
    };
  };

  renderHeader() {
    const chatPartnerUser = this.state.chat.users.filter(user => user._id != this.state.user._id)
    let pictureUri = chatPartnerUser[0].profile_picture;
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
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile', {uid: chatPartnerUser[0]._id})}>
            <View style={{flex:1}}>
              <Image
                style={[styles.headerImages, { marginLeft: 10, marginRight: 10 }]}
                source={pictureUri !== undefined ? { uri: pictureUri } : require('../assets/empty-profile-picture.png')}
              />
            </View>
            <View style={{paddingLeft:75}}>
              <Text style={styles.headerTitle}>{chatPartnerUser[0].name}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'android' ? "height" : null}>
        <View style={styles.container}>
          {this.renderHeader()}

          <View style={styles.chatInfoContainer}>
            <ActionButtonComponent type={this.state.chat.type} intent={this.state.chat.intent} />
          </View>

          <Chat
            user={this.state.user}
            chat={this.state.chat}
            refresh={this.state.refresh}
            style={styles.chat}
          />
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
