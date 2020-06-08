import { StyleSheet } from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  h1: {
    fontFamily: "poppins-bold",
    color: "#323232",
    margin: "auto",
    textAlign: "left",
    fontSize: 26,
    paddingTop: 50,
    paddingHorizontal: 20
  },
  h2: {
    fontFamily: "poppins-regular",
    color: "#323232",
    margin: "auto",
    alignItems: "baseline",
    fontSize: 12,
    paddingTop: 20,
    paddingHorizontal: 20
  },
  btn: {
    fontFamily: "poppins-medium",
    width: 350,
    marginTop: 30,
    backgroundColor: "#1A1A1A",
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  container: {
    flex: 1,
    backgroundColor: "#F0F0F1",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingBottom: 50
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
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "#F0F0F1",
    alignContent: "center"
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center"
  },
  tagScrollContainer: {
    overflow: "hidden",
    maxHeight: 200 
  },
  tagScrollView: {
    paddingTop: 20
  }
});
  
  export default styles