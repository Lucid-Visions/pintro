import React from "react";
import {
  Picker,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
} from "react-native";
import Modal from "react-native-modal";
import TagsData from "../assets/TagsData";
import RNPickerSelect from "react-native-picker-select";


const pickerStyle = {
	inputAndroid: {
    width: 300,
	}
};

class ChatConnectPopup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      intent: "",
      message: "",
      name: this.props.name,
      chat: this.props.chat, //"Chat" or "Connect"
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.props.toggle();
    this.props.onPress(this.state.intent, this.state.message);
    this.setState({
      intent: "",
      message: "",
    });
  }

  render() {
    const toggleModal = () => {
      this.props.toggle();
    };

    const intentListMap = TagsData.map((item) => ({
      label: item.text,
      value: item.text,
    }));
  
    const extraStyles = this.props.chat == "Connect" ? styles.connectPicker : styles.chatPicker

    let pickerStyles = {
      inputAndroid: {
        width: 300,
      },
      ...extraStyles
    }

    return (
      <Modal
        animationIn="slideInUp"
        animationOut="slideOutDown"
        isVisible={this.props.visible}
        onBackdropPress={() => toggleModal()}
        style={{ minHeight: 200 }}
      >
        <View
          style={[
            styles.chatContainer,
            this.props.chat == "Connect" && styles.connectContainer,
          ]}
        >
          <Text
            style={[
              styles.chatH1,
              this.props.chat == "Connect" && styles.connectH1,
            ]}
          >
            {this.props.chat} with {this.props.name}
          </Text>
          <View style={styles.content}>
            <Text
              style={
                this.props.chat == "Connect"
                  ? styles.connectLabel
                  : styles.chatLabel
              }
            >
              Select an intent
            </Text>

            <View style={{ marginLeft: 5 }}>
              <Text
                onPress={() => this.picker.togglePicker()}
                style={{
                  color: this.props.chat == "Connect" ? "white" : "black",
                  position: "absolute",
                  zIndex: 99,
                }}
              >
                {this.state.intent}
              </Text>
              <RNPickerSelect
                ref={(e) => (this.picker = e)}
                placeholder={{
                  label: "Select an option...",
                  value: null,
                }}
                selectedValue={this.state.intent}
                placeholderTextColor={this.props.chat == "Connect" ? "white" : "black"}
                style={pickerStyles}
                onValueChange={(itemValue) =>
                  this.setState({ intent: itemValue })
                }
                items={intentListMap}
              />
            </View>
            <Text
              style={{
                ...(this.props.chat == "Connect"
                  ? styles.connectLabel
                  : styles.chatLabel),
                marginTop: 20,
              }}
            >
              Write a message
            </Text>
            <TextInput
              style={[
                styles.chatText,
                this.props.chat == "Connect" && styles.connectText,
              ]}
              placeholderTextColor={
                this.props.chat == "Connect" ? "white" : "grey"
              }
              placeholder="Type here...    "
              onChangeText={(message) => this.setState({ message })}
              value={this.state.message}
            />
          </View>
          <TouchableOpacity
            style={[
              styles.chatButton,
              this.props.chat == "Connect" && styles.connectButton,
            ]}
            onPress={() => this.handleChange()}
          >
            <Text
              style={[
                styles.chatButtonText,
                this.props.chat == "Connect" && styles.connectButtonText,
              ]}
            >
              SEND {this.props.chat.toUpperCase()} REQUEST
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  chatContainer: {
    flexDirection: "column",
    width: "95%",
    height: "50%",
    maxHeight: 550,
    backgroundColor: "white",
    borderRadius: 20,
    justifyContent: "space-between",
    alignSelf: "center",
    padding: "2%",
  },
  connectContainer: {
    flexDirection: "column",
    width: "95%",
    height: "50%",
    maxHeight: 550,
    backgroundColor: "black",
    borderRadius: 20,
    justifyContent: "space-between",
    alignSelf: "center",
    padding: "2%",
  },
  content: {
    alignItems: "flex-start",
    padding: "3%",
  },
  chatH1: {
    fontFamily: "poppins-bold",
    color: "black",
    margin: "auto",
    textAlign: "center",
    fontSize: 16,
    paddingTop: 10,
  },
  connectH1: {
    fontFamily: "poppins-bold",
    color: "white",
    margin: "auto",
    textAlign: "center",
    fontSize: 16,
    paddingTop: 10,
  },
  chatLabel: {
    fontFamily: "poppins-light",
    color: "#1A1A1A",
    margin: "auto",
    textAlign: "left",
    fontSize: 14,
    padding: "2%",
    paddingTop: "7%",
  },
  connectLabel: {
    fontFamily: "poppins-light",
    color: "grey",
    margin: "auto",
    textAlign: "left",
    fontSize: 14,
    padding: "2%",
    paddingTop: "7%",
  },
  chatText: {
    fontFamily: "poppins-light",
    color: "grey",
    margin: "auto",
    textAlign: "left",
    fontSize: 16,
    padding: "2%",
  },
  connectText: {
    fontFamily: "poppins-light",
    color: "white",
    margin: "auto",
    textAlign: "left",
    fontSize: 16,
    padding: "2%",
  },
  chatPicker: {
    width: "100%",
    fontFamily: "poppins-light",
    color: "grey",
  },
  connectPicker: {
    width: "100%",
    height: 40,
    fontFamily: "poppins-light",
    color: "white",
  },
  pickerItem: {
    fontFamily: "poppins-light",
    color: "grey",
  },
  chatButton: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: 30,
    backgroundColor: "black",
    borderRadius: 15 / 2,
  },
  chatButtonText: {
    marginLeft: "5%",
    color: "white",
    fontSize: 10,
  },
  connectButton: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: 30,
    backgroundColor: "white",
    borderRadius: 15 / 2,
  },
  connectButtonText: {
    marginLeft: "5%",
    color: "black",
    fontSize: 10,
  },
});

export default ChatConnectPopup;
