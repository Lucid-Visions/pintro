import React, { Component } from "react"
import {View, StyleSheet, Text, Modal, TouchableHighlight, Alert } from "react-native"

class PlusButtonPopUp extends Component {
    state = {
        modalVisible: false,
      };
    
      setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }
    
      render() {
        return (
          <View style={{marginTop: 22}}>
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              }}>
              <View style={{marginTop: 22}}>
                <View>
                  <Text>Hello World!</Text>
    
                  <TouchableHighlight
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}>
                    <Text>Hide Modal</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>
    
            <TouchableHighlight
              onPress={() => {
                this.setModalVisible(true);
              }}>
              <Text>Show Modal</Text>
            </TouchableHighlight>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        width: "90%",
        height: "95%",
        maxHeight: 550,
        backgroundColor: '#1A1A1A',
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    buttons: {
        flexDirection: "row",
        flexWrap: "wrap",
        width: 320,
        justifyContent: "space-around",
        padding: 20
    },
    text: {
        fontFamily: "poppins-bold", 
        color: "white",
        margin: "auto",
        textAlign: "left",
        fontSize: 26,
        paddingTop: 20
    }
});

export default PlusButtonPopUp