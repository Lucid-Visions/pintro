import React, { Component } from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  AsyncStorage
} from "react-native";
import IntroTextInput from "../components/IntroTextInput";
import MultiSelect from "react-native-multiple-select";
import PostButton from "../components/WideButtonRight";

export default class RequestIntroScreen extends Component {
  static navigationOptions = {
    headerLeft: "Arrow_back", // To be changed with an icon.
    headerRight: "Share_button" // To be changed with an icon.
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
      users: [""]
    };
  }

  componentDidMount(){
    this.getUsers()
  }

  getUsers = async () => {
    var token = await AsyncStorage.getItem("token");

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    let response = await fetch(
      `http://${env.host}:${env.port}/api/v1/search?categories=people`,
      requestOptions
    ).catch(error => console.log("error", error));
    let responseJson = await response.json()
    let userData = responseJson.people.map((x)=>{
      return {
        text: x.name,
        id: x.name+"&"+x._id
      }
    })
    this.setState({users:userData})
  };

  postAction = async (navigation, action_buttons) => {
    if(action_buttons.length >= 3){
      alert("You cannot add more than 3 action buttons.")
      return;
    }

    var token = await AsyncStorage.getItem("token");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", token);
    var raw = JSON.stringify({ context: this.state.selectedItems[0].split("&")[0], type: "introduce", user:this.state.selectedItems[0].split("&")[1] });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    let response = await fetch(
      `http://${env.host}:${env.port}/api/v1/actionbutton`,
      requestOptions
    ).catch(error => console.log("error", error));

    navigation.goBack();
  };

  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
  };

  render() {
    const { navigation } = this.props;
    const user = this.props.route.params.user;

    const { selectedItems } = this.state;

    return (
      <ScrollView
        style={styles.container2}
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView style={styles.container1}>
        {navigation.canGoBack() && (
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Image
              source={require("../assets/leftArrow.png")}
              style={{
                height: 20,
                width: 25,
                resizeMode: "contain",
                alignSelf: "left", 
                marginHorizontal:20,
                marginTop:10
              }}
            />
          </TouchableOpacity>
        )}
          <View style={styles.container}>
            <View alignItems="center" alignSelf="center">
            <Text style={styles.h1}>{user.name}</Text>
              <Text style={styles.h2}>@{user.user}</Text>
            </View>
            <View paddingTop={40} paddingBottom={10}>
              <IntroTextInput userData={user} text={this.state.selectedItems[0]}/>
            </View>
            <View
              marginHorizontal={15}
              flex={1}
              borderBottomColor="#ACACAC"
              borderBottomWidth={1}
              width={Dimensions.get("screen").width / 1.1}
              alignSelf="center"
              paddingBottom={10}
            >
              <Text style={styles.h3}>Find a user</Text>
              <MultiSelect
                hideSubmitButton
                items={this.state.users}
                uniqueKey="id"
                ref={component => {
                  this.multiSelect = component;
                }}
                onSelectedItemsChange={this.onSelectedItemsChange}
                selectedItems={selectedItems}
                selectText="Start typing..."
                searchInputPlaceholderText="Start typing..."
                altFontFamily="poppins-regular"
                fontFamily="poppins-regular"
                itemFontFamily="poppins-regular"
                selectedItemFontFamily="poppins-regular"
                tagRemoveIconColor="#ACACAC"
                tagBorderColor="#ACACAC"
                tagTextColor="#2E2E2E"
                selectedItemTextColor="#2E2E2E"
                selectedItemIconColor="#2E2E2E"
                itemTextColor="#ACACAC"
                displayKey="text"
                searchInputStyle={{ color: "black" }}
                styleDropdownMenuSubsection={{
                  backgroundColor: "#F1F1F1",
                  borderBottomColor: "#F1F1F1"
                }}
                styleDropdownMenu={{
                  backgroundColor: "#F1F1F1"
                }}
                styleInputGroup={{
                  backgroundColor: "#F1F1F1"
                }}
                styleItemsContainer={{
                  backgroundColor: "#F1F1F1"
                }}
                single={true}
              />
            </View>
            <View>
              <TouchableOpacity onPress={() => this.postAction(navigation, user.action_buttons)}>
                <PostButton
                  value={"POST"}
                  source={require("../assets/arrow-right-white.png")}
                  containerStyle={{
                    ...styles.btn
                  }}
                  textStyle={{
                    fontSize: 13,
                    fontFamily: "poppins-medium",
                    color: "lightgrey"
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F1F1",
    justifyContent: "space-between",
    paddingVertical: 30
  },
  container1: {
    flex: 1,
    backgroundColor: "#F1F1F1",
    justifyContent: "space-between"
  },
  container2: {
    flex: 1,
    backgroundColor: "#F1F1F1"
  },
  h1: {
    fontFamily: "poppins-bold",
    color: "#2E2E2E",
    margin: "auto",
    textAlign: "center",
    fontSize: 25
  },
  h2: {
    fontFamily: "poppins-regular",
    color: "#2E2E2E",
    margin: "auto",
    alignSelf: "center",
    fontSize: 11,
    paddingBottom: 20
  },
  h3: {
    fontFamily: "poppins-regular",
    color: "#2E2E2E",
    margin: "auto",
    alignSelf: "flex-start",
    textAlign: "center",
    fontSize: 13,
    paddingBottom: 10
  },
  btn: {
    fontFamily: "poppins-medium",
    width: 350,
    marginTop: 15,
    backgroundColor: "#1A1A1A",
    flexDirection: "row",
    justifyContent: "space-evenly"
  }
});
