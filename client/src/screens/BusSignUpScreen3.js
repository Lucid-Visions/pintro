import React, { Component } from "react"
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from "react-native"
import Constants from "expo-constants";
import WideButtonComponent from "../components/WideButtonRight"
import RNPickerSelect from "react-native-picker-select";
const updateRequestBusiness = require("../assets/updateRequestBusiness").update;

export default class BusSignUpScreen3 extends Component {
    static navigationOptions = {
        headerLeft: "Arrow_back", // To be changed with an icon.
    }

    constructor(props) {
        super(props)
        this.state = {
            dateFounded: "",
            location: "",
            companySize: "",
            funding: "",
            companyID: props.route.params.companyID,
            user: props.route.params.user
        }
    }

    update(navigation) {
      const toUpdate = this.constructToUpdate();
      if (toUpdate) {
        const result = updateRequestBusiness(id=this.state.companyID, toUpdate);
        if (result) navigation.navigate("BusSignUp5", {companyID: this.state.companyID, user: this.state.user});
      }
    }

    constructToUpdate() {
      if (
        this.state.dateFounded.trim() &&
        this.state.location.trim() //&&
        //this.state.companySize.trim() &&
        //this.state.funding.trim()
        ) {
          return {
            date_founded: this.state.dateFounded,
            location: this.state.location,
            company_size: this.state.companySize,
            funding: this.state.funding
          };
        } else alert("Please don't leave empty fields.");
    }

    render() {
        const {navigation} = this.props
        return (
            <ScrollView style={styles.container2} showsVerticalScrollIndicator={false}>
            <View style={styles.container1}>
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
                  }}
                />
              </TouchableOpacity>
            )}
                <View>
                    <Text style={styles.h1}>Give us the details</Text>
                    <Text style={styles.h2}>Your company journey</Text>
                </View>

                <View style={styles.bottomBorder}>
                    <Text style={styles.prompt}>Date Founded</Text>
                    <TextInput
                        style={styles.placeholder}
                        placeholderTextColor={'#ACACAC'}
                        placeholder="Enter the date your company was founded"
                        onChangeText={(dateFounded) => this.setState({dateFounded})}
                        value={this.state.dateFounded}
                    />
                </View>

                <View style={styles.bottomBorder}>
                    <Text style={styles.prompt}>Location</Text>
                    <TextInput
                        style={styles.placeholder}
                        placeholderTextColor={'#ACACAC'}
                        placeholder="Enter your company location"
                        onChangeText={(location) => this.setState({location})}
                        value={this.state.location}
                    />
                </View>

                <View style={styles.bottomBorder}>
                    <Text style={styles.prompt}>Company Size</Text>
                    <View paddingVertical={20}>
                      <RNPickerSelect
                        placeholder={{
                          label: 'How big is your team?',
                          value: ''
                      }}
                        onValueChange={value => this.setState({ companySize: value })}
                        items={[
                          { label: "0-5", value: "0-5" },
                          { label: "< 10", value: "< 10" },
                          { label: "< 50", value: "< 50" },
                          { label: "< 100", value: "< 100" },
                          { label: "100+", value: "100+" }
                        ]}
                        style={styles.picker1}
                      />
                    </View>
                </View>

                <View style={styles.bottomBorder}>
                    <Text style={styles.prompt}>Funding</Text>
                    <View paddingVertical={20}>
                      <RNPickerSelect
                        placeholder={{
                          label: 'Have you received funding?',
                          value: ''
                      }}
                        onValueChange={value => this.setState({ funding: value })}
                        items={[
                          { label: "Yes", value: "Yes" },
                          { label: "No", value: "No" }
                        ]}
                        style={styles.picker1}
                      />
                    </View>
                </View>

                <View paddingTop={20} alignSelf={'center'}>
                    <TouchableOpacity onPress={() => this.update(navigation)} underlayColor="white">
                        <WideButtonComponent
                            value={"STEP 3 OF 5"}
                            source={require("../assets/arrow-right-white.png")}
                            containerStyle={{
                            ...styles.btn
                            }}
                            textStyle={{ fontSize: 14, fontFamily: "poppins-light", color: 'lightgrey' }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
          </View>
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
        paddingTop: Constants.statusBarHeight,
        flex: 1,
        backgroundColor: "#F0F0F1",
        alignItems: "flex-start",
        justifyContent: "space-between",
        paddingBottom: 50,
        paddingHorizontal: 20
      },
      container1: {
        paddingTop: Constants.statusBarHeight,
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
      picker1: {
        //height: 50,
        //width: 75,
        fontFamily: "poppins-regular",
        fontSize: 13,
        color: "white",
        borderBottomColor: "lightgrey",
        borderBottomWidth: 1,
        padding: 20,
        color: "white"
      }
})