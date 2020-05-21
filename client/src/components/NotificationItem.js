import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  AsyncStorage,
  TouchableHighlight,
} from "react-native";
import FollowRequestModal from "../components/followRequestModal";
import ConnectModal from "../components/ConnectModal";
import Swipeable from "react-native-swipeable-row";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo();

/**
 * Notification screen
 */

class NotificationItemComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false,
      followModal: false,
      accepted: false,
    };

    this.toggleFollowModal = this.toggleFollowModal.bind(this);
    this.respond = this.respond.bind(this);
  }

  addToCircle = async (circle) => {
    const token = await AsyncStorage.getItem("token");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", token);
    const raw = JSON.stringify({
      follower: this.props.data.follower._id,
      circle,
    });

    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
    };

    const response = await fetch(
      `http://${env.host}:${env.port}/api/v1/user/circle`,
      requestOptions
    ).catch((error) => console.log("error", error));

    const responseJson = await response.json();

    if (responseJson.error) {
      console.log(responseJson.error);
    }

    this.toggleFollowModal(false);
  };

  // respond to follow request
  async respond(x) {
    this.setState({
      accepted: x,
    });
    var token = await AsyncStorage.getItem("token");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", token);

    var raw = JSON.stringify({
      follower: this.props.data.follower._id,
      response: x,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    let response = await fetch(
      `http://${env.host}:${env.port}/api/v1/connection/respond`,
      requestOptions
    ).catch((error) => console.log("error", error));
    if (!x) this.toggleFollowModal(false);
    this.props.refresh();
  }

  getRequestButtons = () => {
    if (
      this.props.notification_type == "relationship" &&
      this.props.data.status == "PENDING"
    ) {
      return (
        <View style={{ flexDirection: "row", ...styles.requestButtons }}>
          {this.requestActionButton(
            require("../assets/blackCross.png"),
            () => {
              this.setState({ followModal: false });
              this.respond(false);
            },
            { borderWidth: 1 }
          )}
          {this.requestActionButton(
            require("../assets/WhiteTick.png"),
            () => this.respond(true),
            { backgroundColor: "black", marginLeft: 12 }
          )}
        </View>
      );
    } else {
      return null;
    }
  };

  requestActionButton(src, onPress, buttonStyles) {
    return (
      <TouchableOpacity
        style={{ ...styles.actionButton, ...buttonStyles }}
        onPress={onPress}
      >
        <Image style={styles.actionButtonIcon} source={src} />
      </TouchableOpacity>
    );
  }

  toggleFollowModal = (x = !this.state.followModal) => {
    this.setState({
      followModal: x,
      accepted: false,
    });
  };

  getProfilePicture() {
    if (this.props.notification_type == "status") {
      let profilePicture = this.props.data.user.profile_picture;
      return profilePicture
        ? { url: profilePicture }
        : require("../assets/empty-profile-picture.png");
    } else if (this.props.notification_type == "relationship") {
      let profilePicture = this.props.data.follower.profile_picture;
      return profilePicture
        ? { url: profilePicture }
        : require("../assets/empty-profile-picture.png");
    } else {
      return require("../assets/empty-profile-picture.png");
    }
  }

  getFollowModal = () => {
    const connection = {
      startTime: this.props.data.startTime,
      intent: this.props.data.intent || "",
      message: this.props.data.message || "",
    };

    return (
      <FollowRequestModal
        visible={this.state.followModal}
        toggle={this.toggleFollowModal}
        accepted={this.state.accepted}
        data={this.props.data}
        connection={connection}
        respond={this.respond}
        profilePicture={this.getProfilePicture()}
        onModalHide={() => {}}
        connectModal={
          <ConnectModal
            visible={this.state.connectModal && this.state.accept}
            accepted={this.state.accepted}
            toggleModal={this.toggleFollowModal}
            respond={this.addToCircle}
          />
        }
      />
    );
  };

  getContent = () => {
    switch (this.props.notification_type) {
      case "relationship": {

        return (
          <TouchableOpacity
            style={styles.textContainer}
            onPress={() =>
              this.props.data.status == "PENDING"
                ? this.toggleFollowModal()
                : null
            }
            onLongPress={() => this.props.deleteNotification(this.props.id)}
          >
            {this.getFollowModal()}
            <View style={styles.outline}>
              <Image style={styles.image} source={this.getProfilePicture()} />
              <View style={styles.text}>
                <View style={{ flexDirection: "row" }}>
                  <Text numberOfLines={1} style={styles.notificationText}>
                    {" "}
                    {this.props.text}{" "}
                  </Text>
                </View>
                <Text style={styles.subtitle}>
                  {timeAgo.format(parseInt(this.props.timestamp))}
                </Text>
              </View>
              {this.getRequestButtons()}
            </View>
          </TouchableOpacity>
        );
      }
      case "status": {
      }
      default: {
        return (
          <TouchableOpacity
            style={styles.textContainer}
            onLongPress={() => this.props.deleteNotification(this.props.id)}
          >
            <View style={styles.outline}>
              <Image style={styles.image} source={this.getProfilePicture()} />
              <View style={styles.text}>
                <View style={{ flexDirection: "row" }}>
                  <Text numberOfLines={1} style={styles.notificationText}>
                    {" "}
                    {this.props.text}{" "}
                  </Text>
                </View>
                <Text style={styles.subtitle}>
                  {timeAgo.format(parseInt(this.props.timestamp))}
                </Text>
              </View>
              {this.getRequestButtons()}
            </View>
          </TouchableOpacity>
        );
      }
    }
  };

  render() {
    return (
      <View style={{ flexDirection: "row", ...styles.container }}>
        {this.getContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: "grey",
    borderBottomWidth: 1,
    height: 70,
    backgroundColor: "white",
  },
  textContainer: {
    flexDirection: "row",
    flex: 1,
  },
  view: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "white",
    width: "100%",
    height: "10%",
    padding: 18,
    marginBottom: 1,
  },
  requestButtons: {
    position: "absolute",
    marginRight: 10,
    right: 0,
  },
  text: {
    flexDirection: "column",
    left: "auto",
    marginLeft: 5,
  },
  title: {
    fontFamily: "poppins-semi-bold",
    fontSize: 10,
    marginTop: 3,
  },
  notificationText: {
    fontWeight: "normal",
    fontFamily: "poppins-semi-bold",
    fontSize: 9,
    marginTop: 4,
  },
  subtitle: {
    fontWeight: "normal",
    fontSize: 10,
    color: "grey",
    fontFamily: "poppins-light",
  },
  outline: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    flex: 1,
    paddingLeft: 10,
  },
  image: {
    borderRadius: 150 / 2,
    backgroundColor: "white",
    width: 40,
    height: 40,
    overflow: "hidden",
  },
  actionButtonIcon: {
    width: 18,
    height: 18,
    overflow: "hidden",
    marginLeft: 7,
    marginTop: 7,
  },
  actionButton: {
    borderRadius: 150 / 2,
    width: 33,
    height: 33,
    overflow: "hidden",
  },
});

export default NotificationItemComponent;
