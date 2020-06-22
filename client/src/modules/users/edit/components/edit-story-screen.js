import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../../../shared/icons/back-button/lightTheme";
import styles from "../styles";

import WideButton from "../../../../components/WideButton";

const updateRequest = require("../../../../assets/updateRequest").update;

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
    <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS == "ios" ? "padding" : "height"}>
      <ScrollView>
        <View style={styles.container}>
          <BackButton navigation={navigation} />
          <Text style={styles.header}>Edit your story</Text>
          <Text style={styles.headerText}>Build your profile</Text>
          <View>
            <Text style={styles.categoryHeader}>Name</Text>
            <TextInput
              style={styles.placeholder}
              placeholderTextColor={"grey"}
              placeholder={state.name || "Enter your full name..."}
              onEndEditing={input => setState({name: input.nativeEvent.text})}
            />
          </View>
          <View>
            <Text style={styles.categoryHeader}>Current job title</Text>
            <TextInput
              style={styles.placeholder}
              placeholderTextColor={"grey"}
              placeholder={state.role || "Enter your current position"}
              onEndEditing={input => setState({role: input.nativeEvent.text})}
            />
          </View>
          <View>
            <Text style={styles.categoryHeader}>Current company</Text>
            <TextInput
              style={styles.placeholder}
              placeholderTextColor={"grey"}
              placeholder={state.company || "Enter your current company..."}
              onEndEditing={input => setState({company: input.nativeEvent.text})}
            />
          </View>
          <View>
            <Text style={styles.categoryHeader}>Your Story</Text>
            <TextInput
              style={styles.placeholder}
              placeholderTextColor={"grey"}
              placeholder={state.bio || "Enter your story..."}
              multiline={true}
              scrollEnabled={false}
              onEndEditing={input => setState({bio: input.nativeEvent.text})}
            />
          </View>
          <TouchableOpacity onPress={() => update()}>
            <WideButton
              containerStyle={styles.submitBtn}
              textStyle={{ color: "white" }}
              value="Done"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditStory;
