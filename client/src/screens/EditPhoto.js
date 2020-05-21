import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import PostButton from "../components/WideButtonRight";
import { useNavigation } from "@react-navigation/native";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

const updateRequest = require("../assets/updateRequest").update;

const EditPhoto = ({ route }) => {
  const navigation = useNavigation();

  const [state, updateState] = useState({
    photoURI: null,
    photoBase64: null,
  });

  const setState = (newState) => {
    updateState((prevState) => {
      return { ...prevState, ...newState };
    });
  };

  /**
   * checks if the update was successful and redirects to the Profile page
   */
  const update = async () => {
    const photoServerResponse = await uploadPhotoToServer();

    if (photoServerResponse.status == 200) {
      const photoUrl = photoServerResponse.data.url;

      updateRequest({ profile_picture: photoUrl });
      navigation.goBack();
    }
  };

  /**
   * Upload the selected photo to ImgBB and return the response from the server
   */
  const uploadPhotoToServer = async () => {
    const data = new FormData();
    data.append("image", state.photoBase64);

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

  const uploadPhoto = async () => {
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

        setState({ photoBase64: encoded_image, photoURI: imageURI });
      }
    } else console.log("There was something wrong with the response");
  };

  return (
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
      <Text style={styles.header}>Edit your photo</Text>
      <Text style={styles.headerText}>Upload a profile photo</Text>
      {/* Thumbnail */}
      <View
        style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
      >
        <TouchableOpacity
          onPress={() => uploadPhoto()}
          style={{ marginTop: 20 }}
        >
          <Image
            source={
              state.photoURI != null
                ? { url: state.photoURI }
                : require("../assets/addProfilePhoto.png")
            }
            style={{
              height: 250,
              width: 250,
              resizeMode: "contain",
              alignSelf: "center",
              marginVertical: 50,
              borderRadius: 125,
            }}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => update()}>
        <PostButton
          containerStyle={styles.submitBtn}
          textStyle={{ color: "white" }}
          value="DONE"
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
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
  submitBtn: {
    backgroundColor: "black",
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "black",
    color: "black",
    width: 300,
    marginVertical: 50,
  },
});

export default EditPhoto;
