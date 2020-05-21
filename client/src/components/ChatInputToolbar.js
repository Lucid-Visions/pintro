import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Image } from 'react-native';

/**
 *
 */
export default class ChatInputToolbar extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        message: ""
      }

      this.messageInput = React.createRef();

      this.onSendHandler = this.onSendHandler.bind(this);
      this.onChangeTextHandler = this.onChangeTextHandler.bind(this);
  };

  onSendHandler(){
    if(this.state.message !== ""){
      this.props.onSend(this.state.message);

      // clear the input
      this.setState({ message: "" });
      this.messageInput.current.clear();
    }
  }

  onChangeTextHandler(newValue){
    this.setState({ message: newValue });
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.innerContainer}>

          <TextInput
              multiline={true}
              style={{ flex: 1, marginLeft: 25, marginRight: 10 }}
              onChangeText={this.onChangeTextHandler}
              ref={this.messageInput}
              placeholder={"Your message..."}
          />

          <TouchableOpacity onPress={this.onSendHandler} style={styles.sendButton}>
            <Image source={require('../assets/rightArrowBlack.png')} resizeMode={'center'} style={{height: 42, width: 42}}/>
          </TouchableOpacity>

        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 120,
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: 'lightgray',
    borderTopWidth: 1.0
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5,
    marginRight: 30,
    marginLeft: 30,
    borderColor: 'gray',
    borderWidth: 1.5,
    borderRadius: 30
  },
  sendButton: {
    alignSelf: "flex-end",
    backgroundColor: "orange",
    borderRadius: 180
  }
});
