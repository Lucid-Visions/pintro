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
      <View style={styles.textContainer}>
        <Text style={{...styles.text,...textStyle}}>{value}</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: 275.88,
    height: 54.12,
    borderRadius: 25,
    borderWidth: 0.5,
    borderColor: "#EFEFEF",
    backgroundColor: "white",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    marginLeft: "auto", 
    marginRight: "auto",
    shadowOffset:{ width: 5,  height: 5 },
    shadowColor: 'black',
    shadowOpacity: 0.05
  },
  elementContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  textContainer: {
    marginHorizontal: 25
  }
});

export default WideButton;
