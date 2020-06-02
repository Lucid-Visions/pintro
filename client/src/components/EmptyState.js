import React, { Component } from "react";
import { View, Image, StyleSheet, Text, Dimensions, TouchableOpacity } from "react-native";
import WideButton from "./WideButton";
import sources, { text, actions } from "../assets/emptyStates/emptyStates";

function EmptyState({ state, onPress, modal }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text[state].h1}</Text>
      <Text style={styles.text2}>{text[state].h2}</Text>
      <Image source={sources[state]} style={modal ? styles.imageModal : styles.image} />
      <View style={{ width: "100%", position: "absolute", bottom: 40 }}>
        <TouchableOpacity
          onPress={() => {
            onPress?onPress():actions[state]();
          }}
        >
          <WideButton
            containerStyle={{ backgroundColor: "black", width: "80%" }}
            textStyle={{ color: "white", fontSize: 15 }}
            value={text[state].button}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: height - 170
  },
  image: {
    height: 150,
    width: "80%",
    resizeMode: "contain",
    marginTop: 100,
    marginBottom: 100
  },
  imageModal: {
    height: 140,
    resizeMode: "contain",
    marginTop: 50,
    marginBottom: 100
  },
  text: {
    fontFamily: "poppins-semi-bold",
    fontSize: 25,
    color: "black",
    textAlign: "center"
  },
  text2: {
    textAlign: "center",
    fontSize: 13,
    color: "#808080",
    fontFamily: "poppins-regular",
    marginTop: 30
  }
});

export default EmptyState;
