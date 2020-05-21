import React from "react";
import SignInWithComponent from "../OAuthSignIn";
import env from "../../env";
import { AsyncStorage } from "react-native";

function RegisterLinkedInComponent(props) {
  //this function is called after we get the auth token
  const callback = async function(responseData, redirectUrl) {
    responseData["redirectUrl"] = redirectUrl;
    var response = await fetch(
      `http://${env.host}:${env.port}/api/v1/signin/linked_in`,
      {
        method: "POST",
        body: JSON.stringify(responseData),
        headers: { "Content-Type": "application/json" }
      }
    );

    var responseJson = null;
    if (response.ok) {
      responseJson = await response.json();
    } else {
      return;
    }

    if (responseJson.newUser) {
      alert("welcome new user");
    } else {
      //console.log(responseJson)
      alert(`welcome ${responseJson.doc.name}`);
    }

    _storeData("token", responseJson.token);
    _storeData("user", JSON.stringify(responseJson));
    if (responseJson.newUser) {
      //new user
      props.navigation.navigate("SignUp4")
    } else {
      props.signIn(responseJson.token);
    }
  };

  return (
    <SignInWithComponent
      backgroundColor="#FFFFFF"
      text={"Sign in with LinkedIn"}
      oAuthUrl={`https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${"77jtfvv839tda1"}&state=fooobar&scope=r_liteprofile%20r_emailaddress%20w_member_social`}
      callback={callback}
      source={require("../../assets/linkedin_black.png")}
      style={props.style}
    />
  );
}

async function _storeData(key, val) {
  try {
    await AsyncStorage.setItem(key, val);
  } catch (error) {
    alert(error);
  }
}

export default RegisterLinkedInComponent;
