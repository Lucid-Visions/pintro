import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import ElevatedView from "react-native-elevated-view";
import PropTypes from "prop-types";

/**
 * Renders an action button for the user's profile.
 * @param {string} name the type of the button.
 * @param {string} context the specific topic related to the company.
 * @param {string} source the company picture path.
 */
const ConnectionButton = ({ name, text, source, onPress, onLongPress, isActive, swipe }) => (
  <ElevatedView style={{... styles.view, backgroundColor: isActive ? "rgba(144,144,144,0.6)" : "white"}} elevation={5}>
    <TouchableOpacity onPressOut={!!swipe.openDirection ? swipe.close : swipe.openRight} onPress={onPress} style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Image
          style={styles.image}
          source={
            source
              ? { url: source }
              : require("../assets/empty-profile-picture.png")
          }
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subtitle}>{text}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center"
        }}
        onPressIn={onLongPress}
      >
        <Image
          style={styles.dragHandler}
          source={require("../assets/dragHandler.png")}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  </ElevatedView>
);

// Type checker
ConnectionButton.propTypes = {
  name: PropTypes.string,
  text: PropTypes.string,
  source: PropTypes.string,
  swipe: PropTypes.any.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  view: {
    alignSelf:'center',
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 15,
    width: "99%",
    resizeMode: "contain",
    padding: 20,
    marginVertical: 10
  },
  textContainer: {
    flexDirection: "column",
    marginLeft: 15,
    marginTop: 5
  },
  title: {
    fontWeight: "bold",
    fontSize: 16
  },
  subtitle: {
    fontWeight: "normal",
    fontSize: 12,
    color: "grey"
  },
  image: {
    borderRadius: 150 / 2,
    width: 40,
    height: 40,
    overflow: "hidden"
  },
  dragHandler: {
    width: 30,
    height: 35
  }
});

export default ConnectionButton;
