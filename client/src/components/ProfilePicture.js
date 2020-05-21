import React, { Component } from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import moodIconsData from "../assets/moods/moodIconsData";
/**
 * Renders a given user's profile picture.
 * Also renders a given status of such user.
 * @param {string} source the profile picture path.
 * @param {string} status the user's status.
 */
const ProfilePictureComponent = ({ source, status, onPress, onLongPress }) => (
  <TouchableOpacity onPress={onPress} onLongPress={onLongPress} >
  <View style={styles.container}>
    <Image
      style={styles.image}
      source={source?{url:source} : require("../assets/empty-profile-picture.png")}
    />
    
    {/** Render the appropiate status image */}
    {renderStatus(status)}
  </View>
  </TouchableOpacity>

);

/**
 * Reads the status input and return the related image.
 * @param {string} inputStatus the status input by the user.
 */
function renderStatus(inputStatus) {
  if (inputStatus == -1 || inputStatus == null) {
    return null;
  }
  let data = Object.assign(
    {},
    ...moodIconsData.map(s => ({ [s.id]: { image: s.image, text: s.text } }))
  );
  if(!data[inputStatus]){
    return null
  }
  return (
    <View style={styles.moodContainer}>
      <Image style={styles.statusIcon} source={data[inputStatus].image} />
    </View>
  );
}

/**
 * Custom validator for the status input.
 */
const statusValidator = (props, propName, componentName) => {
  let component = componentName || "ANONYMOUS";
  let validInputs = [-1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
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

// Type checker.
ProfilePictureComponent.propTypes = {
  // Using 'require' with an image returns a number.
  source: PropTypes.string,
  status: statusValidator
};

const styles = StyleSheet.create({
  container: {
    maxWidth: 200,
    minHeight: 120,
    margin: 0
  },
  image: {
    borderRadius: 120 / 2,
    width: 120,
    height: 120,
    overflow: "hidden"
  },
  statusIcon: {
    width: 25,
    height: 25,
    alignSelf:"center",
    resizeMode:"contain"
  },
  moodContainer: {
    backgroundColor: "#F9B643",
    borderRadius: 35 / 2,
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 35,
    height: 35,
    zIndex: 1,
    flexDirection:"column",
    alignContent: "center",
    justifyContent:"center",
  }
});

export default ProfilePictureComponent;
