import React, { Component } from "react"
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from "react-native"
import WideButtonComponent from "../components/WideButtonRight"
import { AsyncStorage } from "react-native";
import env from "../env";

export default class BusSignUpScreen1 extends Component {
    static navigationOptions = {
        headerLeft: "Arrow_back", // To be changed with an icon.
    }

    constructor(props) {
        super(props)
        this.state = {
            companyName: '',
            tagline: '',
            companyStory: '',
            seekingInvestment: false,
            currentlyHiring: false,
            loggedUser: ""
        }
    }

    toggleState1 = () => {
      this.setState({
          seekingInvestment: !this.state.seekingInvestment
      })
      console.log("seekingInvestment")
    }

    toggleState2 = () => {
      this.setState({
          currentlyHiring: !this.state.currentlyHiring
      })
      console.log("currentlyHiring")
    }

    componentDidMount() {
      this.fetchOwnerData();
    }

    fetchOwnerData = async () => {
      var myHeaders = new Headers();
      var userToken = await AsyncStorage.getItem("token");
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", userToken);
  
      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };
  
      var response = await fetch(
        `http://${env.host}:${env.port}/api/v1/user/data?`,
        requestOptions
      ).catch(err => {
        console.log(err)
        return;
      });
  
      var responseText = await response.text();
      var responseJson = JSON.parse(responseText);
  
      if (responseJson.err) {
        console.log("here",responseJson.err);
        return;
      }
      
      this.setState({loggedUser: responseJson})
    }

    async registerBusiness() {
      const { navigation } = this.props;

      var userToken = await AsyncStorage.getItem("token");
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", userToken);

      var input = JSON.stringify({
        name: this.state.companyName,
        tagline: this.state.tagline,
        bio: this.state.companyStory,
        seeking_investment: this.state.seekingInvestment,
        currently_hiring: this.state.currentlyHiring
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: input,
        redirect: "follow"
      };

      var response = await fetch(
        `http://${env.host}:${env.port}/api/v1/business`,
        requestOptions
      );
      //console.log(await response.text())

      var responseJson = await response.json();
      if (response.ok) {
        var companyID = responseJson._id
        var ownerID = responseJson.owner.user_id
        navigation.navigate("BusSignUp2", {companyID: companyID, user: this.state.loggedUser});
      } else {
        alert(responseJson.message);
      }
    }

    render() {
        const {navigation} = this.props
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
                <View>
                    <Text style={styles.h1}>Let's get into it</Text>
                    <Text style={styles.h2}>Build your company profile</Text>
                </View>

                <View style={styles.bottomBorder}>
                    <Text style={styles.prompt}>Company Name</Text>
                    <TextInput
                        style={styles.placeholder}
                        placeholderTextColor={'#ACACAC'}
                        placeholder="Enter your company name"
                        onChangeText={(companyName) => this.setState({companyName})}
                        value={this.state.companyName}
                    />
                </View>

                <View style={styles.bottomBorder}>
                    <Text style={styles.prompt}>Tagline</Text>
                    <TextInput
                        style={styles.placeholder}
                        placeholderTextColor={'#ACACAC'}
                        placeholder="Enter your tagline"
                        onChangeText={(tagline) => this.setState({tagline})}
                        value={this.state.tagline}
                    />
                </View>

                <View>
                    <Text style={styles.prompt}>Are you.. ?</Text>
                    <View 
                      flexDirection={'row'}
                      marginBottom={5}
                      paddingTop={20}
                      alignSelf={'center'}
                      alignItems={'center'}
                      justifyContent={"center"}
                    >
                      <View style={{flexDirection: "row", marginBottom: 5, justifyContent: "space-between" }}>
                        <TouchableOpacity style={styles.companyBtn} onPress={ this.toggleState1 }>
                          <View style={this.state.seekingInvestment ? {borderRadius: 120/2, backgroundColor: '#1A1A1A'} : {borderRadius: 120/2, backgroundColor: '#F0F0F1'}}>
                            <Image
                              source={this.state.seekingInvestment ? require('../assets/black-circle-check.png') : require('../assets/black-circle-transparent.png')}
                              style={{resizeMode: 'center', width: 25, height: 25} }>
                            </Image>
                          </View>
                          <Text style={[styles.companyText, this.state.seekingInvestment && styles.companyText]}>Seeking Investment</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{flexDirection: "row", marginBottom: 5, justifyContent: "space-between" }}>
                        <TouchableOpacity style={styles.companyBtn} onPress={ this.toggleState2 }>
                          <View style={this.state.currentlyHiring ? {borderRadius: 120/2, backgroundColor: '#1A1A1A'} : {borderRadius: 120/2, backgroundColor: '#F0F0F1'}}>
                            <Image
                              source={this.state.currentlyHiring ? require('../assets/black-circle-check.png') : require('../assets/black-circle-transparent.png')}
                              style={{resizeMode: 'center', width: 25, height: 25}} >
                            </Image>
                          </View>
                          <Text style={[styles.companyText, this.state.currentlyHiring && styles.companyText]}>Currently Hiring</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                </View>

                <View style={styles.bottomBorder}>
                    <Text style={styles.prompt}>Company story</Text>
                    <TextInput
                        style={{...styles.placeholder,height:100}}
                        placeholderTextColor={'#ACACAC'}
                        multiline={true}
                        placeholder={"Tell us about your company"}
                        onChangeText={(companyStory) => {if(companyStory.length<160){this.setState({companyStory})}else{alert("160 Chars max")}}}
                        value={this.state.companyStory}
                    />
                </View>

                <View paddingTop={20} alignSelf={'center'}>
                    <TouchableOpacity onPress={() => this.registerBusiness()} underlayColor="white">
                        <WideButtonComponent
                            value={"STEP 1 OF 5"}
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
      prompt: {
        fontFamily: "poppins-regular", 
        color: "#323232",
        margin: "auto",
        alignItems: "baseline",
        fontSize: 11,
        paddingTop: 30
      },
      placeholder: {
        fontFamily: "poppins-regular", 
        color: "#ACACAC",
        margin: "auto",
        alignItems: "baseline",
        fontSize: 13,
        paddingVertical: 20
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
      },
      bottomBorder: {
        width: 350,
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1,
        alignSelf: "flex-start"
      },
      companyBtn: {
        width: 163,
        flexDirection: "row",
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: "space-between",
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#323232',
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginHorizontal: 5
      },
      companyText: {
        color: "#323232",
        fontSize: 11,
        marginLeft: 5, 
        marginRight: 5,
        fontFamily: "poppins-regular"
      }
})