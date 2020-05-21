import React from "react";
import { TouchableOpacity, Text, Image, View, StyleSheet } from "react-native";

class SearchButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false,
      image: props.item.image,
      text: props.item.text,
      searchCallback: props.callbackFunction,
    };
  }

  toggleState = async () => {
    await this.setState({
      isSelected: !this.state.isSelected,
    });

    // add new category
    if (this.state.isSelected) this.state.searchCallback(this.state.text, true);
    // remove a category
    else if (!this.state.isSelected)
      this.state.searchCallback(this.state.text, false);
  };

  render() {
    return (
      <TouchableOpacity style={styles.btn} onPress={this.toggleState}>
        <Image source={this.state.image} style={styles.img} />
        <View style={styles.absoluteView}>
          <Text
            style={[styles.text, this.state.isSelected && styles.selectedText]}
          >
            {this.state.text}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  absoluteView: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  text: {
    fontFamily: "poppins-medium",
    fontSize: 10,
    marginVertical: 20,
    color: "white",
  },
  selectedText: {
    fontFamily: "poppins-medium",
    color: "#E1963D",
    textDecorationLine: "underline",
    textDecorationColor: "#E1963D",
  },
  img: {
    borderRadius: 70 / 2,
    width: 65,
    height: 65,
    overflow: "hidden",
  },
  btn: {
    marginLeft: 6,
    marginRight: 6,
  },
});

export default SearchButton;
