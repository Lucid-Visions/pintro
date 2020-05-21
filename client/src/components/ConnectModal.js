import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

class ConnectModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      circle: "Followers",
    };
  }

  render() {
    const circlesComponent = () => (
      <View style={{ width: "90%" }}>
        <Text style={styles.h2}>
          Choose a connection tier (this is only visible to you!)
        </Text>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            height: 60,
          }}
        >
          <RNPickerSelect
            onValueChange={(itemValue) => this.setState({ circle: itemValue })}
            selectedValue={this.state.circle}
            placeholder={{ label: "Select a circle", value: null }}
            items={[
              { label: "Inner Circle", value: 0 },
              { label: "Friends", value: 1 },
              { label: "Followers", value: 2 },
            ]}
          />
        </View>
      </View>
    );

    return (
      <View>
        <Text style={styles.text}>
          {this.props.accepted ? "Thanks for accepting!" : "Request declined."}
        </Text>
        {this.props.accepted ? circlesComponent() : null}
        <TouchableOpacity
          onPress={() => {this.props.respond(this.state.circle)}}
          style={styles.connect}
        >
          <Text style={styles.buttonText}>
            {this.props.accepted ? "CONNECT" : "OK"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  connectModal: {
    justifyContent: "space-evenly",
    backgroundColor: "#FCFCFC",
    height: Dimensions.get("screen").height / 5,
    maxHeight: 200,
    width: Dimensions.get("screen").width / 1.1,
    borderRadius: 20,
    alignSelf: "center",
    alignItems: "center",
    marginTop: Dimensions.get("screen").height / 3,
  },
  connect: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: 'stretch',
    height: 35,
    backgroundColor: "black",
    borderColor: "black",
    borderRadius: 15 / 2,
    borderWidth: 1,
    marginTop:40
  },
  text: {
    fontFamily: "poppins-medium",
    color: "black",
    margin: "auto",
    fontSize: 17,
    marginBottom:30
  },
  buttonText: {
    fontFamily: "poppins-medium",
    fontSize: 10,
    color: "white",
  },
  h2: {
    fontFamily: "poppins-light",
    color: "black",
    margin: "auto",
    textAlign: "center",
    fontSize: 12,
    paddingBottom: 10,
  },
  picker: {
    width: "100%",
    height: 20,
    fontFamily: "poppins-light",
    color: "grey",
    paddingBottom: 15,
  },
  pickerItem: {
    fontFamily: "poppins-light",
    color: "grey",
  },
  modal: {
    justifyContent: "space-evenly",
    backgroundColor: "#FCFCFC",
    height: Dimensions.get("screen").height / 4,
    maxHeight: 350,
    width: Dimensions.get("screen").width / 1.1,
    borderRadius: 20,
    alignSelf: "center",
    alignItems: "center",
    marginTop: Dimensions.get("screen").height / 4.5,
  },
});

export default ConnectModal;
