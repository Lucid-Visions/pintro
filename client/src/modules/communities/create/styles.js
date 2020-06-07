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
  btnText: {
    fontSize: 14,
    fontFamily: "poppins-light",
    color: 'lightgrey'
  },
  container: {
    marginTop: Constants.statusBarHeight + 20,
    flex: 1,
    backgroundColor: "#F0F0F1",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingBottom: 50,
    paddingHorizontal: 20
  },
  bottomBorder: {
    width: 350,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    alignSelf: "flex-start"
  }
});

export default styles;