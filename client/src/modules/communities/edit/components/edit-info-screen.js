import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity
} from "react-native";
import BackButton from "../../../shared/icons/back-button/lightTheme";
import styles from "../styles";

import WideButton from "../../../../components/WideButton";
import { updateCommunity } from "../../actions";

const EditStory = ({ navigation, route }) => {

  const community = route.params;

  // State of the fields on the screen
  const [state, updateState] = useState({
    name: community.name || "",
    story: community.story || "",
    url: community.url || ""
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
    const communityNameEmpty = state.name === "";
    const communityStoryEmpty = state.story === "";

    if (communityNameEmpty || communityStoryEmpty) {
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
      updateCommunity(
        community._id,
        {
          name: state.name,
          story: state.story,
          url: state.url
        }
      );
      navigation.navigate('CommunityProfile', {...community})
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <BackButton navigation={navigation} />
        <Text style={styles.header}>Edit your community info</Text>
        <View>
          <Text style={styles.categoryHeader}>Name</Text>
          <TextInput
            style={styles.placeholder}
            placeholderTextColor={"grey"}
            placeholder={state.name || "Enter your community name..."}
            onEndEditing={input => setState({name: input.nativeEvent.text})}
          />
        </View>
        <View>
          <Text style={styles.categoryHeader}>Story</Text>
          <TextInput
            style={styles.placeholder}
            placeholderTextColor={"grey"}
            placeholder={state.story || "Enter your community story"}
            onEndEditing={input => setState({story: input.nativeEvent.text})}
          />
        </View>
        <View>
          <Text style={styles.categoryHeader}>URL</Text>
          <TextInput
            style={styles.placeholder}
            placeholderTextColor={"grey"}
            placeholder={state.url || "Enter your community URL..."}
            onEndEditing={input => setState({url: input.nativeEvent.text})}
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
  );
};

export default EditStory;
