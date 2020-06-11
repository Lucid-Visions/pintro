import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image
} from "react-native";
import BackButton from '../../../shared/icons/back-button/darkTheme'
import {
  emailRegex,
  phoneRegex,
  passwordRegex
} from '../../constants';
import styles from "../../styles"
import WideButtonComponent from "../../../../components/WideButtonRight";
import { AsyncStorage } from "react-native";
import env from "../../../../env";

import fieldValidator from "../../../shared/utils"

var validEmail = true;
var validNumber = true;
var validPassword = true;

export default class createAccountScreen extends Component {
  static navigationOptions = {
    headerLeft: "Arrow_back" // To be changed with an icon.
  };

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      phoneNumber: "",
      password1: "",
      password2: ""
    };
  }

  async register() {
    const { navigation } = this.props;

    var userToken = await AsyncStorage.getItem("token");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", userToken);
    var password = this.state.password1; //need to hash the password here
    if (this.state.password1 != this.state.password2) {
      alert("Passwords do not match");
      return;
    }

    var raw = JSON.stringify({
      email_login: this.state.email.toLowerCase(),
      password: password,
      phone: this.state.phoneNumber,
      mood: 1,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    var response = await fetch(
      `http://${env.host}:${env.port}/api/v1/register/email_and_password`,
      requestOptions
    );

    var responseJson = await response.json();
    if (response.ok) {
      this._storeData("token", responseJson.token);
      this._storeData("user", JSON.stringify(responseJson));
      if (responseJson.newUser) {
        navigation.navigate("SignUp4");
      } else {
        alert("User already exists. Please sign in.");
      }
    } else {
      alert(responseJson.message);
    }
  }

  async _storeData(key, val) {
    try {
      await AsyncStorage.setItem(key, val);
    } catch (error) {
      alert(error);
    }
  }

  render() {
    const { navigation } = this.props;
    return (
      <ScrollView
        style={styles.container2}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container1}>
          <View style={styles.container}>
          <BackButton navigation={navigation} />
            <View>
              <Text style={styles.h1}>Let's get started</Text>
              <Text style={styles.h2}>Create your account</Text>
            </View>

            <View style={!validEmail ? styles.bottomBorderInvalid : styles.bottomBorder}>
              <Text style={styles.prompt}>Email address</Text>
              <TextInput
                style={styles.placeholder}
                placeholderTextColor={"white"}
                placeholder="Enter your email address"
                onChangeText={email => {
                  validEmail = fieldValidator({regex: emailRegex, input: email})
                  this.setState({email})
                }}
                value={this.state.email}
              />
            </View>

            <View style={!validNumber ? styles.bottomBorderInvalid : styles.bottomBorder}>
              <Text style={styles.prompt}>Phone number</Text>
              <TextInput
                style={styles.placeholder}
                placeholderTextColor={"white"}
                placeholder="Enter your phone number"
                onChangeText={phoneNumber => {
                  validNumber = fieldValidator({regex: phoneRegex, input: phoneNumber})
                  this.setState({phoneNumber})
                }}
                keyboardType={"numeric"}
                value={this.state.phoneNumber}
              />
            </View>

            <View style={!validPassword? styles.bottomBorderInvalid : styles.bottomBorder}>
              <Text style={styles.prompt}>Password</Text>
              <TextInput
                style={styles.placeholder}
                secureTextEntry={true}
                placeholderTextColor={"white"}
                placeholder="Enter a strong password"
                onChangeText={password1 => this.setState({ password1 })}
                value={this.state.password1}
              />
            </View>

            <View style={!validPassword? styles.bottomBorderInvalid : styles.bottomBorder}>
              <Text style={styles.prompt}>Confirm password</Text>
              <TextInput
                style={styles.placeholder}
                secureTextEntry={true}
                placeholderTextColor={"white"}
                placeholder="Confirm your strong password"
                onChangeText={password2 => this.setState({ password2 })}
                value={this.state.password2}
              />
            </View>
            <View paddingTop={20} alignSelf={"center"}>
              <TouchableOpacity
                onPress={() => this.register()}
                underlayColor="white"
              >
                <WideButtonComponent
                  value={"STEP 1 OF 6"}
                  source={require("../../../../assets/arrow-right.png")}
                  containerStyle={{
                    ...styles.btn
                  }}
                  textStyle={{
                    fontSize: 14,
                    fontFamily: "poppins-light",
                    color: "#1A1A1A"
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
