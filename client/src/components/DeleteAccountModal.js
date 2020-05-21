import React, { useState } from "react";
import Modal from "react-native-modal";
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import { AuthContext } from "../navigation/AppNavigator";
import WideButton from "./WideButton";

const DeleteAccount = (props) => {
  const { signOut } = React.useContext(AuthContext);
  const [password, updatePassword] = useState({
    input: "",
    confirm: "",
  });

  const toggleModal = () => {
    props.toggle();
  };

  const setPassword = (newSate) => {
    updatePassword((prevState) => {
      return { ...prevState, ...newSate };
    });
  };

  async function deleteAccount() {
    const myHeaders = new Headers();
    const userToken = await AsyncStorage.getItem("token");

    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", userToken);

    if (password.input !== password.confirm) {
      alert("Passwords do not match!");
      return;
    }

    const raw = { currentPass: password.input };

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(raw),
    };

    const responseCheck = await fetch(
      `http://${env.host}:${env.port}/api/v1/user/checkPassword`,
      requestOptions
    ).catch((err) => {
      console.log(err);
      return;
    });

    const responseJson = await responseCheck.json();

    if (responseJson.error) return;
    const passVerified = responseJson.verified;

    if (!passVerified) {
      alert("Your password is incorrect!");
      return;
    }

    const result = deleteRequest();
    toggleModal();
    if (result) {
      signOut();
    } else alert("Error! Please check your connection and try again.");

    return;
  }

  async function deleteRequest() {
    const myHeaders = new Headers();
    const userToken = await AsyncStorage.getItem("token");

    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", userToken);

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
    };

    const response = await fetch(
      `http://${env.host}:${env.port}/api/v1/user/data`,
      requestOptions
    ).catch((err) => {
      console.log(err);
      return false;
    });

    const responseJson = await response.json();

    if (responseJson.err) {
      console.log("There was an error while deleting the account");
      return false;
    }

    return true;
  }

  return (
    <Modal
      animationIn="slideInUp"
      animationOut="slideOutDown"
      isVisible={props.isVisible}
      onBackdropPress={() => toggleModal()}
      style={styles.modal}
    >
      <Text style={styles.title}>Delete Account</Text>
      <Text style={styles.normalText}>
        Are you sure you want to delete your account and all the data related to
        it?
      </Text>
      <View style={styles.fieldsContainer}>
        <Text style={styles.categoryHeader}>Password</Text>
        <TextInput
          style={styles.placeholder}
          secureTextEntry={true}
          placeholderTextColor={"grey"}
          placeholder={"Your password"}
          onChangeText={(value) => setPassword({ input: value })}
        />
      </View>
      <View style={styles.fieldsContainer}>
        <Text style={styles.categoryHeader}>Confirm</Text>
        <TextInput
          style={styles.placeholder}
          secureTextEntry={true}
          placeholderTextColor={"grey"}
          placeholder={"Confirm your password"}
          onChangeText={(value) => setPassword({ confirm: value })}
        />
      </View>
      <TouchableOpacity onPress={() => deleteAccount()} underlayColor="black">
        <WideButton
          value={"DELETE ACCOUNT"}
          containerStyle={{ ...styles.btn, backgroundColor: "black" }}
          textStyle={{
            fontSize: 12,
            fontFamily: "poppins-medium",
            color: "white",
          }}
        />
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "space-evenly",
    backgroundColor: "#FCFCFC",
    maxHeight: 450,
    width: Dimensions.get("screen").width / 1.2,
    paddingTop: 20,
    borderRadius: 20,
    alignSelf: "center",
    alignItems: "center",
    marginTop: Dimensions.get("screen").height / 5,
  },
  fieldsContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderColor: "lightgrey",
  },
  categoryHeader: {
    fontFamily: "poppins-regular",
    alignItems: "flex-start",
    fontSize: 12,
    paddingHorizontal: "5%",
    width: 90,
  },
  title: {
    fontFamily: "poppins-semi-bold",
    fontSize: 24,
    color: "black",
    textAlign: "center",
  },
  normalText: {
    textAlign: "center",
    fontSize: 13,
    color: "#808080",
    fontFamily: "poppins-regular",
    paddingHorizontal: "5%",
  },
  placeholder: {
    flex: 1,
    fontFamily: "poppins-regular",
    fontSize: 11,
    paddingVertical: 5,
  },
  btn: {
    fontFamily: "poppins-medium",
    width: 200,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default DeleteAccount;
