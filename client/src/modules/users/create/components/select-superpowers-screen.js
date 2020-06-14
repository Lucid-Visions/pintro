import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import BackButton from '../../../shared/icons/back-button/darkTheme'
import styles from '../../styles'
import WideButtonComponent from "../../../../components/WideButton";
import TagsData from "../../../../assets/TagsData";
import Tag from "../../../../components/Tag";

const updateRequest = require("../../../../assets/updateRequest").update;

var btnStyles = { ...styles.btn, ...styles.btnDisabled }

class selectSuperpowersScreen extends Component {
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

  isSubmitDisabled = () => {
    if(this.state.skills.length >= 6) {
      btnStyles = styles.btn
      return false;
    } else {
      btnStyles = { ...styles.btn, ...styles.btnDisabled }
      return true;
    }
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
        <View style={styles.container1}>
          <View style={styles.container}>
            <View style={styles.headerPadding}>
              <BackButton navigation={navigation} />
            </View>
            <View>
              <Text style={{...styles.h1, ...styles.headerPadding}}>How can you help others?</Text>
              <Text style={{...styles.h2, ...styles.headerPadding}}>Choose your superpowers (6 minimum)</Text>
            </View>

            <View paddingTop={70}>
              <Text style={{...styles.h2, ...styles.headerPadding}}>Choose from the most popular</Text>
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
                disabled={this.isSubmitDisabled()}
              >
                <WideButtonComponent
                  value={"FINISH"}
                  containerStyle={btnStyles}
                  textStyle={{
                    fontSize: 14,
                    fontFamily: "poppins-light",
                    color: "#1A1A1A"
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default selectSuperpowersScreen;
