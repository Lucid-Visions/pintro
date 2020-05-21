import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from "react-native";

class ProfileCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      id: props.id,
      currentJobTitle: props.currentJobTitle,
      profile_picture: props.profile_picture
    };
  }

  render() {
    if(this.props.id == null){
      return null
    }
    return (
      <TouchableOpacity alignSelf={"center"}>
        <View style={styles.container}>
          <View style={styles.horizontalContainer}>
            <Image
              style={styles.profilePicture}
              source={{url:this.props.profile_picture} || require("../assets/empty-profile-picture.png")}
            />
            <View style={styles.textContainer}>
              <Text style={styles.headingOne}>{this.props.name}</Text>
              <Text style={styles.headingTwo}>{this.props.currentJobTitle}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FBFBFB",
    width: Dimensions.get("screen").width / 1.1,
    height: 90,
    borderRadius: 17,
    marginTop: 10,
    alignSelf:"center"
  },
  horizontalContainer: {
    flexDirection: "row",
    alignContent: "center"
  },
  profilePicture: {
    height: 55,
    width: 55,
    borderRadius: 100,
    margin: 17
  },
  headingOne: {
    fontFamily: "poppins-medium",
    fontSize: 15
  },
  headingTwo: {
    fontFamily: "poppins-light",
    fontSize: 10
  },
  textContainer: {
    //alignItems: "center"
    marginLeft: 5,
    marginVertical: 25
  },
  descriptionText: {
    fontFamily: "poppins-light",
    fontSize: 10,
    paddingLeft: 20,
    paddingRight: 20
  }
});

export default ProfileCard;
