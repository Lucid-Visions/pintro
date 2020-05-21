import React, { Component } from "react";
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Picker,
  Image
} from "react-native";
import WideButtonComponent from "../components/WideButton";
import TagsData from "../assets/TagsData";
import Tag from "../components/Tag";

const updateRequest = require("../assets/updateRequest").update;

class SignUp7Screen extends Component {
  constructor() {
    super();
    this.state = {
      skills: []
    };
    this.tagCallback = this.tagCallback.bind(this);
  }

  update(navigation) {
    if (this.state.skills.length >= 6) {
      const result = updateRequest({ skills: this.state.skills });
      if (result) navigation.navigate("SignUp8");
    } else alert("Please select at least 6 superpowers!");
  }

  tagCallback(text, selected) {
    let prevSelected = this.state.skills;
    if (selected) {
      if (!prevSelected.includes(text)) {
        prevSelected.push(text);
      }
    } else {
      prevSelected = prevSelected.filter(item => item !== text);
    }
    this.setState({ skills: prevSelected });
  }

  render() {
    const { navigation } = this.props;
    const tagsItems = TagsData.map(item => (
      <Tag item={item} i={2} callback={this.tagCallback} />
    ));

    return (
      <ScrollView
        style={styles.container2}
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView style={styles.container1}>
          <View style={styles.container}>
            {navigation.canGoBack() && (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Image
                  source={require("../assets/leftArrowWhite.png")}
                  style={{
                    height: 20,
                    width: 25,
                    resizeMode: "contain",
                    alignSelf: "flex-start",
                    marginLeft: 20
                  }}
                />
              </TouchableOpacity>
            )}
            <View>
              <Text style={styles.h1}>How can you help others?</Text>
              <Text style={styles.h2}>Choose your superpowers (6 minimum)</Text>
            </View>

            <View paddingTop={70}>
              <Text style={styles.h2}>Choose from the most popular</Text>
              <View style={styles.tagScrollContainer}>
                <ScrollView style={styles.tagScrollView} horizontal={true}>
                  <View>
                    <View style={styles.tags}>{tagsItems.chunk(4)[0]}</View>
                    <View style={styles.tags}>{tagsItems.chunk(4)[1]}</View>
                    <View style={styles.tags}>{tagsItems.chunk(4)[2]}</View>
                    <View style={styles.tags}>{tagsItems.chunk(4)[3]}</View>
                  </View>
                </ScrollView>
              </View>
            </View>

            <View paddingTop={20} alignSelf={"center"}>
              <TouchableOpacity
                onPress={() => this.update(navigation)}
                underlayColor="white"
              >
                <WideButtonComponent
                  value={"FINISH"}
                  containerStyle={{
                    ...styles.btn
                  }}
                  textStyle={{
                    fontSize: 14,
                    fontFamily: "poppins-light",
                    color: "#1A1A1A"
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  h1: {
    fontFamily: "poppins-bold",
    color: "white",
    margin: "auto",
    textAlign: "left",
    fontSize: 26,
    paddingTop: 50,
    paddingHorizontal: 20
  },
  h2: {
    fontFamily: "poppins-regular",
    color: "lightgrey",
    margin: "auto",
    alignItems: "baseline",
    fontSize: 12,
    paddingTop: 20,
    paddingHorizontal: 20
  },
  btn: {
    fontFamily: "poppins-medium",
    width: 350,
    marginTop: 30,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingBottom: 50
  },
  container1: {
    flex: 1,
    backgroundColor: "#1A1A1A",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-between"
  },
  container2: {
    flex: 1,
    backgroundColor: "#1A1A1A",
    alignContent: "center"
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center"
  },
  tagScrollContainer: {
    overflow: "hidden",
    maxHeight: 250 
  },
  tagScrollView: {
    paddingTop: 20
  }
});

export default SignUp7Screen;
