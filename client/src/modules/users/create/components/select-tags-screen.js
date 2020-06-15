import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import BackButton from '../../../shared/icons/back-button/darkTheme'
import styles from '../../styles'
import WideButtonComponent from "../../../../components/WideButtonRight";
import TagPassions from "../../../../assets/TagsPassions";
import Tag from "../../../../components/Tag";

const updateRequest = require("../../../../assets/updateRequest").update;

var btnStyles = { ...styles.btn, ...styles.btnDisabled }

export default class selectTagsScreen extends Component {
  constructor() {
    super();
    this.state = {
      tags: []
    };
    this.tagCallback = this.tagCallback.bind(this);
    this.onSelectedItemsChange = this.onSelectedItemsChange.bind(this)
  }

  update(navigation) {
    if (this.state.tags.length >= 6) {
      const result = updateRequest({tags: this.state.tags});
      if (result) navigation.navigate("SignUp7");
    }else alert("Please select at least 6 passions!")
  }

  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems })
  }

  tagCallback(text, selected) {
    let prevSelected = this.state.tags;
    if (selected) {
      if (!prevSelected.includes(text)) {
        prevSelected.push(text);
      }
    } else {
      prevSelected = prevSelected.filter(item => item !== text);
    }
    this.setState({ tags: prevSelected });
  }

  isSubmitDisabled = () => {
    if(this.state.tags.length >= 6) {
      btnStyles = styles.btn
      return false;
    } else {
      btnStyles = { ...styles.btn, ...styles.btnDisabled }
      return true;
    }
  }

  render() {
    Array.prototype.chunk = function(n) {
      if (!this.length) {
        return [];
      }
      return [this.slice(0, n)].concat(this.slice(n).chunk(n));
    };

    const { navigation } = this.props;
    const tagsItems = TagPassions.map(item => (
      <Tag item={item} i={1} callback={this.tagCallback} />
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
              <Text style={{...styles.h1, ...styles.headerPadding}}>What are your passions?</Text>
              <Text style={{...styles.h2, ...styles.headerPadding}}>Choose your passion tags (6 minimum)</Text>
            </View>

            <View paddingTop={70}>
              <Text style={{...styles.h2, ...styles.headerPadding}}>Choose from the most popular</Text>
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

            <View paddingTop={20} alignSelf={"center"}>
              <TouchableOpacity
                onPress={() => this.update(navigation)}
                underlayColor="white"
                disabled={this.isSubmitDisabled()}
              >
                <WideButtonComponent
                  value={"STEP 5 OF 6"}
                  source={require("../../../../assets/arrow-right.png")}
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