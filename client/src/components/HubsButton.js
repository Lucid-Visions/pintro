import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import ElevatedView from "react-native-elevated-view";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";

/**
 * Renders an action button for the user's profile.
 * @param {string} hubName the name of the hub.
 * @param {string} number the number of people that are in the hub.
 * @param {string} source the company picture path.
 * @param {string} firstMember the path to the first member's picture
 * @param {string} secondMember the path to the second member's picture
 * @param {string} thirdMember the path to the third member's picture
 */
const HubsButtonComponent = ({
  hubName,
  number,
  source,
  firstMember,
  secondMember,
  thirdMember
}) => (
  <ElevatedView style={styles.view} elevation={10}>
    <TouchableOpacity style={styles.container}>
      <View style={styles.outline}>
        <Image
          style={styles.image}
          source={source || require("../assets/Empty-profile-picture-semi.png")}
        />
      </View>

      <View style={styles.text}>
        <Text style={styles.title}>{hubName}</Text>
        <Text style={styles.subtitle}>{number} members</Text>
      </View>
      <View style={styles.circles}>
        <View style={styles.symbols}>
          <Image
            style={styles.smallerImageTwo}
            source={
              firstMember || require("../assets/Empty-profile-picture-dark.png")
            }
          />
          <Image
            style={styles.smallerImageOne}
            source={
              secondMember ||
              require("../assets/Empty-profile-picture-semi.png")
            }
          />
          <Image
            style={styles.smallerImageTwo}
            source={
              thirdMember ||
              require("../assets/Empty-profile-picture-bright.png")
            }
          />
        </View>
        <View style={styles.circle}>
          <Text style={styles.innerText} adjustsFontSizeToFit numberOfLines={1}>
            +{number > 3 ? number : "0"}{" "}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  </ElevatedView>
);

// Type checker
HubsButtonComponent.propTypes = {
  hubName: PropTypes.string,
  number: PropTypes.number,
  source: PropTypes.number,
  firstMember: PropTypes.number,
  secondMember: PropTypes.number,
  thirdMember: PropTypes.number
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    borderColor: "red"
  },
  view: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 15,
    width: "85%",
    height: "10%",
    padding: 20
  },
  text: {
    flexDirection: "column",
    left: "auto",
    marginLeft: 5,
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
  outline: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginLeft: 0,
    padding: 2
  },
  symbols: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    position: "absolute",
    padding: 2
  },
  image: {
    borderRadius: 150 / 2,
    width: 40,
    height: 40,
    overflow: "hidden"
  },
  smallerImageOne: {
    borderRadius: 150 / 2,
    width: 30,
    height: 30,
    position: "absolute"
  },
  smallerImageTwo: {
    borderRadius: 150 / 2,
    width: 30,
    height: 30,
    marginLeft: 1
  },
  circle: {
    borderRadius: 150 / 2,
    width: 30,
    height: 30,
    position: "absolute",
    marginLeft: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F9A602",
    marginTop: 2.5
  },
  innerText: {
    fontSize: 11
  },
  circles: {
    marginTop: 5,
    marginLeft: 110
  }
});

export default HubsButtonComponent;
