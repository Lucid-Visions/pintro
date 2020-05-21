import React from "react";
import { View, StyleSheet, Text } from "react-native";
import MoodButton from "./MoodButton";
import moodIconsData from "../assets/moods/moodIconsData";
import Modal from "react-native-modal";

class MoodButtonCard extends React.Component {
  constructor(props) {
    super(props);
    let toSet = props.selected;
    if (props.selected == null) {
      toSet = -1;
    }
    this.state = {
      icons: moodIconsData,
      mood: toSet
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps, prevState){
      if(this.props.selected != -1 && prevProps.selected!=this.props.selected){
          this.setState({mood:this.props.selected})
      }
  }

  handleChange(key) {
    if (key == this.state.mood) {
      key = -1;
    }

    this.setState({
      mood: key
    });
  }

  render() {
    let moodButtons = this.state.icons.map(item => (
      <MoodButton
        key={item.id}
        id={item.id}
        item={item}
        method={this.handleChange}
        checked={this.state.mood == item.id}
      />
    ));

    const toggleModal = () => {
      this.props.toggle(this.state.mood);
    };

    return (
      <Modal
        animationIn="slideInUp"
        animationOut="slideOutDown"
        isVisible={this.props.visible}
        onBackdropPress={() => toggleModal()}
        style={styles.modal}
      >
        <View style={styles.container}>
          <Text style={styles.text}>Choose a mood</Text>
          <View style={styles.buttons}>{moodButtons}</View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "90%",
    height: "95%",
    maxHeight: 550,
    backgroundColor: "#1A1A1A",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
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

export default MoodButtonCard;
