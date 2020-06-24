import { StyleSheet } from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
    container: {
      paddingTop: Constants.statusBarHeight,
      flex: 1,
      flexDirection: "column",
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 30,
    },
    name: {
      fontWeight: "bold",
      fontSize: 20,
      fontFamily: "poppins-bold",
      flexWrap: "wrap",
      width: 155,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      margin: "2%",
      marginBottom: 0,
      marginTop: 0,
    },
    experienceContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
    },
    myStoryContainer: {
      alignSelf: "stretch",
    },
    subTextExperience: { 
      fontFamily: "poppins-medium",
      color: "#757575" 
    },
    experienceCircle: {
      height: 7,
      width: 7,
      backgroundColor: "#F3A33F",
      borderRadius: 25,
      marginRight: 20,
      position: "absolute",
      left: -20,
      top: 7,
    },
    indentOne: {
      marginLeft: 20,
    },
    headerText: {
      marginTop: "5%",
      marginLeft: "5%",
      flexDirection: "column",
      justifyContent: "center",
      flexShrink: 1,
      flex: 1,
    },
    buttonContainer: {
      flexDirection: "column",
      alignContent: "center",
    },
    buttons: {
      flexDirection: "row",
      marginBottom: 20,
      marginTop: 35,
    },
    actionButtons: {
      flexDirection: "row",
      minHeight: 120,
      margin: 0,
      padding: 0,
    },
    experience: {
      flexDirection: "row",
    },
    recommendationsSection: {
      flexDirection: "column",
      flexWrap: "wrap",
      marginTop: 10,
    },
    badgesSection: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 10,
    },
    recommendationsAndBadges: {
      top: 5,
      flexDirection: "row",
      marginTop: "2%",
      width: "100%",
      alignItems: "center",
      justifyContent: "space-between",
    },
    tags: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
    },
    tagScrollContainer: {
      height: 90,
      overflow: "hidden",
    },
    editPen: {
      resizeMode: "contain",
      marginTop: 10,
      height: 17,
    },
    editRow: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
  });

  export default styles;