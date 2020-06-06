import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image
} from "react-native";
import Constants from "expo-constants";
import WideButtonComponent from "../components/WideButtonRight";

const updateRequest = require("../assets/updateRequest").update;

export default class SignUpScreen4 extends Component {
  static navigationOptions = {
    headerLeft: "Arrow_back" // To be changed with an icon.
  };

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
    const toUpdate = this.constructToUpdate();
    if (toUpdate) {
      const result = updateRequest(toUpdate);
      if (result) navigation.navigate("SignUp5");
    }
  }

  constructToUpdate() {
    if (
      this.state.name.trim() &&
      this.state.currentCompany.trim() &&
      this.state.currentJob.trim() &&
      this.state.story.trim()
    ) {
      return {
        name: this.state.name,
        "experience.currentJobTitle": this.state.currentJob,
        "experience.currentCompany": this.state.currentCompany,
        bio: this.state.story
      };
    } else alert("Please don't leave empty fields.");
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
            {navigation.canGoBack() && (
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
                    alignSelf: "flex-start"
                  }}
                />
              </TouchableOpacity>
            )}
            <View>
              <Text style={styles.h1}>What's your story?</Text>
              <Text style={styles.h2}>Build your profile</Text>
            </View>

            <View style={styles.bottomBorder}>
              <Text style={styles.prompt}>Name</Text>
              <TextInput
                style={styles.placeholder}
                placeholderTextColor={"white"}
                placeholder="Enter your full name"
                onChangeText={name => this.setState({ name })}
                value={this.state.name}
              />
            </View>

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
              <Text style={styles.prompt}>Your story</Text>
              <TextInput
                style={{ ...styles.placeholder, height: 100 }}
                placeholderTextColor={"white"}
                multiline={true}
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
              >
                <WideButtonComponent
                  value={"STEP 3 OF 6"}
                  source={require("../assets/arrow-right.png")}
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

const styles = StyleSheet.create({
  h1: {
    fontFamily: "poppins-bold",
    color: "white",
    margin: "auto",
    textAlign: "left",
    fontSize: 30,
    paddingTop: 50,
    paddingBottom: 20
  },
  h2: {
    fontFamily: "poppins-regular",
    color: "lightgrey",
    margin: "auto",
    alignItems: "baseline",
    fontSize: 11,
    paddingBottom: 15
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
  },
  btn: {
    fontFamily: "poppins-medium",
    width: 350,
    marginTop: 30,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "#1A1A1A",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingBottom: 50
  },
  container1: {
    flex: 1,
    backgroundColor: "#1A1A1A",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-between"
  },
  container2: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "#1A1A1A",
    alignContent: "center"
  },
  bottomBorder: {
    width: 350,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    alignSelf: "flex-start"
  }
});
