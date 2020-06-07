import React from "react";
import RegisterFacebookComponent from "../components/register/Facebook";
import RegisterGoogleComponent from "../components/register/Google";
import RegisterLinkedInComponent from "../components/register/LinkedIn";
import { AuthContext } from "../navigation/AppNavigator";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import LinkedIn from "../components/register/LinkedIn";
import WideButtonComponent from "../components/WideButton";

const dummyLogin = async () => {
  //when token expires, remove the line bellow
  _storeData(
    "token",
    "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVpZCI6IjVlNTkwZmI4ZDk5M2JlMDAwNzdiZmU2YiIsInR5cGUiOiJ1c2VyIn0sImlhdCI6MTU4NDMxMzQ2NiwiZXhwIjoxNTg1NjA5NDY2LCJhdWQiOiJodHRwczovL3BpbnRyby5jb20iLCJpc3MiOiJQaW50cm8iLCJzdWIiOiJwaW50cm9BUEkifQ.UtHTTSv5KRswwq_6EEYKe_Ihz0CybRpIiA_TyeMw1wEpdukYrL4Z3TDxh2UK1pdaEBrElQGgDzANN644xE-kuw"
  );
  return;
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({
    email_login: "kim.bergnaum@gmail.com",
    password_hash: "c02f583a942ea382ad7842a4a2eb0971"
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  let response = await fetch(
    "http://localhost:3000/api/v1/signin/email_and_password",
    requestOptions
  );

  let responseJson = await response.json();
  _storeData("token", responseJson.token);
};

const SignInScreen = ({ navigation }) => {
  const { signIn } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Image style={styles.image} source={require("../assets/Logo.png")}/>
        <Text style={styles.text}>Hello there!</Text>
        <LinkedIn
          style={styles.button}
          signIn={signIn}
          navigation={navigation}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("SignUp2")}
          //onPress={() => navigation.navigate("BusSignUp1")}
          underlayColor="white"
        >
          <WideButtonComponent
            value={"Sign up with email or phone"}
            containerStyle={{
              ...styles.button,
              ...styles.emptyButton
            }}
            textStyle={{ color: "white" }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            await dummyLogin();
            signIn("alex");
          }}
          underlayColor="white"
        >
          {/* <WideButtonComponent
            value={"Dummy Login"}
            containerStyle={{
              ...styles.button,
              ...styles.emptyButton
            }}
            textStyle={{ color: "white" }}
          /> */}
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop:20}} onPress={()=>navigation.navigate("LogIn")}>
          <Text style={{ color: "white" }}>
            Already have an account?{" "}
            <Text style={{ color: "#F9C669", textDecorationLine:"underline" }}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

async function _storeData(key, val) {
  try {
    await AsyncStorage.setItem(key, val);
  } catch (error) {
    alert(error);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A",
    alignItems: "center",
    justifyContent: "center"
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
  }
});

export default SignInScreen;
