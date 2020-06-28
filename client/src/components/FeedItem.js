import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, AsyncStorage, Dimensions, Alert } from "react-native";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import {deletePost} from '../modules/live-feed/actions'
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo();

class FeedComponent extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      isSelected1: false,
      isSelected2: false,
    };
    this.checkLiked = this.checkLiked.bind(this)
  }

  async checkLiked(){
    const likedId = this.props.data.likes.map((x)=>x.user_id)
    const userToken = this.props.uid
    this.setState({isSelected1:likedId.includes(userToken)})
  }

  componentDidMount(){
    this.checkLiked()
  }

  deletePost = () => {
    Alert.alert(
      "Delete General Post",
      "Are you sure?",
      [
        {
          text: "No",
          onPress: () => console.log('Canceled'),
          style: "cancel"
        },
        { text: "Yes", onPress: () => {
          deletePost(this.props.data._id)
          this.props.refresh()
        }}
      ],
      { cancelable: true }
    );
  }

  toggleState1 = async () => {
    var myHeaders = new Headers();
    var userToken = await AsyncStorage.getItem("token");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      userToken
    );
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: !this.state.isSelected1?"POST":"DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
        `http://${env.host}:${env.port}/api/v1/status/${this.props.data._id}/like?`,
      requestOptions
    ).catch((error) => console.log("error", error));
    this.props.refresh()

    this.setState({
      isSelected1: !this.state.isSelected1,
    });
  };

  toggleState2 = () => {
    this.setState({
      isSelected2: !this.state.isSelected2,
    });
  };

  resizeToFit = () => {
    return this.props.name.length > 20
      ? 5
      : this.props.name.length > 17
      ? 8
      : this.props.name.length > 10
      ? 10
      : 11;
  };

  specifyTime = () => {
    const time = this.props.timeAgo;
    return timeAgo.format(time);
  };

  render() {
    const size = this.resizeToFit();
    const time = this.specifyTime();
    return (
      <View style={styles.outline}>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.container}>
            <View
              style={{ flexDirection: "column", marginTop: 15, marginLeft: 12 }}
            >
              <TouchableOpacity style={{ flexDirection: "row" }}>
                <Image
                  style={{ height: 45, width: 45, borderRadius: 200 / 2 }}
                  source={
                    this.props.photo ? {uri: this.props.photo} :
                    require("../assets/empty-profile-picture.png")
                  }
                />
                <View style={{ flexDirection: "column" }}>
                  <Text
                    style={{
                      fontFamily: "poppins-semi-bold",
                      color: "white",
                      fontSize: size,
                      marginTop: 5,
                      marginLeft: 8,
                    }}
                  >
                    {this.props.name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "poppins-semi-bold",
                      color: "gray",
                      fontSize: 10,
                      marginLeft: 8,
                    }}
                  >
                    {time}
                  </Text>
                </View>
                {this.props.isAuthor &&
                  <TouchableOpacity onPress={() => this.deletePost()}>
                      <Image source={require('../assets/whiteCross.png')} style={{height: 15, width: 15}}></Image>
                  </TouchableOpacity>
                }
              </TouchableOpacity>
              <View style={{ flexDirection: "row" }}>
                {this.props.hashtag1 && (
                  <Text style={styles.hashtag}>
                    {"#" + this.props.hashtag1 || ""}
                  </Text>
                )}
                {this.props.hashtag2 && (
                  <Text style={styles.hashtag}>
                    {"#" + this.props.hashtag2 || ""}
                  </Text>
                )}
                {this.props.hashtag3 && (
                  <Text style={styles.hashtag}>
                    {"#" + this.props.hashtag3 || ""}
                  </Text>
                )}
              </View>
              <View>
                <Text
                  numberOfLines={5}
                  style={{
                    fontFamily: "poppins-medium",
                    color: "white",
                    fontSize: 11,
                    marginTop: 5,
                    marginRight: 8,
                  }}
                >
                  {this.props.post.substring(0,60)+(this.props.post.length > 60?"...":"")}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={this.toggleState1}>
                  <Image
                    source={
                      this.state.isSelected1
                        ? require("../assets/Heart.png")
                        : require("../assets/HeartEmpty.png")
                    }
                    style={{
                      resizeMode: "contain",
                      width: 19,
                      height: 19,
                      marginTop: 10,
                    }}
                  ></Image>
                  <Text
                    style={{
                      fontFamily: "poppins-semi-bold",
                      color: "gray",
                      fontSize: 9,
                      marginTop: -15,
                      marginLeft: 24,
                      marginBottom: 20,
                    }}
                  >
                    {this.props.likes+" "}
                    likes
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ position: "absolute", marginLeft: 57 }}
                >
                  <Image
                    source={require("../assets/Comment.png")}
                    style={{
                      resizeMode: "contain",
                      width: 19,
                      height: 19,
                      marginLeft: 10,
                      marginTop: 10,
                    }}
                  ></Image>
                  <Text
                    style={{
                      fontFamily: "poppins-semi-bold",
                      color: "gray",
                      fontSize: 9,
                      marginLeft: 34,
                      marginTop: -15,
                      marginBottom: 15,
                    }}
                  >
                    {this.props.comments} comments
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    width: (screenWidth/2)-10,
    borderRadius: 40 / 2,
    flexDirection: "row",
    backgroundColor: "black",
    height:140,
    marginLeft:5,
    marginTop:2

  },
  outline: {
    flexDirection: "column",
    padding: 2,
  },
  img: {
    width: "100%",
    height: "100%",
    marginRight: 10,
    opacity: 0.6,
  },
  hashtag: {
    fontFamily: "poppins-semi-bold",
    color: "orange",
    fontSize: 10,
    marginTop: 10,
    marginLeft: 3,
  },
  selectedImg: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 2,
    borderWidth: 2,
    borderColor: "orange",
    borderRadius: 20 / 2,
  },
});

export default FeedComponent;
