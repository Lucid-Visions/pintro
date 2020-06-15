import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image
} from "react-native";
import ActionButtonComponent from "../components/ActionButton";

class MapCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
    };
  }
  render() {
    if(this.props.user == null){
      return null
    }
    return (
      <TouchableOpacity onPress={()=> this.props.navigation?this.props.navigation.navigate("Profile", {uid:this.props.user._id}):null}>
        <View style={styles.container}>
          <View style={styles.horizontalContainer}>
            <Image
              style={styles.profilePicture}
              source={{uri:this.props.user.profile_picture} || require("../assets/empty-profile-picture.png")}
            />
            <View style={styles.textContainer}>
              <Text style={styles.headingOne}>{this.props.user.name}</Text>
              <Text style={styles.headingTwo}>{this.props.user.experience.currentJobTitle}</Text>
              <Text style={styles.headingTwo}>{this.props.user.experience.currentCompany}</Text>
            </View>
          </View>
          <Text style={styles.descriptionText}>
            {this.props.user.bio.substring(0, 100)+"..."}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FBFBFB",
    width: 300,
    height: 150,
    borderRadius: 17,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10
  },
  horizontalContainer: {
    flexDirection: "row",
    alignContent: "center"
  },
  profilePicture: {
    height: 55,
    width: 55,
    borderRadius: 100,
    margin: 20
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
    marginTop: 25
  },
  descriptionText: {
    fontFamily: "poppins-light",
    fontSize: 10,
    paddingLeft: 20,
    paddingRight: 20
  }
});

export default MapCard;
