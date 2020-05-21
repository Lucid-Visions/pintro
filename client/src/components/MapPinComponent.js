import React, { Component } from "react";
import { Image, View, StyleSheet } from "react-native";

class MapPinComponent extends Component {
  constructor(props) {
    super(props);

  }

  getIcon() {
    switch (this.props.left) {
      case true: {
        switch (this.props.selected) {
          case true: {
            return require("../assets/leftMapIconYellow.png");
          }
          case false: {
            return require("../assets/leftMapIcon.png");
          }
        }
      }
      case false: {
        switch (this.props.selected) {
          case true: {
            return require("../assets/rightMapIconYellow.png");
          }
          case false: {
            return require("../assets/rightMapIcon.png");
          }
        }
      }
      default: {
        return require("../assets/rightMapIcon.png");
      }
    }
  }

  shouldComponentUpdate(nextProps){
    return(nextProps.insideIcon != this.props.insideIcon || nextProps.left != this.props.left || nextProps.selected != this.props.selected)

  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={this.props.insideIcon?this.props.insideIcon:require("../assets/PeopleIconEllipse.png")}
          style={styles.insideIcon}
        />
        <Image source={this.getIcon()} style={styles.icon} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50
  },
  icon: {
    height: 45,
    resizeMode: "contain",
    aspectRatio: 1
  },
  insideIcon: {
    position: "absolute",
    zIndex: 99,
    height: 30,
    width: 30,
    marginTop: 7,
    marginLeft: 3,
    resizeMode: "contain",
    borderRadius: 50
  }
});
export default MapPinComponent;
