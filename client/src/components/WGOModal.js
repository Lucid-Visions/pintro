import React from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import WideButton from "../components/PlusButtonWideButton";
import Modal from "react-native-modal";

export default class WGOModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: props.visible,
      isSelected: false,
      loggedUser: "",
    };
  }

  componentDidMount() {
    this.fetchUserData();
  }

  fetchUserData = async () => {
    var myHeaders = new Headers();
    var userToken = await AsyncStorage.getItem("token");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", userToken);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    var response = await fetch(
      `http://${env.host}:${env.port}/api/v1/user/data`,
      requestOptions
    ).catch(err => {
      console.log(err)
      return;
    });

    var responseText = await response.text();
    var responseJson = JSON.parse(responseText);

    if (responseJson.err) {
      console.log("here",responseJson.err);
      return;
    }
    
    this.setState({loggedUser: responseJson})
  }

  render() {
    const { navigation } = this.props;

    const toggleModal = () => {
      this.props.toggle();
    };

    const writeStatusPressed = () => {
      navigation.navigate("WriteStatus", {user: this.state.loggedUser});
      toggleModal();
    };

    const askHelpPressed = () => {
      navigation.navigate("AskHelp", {user: this.state.loggedUser});
      toggleModal();
    };

    const requestIntroPressed = () => {
      navigation.navigate("RequestIntro", {user: this.state.loggedUser});
      toggleModal();
    };

    const checkInLocation = async () => {
      var token = await AsyncStorage.getItem("token");

      navigator.geolocation.getCurrentPosition(
        position => {
          const location = JSON.stringify(position["coords"]);
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Authorization", token);
          var requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: location,
            redirect: "follow"
          };

          fetch(
            `http://${env.host}:${env.port}/api/v1/user/checkin`,
            requestOptions
          )
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log("error", error));
        },
        error => alert(error.message),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
      toggleModal();
    };

    return (
      <Modal
        animationIn="slideInUp"
        animationOut="slideOutDown"
        isVisible={this.props.visible}
        onBackdropPress={() => toggleModal()}
        style={styles.modal}
      >
        <View style={{ flex: 1 }}>
          <View>
            <Text style={styles.h1}>What's going on?</Text>
          </View>

          <View>
            <View style={styles.twoColumns} justifyContent="space-between">
              <Image
                style={styles.image}
                source={require("../assets/CheckInIcon.png")}
              />
              <TouchableOpacity onPress={() => checkInLocation()}>
                <WideButton
                  value={"Check-in"}
                  containerStyle={{
                    ...styles.btn
                  }}
                  textStyle={{
                    fontSize: 15,
                    fontFamily: "poppins-medium",
                    color: "#1A1A1A",
                    alignSelf: "flex-start"
                  }}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.twoColumns}>
              <Image
                style={styles.image}
                source={require("../assets/StatusIcon.png")}
              />
              <TouchableOpacity onPress={() => writeStatusPressed()}>
                <WideButton
                  value={"Write a status"}
                  containerStyle={{
                    ...styles.btn
                  }}
                  textStyle={{
                    fontSize: 15,
                    fontFamily: "poppins-medium",
                    color: "#1A1A1A",
                    alignSelf: "flex-start"
                  }}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.twoColumns}>
              <Image
                style={styles.image}
                source={require("../assets/HelpIcon.png")}
              />
              <TouchableOpacity onPress={() => askHelpPressed()}>
                <WideButton
                  value={"Ask for help"}
                  containerStyle={{
                    ...styles.btn
                  }}
                  textStyle={{
                    fontSize: 15,
                    fontFamily: "poppins-medium",
                    color: "#1A1A1A",
                    alignSelf: "flex-start"
                  }}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.twoColumns}>
              <Image
                style={styles.image}
                source={require("../assets/IntroRequestIcon.png")}
              />
              <TouchableOpacity onPress={() => requestIntroPressed()}>
                <WideButton
                  value={"Request an intro"}
                  containerStyle={{
                    ...styles.btn
                  }}
                  textStyle={{
                    fontSize: 15,
                    fontFamily: "poppins-medium",
                    color: "#1A1A1A",
                    alignSelf: "flex-start"
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  h1: {
    fontFamily: "poppins-bold",
    color: "black",
    margin: "auto",
    textAlign: "left",
    fontSize: 25,
    paddingTop: 35,
    paddingBottom: 10,
    paddingLeft: 30
  },
  btn: {
    fontFamily: "poppins-medium",
    width: 250,
    backgroundColor: "white",
    borderRadius: 13,
    alignContent: "flex-start"
  },
  image: {
    alignSelf: "center",
    height: 40,
    width: 40,
    resizeMode: "center",
    borderRadius: 9,
    backgroundColor: "#F8AE39",
    overflow: "visible"
  },
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20
  },
  twoColumns: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    width: 330
  },
  modal: {
    justifyContent: "space-evenly",
    backgroundColor: "#FCFCFC",
    maxHeight: 450,
    width: Dimensions.get("screen").width / 1.1,
    borderRadius: 20,
    alignSelf: "center",
    alignItems: "center",
    marginTop: Dimensions.get("screen").height / 4.5
  }
});
