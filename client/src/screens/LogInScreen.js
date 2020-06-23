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
  AsyncStorage,
  TextInput,
} from "react-native";
import Constants from "expo-constants";
import LinkedIn from "../components/register/LinkedIn";
import WideButtonComponent from "../components/WideButton";

const login = async (email, password, signIn) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({
    email_login: email.toLowerCase(),
    password: password,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  let response = await fetch(
    `http://${env.host}:${env.port}/api/v1/signin/email_and_password`,
    requestOptions
  );

  let responseJson = await response.json();
  console.log(responseJson);
  if (responseJson.err) {
    alert(responseJson.err);
    return;
  }
  _storeData("token", responseJson.token);
  console.log(responseJson);
  _storeData("id", responseJson.doc._id);
  _storeData("user", JSON.stringify(responseJson));
  signIn(responseJson.name)
  
};

const LogInScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { signIn } = React.useContext(AuthContext);
  const [hidePassword, setHidePassword] = React.useState(true);

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
              alignSelf: "flex-start",
              marginTop: 20,
            }}
          />
        </TouchableOpacity>
        <View style={{ flexDirection: "column" }}>
          <Text
            style={{
              color: "white",
              fontFamily: "poppins-bold",
              fontSize: 30,
              marginTop: 20,
            }}
          >
            Welcome back!
          </Text>
          <View style={{ marginTop: "20%" }}>
            <View style={styles.bottomBorder}>
              <Text style={styles.prompt}>Email address</Text>
              <TextInput
                style={styles.placeholder}
                placeholderTextColor={"white"}
                placeholder="Enter your email address"
                onChangeText={(e) => setEmail(e)}
                value={email}
              />
            </View>

            <View style={styles.bottomBorder}>
              <Text style={styles.prompt}>Password</Text>
              <View style={{flexDirection: 'row', width: '100%'}}>
                <View style={{flex: 6}}>
                  <TextInput
                    style={styles.placeholder}
                    placeholderTextColor={"white"}
                    placeholder="Enter your password"
                    secureTextEntry={hidePassword}
                    onChangeText={(p) => setPassword(p)}
                    value={password}
                  />
                </View>
                <View style={{flex: 1, alignSelf:'flex-end'}}>
                  <TouchableOpacity onPress={()=>{setHidePassword(!hidePassword)}}>
                  {hidePassword ? <Text style={{alignSelf:'flex-end', ...styles.placeholder}}>Show</Text>:<Text style={{alignSelf:'flex-end', ...styles.placeholder}}>Hide</Text>}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{ marginTop: "10%" }}>
          <TouchableOpacity
            onPress={() => {
              login(email, password, signIn);
            }}
          >
            <WideButtonComponent
              value={"LogIn"}
              containerStyle={{
                ...styles.button,
                ...styles.emptyButton,
              }}
              textStyle={{ color: "white" }}
            />
          </TouchableOpacity>
          <LinkedIn
            style={{
              ...styles.button,
            }}
            signIn={signIn}
            navigation={navigation}
          />
          <TouchableOpacity
            style={{ marginTop: 20 }}
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={{ color: "white", textAlign:"center" }}>
              Forgot password?{" "}
              <Text
                style={{ color: "#F9C669", textDecorationLine: "underline" }}
              >
                Reset here
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
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
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "#1A1A1A",
    alignItems: "center",
  },
  text: {
    color: "white",
    margin: "auto",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "poppins-medium",
  },
  image: {
    width: 200,
    resizeMode: "contain",
    height: 80,
    margin: 70,
  },
  button: {
    width: 300,
    marginTop: 20,
  },
  emptyButton: {
    backgroundColor: "rgba(76, 175, 80, 0)",
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "white",
    color: "white",
  },
  bottomBorder: {
    width: 350,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    alignSelf: "flex-start",
  },
  prompt: {
    fontFamily: "poppins-regular",
    color: "lightgrey",
    margin: "auto",
    alignItems: "baseline",
    fontSize: 11,
    paddingTop: 30,
  },
  placeholder: {
    fontFamily: "poppins-regular",
    color: "white",
    margin: "auto",
    alignItems: "baseline",
    fontSize: 13,
    paddingVertical: 20,
  },
});

export default LogInScreen;
