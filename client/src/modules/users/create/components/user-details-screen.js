import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import styles from "../../styles"
import BackButton from "../../../shared/icons/back-button/darkTheme"
import WideButtonComponent from "../../../../components/WideButtonRight";
import { nameRegex } from '../../constants'
import fieldValidator from "../../../shared/utils/index";

const updateRequest = require("../../../../assets/updateRequest").update;
var validName;

var btnStyles = { ...styles.btn, ...styles.btnDisabled }

const isSubmitDisabled = () => {
  if(validName) {
    btnStyles = styles.btn
    return false;
  } else {
    btnStyles = { ...styles.btn, ...styles.btnDisabled }
    return true;
  }
}

export default class userDetailsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      currentJob: "",
      currentCompany: "",
      story: ""
    };
  }

  update(navigation) {
    const toUpdate = {
      name: this.state.name.trim(),
      "experience.currentJobTitle": this.state.currentJob.trim(),
      "experience.currentCompany": this.state.currentCompany.trim(),
      bio: this.state.story.trim()
    };
    if (toUpdate) {
      const result = updateRequest(toUpdate);
      if (result) navigation.navigate("SignUp5");
    }
  }

  render() {
    {/* Need to verify with danielle which of these fields are going to be required*/}
    const { navigation } = this.props;
    return (
      <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS == "ios" ? "padding" : "height"}>
        <ScrollView
          style={styles.container2}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container1}>
            <View style={styles.container}>
            <BackButton navigation={navigation} />
              <View>
                <Text style={styles.h1}>What's your story?</Text>
                <Text style={styles.h2}>Build your profile</Text>
              </View>

              <View style={validName==false ? styles.bottomBorderInvalid : styles.bottomBorder}>
                <Text style={styles.prompt}>Name</Text>
                <TextInput
                  style={styles.placeholder}
                  placeholderTextColor={"white"}
                  placeholder="Enter your full name"
                  onChangeText={name => {
                    validName = fieldValidator({regex: nameRegex, input: name})
                    this.setState({ name })
                  }}
                  value={this.state.name}
                />
              </View>
              {/* Going to be a dropdown as per PIN-79*/}
              <View style={styles.bottomBorder}>
                <Text style={styles.prompt}>Current job title</Text>
                <TextInput
                  style={styles.placeholder}
                  placeholderTextColor={"white"}
                  placeholder="Enter your job title"
                  onChangeText={currentJob => this.setState({ currentJob })}
                  value={this.state.currentJob}
                />
              </View>

              <View style={styles.bottomBorder}>
                <Text style={styles.prompt}>Current company</Text>
                <TextInput
                  style={styles.placeholder}
                  placeholderTextColor={"white"}
                  placeholder="Enter current company name"
                  onChangeText={currentCompany =>
                    this.setState({ currentCompany })
                  }
                  value={this.state.currentCompany}
                />
              </View>

              <View style={styles.bottomBorder}>
                <Text style={styles.prompt}>Your story (optional)</Text>
                <TextInput
                  style={styles.placeholder}
                  placeholderTextColor={"white"}
                  multiline={true}
                  scrollEnabled={false}
                  placeholder={"Tell us about yourself"}
                  onChangeText={story => {
                    if (story.length < 160) {
                      this.setState({ story });
                    } else {
                      alert("160 Chars max");
                    }
                  }}
                  value={this.state.story}
                />
              </View>

              <View paddingTop={20} alignSelf={"center"}>
                <TouchableOpacity
                  onPress={() => this.update(navigation)}
                  underlayColor="white"
                  disabled={isSubmitDisabled()}
                >
                  <WideButtonComponent
                    value={"STEP 3 OF 6"}
                    source={require("../../../../assets/arrow-right.png")}
                    containerStyle={btnStyles}
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
      </KeyboardAvoidingView>
    );
  }
}
