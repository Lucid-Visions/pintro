import React from "react";
import { Text, View, StyleSheet, TouchableOpacity} from "react-native";
import Constants from "expo-constants";
import WideButtonComponent from "../../../../components/WideButton";
import WideButtonRight from "../../../../components/WideButtonRight";

import { AuthContext } from "../../../../navigation/AppNavigator";

const thankYouScreen = ({ navigation }) => {
  const { signIn } = React.useContext(AuthContext);
  
  return(
    <View style={styles.container}>
      <View style={styles.container}>
        <View>
          
        </View>
        <View >
          <Text style={styles.h1}>Thank you!</Text>
          <Text style={styles.h2}>You're now ready to use Pintro</Text>
        </View>      
      
      <View paddingTop={20} alignSelf={'center'}>
          <TouchableOpacity onPress={() => signIn("alex")} underlayColor="white" >
              <WideButtonRight
                  value={"GO TO YOUR PROFILE"}
                  source={require("../../../../assets/arrow-right.png")}
                  containerStyle={{
                      ...styles.whitebtn
                  }}
                  textStyle={{ fontSize: 14, fontFamily: "poppins-light", color: '#1A1A1A' }}
              />
        </TouchableOpacity>
        <TouchableOpacity underlayColor="white" style={{marginTop:5}}>
              <WideButtonComponent
                  value={"INVITE CONNECTIONS"}
                  source={require("../../../../assets/linkedIn.png")}
                  containerStyle={{
                      ...styles.blackbtn
                  }}
                  textStyle={{ fontSize: 14, fontFamily: "poppins-light", color: 'white' }}
              />
        </TouchableOpacity>
      </View>
        
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  h1: {
    fontFamily: "poppins-bold", 
    color: "white",
    margin: "auto",
    textAlign: "center",
    fontSize: 26,
    paddingBottom: 20
  },
  h2: {
    fontFamily: "poppins-regular", 
    color: "lightgrey",
    margin: "auto",
    alignItems: "baseline",
    textAlign: "center",
    fontSize: 12
  },
  whitebtn: {
    fontFamily: "poppins-medium", 
    width: 350,
    marginTop: 30,
    backgroundColor: "white",
    flexDirection: 'row', 
    justifyContent: 'space-evenly'
  },
  blackbtn: {
    fontFamily: "poppins-medium", 
    width: 350,
    marginTop: 30,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "white",
    flexDirection: 'row', 
    justifyContent: 'space-evenly'
  },
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  }
});

export default thankYouScreen;
