import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image
} from "react-native";
import Constants from "expo-constants";
import WideButtonComponent from "../components/WideButtonRight";
import TagsData from "../assets/TagsData";
import Tag from "../components/Tag";
import MultiSelect from "react-native-multiple-select";
const updateRequestBusiness = require("../assets/updateRequestBusiness").update;

class BusSignUpScreen2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
      tags: [],
      companyID: props.route.params.companyID,
      user: props.route.params.user
    };
    this.handleChange = this.handleChange.bind(this);
    this.tagCallback = this.tagCallback.bind(this);
    this.onSelectedItemsChange = this.onSelectedItemsChange.bind(this)
  }

  update(navigation) {
    if (this.state.tags.length >= 3) {
      const result = updateRequestBusiness(id=this.state.companyID, {tags: this.state.tags});
      if (result) {
        navigation.navigate("BusSignUp3", {companyID: this.state.companyID, user: this.state.user});
      }
    }else alert("Please select at least 3 tags!")
  }

  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems })
}

  handleChange(value) {
    this.setState({
      tag: value
    });
  }

  tagCallback(id, selected) {
    let prevSelected = this.state.tags;
    if (selected) {
      if (!prevSelected.includes(id)) {
        prevSelected.push(id);
      }
    } else {
      prevSelected = prevSelected.filter(item => item !== id);
    }
    this.setState({ tags: prevSelected });
    console.log(this.state);
  }

  render() {
    const { selectedItems } = this.state;

    Array.prototype.chunk = function(n) {
      if (!this.length) {
        return [];
      }
      return [this.slice(0, n)].concat(this.slice(n).chunk(n));
    };

    const { navigation } = this.props;
    const tagsItems = TagsData.map((item, index) => (
      <Tag key={index} item={item} i={3} callback={this.tagCallback} />
    ));

    return (
      <ScrollView
        style={styles.container2}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container1}>
          <View style={styles.container}>
          {navigation.canGoBack() && (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Image
                  source={require("../assets/leftArrow.png")}
                  style={{
                    height: 20,
                    width: 25,
                    resizeMode: "contain",
                    marginLeft: 20
                  }}
                />
              </TouchableOpacity>
            )}
            <View>
              <Text style={styles.h1}>Your business tags</Text>
              <Text style={styles.h2}>Categorise your business (3 minimum)</Text>
            </View>

            <View paddingTop={70}>
              <Text style={styles.h2}>Choose from the most popular</Text>
              <View style={styles.tagScrollContainer}>
                <ScrollView style={styles.tagScrollView} horizontal={true}>
                  <View >
                    <View style={styles.tags}>{tagsItems.chunk(4)[0]}</View>
                    <View style={styles.tags}>{tagsItems.chunk(4)[1]}</View>
                    <View style={styles.tags}>{tagsItems.chunk(4)[2]}</View>
                    <View style={styles.tags}>{tagsItems.chunk(4)[3]}</View>
                  </View>
                </ScrollView>
              </View>
            </View>

            <View paddingTop={20} alignSelf={'center'}>
                    <TouchableOpacity onPress={() => this.update(navigation)} underlayColor="white">
                        <WideButtonComponent
                            value={"STEP 2 OF 5"}
                            source={require("../assets/arrow-right-white.png")}
                            containerStyle={{
                            ...styles.btn
                            }}
                            textStyle={{ fontSize: 14, fontFamily: "poppins-light", color: 'lightgrey' }}
                        />
                    </TouchableOpacity>
                </View>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  h1: {
    fontFamily: "poppins-bold",
    color: "#323232",
    margin: "auto",
    textAlign: "left",
    fontSize: 26,
    paddingTop: 50,
    paddingHorizontal: 20
  },
  h2: {
    fontFamily: "poppins-regular",
    color: "#323232",
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
    backgroundColor: "#1A1A1A",
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  container: {
    flex: 1,
    backgroundColor: "#F0F0F1",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingBottom: 50
  },
  container1: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "#F0F0F1",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-between"
  },
  container2: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "#F0F0F1",
    alignContent: "center"
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center"
  },
  tagScrollContainer: {
    overflow: "hidden",
    maxHeight: 200 
  },
  tagScrollView: {
    paddingTop: 20
  }
});

export default BusSignUpScreen2;