import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Dimensions
} from "react-native";
import Constants from "expo-constants";
import PostButton from "../components/WideButtonRight";
import MultiSelect from "react-native-multiple-select";
import TagsPassions from "../assets/TagsPassions";

import * as ImagePicker from "expo-image-picker";

import { useNavigation } from "@react-navigation/native";

const AddRecommendation = ({ route }) => {
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
    type: editMode ? editData.type : route.params.type,
    photo: editMode ? editData.photo : null,
    tags: editMode ? editData.tags : [],
  });

  const [photoData, setPhotoData] = useState({
    URI: null,
    base64: null,
  });

  const setState = (newState) => {
    updateState((prevState) => {
      return { ...prevState, ...newState };
    });
  };

  const constructRecommendation = (uploadedPhoto) => {
    return {
      id: state.id,
      title: state.title,
      type: state.type,
      resource: state.link,
      photo: uploadedPhoto,
      tags: state.tags,
    };
  };

  /**
   * Check if fields are not empty
   */
  const checkFieldsEmpty = () => {
    const titleEmpty = state.title === "";
    const linkEmpty = state.link === "";
    const typeEmpty = state.type === "";
    const tagsEmpty = state.tags.length == 0;

    if (titleEmpty || linkEmpty || typeEmpty || tagsEmpty) {
      return true;
    } else return false;
  };

  /**
   * Upload the selected photo to ImgBB and return the response from the server
   */
  const uploadPhotoToServer = async () => {
    const data = new FormData();
    data.append("image", photoData.base64);

    const configUpload = {
      method: "POST",
      body: data,
    };

    const uploadResponse = await fetch(
      `https://api.imgbb.com/1/upload?key=5ce1e038673d1d870dd0550841fcf1d7`,
      configUpload
    ).catch((err) =>
      console.log("There was and error while uploading to imgbb", err)
    );
    const responseJSON = await uploadResponse.json();

    return responseJSON;
  };

  /**
   * checks if the update was successful and redirects to the Profile page
   */
  const updateCallBack = async () => {
    const fieldsEmpty = checkFieldsEmpty();

    if (fieldsEmpty) {
      alert("Please don't leave required fields empty!");
    } else {
      const photoServerResponse = await uploadPhotoToServer();

      if (photoServerResponse.status == 200) {
        const recommendation = constructRecommendation(photoServerResponse.data.url);

        callback(recommendation);
        navigation.goBack();
      }
    }
  };

  const onSelectedTagsChange = (selectedItems) => {
    setState({ tags: selectedItems });
  };

  const importPhoto = async () => {
    var options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.3,
      base64: true,
    };

    const response = await ImagePicker.launchImageLibraryAsync(
      options
    ).catch((err) => console.log(err));

    if (response) {
      if (response.cancelled) {
        console.log("User cancelled image picker");
      } else {
        const encoded_image = await response.base64;
        const imageURI = await response.uri;

        setPhotoData({ URI: imageURI, base64: encoded_image });
      }
    } else console.log("There was something wrong with the response");
  };

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
        <Text style={styles.header}>Add a recommendation</Text>
        <Text style={styles.headerText}>
          Let people know what has helped you on your journey!
        </Text>
        {/* Title */}
        <View>
          <Text style={styles.categoryHeader}>Recommendation Title</Text>
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
            Recommendation Link{" "}
            <Text style={{ fontStyle: "italic" }}>
              (full https URL required)
            </Text>{" "}
          </Text>
          <TextInput
            style={styles.placeholder}
            placeholderTextColor={"grey"}
            placeholder={
              editMode ? state.link : "Add external link (article, book, video)"
            }
            onChangeText={(input) => setState({ link: input })}
          />
        </View>
        {/* Thumbnail */}
        <View>
          <Text style={styles.categoryHeader}>
            Recommendation Thumbnail (Optional)
          </Text>
          <TouchableOpacity
            onPress={() => importPhoto()}
            style={{ marginTop: 40 }}
          >
            <Image
              source={
                photoData.URI != null
                  ? { uri: photoData.URI }
                  : require("../assets/addThumbnail.png")
              }
              style={{
                height: 250,
                width: 250,
                resizeMode: "contain",
                alignSelf: "center",
                marginBottom: 50,
                borderRadius: 15,
              }}
            />
          </TouchableOpacity>
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

export default AddRecommendation;
