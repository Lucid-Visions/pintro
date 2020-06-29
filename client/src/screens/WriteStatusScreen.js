import React, { Component } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import Constants from "expo-constants";
import StatusTextInput from "../components/StatusTextInput";
import MultiSelect from "react-native-multiple-select";
import TagsData from "../assets/TagsData";
import PostButton from "../components/WideButtonRight";

export default class WriteStatusScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      selectedTags: [],
      selectedCommunities: [],
      communities: []
    };
  }
  
  componentDidMount() {
    this.getCommunities()
  }

  getCommunities = async () => {
    var token = await AsyncStorage.getItem("token");

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders
    };

    const response = await
      fetch(`http://${env.host}:${env.port}/api/v1/community`, requestOptions)
        .catch(error => console.log("error", error));
    
    const json = await response.json()
    const communities = json.data.map(o => ({
      id: o._id,
      text: o.name
    }))

    this.setState({ communities })
  }

  postStatus = async () => {
    var token = await AsyncStorage.getItem("token");

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", token);
    var raw = JSON.stringify({
      text: this.state.status,
      communityIds: this.state.selectedCommunities,
      tags: this.state.selectedTags
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw
    };

    fetch(
      `http://${env.host}:${env.port}/api/v1/status`,
      requestOptions
    ).catch(error => console.log("error", error));

    const { navigation } = this.props;
    navigation.goBack();
  };

  onSelectedItemsChangeTags = selectedItems => {
    this.setState({ selectedTags: selectedItems });
  }

  onSelectedItemsChangeCommunities = selectedItems => {
    this.setState({ selectedCommunities: selectedItems });
  }

  isSubmitDisabled = () => {
    return !(this.state.selectedCommunities.length > 0 && this.state.status.length > 0)
  }

  render() {

    let btnStyles = styles.btn

    if (this.isSubmitDisabled()) {
      btnStyles = { ...styles.btn, ...styles.btnDisabled }
    }

    const user = this.props.route.params.user;
    return (
      <ScrollView
        style={styles.container2}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container1}>
          {this.props.navigation.canGoBack() && (
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <Image
                source={require("../assets/leftArrow.png")}
                style={{
                  height: 20,
                  width: 25,
                  resizeMode: "contain",
                  marginHorizontal: 20,
                  marginTop: 10
                }}
              />
            </TouchableOpacity>
          )}
          <View style={styles.container}>
            <View alignItems="center" alignSelf="center">
              <Text style={styles.h1}>{user.name}</Text>
              <Text style={styles.h2}>@{user.user}</Text>
            </View>
            <View paddingTop={30} paddingBottom={10}>
              <StatusTextInput userData={user} onChange={x => this.setState({ status: x })} />
            </View>
            <View
              marginHorizontal={15}
              flex={1}
              borderBottomColor="#ACACAC"
              borderBottomWidth={1}
              width={Dimensions.get("screen").width / 1.1}
              alignSelf="center"
              paddingBottom={10}
              style={{ marginBottom: 20}}
            >
              <Text style={styles.h3}>Choose up to 3 tags</Text>
              <MultiSelect
                name="selectedTags"
                hideSubmitButton
                uniqueKey="id"
                items={TagsData}
                onSelectedItemsChange={this.onSelectedItemsChangeTags}
                selectedItems={this.state.selectedTags}
                selectText="Start typing..."
                searchInputPlaceholderText="Start typing..."
                onChangeInput={text => console.log(text)}
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
              />
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
              <Text style={styles.h3}>Choose communities</Text>
              <MultiSelect
                name="selectedCommunities"
                hideSubmitButton
                uniqueKey="id"
                items={this.state.communities}
                onSelectedItemsChange={this.onSelectedItemsChangeCommunities}
                selectedItems={this.state.selectedCommunities}
                selectText="Start typing..."
                searchInputPlaceholderText="Start typing..."
                onChangeInput={text => console.log(text)}
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
                />
            </View>
            <View style={{paddingBottom:50}}>
              <TouchableOpacity onPress={this.postStatus} disabled={this.isSubmitDisabled()}>
                <PostButton
                  value={"POST"}
                  source={require("../assets/arrow-right-white.png")}
                  containerStyle={btnStyles}
                  textStyle={{
                    fontSize: 13,
                    fontFamily: "poppins-medium",
                    color: "lightgrey"
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
  container: {
    flex: 1,
    backgroundColor: "#F1F1F1",
    justifyContent: "space-between",
    paddingVertical: 10
  },
  container1: {
    flex: 1,
    backgroundColor: "#F1F1F1",
    justifyContent: "space-between"
  },
  container2: {
    paddingTop: Constants.statusBarHeight+20,
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
    marginTop: 20,
    backgroundColor: "#1A1A1A",
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  btnDisabled: {
    opacity: 0.4,
  },
});
