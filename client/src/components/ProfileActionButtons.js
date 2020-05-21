import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";

/**
 * 'FOLLOW ME' button for the profile.
 */
const FollowMeButton = ({ onPress, text }) => (
  <TouchableOpacity
    style={styles.follow}
    onPress={() => {
      onPress();
    }}
  >
    {text == "PENDING" 
    ? <Ionicons name="ios-remove" color="white" /> 
    : (text == "NOT CONNECTED" && <Ionicons name="ios-add" color="white" />) }
    <Text style={styles.followText}>
      {text == "NOT CONNECTED" ? "CONNECT" : text}
    </Text>
  </TouchableOpacity>
);

/**
 * 'EDIT PROFILE' button for the profile.
 */
const NewPostButton = ({ onPress }) => (
  <TouchableOpacity
    style={styles.follow}
    onPress={() => {
      onPress();
    }}
  >
    <Text style={styles.followText}>NEW POST</Text>
  </TouchableOpacity>
);

/**
 * 'MESSAGE ME' button for the profile.
 */
const MessageMeButton = ({onPress, text}) => (
  <TouchableOpacity
    onPress={() => {
      onPress();
    }}
    style={styles.message}
  >
    <Feather name="message-circle" />
    <Text style={styles.messageText}>{"MESSAGE ME"}</Text>
  </TouchableOpacity>
);

/**
 * 'MESSAGE ME' button for the profile.
 */
const ViewConnectionsButton = ({ onPress }) => (
  <TouchableOpacity
    style={styles.message}
    onPress={() => {
      onPress();
    }}
  >
    <Text style={styles.messageText}>CONNECTIONS</Text>
  </TouchableOpacity>
);

/**
 * Extra actions button for the profile.
 */
const ExtrasButton = (props) => (
  <TouchableOpacity
    style={styles.extras}
    onPress={() => {
      props.action != undefined ? props.action() : null;
    }}
  >
    <Text>...</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  follow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "38.5%",
    height: 30,
    backgroundColor: "black",
    borderRadius: 10 / 2,
    marginRight: "5%",
  },
  followText: {
    marginLeft: "5%",
    color: "white",
    fontSize: 10,
  },
  message: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "38.5%",
    height: 30,
    backgroundColor: "white",
    borderColor: "black",
    borderRadius: 10 / 2,
    borderWidth: 1,
    marginRight: "5%",
  },
  messageText: {
    marginLeft: "5%",
    fontSize: 10,
  },
  extras: {
    alignItems: "center",
    borderColor: "black",
    height: 30,
    width: 40,
    borderRadius: 15 / 2,
    borderWidth: 1,
    padding: 3,
  },
});

export {
  FollowMeButton,
  MessageMeButton,
  ExtrasButton,
  ViewConnectionsButton,
  NewPostButton,
};
