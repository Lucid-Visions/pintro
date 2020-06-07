import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput
} from "react-native";
import Constants from "expo-constants";
import WideButtonComponent from "../components/WideButton";

const reset = async (email, navigation) => {
  let response = await fetch(`http://${env.host}:${env.port}/api/v1/resetpassword?email=${email.toLowerCase()}`)
  let responseJson = await response.json()
  alert(responseJson.message)
  if(!responseJson.error){
    navigation.goBack()
  }
};

const PasswordResetScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState("");

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image
            source={require("../assets/leftArrowWhite.png")}
            style={{
              height: 20,
              width: 25,
              resizeMode: "contain",
              marginTop: 20
            }}
          />
        </TouchableOpacity>
        <View style={{ flexDirection: "column" }}>
          <Text
            style={{
              color: "white",
              fontFamily: "poppins-bold",
              fontSize: 30,
              marginTop: 20
            }}
          >
            Reset Password
          </Text>
          <View style={{ marginTop: "20%" }}>
            <View style={styles.bottomBorder}>
              <Text style={styles.prompt}>Email address</Text>
              <TextInput
                style={styles.placeholder}
                placeholderTextColor={"white"}
                placeholder="Enter your email address"
                onChangeText={e => setEmail(e)}
                value={email}
              />
            </View>
          </View>
        </View>
        <View style={{ marginTop: "10%" }}>
          <TouchableOpacity
            onPress={() => {
              reset(email, navigation);
            }}
          >
            <WideButtonComponent
              value={"Send Email"}
              containerStyle={{
                ...styles.button,
                ...styles.emptyButton
              }}
              textStyle={{ color: "white" }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "#1A1A1A",
    alignItems: "center"
  },
  text: {
    color: "white",
    margin: "auto",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "poppins-medium"
  },
  image: {
    width: 200,
    resizeMode: "contain",
    height: 80,
    margin: 70
  },
  button: {
    width: 300,
    marginTop: 20
  },
  emptyButton: {
    backgroundColor: "rgba(76, 175, 80, 0)",
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "white",
    color: "white"
  },
  bottomBorder: {
    width: 350,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    alignSelf: "flex-start"
  },
  prompt: {
    fontFamily: "poppins-regular",
    color: "lightgrey",
    margin: "auto",
    alignItems: "baseline",
    fontSize: 11,
    paddingTop: 30
  },
  placeholder: {
    fontFamily: "poppins-regular",
    color: "white",
    margin: "auto",
    alignItems: "baseline",
    fontSize: 13,
    paddingVertical: 20
  }
});

export default PasswordResetScreen;
