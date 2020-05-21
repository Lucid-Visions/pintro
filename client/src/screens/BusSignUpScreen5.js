import React, { Component } from "react"
import { Dimensions, SafeAreaView, Text, View, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image, AsyncStorage } from "react-native"
import WideButtonComponent from "../components/WideButtonRight"
import MultiSelect from "react-native-multiple-select"
import ProfileCard from "../components/ProfileCard"
const updateRequestBusiness = require("../assets/updateRequestBusiness").update;

export default class BusSignUpScreen5 extends Component {
    static navigationOptions = {
        headerLeft: "Arrow_back", // To be changed with an icon.
    }

    constructor(props) {
        super(props)
        this.state = {
            selectedItems: [],
            team: [],
            companyID: props.route.params.companyID,
            user: props.route.params.user
        };
        this.teamCallback = this.teamCallback.bind(this);
        this.onSelectedItemsChange = this.onSelectedItemsChange.bind(this)
    }

    update(navigation) {
      if (this.state.team.length >= 0) {
        const result = updateRequestBusiness(id=this.state.companyID, {team: this.state.team.map((x)=>x.split("&")[1])}, ownerID=this.state.ownerID);
        if (result) navigation.navigate("BusSignUp6", {companyID: this.state.companyID, user: this.state.user});
      } else alert("You must have at least one person on your team!")
    }

    teamCallback(text, selected) {
      let prevSelected = this.state.team;
      if (selected) {
        if (!prevSelected.includes(text)) {
          prevSelected.push(text);
        }
      } else {
        prevSelected = prevSelected.filter(item => item !== text);
      }
      this.setState({ selectedItems: prevSelected });
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
          id: x.name+"&"+x._id+"&"+x.currentJobTitle+"&"+x.profile_picture
        }
      })
      this.setState({users:userData})
    };

    onSelectedItemsChange = selectedItems => {
        this.setState({ team: selectedItems })
    }

    render() {
        const { navigation } = this.props
        const { selectedItems } = this.state
        const user = this.props.route.params.user;

        return (
            <ScrollView style={styles.container2} showsVerticalScrollIndicator={false}>
            <SafeAreaView style={styles.container1}>
            <View style={styles.container}>
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
                    marginLeft: 20
                  }}
                />
              </TouchableOpacity>
            )}
                <View marginHorizontal={15} paddingBottom={70}>
                    <Text style={styles.h1}>Who's in your team?</Text>
                    <Text style={styles.h2}>Search and invite your people</Text>
                </View>
                <View 
                    marginHorizontal={15}
                    flex={1}
                    borderBottomColor="#ACACAC"
                    borderBottomWidth={1}
                    width={Dimensions.get('screen').width / 1.1}
                    alignSelf="center"
                    paddingBottom={10}
                >
                    <Text style={styles.h3}>Team member name</Text>
                    <MultiSelect
                        hideTags
                        hideSubmitButton
                        //hideDropdown
                        items={this.state.users}
                        uniqueKey="id"
                        ref={(component) => { this.multiSelect = component }}
                        onSelectedItemsChange={ this.onSelectedItemsChange }
                        selectedItems={this.state.team}
                        selectText="Start typing..."
                        searchInputPlaceholderText="Start typing..."
                        onChangeInput={ (text)=> console.log(text) }
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

                <View paddingTop={50} marginHorizontal={15}>
                  <Text style={styles.h3}>An invite will be sent to the following:</Text>
                  <View>
                    <ProfileCard id={user._id} name={user.name+" (You)"} currentJobTitle={user.experience.currentJobTitle} profile_picture={user.profile_picture ? user.profile_picture : "../assets/empty-profile-picture.png"}/>
                    {this.state.team.map(x => 
                      <ProfileCard name={x.split("&")[0]} id={x.split("&")[1]} currentJobTitle={x.split("&")[2]} profile_picture={x.split("&")[3]}/>)}
                  </View>
                </View>

                

                <View paddingTop={20} alignSelf={'center'}>
                    <TouchableOpacity onPress={() => this.update(navigation)} underlayColor="white">
                        <WideButtonComponent
                            value={"STEP 5 OF 5"}
                            source={require("../assets/arrow-right-white.png")}
                            containerStyle={{
                            ...styles.btn
                            }}
                            textStyle={{ fontSize: 14, fontFamily: "poppins-light", color: 'lightgrey' }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
          </SafeAreaView>
          </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    h1: {
        fontFamily: "poppins-bold", 
        color: "#323232",
        margin: "auto",
        textAlign: "left",
        fontSize: 26,
        paddingTop: 50,
        paddingBottom: 20
      },
      h2: {
        fontFamily: "poppins-regular", 
        color: "#323232",
        margin: "auto",
        alignItems: "baseline",
        fontSize: 11,
        paddingBottom: 15
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
        marginTop: 30,
        backgroundColor: "#1A1A1A",
        flexDirection: 'row', 
        justifyContent: 'space-evenly'
      },
      container: {
        flex: 1,
        backgroundColor: "#F0F0F1",
        alignItems: "flex-start",
        justifyContent: "space-between",
        paddingBottom: 50,
        paddingHorizontal: 20
      },
      container1: {
        flex: 1,
        backgroundColor: "#F0F0F1",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "space-between"
      },
      container2: {
        flex: 1,
        backgroundColor: "#F0F0F1",
        alignContent: "center"
      }
})