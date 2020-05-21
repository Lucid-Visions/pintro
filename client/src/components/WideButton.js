import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";

/**
 * Renders wide button
 * @param {string} value the text
 * @param {string} source image to display next to text
 * @param {string} style any extra styles for the container

 */
const WideButton = ({ value, source, containerStyle, textStyle }) => (
  <View style={{...styles.container, ...containerStyle}}>
    <View style={styles.elementContainer}>
      {getSource(source)}
      <View style={styles.textContainer}>
        <Text style={{...styles.text,...textStyle}}>{value}</Text>
      </View>
    </View>
  </View>
);

function getSource(source) {

  if (source) {
    return (
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={source} />
      </View>
    );
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    width: 400.88,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto", marginRight: "auto" 
  },
  elementContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    width: 20,
    height: 20,
    overflow: "hidden"
  },
  imageContainer: {
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10
  },
  text: {
    fontSize: 15,
    color: "black",
    fontFamily: "poppins-medium"
  },
  textContainer: {
    marginLeft: 10,
    marginRight: 10
  }
});

export default WideButton;
