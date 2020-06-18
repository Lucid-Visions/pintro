import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions
} from "react-native";
import Constants from "expo-constants";
import PostButton from "../components/WideButtonRight";
import MultiSelect from "react-native-multiple-select";
import TagsPassions from "../assets/TagsPassions";
import BackButton from "../modules/shared/icons/back-button/lightTheme";

import { useNavigation } from "@react-navigation/native";

const AddCommunityEvent = ({ route }) => {
  const navigation = useNavigation();
  const callback = route.params.update;
  const editMode = route.params.editMode || false;
  let editData;

  if (editMode) editData = route.params.data;

  const tagsList = TagsPassions.map((item) => {
    return { text: item.text, id: `${item.text}` };
  });

  const [state, updateState] = useState({
    id: editMode ? editData.id : route.params.id,
    title: editMode ? editData.title : "",
    link: editMode ? editData.resource : "",
    tags: editMode ? editData.tags : [],
  });

  const setState = (newState) => {
    updateState((prevState) => {
      return { ...prevState, ...newState };
    });
  };

  const constructRecommendation = () => {
    return {
      id: state.id,
      title: state.title,
      resource: state.link,
      tags: state.tags,
    };
  };

  /**
   * Check if fields are not empty
   */
  const checkFieldsEmpty = () => {
    const titleEmpty = state.title === "";
    const linkEmpty = state.link === "";
    const tagsEmpty = state.tags.length == 0;

    if (titleEmpty || linkEmpty || tagsEmpty) {
      return true;
    } else return false;
  };

  /**
   * checks if the update was successful and redirects to the Profile page
   */
  const updateCallBack = async () => {
    const fieldsEmpty = checkFieldsEmpty();

    if (fieldsEmpty) {
      alert("Please don't leave required fields empty!");
    } else {
      const recommendation = constructRecommendation();

      callback(recommendation);
      navigation.goBack();
    }
  };

  const onSelectedTagsChange = (selectedItems) => {
    setState({ tags: selectedItems });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <BackButton navigation={navigation} />
        <Text style={styles.header}>Add an upcoming event</Text>
        {/* Title */}
        <View>
          <Text style={styles.categoryHeader}>Event Name</Text>
          <TextInput
            style={styles.placeholder}
            placeholderTextColor={"grey"}
            placeholder={editMode ? state.title : "Insert name here"}
            onChangeText={(nameInput) => setState({ title: nameInput })}
          />
        </View>
        {/* Link */}
        <View>
          <Text style={styles.categoryHeader}>
            Eventbrite Link{" "}
            <Text style={{ fontStyle: "italic" }}>
              (full https URL required)
            </Text>{" "}
          </Text>
          <TextInput
            style={styles.placeholder}
            placeholderTextColor={"grey"}
            placeholder={
              editMode ? state.link : "Add external eventbrite link"
            }
            onChangeText={(input) => setState({ link: input })}
          />
        </View>
        {/* Tags */}
        <View
          marginHorizontal={15}
          flex={1}
          borderBottomColor="#ACACAC"
          borderBottomWidth={1}
          width={Dimensions.get("screen").width / 1.1}
          alignSelf="center"
          paddingBottom={10}
        >
          <Text style={styles.categoryHeader}>Choose up to 3 tags</Text>
          <MultiSelect
            hideSubmitButton
            items={tagsList}
            uniqueKey="id"
            onSelectedItemsChange={onSelectedTagsChange}
            selectedItems={state.tags}
            selectText="Start typing..."
            searchInputPlaceholderText="Start typing..."
            altFontFamily="poppins-regular"
            fontFamily="poppins-regular"
            itemFontFamily="poppins-regular"
            selectedItemFontFamily="poppins-regular"
            tagRemoveIconColor="#ACACAC"
            tagBorderColor="#ACACAC"
            tagTextColor="#2E2E2E"
            selectedItemTextColor="#2E2E2E"
            selectedItemIconColor="#2E2E2E"
            itemTextColor="#ACACAC"
            displayKey="text"
            searchInputStyle={{ color: "black" }}
            styleDropdownMenuSubsection={{
              backgroundColor: "#F1F1F1",
              borderBottomColor: "#F1F1F1",
            }}
            styleDropdownMenu={{
              backgroundColor: "#F1F1F1",
            }}
            styleInputGroup={{
              backgroundColor: "#F1F1F1",
            }}
            styleItemsContainer={{
              backgroundColor: "#F1F1F1",
            }}
          />
        </View>
        <TouchableOpacity onPress={() => updateCallBack()}>
          <PostButton
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
    justifyContent: "space-around",
    marginHorizontal: 20,
  },
  header: {
    fontFamily: "poppins-bold",
    margin: "auto",
    textAlign: "left",
    alignItems: "baseline",
    fontSize: 24,
    paddingTop: 50,
  },
  headerText: {
    fontFamily: "poppins-regular",
    margin: "auto",
    textAlign: "left",
    alignItems: "baseline",
    fontSize: 12,
    paddingTop: 20,
    paddingBottom: 30,
  },
  categoryHeader: {
    fontFamily: "poppins-regular",
    margin: "auto",
    textAlign: "left",
    alignItems: "baseline",
    fontSize: 12,
    paddingBottom: 5,
  },
  placeholder: {
    fontFamily: "poppins-regular",
    borderBottomWidth: 0.2,
    margin: "auto",
    alignItems: "stretch",
    fontSize: 13,
    marginBottom: 50,
    paddingVertical: 15,
  },
  submitBtn: {
    backgroundColor: "black",
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "black",
    color: "black",
    width: 300,
    marginVertical: 30,
  },
});

export default AddCommunityEvent;
