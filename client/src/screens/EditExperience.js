import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image
} from "react-native";
import Constants from "expo-constants";
import RNPickerSelect from "react-native-picker-select";
import { useNavigation } from "@react-navigation/native";

import WideButton from "../components/WideButton";
import AddButton from "../components/AddButton";
import YearItemSelector from "../components/YearItemSelector";

const updateRequest = require("../assets/updateRequest").update;

const EditExperience = ({ route }) => {
  const navigation = useNavigation();
  const experience = route.params.experience;

  let educationArr;
  let companiesArr;

  // Check if teh user has any experience or companies
  // and create objects with year, value and placeholder texts
  if (experience.education != undefined) {
    educationArr = experience.education.map(item => {
      return {
        year: new Date(parseInt(item.end_date)).getYear() + 1900,
        value: item.school_name,
        placeholder: {
          year: new Date(parseInt(item.end_date)).getYear() + 1900,
          text: item.school_name
        }
      };
    });
  }
  if (experience.companies != undefined) {
    companiesArr = experience.companies.map(item => {
      return {
        year: new Date(parseInt(item.end_date)).getYear() + 1900,
        value: item.company_name,
        placeholder: {
          year: new Date(parseInt(item.end_date)).getYear() + 1900,
          text: item.company_name
        }
      };
    });
  }

  // State of the text fields on the screen
  const [state, updateState] = useState({
    years: experience.work_experience_years || "",
    industry: experience.industry || "",
    level: experience.academic_level || null,
    education: educationArr || [
      {
        year: null,
        value: null,
        placeholder: {
          year: null,
          text: null
        }
      }
    ],
    companies: companiesArr || [
      {
        year: null,
        value: null,
        placeholder: {
          year: null,
          text: null
        }
      }
    ]
  });

  const setState = newState => {
    updateState(prevState => {
      return { ...prevState, ...newState };
    });
  };

  /**
   * Constructs the new experience object to
   * update for the user
   */
  const constructExperience = () => {
    let newCompanies = state.companies
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
    let newEducation = state.education
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

    return {
      "experience.work_experience_years": state.years,
      "experience.industry": state.industry,
      "experience.companies": newCompanies,
      "experience.education": newEducation,
      "experience.academic_level": state.level
    };
  };

  /**
   * Check if fields are not empty
   */
  const checkFieldsEmpty = () => {
    const yearsEmpty = state.years === "";
    const industryEmpty = state.industry === "";
    const levelEmpty = state.level === "";

    if (yearsEmpty || industryEmpty || levelEmpty) {
      return true;
    } else return false;
  };

  /**
   * checks if fields are not empty then saves the data in the db
   * and redirects to the profile page
   */
  const update = () => {
    const fieldsEmpty = checkFieldsEmpty();
    if (fieldsEmpty) {
      alert("Please don't leave empty fields");
    } else {
      const newExperience = constructExperience();
      const result = updateRequest(newExperience);
      navigation.navigate("Profile");
    }
  };

  /**
   * Updates the state of a company or education row
   * called when year value and text value are changed
   * @param {*} value the value of the field, can be year or text
   * @param {*} id id of the experience row
   * @param {*} type can be year or value
   * @param {*} isPicker check if its year picker or text field value
   */
  function callback(value, id, type, isPicker) {
    let prevState = state[type];
    let newState = prevState;
    if (newState.length - 1 < id) {
      newState.push({ year: null, value: null });
    }
    if (isPicker) {
      newState[id]["year"] = value;
    } else {
      newState[id]["value"] = value;
    }

    setState({ [type]: newState });
  }

  /**
   * Constructs and renders a row with each company that
   * the user has
   */
  const displayCompanies = state.companies.map((item, index) => {
    return (
      <View style={styles.containerHorizontal}>
        <YearItemSelector
          key={index}
          callback={callback}
          type={"companies"}
          id={index}
          yearPlaceholder={state.companies[index].placeholder.year}
          placeholder={state.companies[index].placeholder.text}
          yearValue={state.companies[index].year}
          blackTheme={true}
        />
      </View>
    );
  });

  /**
   * Constructs and renders a row with each school that
   * the user has
   */
  const displayEducation = state.education.map((item, index) => {
    return (
      <View style={styles.containerHorizontal}>
        <YearItemSelector
          key={index}
          callback={callback}
          type={"education"}
          id={index}
          yearPlaceholder={state.education[index].placeholder.year}
          placeholder={state.education[index].placeholder.text}
          yearValue={state.education[index].year}
          blackTheme={true}
        />
      </View>
    );
  });

  return (
    <ScrollView>
      <View style={styles.container}>
        {navigation.canGoBack() && (
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{ marginTop: 20 }}
          >
            <Image
              source={require("../assets/leftArrow.png")}
              style={{
                height: 20,
                width: 25,
                resizeMode: "contain",
                alignSelf: "flex-start",
              }}
            />
          </TouchableOpacity>
        )}
        <Text style={styles.header}>Edit your experience</Text>
        <Text style={styles.headerText}>Your work experience timeline</Text>

        <Text style={styles.categoryHeader}>Work Experience</Text>
        <TextInput
          style={styles.placeholder}
          placeholderTextColor={"grey"}
          placeholder={`${state.years || "Enter your work experience..."}`}
          onChangeText={input => setState({ years: input })}
          keyboardType={"numeric"}
        />

        <Text style={styles.categoryHeader}>Industry</Text>
        <TextInput
          style={styles.placeholder}
          placeholderTextColor={"grey"}
          placeholder={state.industry || "Enter your industry..."}
          onChangeText={input => setState({ industry: input })}
        />

        <Text style={styles.categoryHeader}>Previous Companies</Text>
        {displayCompanies}
        <AddButton
          action={() => {
            setState({
              companies: state.companies.concat({
                year: null,
                value: null,
                placeholder: {
                  year: null,
                  text: null
                }
              })
            });
          }}
        />

        <Text style={styles.categoryHeader}>Education</Text>
        {displayEducation}
        <AddButton
          action={() => {
            setState({
              education: state.education.concat({
                year: null,
                value: null,
                placeholder: {
                  year: null,
                  text: null
                }
              })
            });
          }}
        />

        <Text style={styles.categoryHeader}>Academic Level</Text>
        <RNPickerSelect
          style={styles.pickerContainer}
          value={state.level}
          placeholder={{}}
          onValueChange={value => setState({ level: value })}
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
        />

        <TouchableOpacity onPress={() => update()}>
          <WideButton
            containerStyle={styles.submitBtn}
            textStyle={{ color: "white" }}
            value="Done"
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    flexDirection: "column",
    marginHorizontal: 20
  },
  containerHorizontal: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  pickerContainer: {
    fontSize: 13,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    padding: 20
  },
  header: {
    fontFamily: "poppins-bold",
    margin: "auto",
    textAlign: "left",
    alignItems: "baseline",
    fontSize: 24,
    paddingTop: 30
  },
  headerText: {
    fontFamily: "poppins-regular",
    margin: "auto",
    textAlign: "left",
    alignItems: "baseline",
    fontSize: 12,
    paddingTop: 15,
    paddingBottom: 30
  },
  categoryHeader: {
    fontFamily: "poppins-regular",
    margin: "auto",
    textAlign: "left",
    alignItems: "baseline",
    fontSize: 12,
    paddingBottom: 5
  },
  placeholder: {
    fontFamily: "poppins-regular",
    borderBottomWidth: 1,
    fontSize: 13,
    paddingVertical: 15,
    marginBottom: 40
  },
  submitBtn: {
    backgroundColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
    color: "black",
    width: 300,
    marginVertical: 30
  }
});

export default EditExperience;
