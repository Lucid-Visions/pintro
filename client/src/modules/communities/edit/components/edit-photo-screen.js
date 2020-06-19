import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import styles from "../styles"
import PostButton from "../../../../components/WideButtonRight";
import BackButton from "../../../shared/icons/back-button/lightTheme";
import { updateCommunity } from "../../actions";

import * as ImagePicker from "expo-image-picker";

const EditCommunityPhoto = ({ navigation, route }) => {
  const community = route.params

  const [state, updateState] = useState({
    photoURI: community.profile_picture || null,
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

      updateCommunity(
        community._id,
        {
          profile_picture: photoUrl,
        }
      );
      navigation.navigate('CommunityProfile', {...community})
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
      aspect: [1, 1],
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
    <View style={styles.container}>
      <BackButton navigation={navigation} />
      <Text style={styles.header}>Edit your community photo</Text>
      <Text style={styles.headerText}>Upload a community photo</Text>
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
                ? { uri: state.photoURI }
                : require("../../../../assets/addProfilePhoto.png")
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
    </View>
  );
};

export default EditCommunityPhoto;