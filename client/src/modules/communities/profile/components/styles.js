import { StyleSheet } from 'react-native'

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
  header: {
    flexDirection: "row",
    alignItems: "center",
    margin: "5%"
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
  recommendationsSection: {
    flexDirection: "column",
    flexWrap: "wrap",
    marginTop: 10
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