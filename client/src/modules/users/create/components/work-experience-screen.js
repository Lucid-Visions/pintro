import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView
} from "react-native";
import styles from '../../styles'
import { yearsRegex } from '../../constants'
import BackButton from "../../../shared/icons/back-button/darkTheme"
import WideButtonComponent from "../../../../components/WideButtonRight";
import YearItemSelector from "../../../../components/YearItemSelector";
import RNPickerSelect from "react-native-picker-select";
import fieldValidator from "../../../shared/utils"

const updateRequest = require("../../../../assets/updateRequest").update;

var validYears;
var btnStyles = { ...styles.btn, ...styles.btnDisabled }

const isSubmitDisabled = () => {
  if(validYears) {
    btnStyles = styles.btn
    return false;
  } else {
    btnStyles = { ...styles.btn, ...styles.btnDisabled }
    return true;
  }
}

export default class workExperienceScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      years: "",
      industry: "",
      education: [{ year: null, value: null }],
      experience: [{ year: null, value: null }],
      level: ""
    };

    this.callback = this.callback.bind(this);
  }

  callback(value, id, type, isPicker) {
    let prevState = this.state[type];
    let newState = prevState;
    if (newState.length - 1 < id) {
      newState.push({ year: null, value: null });
    }
    if (isPicker) {
      newState[id]["year"] = value;
    } else {
      newState[id]["value"] = value;
    }

    this.setState({ [type]: newState });
  }

  update(navigation) {
    const toUpdate = this.constructToUpdate();
    if (toUpdate) {
      const result = updateRequest(toUpdate);
      if (result) navigation.navigate("SignUp6");
    }
  }

  constructToUpdate() {
    const newCompanies = this.state.experience
      .filter(item => {
        return item.value != null && item.year != null;
      })
      .map(company => {
        return {
          company_name: company.value,
          start_date: Date.parse(company.year),
          end_date: Date.parse(company.year)
        };
      });

    const newEducation = this.state.education
      .filter(item => {
        return item.value != null && item.year != null;
      })
      .map(school => {
        return {
          school_name: school.value,
          start_date: Date.parse(school.year),
          end_date: Date.parse(school.year)
        };
      });

    if (
      this.state.years.trim() &&
      this.state.industry.trim() &&
      this.state.level.trim() &&
      newCompanies &&
      newEducation
    ) {
      return {
        experience:{
        work_experience_years: this.state.years,
        industry: this.state.industry,
        companies: newCompanies,
        education: newEducation,
        academic_level: this.state.level
        }
      };
    } 
  }

  render() {
    {/* Need to verify with danielle which of these fields are going to be required*/}
    const { navigation } = this.props;
    let experienceInput = this.state.experience.map((x, index) => {
      return (
        <View>
          <YearItemSelector
            callback={this.callback}
            type={"experience"}
            id={index}
            value={this.state.experience[index]}
            placeholder={"Enter previous company name"}
          />
        </View>
      );
    });

    let educationInput = this.state.education.map((x, index) => {
      return (
        <YearItemSelector
          callback={this.callback}
          type={"education"}
          id={index}
          value={this.state.education[index]}
          placeholder={"Enter school/college/university"}
        />
      );
    });
    return (
      <ScrollView
        style={styles.container2}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container1}>
          <View style={styles.container}>
          <BackButton navigation={navigation} />
            <View>
              <Text style={styles.h1}>Tell us your history</Text>
              <Text style={styles.h2}>Your work experience timeline</Text>
            </View>

            <View>
              <Text style={styles.prompt}>Work experience</Text>
            </View>
            <View style={validYears==false ? styles.bottomBorderInvalid : styles.bottomBorder}>
              <TextInput
                style={styles.placeholder}
                placeholderTextColor={"white"}
                placeholder="Enter number of years"
                keyboardType={"numeric"}
                onChangeText={years => {
                  validYears = fieldValidator({regex: yearsRegex, input: years})
                  this.setState({ years })
                }}
                value={this.state.years}
              />
            </View>

            <View>
              {/* Going to be a dropdown as per PIN-79*/}
              <Text style={styles.prompt}>Industry</Text>
            </View>
            <View style={styles.bottomBorder}>
              <TextInput
                style={styles.placeholder}
                placeholderTextColor={"white"}
                placeholder="Enter your current industry"
                onChangeText={industry => this.setState({ industry })}
                value={this.state.industry}
              />
            </View>

            <View>
              <Text style={styles.prompt}>Previous companies</Text>
            </View>
            {experienceInput}
            <TouchableOpacity
              style={styles.imageContainer}
              onPress={() => {
                this.setState({
                  experience: this.state.experience.concat({
                    year: null,
                    value: null
                  })
                });
              }}
            >
              <Image
                style={styles.image}
                source={require("../../../../assets/whitePlus.png")}
              />
            </TouchableOpacity>

            <View>
              <Text style={styles.prompt}>Education</Text>
            </View>
            {educationInput}

            <TouchableOpacity
              style={styles.imageContainer}
              onPress={() => {
                this.setState({
                  education: this.state.education.concat({
                    year: null,
                    value: null
                  })
                });
              }}
            >
              <Image
                style={styles.image}
                source={require("../../../../assets/whitePlus.png")}
              />
            </TouchableOpacity>

            <View>
              <Text style={styles.prompt}>Academic Level</Text>
            </View>
            <View
              style={{
                ...styles.bottomBorder
              }}
            >
              <RNPickerSelect
                //placeholder={"Year": null}
                onValueChange={value => this.setState({ level: value })}
                items={[
                  {
                    label: "Certificate of Higher Education",
                    value: "Certificate of Higher Education"
                  },
                  { label: "Foundation degree", value: "Foundation degree" },
                  { label: "Bachelor's degree", value: "Bachelor's degree" },
                  { label: "Master's degree", value: "Master's degree" },
                  { label: "PhD/DPhil", value: "PhD/DPhil" }
                ]}
                style={pickerStyle}
              />
            </View>

            <View paddingTop={20} alignSelf={"center"}>
              <TouchableOpacity
                onPress={() => this.update(navigation)}
                underlayColor="white"
                disabled={isSubmitDisabled()}
              >
                <WideButtonComponent
                  value={"STEP 4 OF 6"}
                  source={require("../../../../assets/arrow-right.png")}
                  containerStyle={btnStyles}
                  textStyle={{
                    fontSize: 14,
                    fontFamily: "poppins-light",
                    color: "#1A1A1A"
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const pickerStyle = {
  inputIOS: {
    color: "white",
    borderBottomColor: "lightgrey",
    fontSize: 13,
    borderBottomWidth: 0.5,
    padding: 20
  },
  inputAndroid: {
    color: "white",
    borderBottomColor: "lightgrey",
    fontSize: 13,
    borderBottomWidth: 0.5,
    padding: 20
  },
  placeholderColor: "white"
};

