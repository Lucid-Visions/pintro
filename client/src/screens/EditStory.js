import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import WideButton from "../components/WideButton";

const updateRequest = require("../assets/updateRequest").update;

const EditStory = ({ route }) => {
  const navigation = useNavigation();
  const user = route.params;

  // State of the fields on the screen
  const [state, updateState] = useState({
    name: user.name || "",
    role: user.experience.currentJobTitle || "",
    company: user.experience.currentCompany || "",
    bio: user.bio || ""
  });

  const setState = newState => {
    updateState(prevState => {
      return { ...prevState, ...newState };
    });
  };

  /**
   * Check if fields are not empty
   */
  const checkFieldsEmpty = () => {
    const nameEmpty = state.name === "";
    const roleEmpty = state.role === "";
    const companyEmpty = state.company === "";
    const bioEmpty = state.bio === "";

    if (nameEmpty || roleEmpty || companyEmpty || bioEmpty) {
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
      const result = updateRequest({
        name: state.name,
        "experience.currentCompany": state.company,
        bio: state.bio,
        "experience.currentJobTitle": state.role
      });
      navigation.navigate("Profile");
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
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
        <Text style={styles.header}>Edit your story</Text>
        <Text style={styles.headerText}>Build your profile</Text>
        <View>
          <Text style={styles.categoryHeader}>Name</Text>
          <TextInput
            style={styles.placeholder}
            placeholderTextColor={"grey"}
            placeholder={state.name || "Enter your full name..."}
            onChangeText={nameInput => setState({ name: nameInput })}
          />
        </View>
        <View>
          <Text style={styles.categoryHeader}>Current job title</Text>
          <TextInput
            style={styles.placeholder}
            placeholderTextColor={"grey"}
            placeholder={state.role || "Enter your current position"}
            onChangeText={roleInput => setState({ role: roleInput })}
          />
        </View>
        <View>
          <Text style={styles.categoryHeader}>Current company</Text>
          <TextInput
            style={styles.placeholder}
            placeholderTextColor={"grey"}
            placeholder={state.company || "Enter your current company..."}
            onChangeText={companyInput => setState({ company: companyInput })}
          />
        </View>
        <View>
          <Text style={styles.categoryHeader}>Your Story</Text>
          <TextInput
            style={styles.placeholder}
            placeholderTextColor={"grey"}
            placeholder={state.bio || "Enter your story..."}
            multiline={true}
            onChangeText={storyInput => setState({ bio: storyInput })}
          />
        </View>
        <TouchableOpacity onPress={() => update()}>
          <WideButton
            containerStyle={styles.submitBtn}
            textStyle={{ color: "white" }}
            value="Done"
          />
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    marginHorizontal: 20
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
    borderBottomWidth: 0.2,
    margin: "auto",
    alignItems: "stretch",
    fontSize: 13,
    marginBottom: 50,
    paddingVertical: 15
  },
  submitBtn: {
    backgroundColor: "black",
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "black",
    color: "black",
    width: 300,
    marginVertical: 30
  }
});

export default EditStory;
