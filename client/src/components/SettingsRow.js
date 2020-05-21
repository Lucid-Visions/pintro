import React, { Component } from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";

function SettingsRow(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.lbl}</Text>
      {getRightComponent(props)}
    </View>
  );
}

function getRightComponent(props) {
  if (props.rightComponent) {
    return (
      <View style={styles.right}>
        {props.rightComponent}
      </View>
    );
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    width: "100%",
    borderColor: "#C8C8C8",
    flex: 1,
    flexDirection: "row"
  },
  text: {
    fontFamily: "poppins-regular",
    fontSize: 14,
    paddingTop: 17,
    paddingBottom: 15,
    marginLeft: 20
  },
  right: {
    position: "absolute",
    right: 20,
    paddingTop: 17,
    paddingBottom: 15
  }
});

export default SettingsRow;
