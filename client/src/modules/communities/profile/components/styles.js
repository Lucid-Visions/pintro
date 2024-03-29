import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginBottom: 30,
    borderRadius: 20 / 2,
    backgroundColor: "#F5F5F5",
    marginTop: -50,
    padding: 20
  },
  container2: {
    paddingTop: Constants.statusBarHeight+20,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    marginHorizontal: 20,
    paddingBottom: 30
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    margin: "5%"
  },
  categoryHeaderBold: {
    fontFamily: "poppins-semi-bold",
    margin: "auto",
    textAlign: "left",
    alignItems: "baseline",
    fontSize: 14,
    paddingBottom: 20
  },
  experienceContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center"
  },
  companyName: {
      fontFamily: 'poppins-bold', 
      fontSize: 24,
      marginBottom: 15,
      marginTop: 1
  },
  myStory: {
    marginRight: 25,
    marginTop: 5
  },
  editRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  myStoryContainer: {
    alignSelf: 'stretch',
    paddingBottom: 10
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
    top: 7
  },
  indentOne: {
    marginLeft: 20
  },
  headerText: {
    marginTop: "5%",
    marginLeft: "5%",
    flexDirection: "column",
    justifyContent: "center",
    flexShrink: 1
  },
  buttonContainer: {
    flexDirection: "column",
    alignContent: "center"
  },
  buttons: {
    flexDirection: "row",
    marginBottom: "5%"
  },
  actionButtons: {
    flexDirection: "row",
    minHeight: 120,
    margin: 0,
    padding: 0
  },
  experience: {
    flexDirection: "row"
  },
  articles: {
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
    alignItems: "center"
  },
  tagScrollContainer: {
    height: 90,
    overflow: "hidden"
  },
  outline: {
    justifyContent: 'center',
    flexDirection: 'column',
    marginLeft: 0,
    padding: 2,
  },
  text: {
      fontSize: 9,
      marginLeft: 6, 
      marginTop: "4%", 
      fontFamily: "poppins-semi-bold", 
  },
  selectedText: {
      color: 'orange',
      marginLeft: 6, 
      marginTop: "4%", 
      fontFamily: "poppins-semi-bold", 
      fontSize: 9
  }
});

export default styles