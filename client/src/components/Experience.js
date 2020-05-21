import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

class Experience extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getAcademicLevel(academicLevel) {
    if (!academicLevel) {
      return null;
    }
    return (
      <View style={styles.experienceContainer}>
        <View style={styles.experienceCircle}></View>
        <Text style={{ fontFamily: "poppins-semi-bold" }}>
          Academic Level:{" "}
          <Text style={{ fontFamily: "poppins-medium", color: "grey" }}>
            {academicLevel}
          </Text>
        </Text>
      </View>
    );
  }

  getEducationText(educationText) {
    if (!educationText) {
      return null;
    }
    return (
      <View style={styles.experienceContainer}>
        <View style={styles.experienceCircle}></View>
        <View>
          <Text style={{ fontFamily: "poppins-semi-bold" }}>Education</Text>
          {educationText}
        </View>
      </View>
    );
  }

  getPreviousCompanies(previousCompaniesText) {
    if (!previousCompaniesText) {
      return null;
    }
    return (
      <View style={styles.experienceContainer}>
        <View style={styles.experienceCircle}></View>
        <View>
          <Text style={{ fontFamily: "poppins-semi-bold" }}>
            Previous Companies
          </Text>
          {previousCompaniesText}
        </View>
      </View>
    );
  }

  getIndustry(industry) {
    if (!industry) {
      return null;
    }
    return (
      <View style={styles.experienceContainer}>
        <View style={styles.experienceCircle}></View>
        <Text style={{ fontFamily: "poppins-semi-bold" }}>
          Industry:{" "}
          <Text style={{ fontFamily: "poppins-medium", color: "grey" }}>
            {industry}
          </Text>
        </Text>
      </View>
    );
  }

  getYearsOfExperience(yearsOfExperience) {
    if (!yearsOfExperience) {
      return null;
    }
    return (
      <View style={styles.experienceContainer}>
        <View style={styles.experienceCircle}></View>
        <Text style={{ fontFamily: "poppins-semi-bold" }}>
          Work Experience:{" "}
          <Text style={{ fontFamily: "poppins-medium", color: "grey" }}>
            {yearsOfExperience} years
          </Text>
        </Text>
      </View>
    );
  }

  render() {
    const yearsOfExperience = this.props.yearsOfExperience;
    const industry = this.props.industry;
    const previousCompanies = this.props.previousCompanies;
    const education = this.props.previousEducation;
    const academicLevel = this.props.academicLevel;

    const previousCompaniesText = previousCompanies.map((x, i) => {
      return (
        <Text
          key={i}
          style={{ ...styles.indentOne, fontFamily: "poppins-semi-bold" }}
        >
          {new Date(parseInt(x.end_date)).getYear() + 1900}{" "}
          <Text style={styles.subTextExperience}>- {x.company_name}</Text>
        </Text>
      );
    });

    const educationText = education.map((x, i) => {
      return (
        <Text
          key={i}
          style={{ ...styles.indentOne, fontFamily: "poppins-semi-bold" }}
        >
          {new Date(parseInt(x.end_date)).getYear() + 1900}{" "}
          <Text style={styles.subTextExperience}>- {x.school_name}</Text>
        </Text>
      );
    });

    return (
      <View>
        <Text
          style={{
            fontFamily: "poppins-semi-bold",
            marginVertical: "5%"
          }}
        >
          Experience
        </Text>
        <View style={styles.experience}>
          <View style={styles.innerContainer}>
            <View style={styles.line}></View>
            {/* Years */}
            {this.getYearsOfExperience(yearsOfExperience)}
            {/* industry */}
            {this.getIndustry(industry)}
            {/* Previous companies */}
            {this.getPreviousCompanies(previousCompaniesText)}
            {/* Education */}
            {this.getEducationText(educationText)}
            {/* Academic Level */}
            {this.getAcademicLevel(academicLevel)}
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
  subTextExperience: { fontFamily: "poppins-medium", color: "#757575" },
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

export default Experience;
