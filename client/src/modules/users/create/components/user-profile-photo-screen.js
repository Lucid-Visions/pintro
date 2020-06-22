import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";
import styles from "../../styles";
import BackButton from "../../../shared/icons/back-button/darkTheme";
import WideButtonComponent from "../../../../components/WideButtonRight";
import { useNavigation } from "@react-navigation/native";

import * as ImagePicker from "expo-image-picker";

const updateRequest = require("../../../../assets/updateRequest").update;

const userProfilePhotoScreen = () => {
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
      navigation.navigate("SignUp4");
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
      aspect: [1, 1],
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
    <ScrollView
        style={styles.container2}
        showsVerticalScrollIndicator={false}
    >
        <View style={styles.container1}>
            <View style={styles.container}>
                <BackButton navigation={navigation} />
                <Text style={styles.h1}>Show us your face</Text>
                <Text style={styles.h2}>Upload a profile photo</Text>
                {/* Thumbnail */}
                <View
                    style={{ flex: 1, justifyContent: "center" }}
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
                            width: 350,
                            resizeMode: "contain",
                            marginVertical: 30,
                            borderRadius: 120/2,
                            overflow: "hidden",
                        }}
                    />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={() => update()}
                    underlayColor="white"
                    disabled={!state.photoURI}
                    style={{paddingTop: 20}}
                >
                    <WideButtonComponent
                        value={"STEP 2 OF 6"}
                        source={require("../../../../assets/arrow-right.png")}
                        containerStyle={!state.photoURI ? {...styles.btn, ...styles.btnDisabled} : styles.btn}
                        textStyle={{
                            fontSize: 14,
                            fontFamily: "poppins-light",
                            color: "#1A1A1A"
                        }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    </ScrollView>
  );
};

export default userProfilePhotoScreen;
