import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
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

var validEmail;
var validNumber;
var validPassword;

var btnStyles = { ...styles.btn, ...styles.btnDisabled }

const isSubmitDisabled = () => {
  if(validEmail && validNumber && validPassword) {
    btnStyles = styles.btn
    return false;
  } else {
    btnStyles = { ...styles.btn, ...styles.btnDisabled }
    return true;
  }
}

export default class createAccountScreen extends Component {
  static navigationOptions = {
    headerLeft: "Arrow_back" // To be changed with an icon.
  };

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      phoneNumber: "",
      password: "",
      hidePassword: true
    };
  }

  async register() {
    const { navigation } = this.props;

    var userToken = await AsyncStorage.getItem("token");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", userToken);
    var password = this.state.password; //need to hash the password here

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
        navigation.navigate("SignUp3");
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

            <View style={validEmail==false ? styles.bottomBorderInvalid : styles.bottomBorder}>
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

            <View style={validNumber==false ? styles.bottomBorderInvalid : styles.bottomBorder}>
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

            <View style={validPassword==false ? styles.bottomBorderInvalid : styles.bottomBorder}>          
              <Text style={styles.prompt}>Password</Text>
              <View style={{flexDirection: 'row', width: '100%'}}>
                <View style={{flex: 6}}>
                  <TextInput
                    style={styles.placeholder}
                    secureTextEntry={this.state.hidePassword}
                    placeholderTextColor={"white"}
                    placeholder="Enter a strong password"
                    onChangeText={password => {
                      validPassword = fieldValidator({regex: passwordRegex, input: password})
                      this.setState({ password })
                    }}
                    value={this.state.password}
                  />
                </View>
                <View style={{flex: 1, alignSelf:'flex-end'}}>
                  <TouchableOpacity onPress={()=>{this.setState({hidePassword: !this.state.hidePassword})}}>
                  {this.state.hidePassword ? <Text style={{alignSelf:'flex-end', ...styles.placeholder}}>Show</Text>:<Text style={{alignSelf:'flex-end', ...styles.placeholder}}>Hide</Text>}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {validPassword==false && <Text style={styles.errorText}>Passwords must contain one uppercase letter, one lowercase letter, one number and one special character</Text>}

            <View paddingTop={20} alignSelf={"center"}>
              <TouchableOpacity
                onPress={() => this.register()}
                underlayColor="white"
                disabled={isSubmitDisabled()}
              >
                <WideButtonComponent
                  value={"STEP 1 OF 6"}
                  source={require("../../../../assets/arrow-right.png")}
                  containerStyle={btnStyles}
                  textStyle={{
                    fontSize: 14,
                    fontFamily: "poppins-light",
                    color: "black"
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
