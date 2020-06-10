import { StyleSheet } from "react-native";
import Constants from "expo-constants";

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
      paddingTop: Constants.statusBarHeight,
      flex: 1,
      backgroundColor: '#F0F0F1',
      alignItems: 'center',
      justifyContent: 'space-evenly'
    }
  });

  export default styles