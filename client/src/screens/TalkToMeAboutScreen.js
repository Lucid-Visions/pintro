import React, { Component } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  AsyncStorage
} from "react-native";
import Constants from "expo-constants";
import TalkToMeInput from "../components/TalkToMeInput";
import MultiSelect from "react-native-multiple-select";
import TagsData from "../assets/TagsData";
import PostButton from "../components/WideButtonRight";
import BackButton from "../modules/shared/icons/back-button/lightTheme";

export default class TalkToMeAboutScreen extends Component {
  static navigationOptions = {
    headerLeft: "Arrow_back", // To be changed with an icon.
    headerRight: "Share_button" // To be changed with an icon.
  };

  constructor(props) {
    super(props);
    this.state = {
      tags: [],
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

  postAction = async (navigation, action_buttons) => {
    if(action_buttons.length >= 3){
      alert("You cannot add more than 3 action buttons.")
      return;
    }
    var token = await AsyncStorage.getItem("token");
    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", token);

    var raw = JSON.stringify({ 
      context: this.state.status,
      type: "talktomeabout",
      communityIds: this.state.selectedCommunities,
      tags: this.state.selectedTags
     });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    let response = await fetch(
      `http://${env.host}:${env.port}/api/v1/actionbutton`,
      requestOptions
    ).catch(error => console.log("error", error));

    
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

    const { navigation } = this.props;
    const user = this.props.route.params.user;

    return (
      <ScrollView
        style={styles.container2}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container1}>
            <BackButton navigation={navigation} />
          <View style={styles.container}>
            <View alignItems="center" alignSelf="center">
              <Text style={styles.h1}>{user.name}</Text>
              <Text style={styles.h2}>@{user.user}</Text>
            </View>
            <View paddingTop={40} paddingBottom={10}>
              <TalkToMeInput
                userData={user}
                status={this.props.status}
                onChange={x => this.setState({ status: x })}
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
              <Text style={styles.h3}>Choose up to 3 tags</Text>
              <MultiSelect
                hideSubmitButton
                items={TagsData}
                uniqueKey="id"
                onSelectedItemsChange={this.onSelectedItemsChangeTags}
                selectedItems={this.state.selectedTags}
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
            <View>
              <TouchableOpacity onPress={() => this.postAction(navigation, user.action_buttons)} disabled={this.isSubmitDisabled()}>
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
    paddingVertical: 30
  },
  container1: {
    paddingTop: Constants.statusBarHeight,
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
  },
  btnDisabled: {
    opacity: 0.4,
  },
});
