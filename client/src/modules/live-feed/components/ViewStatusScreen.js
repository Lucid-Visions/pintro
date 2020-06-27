import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import BackButton from "../../shared/icons/back-button/lightTheme";
import ProfilePictureComponent from '../../../components/ProfilePicture';
import PostButton from '../../../components/WideButtonRight';
import fieldValidator from '../../shared/utils/index'

import styles from "../styles"

import {nameRegex} from "../../../modules/users/constants"

var validComment;
var btnStyles = { ...styles.btn, ...styles.btnDisabled }

const isSubmitDisabled = () => {
    if(validComment) {
      btnStyles = styles.btn
      return false;
    } else {
      btnStyles = { ...styles.btn, ...styles.btnDisabled }
      return true;
    }
  }

export default class ViewStatusScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      comment: ""
    };
  }

  postComment = async () => {
      var tester="wanker"
    var myHeaders = new Headers();
    var userToken = await AsyncStorage.getItem("token");
    myHeaders.append(
      "Authorization",
      userToken
    );
    myHeaders.append("Content-Type", "application/json");

    var body = {
        text: this.state.comment
    }
    console.log(JSON.stringify(body))

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(body),
      redirect: "follow"
      
    };

    fetch(
        `http://${env.host}:${env.port}/api/v1/status/${this.props.route.params.data._id}/comment?`,
      requestOptions
    ).catch((error) => console.log("error", error));
  };

  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };

  render() {
    const status = this.props.route.params;
    return (
      <ScrollView>
        <View style={styles.container1}>
          <BackButton navigation={this.props.navigation} />
          <View style={styles.container}>
            <View alignItems="center" alignSelf="center">
              <Text style={styles.h1}>{status.data.author.author_id.name}</Text>
            </View>
            <View paddingTop={40}>
              <View style={styles.container2}>
                <View style={styles.profPic}>
                    <ProfilePictureComponent source={status.data.author.author_id.profile_picture}/>
                </View>
                <View style={styles.blackSquare}>
                    <Text style={{marginTop: 55, color: 'white', padding: '5%'}}>{status.data.text}</Text>
                </View>
                </View>
            </View>
          </View>
          <View>
              <Text style={styles.h3}>Leave a comment</Text>
              <TextInput
                style={styles.placeholder}
                placeholderTextColor={"grey"}
                placeholder={"Enter comment..."}
                onEndEditing={input => {
                  validComment = fieldValidator({regex: nameRegex, input: input.nativeEvent.text})
                  this.setState({comment: input.nativeEvent.text})
                }}
              />
          </View>
          <View>
              <TouchableOpacity 
                disabled={isSubmitDisabled()}
                onPress={async () => {
                  await this.postComment()
                  this.props.navigation.goBack()
                }}>
                <PostButton
                  value={"POST"}
                  source={require("../../../assets/arrow-right-white.png")}
                  containerStyle={
                    btnStyles
                  }
                  textStyle={{
                    fontSize: 13,
                    fontFamily: "poppins-medium",
                    color: "lightgrey"
                  }}
                />
              </TouchableOpacity>
            </View>
        </View>
      </ScrollView>
    );
  }
}