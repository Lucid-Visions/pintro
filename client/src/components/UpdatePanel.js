import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  AsyncStorage,
  TouchableOpacity,
  Image,
} from "react-native";
import WideButton from "./WideButton";

const updateRequest = require("../assets/updateRequest").update;

const UpdateAccountPanel = ({ type, modalRef, navigation }) => {
  const [state, updateState] = useState({
    currentPass: "",
    new: "",
    confirm: "",
  });

  if (type) {
    const modal = modalData[type];

    const setState = (newState) => {
      updateState((prevState) => {
        return { ...prevState, ...newState };
      });
    };

    async function updateAction() {
      const myHeaders = new Headers();
      const userToken = await AsyncStorage.getItem("token");

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", userToken);

      if (state.new !== state.confirm) {
        alert(`Please confirm your new ${type}`);
        return;
      }

      const raw = {
        currentPass: state.currentPass,
      };

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(raw),
      };

      const responseCheck = await fetch(
        `http://${env.host}:${env.port}/api/v1/user/checkPassword`,
        requestOptions
      ).catch(() => {
        return null;
      });

      const responseJson = await responseCheck.json();

      if (responseJson.error) return;
      const passVerified = responseJson.verified;

      if (!passVerified) {
        alert("Your current password is incorrect!");
        return;
      }

      if (type == "password") {
        updatePass();
      } else if (type == "email") updateRequest({ email_login: state.new });
      else if (type == "phone") updateRequest({ phone: state.new });

      modalRef.hide();
      return;
    }

    async function updatePass() {
      const myHeaders = new Headers();
      const userToken = await AsyncStorage.getItem("token");

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", userToken);

      const raw = {
        password1: state.new,
        password2: state.confirm,
      };

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(raw),
      };

      const responsePass = await fetch(
        `http://${env.host}:${env.port}/api/v1/changePass`,
        requestOptions
      ).catch(() => {
        return null;
      });

      console.log(await responsePass.json())

      return

    }

    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            paddingLeft: "5%",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity onPress={() => modalRef.hide()}>
            <Image
              source={require("../assets/leftArrow.png")}
              style={{
                height: 20,
                width: 25,
                resizeMode: "contain",
              }}
            />
          </TouchableOpacity>
          <Text style={styles.header}>{modal.title}</Text>
        </View>
        <View style={styles.fieldsContainer}>
          <Text style={styles.categoryHeader}>{modal.passField}</Text>

          <TextInput
            style={styles.placeholder}
            secureTextEntry={true}
            placeholderTextColor={"grey"}
            placeholder={"Enter current password"}
            onChangeText={(input) => setState({ currentPass: input })}
          />
        </View>
        <View style={styles.fieldsContainer}>
          <Text style={styles.categoryHeader}>New</Text>
          <TextInput
            style={styles.placeholder}
            secureTextEntry={modal.secret}
            placeholderTextColor={"grey"}
            placeholder={modal.fieldNew}
            onChangeText={(input) => setState({ new: input })}
          />
        </View>
        <View style={styles.fieldsContainer}>
          <Text style={styles.categoryHeader}>Confirm</Text>
          <TextInput
            style={styles.placeholder}
            secureTextEntry={modal.secret}
            placeholderTextColor={"grey"}
            placeholder={modal.fieldCurrent}
            onChangeText={(input) => setState({ confirm: input })}
          />
        </View>

        <View paddingTop={20} alignSelf={"center"}>
          <TouchableOpacity
            onPress={() => navigation.navigate("SignUpStack", {screen: "ForgotPassword"})}
            underlayColor="white"
          >
            <WideButton
              value={"I'VE FORGOTTEN MY PASSWORD"}
              containerStyle={{ ...styles.btn, backgroundColor: "white" }}
              textStyle={{
                fontSize: 12,
                fontFamily: "poppins-medium",
                color: "black",
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => updateAction()}
            underlayColor="black"
          >
            <WideButton
              value={"DONE"}
              containerStyle={{ ...styles.btn, backgroundColor: "black" }}
              textStyle={{
                fontSize: 12,
                fontFamily: "poppins-medium",
                color: "white",
              }}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  } else {
    return null;
  }
};

const modalData = {
  password: {
    title: "Change password",
    passField: "Current",
    fieldNew: "Enter 8-32 characters",
    fieldCurrent: "Confirm new password",
    secret: true,
  },
  email: {
    title: "Change email",
    passField: "Password",
    fieldNew: "Enter your new email",
    fieldCurrent: "Confirm new email",
    secret: false,
  },
  phone: {
    title: "Change phone number",
    passField: "Password",
    fieldNew: "Enter your new phone number",
    fieldCurrent: "Confirm new phone number",
    secret: false,
  },
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    height: "100%",
    width: "100%",
    backgroundColor: "#F2F2F2",
    paddingLeft: "5%",
    paddingRight: "5%",
    borderRadius: 15,
  },
  fieldsContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.2,
    borderColor: "lightgrey",
  },
  header: {
    flex: 1,
    fontFamily: "poppins-bold",
    textAlign: "center",
    fontSize: 20,
    paddingVertical: 30,
  },
  categoryHeader: {
    fontFamily: "poppins-regular",
    textAlign: "left",
    alignItems: "flex-start",
    fontSize: 12,
    paddingHorizontal: "5%",
    width: 120,
  },
  placeholder: {
    flex: 1,
    fontFamily: "poppins-regular",
    fontSize: 13,
    paddingVertical: 15,
  },
  btn: {
    fontFamily: "poppins-medium",
    width: 350,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderWidth: 1,
    borderColor: "black",
  },
});

export default UpdateAccountPanel;
