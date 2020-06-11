import Constants from "expo-constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    h1: {
      fontFamily: "poppins-bold",
      color: "white",
      margin: "auto",
      textAlign: "left",
      fontSize: 30,
      paddingTop: 20,
      paddingBottom: 20
    },
    h2: {
      fontFamily: "poppins-regular",
      color: "lightgrey",
      margin: "auto",
      alignItems: "baseline",
      fontSize: 11,
      paddingBottom: 20
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
    },
    bottomBorderInvalid: {
      width: 350,
      borderBottomColor: "red",
      borderBottomWidth: 1,
      alignSelf: "flex-start"
    }
});

export default styles;