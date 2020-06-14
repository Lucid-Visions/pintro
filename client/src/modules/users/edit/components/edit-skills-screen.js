import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import styles from "../styles";
import WideButton from "../../../../components/WideButtonRight";
import TagsData from "../../../../assets/TagsData";
import Tag from "../../../../components/Tag";
import { useNavigation } from '@react-navigation/native';
import BackButton from "../../../shared/icons/back-button/lightTheme";

const updateRequest = require("../../../../assets/updateRequest").update;

const EditPassions = ({ route }) => {
  const navigation = useNavigation();
  const user = route.params;

  const [state, updateState] = useState({
    selectedSkills: user.skills || []
  });

  const setState = newState => {
    updateState(prevState => {
      return { ...prevState, ...newState };
    });
  };

  /**
   * checks if the update was successful and redirects to the Profile page
   */
  const update = () => {
    if (state.selectedSkills.length >= 6) {
      const result = updateRequest({ skills: state.selectedSkills });
      navigation.navigate("Profile");
    } else alert("Please select at least 6 superpowers!");
  };

  const tagCallback = (text, selected) => {
    let prevSelected = state.selectedSkills;
    if (selected) {
      if (!prevSelected.includes(text)) {
        prevSelected.push(text);
      }
    } else {
      prevSelected = prevSelected.filter(item => item !== text);
    }
    setState({ selectedSkills: prevSelected });
  };

  Array.prototype.chunk = function(n) {
    if (!this.length) {
      return [];
    }
    return [this.slice(0, n)].concat(this.slice(n).chunk(n));
  };

  const tagsItems = TagsData.map((item, index) => {
      if(state.selectedSkills.includes(item.text)){
          item.chosen = true
        return (<Tag key={index} item={item} i={4} callback={tagCallback} />)
      }else {
          item.chosen = false
          return (<Tag key={index} item={item} i={4} callback={tagCallback} />)
      }
  });

  return (
    <ScrollView>
      <View style={styles.container}>
        <BackButton navigation={navigation} />
        <View>
            <Text style={styles.header}>How can you help others?</Text>
            <Text style={styles.headerText}>Choose your superpowers (6 minimum)</Text>
          </View>
          <View
            style={{
              width: 350,
              borderBottomColor: "grey",
              borderBottomWidth: 1,
              alignSelf: "flex-start",
              marginHorizontal: 20
            }}
          >
          </View>

          <View style={{paddingTop: 50}}>
            <Text style={styles.headerText}>Or choose from the most popular</Text>
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
              onPress={() => update()}
              underlayColor="white"
            >
              <WideButton
                value={"DONE"}
                containerStyle={{
                  ...styles.submitBtn
                }}
                textStyle={{
                  fontSize: 12,
                  fontFamily: "poppins-medium",
                  color: "white"
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
    </ScrollView>
  );
};

export default EditPassions;
