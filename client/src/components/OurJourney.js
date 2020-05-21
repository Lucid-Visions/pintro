import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

class OurJourney extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getDateFounded(dateFounded) {
    if (!dateFounded) {
      return null;
    }
    return (
      <View style={styles.experienceContainer}>
        <View style={styles.experienceCircle}></View>
        <Text style={{ fontFamily: "poppins-semi-bold" }}>
          Founded:{" "}
          <Text style={{ fontFamily: "poppins-medium", color: "grey" }}>
            {dateFounded}
          </Text>
        </Text>
      </View>
    );
  }

  getLocation(location) {
    if (!location) {
      return null;
    }
    return (
      <View style={styles.experienceContainer}>
        <View style={styles.experienceCircle}></View>
        <Text style={{ fontFamily: "poppins-semi-bold" }}>
          Location:{" "}
          <Text style={{ fontFamily: "poppins-medium", color: "grey" }}>
            {location}
          </Text>
        </Text>
      </View>
    );
  }

  getCompanySize(companySize) {
    if (!companySize) {
      return null;
    }
    return (
      <View style={styles.experienceContainer}>
        <View style={styles.experienceCircle}></View>
        <Text style={{ fontFamily: "poppins-semi-bold" }}>
          Company Size:{" "}
          <Text style={{ fontFamily: "poppins-medium", color: "grey" }}>
            {companySize+" Members"}
          </Text>
        </Text>
      </View>
    );
  }

  getFunding(funding) {
    if (!funding) {
      return null;
    }
    return (
      <View style={styles.experienceContainer}>
        <View style={styles.experienceCircle}></View>
        <Text style={{ fontFamily: "poppins-semi-bold" }}>
          Funding:{" "}
          <Text style={{ fontFamily: "poppins-medium", color: "grey" }}>
            {funding}
          </Text>
        </Text>
      </View>
    );
  }

  render() {
    const dateFounded = this.props.dateFounded;
    const location = this.props.location;
    const companySize = this.props.companySize;
    const funding = this.props.funding;

    return (
      <View>
        <Text
          style={{
            fontFamily: "poppins-semi-bold",
            marginTop: "4%",
            marginBottom: "2%"
          }}
        >
          Our Journey
        </Text>
        <View style={styles.experience}>
          <View style={styles.innerContainer}>
            <View style={styles.line}></View>
            {/* Date Founded */}
            {this.getDateFounded(dateFounded)}
            {/* Location */}
            {this.getLocation(location)}
            {/* Company Size */}
            {this.getCompanySize(companySize)}
            {/* Funding */}
            {this.getFunding(funding)}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  experienceContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center"
    // borderColor:"red",
    // borderWidth:1
  },
  subTextExperience: { 
    fontFamily: "poppins-medium", 
    color: "#757575" 
  },
  experienceCircle: {
    height: 7,
    width: 7,
    backgroundColor: "#F3A33F",
    borderRadius: 25,
    marginRight: 20,
    position: "absolute",
    left: -20,
    top: 7
  },
  indentOne: {
    marginLeft: 20
  },
  experience: {
    flexDirection: "row"
  },
  line: {
    backgroundColor: "#686868",
    width: 1,
    position: "absolute",
    left: -17,
    top: 10,
    bottom: 10
  },
  innerContainer: {
    marginLeft: 30
  }
});

export default OurJourney;
