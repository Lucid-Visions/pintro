import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

/**
 * Represents a badge icon for the profile screen.
 * @param {string} title the title of the badge.
 * @param {number} timesEarned the number of times a user earned the badge.
 */
const BadgeComponent = ({ title, timesEarned }) => {
  return (
    <TouchableOpacity style={styles.container}>
      {renderBadgeIcon(title, timesEarned)}
    </TouchableOpacity>
  );
};

/**
 * Reads the title input and return the related image.
 * @param {string} title the title input by the user.
 */
function renderBadgeIcon(title, timesEarned) {
  switch (title) {
    case "connector":
      return (
        <View style={styles.main}>
          <View style={styles.circleContainer}>
            {getTimesEarned(timesEarned)}
            <Image
              style={
                timesEarned
                  ? styles.statusIcon
                  : { ...styles.statusIcon, ...styles.disabled }
              }
              source={require("../assets/badges/connector.png")}
            />
          </View>
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={
              timesEarned ? styles.text : { ...styles.text, ...styles.disabled }
            }
          >
            Super connector
          </Text>
        </View>
      );
    case "listener":
      return (
        <View style={styles.main}>
          <View style={styles.circleContainer}>
            {getTimesEarned(timesEarned)}
            <Image
              style={
                timesEarned
                  ? styles.statusIcon
                  : { ...styles.statusIcon, ...styles.disabled }
              }
              source={require("../assets/badges/listener.png")}
            />
          </View>
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={
              timesEarned ? styles.text : { ...styles.text, ...styles.disabled }
            }
          >
            Great listener
          </Text>
        </View>
      );
    case "star":
      return (
        <View style={styles.main}>
          <View style={styles.circleContainer}>
            {getTimesEarned(timesEarned)}
            <Image
              style={
                timesEarned
                  ? styles.statusIcon
                  : { ...styles.statusIcon, ...styles.disabled }
              }
              source={require("../assets/badges/star.png")}
            />
          </View>
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={
              timesEarned ? styles.text : { ...styles.text, ...styles.disabled }
            }
          >
            You're a star
          </Text>
        </View>
      );
    case "thank_you":
      return (
        <View style={styles.main}>
          <View style={styles.circleContainer}>
            {getTimesEarned(timesEarned)}
            <Image
              style={
                timesEarned
                  ? styles.statusIcon
                  : { ...styles.statusIcon, ...styles.disabled }
              }
              source={require("../assets/badges/thank_you.png")}
            />
          </View>
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={
              timesEarned ? styles.text : { ...styles.text, ...styles.disabled }
            }
          >
            Thank you
          </Text>
        </View>
      );
  }
}

function getTimesEarned(timesEarned) {
  if (!timesEarned) {
    return null;
  } else {
    return (
      <View style={styles.circle}>
        <Text style={styles.circleText}>{timesEarned}</Text>
      </View>
    );
  }
}

/**
 * Custom validator for the title input.
 */
const titleValidator = (props, propName, componentName) => {
  let component = componentName || "ANONYMOUS";
  let validInputs = ["connector", "listener", "star", "thank_you"];

  if (props[propName]) {
    let value = props[propName];
    return validInputs.includes(value)
      ? null
      : new Error(
          `${propName} is not a valid input! Only ${validInputs.toString()} are permitted.`
        );
  }

  //Assume everything is ok
  return null;
};

// Type checker
BadgeComponent.propTypes = {
  title: titleValidator,
  timesEarned: PropTypes.number
};

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
    width: "24%",
    zIndex: 1,
    borderRadius: 30 / 2,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  main: {
    alignItems: "center",
    justifyContent: "center"
  },
  statusIcon: {
    resizeMode: "contain",
    height: 40
  },
  text: {
    marginTop: "2%",
    fontFamily: "poppins-regular",
    fontSize: 9
  },
  circle: {
    backgroundColor: "#F8AE39",
    height: 20,
    width: 20,
    borderRadius: 25,
    position: "absolute",
    marginLeft: 68,
    top: -10,
    zIndex: 99,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  circleContainer: {},
  circleText: {
    fontSize: 10,
    color: "white"
  },
  disabled: {
    opacity: 0.2
  }
});

export default BadgeComponent;
