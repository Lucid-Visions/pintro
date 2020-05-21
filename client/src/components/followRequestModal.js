import React from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import Modal from "react-native-modal";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo();

import { getDistance } from "geolib";

class FollowRequestModal extends React.Component {
  constructor(props) {
    super(props);
  }

  getContent() {
    if (this.props.connection.intent) {
      return (
        <View style={styles.content}>
          <Text style={styles.h1}>Intent:</Text>
          <Text style={styles.h3}>{this.props.connection.intent}</Text>
          <Text style={styles.h1}>Message:</Text>
          <Text style={styles.h3}>{this.props.connection.message}</Text>
        </View>
      );
    } else {
      return null;
    }
  }
  render() {
    const AcceptButton = () => (
      <TouchableOpacity
        onPress={() => {
          this.props.respond(true);
        }}
        style={styles.accept}
      >
        <Text style={styles.acceptText}>ACCEPT</Text>
      </TouchableOpacity>
    );

    const DeclineButton = () => (
      <TouchableOpacity
        onPress={() => {
          this.props.respond(false);
        }}
        style={styles.decline}
      >
        <Text style={styles.declineText}>DECLINE</Text>
      </TouchableOpacity>
    );

    const currentUser = async () => {
      var myHeaders = new Headers();
      var userToken = await AsyncStorage.getItem("token");
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", userToken);

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      var response = await fetch(
        `http://${env.host}:${env.port}/api/v1/user/data`,
        requestOptions
      ).catch((err) => console.log(err));

      let responseJson = await response.json();

      return responseJson;
    };

    const distance = () => {
      currentUser().then((current) => {
        var currentLocation = current.location.coordinates;
        var user = this.props.data.follower.location.coordinates;
        if (currentLocation != undefined) {
          return getDistance(currentLocation, user) / 1000;
        } else return 0;
      })
    };

    const getAllContent = () => {
      if (!this.props.accepted) {
        return (
          <View>
            <View style={styles.topContainer}>
              <Image style={styles.image} source={this.props.profilePicture} />
              <View style={styles.textContainer}>
                <Text style={styles.h1}>{this.props.data.follower.name}</Text>
                <Text style={styles.h2}>
                  {this.props.data.follower.bio.substring(0, 70) + "..."}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 5,
                    marginBottom: 5,
                  }}
                >
                  <Image
                    style={{
                      height: 13,
                      width: 10,
                      marginRight: 5,
                      resizeMode: "contain",
                    }}
                    source={require("../assets/location-arrow.png")}
                  />
                  <Text style={styles.h4}>
                    {" "}
                    {timeAgo.format(parseInt(this.props.data.startTime))}{" "}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Image
                  style={{ height: 13, width: 13, marginTop: 4 }}
                  source={require("../assets/distance-arrow.png")}
                />
                <Text style={{ color: "#F8AE39", alignSelf: "flex-start" }}>
                  {" "}
                  {distance()}{" "}
                  km{" "}
                </Text>
              </View>
            </View>
            {this.getContent()}
            <View
              flexDirection="row"
              style={{
                width: Dimensions.get("screen").width / 1.2,
                borderColor: "orange",
                borderWidth: 0,
                alignItems: "space-between",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <AcceptButton />
              <DeclineButton />
            </View>
          </View>
        );
      } else {
        return this.props.connectModal;
      }
    };

    return (
      <Modal
        animationIn="slideInUp"
        animationOut="slideOutDown"
        isVisible={this.props.visible}
        onBackdropPress={() => this.props.toggle()}
        style={styles.modal}
        onModalHide={() => this.props.onModalHide()}
      >
        {getAllContent()}
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  h1: {
    fontFamily: "poppins-bold",
    color: "black",
    margin: "auto",
    textAlign: "left",
    fontSize: 13,
  },
  textContainer: {
    marginLeft: 10,
  },
  h2: {
    fontFamily: "poppins-medium",
    color: "black",
    textAlign: "left",
    fontSize: 13,
    width: 200,
  },
  h3: {
    fontFamily: "poppins-light",
    color: "black",
    margin: "auto",
    textAlign: "left",
    fontSize: 13,
  },
  h4: {
    fontFamily: "poppins-light",
    color: "black",
    margin: "auto",
    textAlign: "left",
    fontSize: 11,
  },
  accept: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "47%",
    height: 35,
    backgroundColor: "black",
    borderColor: "black",
    borderRadius: 15 / 2,
    borderWidth: 1,
  },
  acceptText: {
    fontFamily: "poppins-medium",
    fontSize: 10,
    color: "white",
  },
  decline: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "47%",
    height: 35,
    backgroundColor: "white",
    borderColor: "black",
    borderRadius: 15 / 2,
    borderWidth: 1,
  },
  declineText: {
    fontFamily: "poppins-medium",
    fontSize: 10,
    color: "black",
  },
  image: {
    alignSelf: "center",
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    overflow: "hidden",
  },
  topContainer: {
    flexDirection: "row",
    width: Dimensions.get("screen").width / 1.2,
    justifyContent: "space-between",
  },
  content: {
    flexDirection: "column",
    alignSelf: "center",
    alignItems: "flex-start",
    justifyContent: "space-between",
    borderRadius: 20,
    padding: 15,
    width: Dimensions.get("screen").width / 1.2,
    backgroundColor: "#DDDDDD",
  },
  modal: {
    justifyContent: "space-evenly",
    backgroundColor: "#FCFCFC",
    height: Dimensions.get("screen").height / 4,
    maxHeight: 350,
    width: Dimensions.get("screen").width / 1.1,
    borderRadius: 20,
    alignSelf: "center",
    alignItems: "center",
    marginTop: Dimensions.get("screen").height / 4.5,
  },
});

export default FollowRequestModal;
