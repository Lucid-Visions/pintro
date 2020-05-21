import React, { useState, Component } from "react";
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity} from "react-native";
import WideButtonComponent from "../components/WideButton";
import WideButtonRight from "../components/WideButtonRight";
import { AuthContext } from "../navigation/AppNavigator";

const BusSignUpScreen6 = ({ navigation, route }) => {
  const companyID = route.params.companyID
  const user = route.params.user
  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View>
          
        </View>
        <View >
          <Text style={styles.h1}>Thank you!</Text>
          <Text style={styles.h2}>You're now ready to use Pintro</Text>
        </View>      
      
      <View paddingTop={20} alignSelf={'center'}>
          <TouchableOpacity onPress={()=>navigation.navigate("Company", {id: companyID, user: user})} underlayColor="white" >
              <WideButtonRight
                  value={"GO TO COMPANY PROFILE"}
                  source={require("../assets/arrow-right-white.png")}
                  containerStyle={{
                      ...styles.blackbtn
                  }}
                  textStyle={{ fontSize: 14, fontFamily: "poppins-light", color: 'white' }}
              />
        </TouchableOpacity>
        <TouchableOpacity underlayColor="white" style={{marginTop:5}}>
              <WideButtonComponent
                  value={"INVITE CONNECTIONS"}
                  source={require("../assets/linkedin_black.png")}
                  containerStyle={{
                      ...styles.whitebtn
                  }}
                  textStyle={{ fontSize: 14, fontFamily: "poppins-light", color: '#1A1A1A' }}
              />
        </TouchableOpacity>
      </View>
        
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  h1: {
    fontFamily: "poppins-bold", 
    color: "#1A1A1A",
    margin: "auto",
    textAlign: "center",
    fontSize: 26,
    paddingBottom: 20
  },
  h2: {
    fontFamily: "poppins-regular", 
    color: "grey",
    margin: "auto",
    alignItems: "baseline",
    textAlign: "center",
    fontSize: 12
  },
  whitebtn: {
    fontFamily: "poppins-medium", 
    width: 350,
    marginTop: 30,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderWidth: 1.3,
    borderColor: "#1A1A1A",
    flexDirection: 'row', 
    justifyContent: 'space-evenly'
  },
  blackbtn: {
    fontFamily: "poppins-medium", 
    width: 350,
    marginTop: 30,
    backgroundColor: "#1A1A1A",
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#1A1A1A",
    flexDirection: 'row', 
    justifyContent: 'space-evenly'
  },
  container: {
    flex: 1,
    backgroundColor: '#F0F0F1',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  }
});

export default BusSignUpScreen6
