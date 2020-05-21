import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image
} from "react-native";
import WideButton from "../components/WideButtonRight";
import TagsData from "../assets/TagsData";
import Tag from "../components/Tag";
import { useNavigation } from '@react-navigation/native';

const updateRequest = require("../assets/updateRequest").update;

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
    <ScrollView style={styles.container2} showsVerticalScrollIndicator={false}>
      <SafeAreaView style={styles.container1}>
        <View style={styles.container}>
          {navigation.canGoBack() && (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{ marginTop: 20 }}
            >
              <Image
                source={require("../assets/leftArrow.png")}
                style={{
                  height: 20,
                  width: 25,
                  resizeMode: "contain",
                  alignSelf: "flex-start",
                  marginHorizontal: 20
                }}
              />
            </TouchableOpacity>
          )}
          <View>
              <Text style={styles.title}>How can you help others?</Text>
              <Text style={styles.subTitle}>Choose your superpowers (6 minimum)</Text>
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

            <View>
              <Text style={styles.subTitle}>Or choose from the most popular</Text>
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
                    ...styles.btn
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
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "poppins-bold",
    color: "black",
    margin: "auto",
    textAlign: "left",
    fontSize: 26,
    padding: 20,
    paddingTop: 50
  },
  subTitle: {
    fontFamily: "poppins-regular",
    color: "black",
    margin: "auto",
    alignItems: "baseline",
    fontSize: 12,
    padding: 20
  },
  btn: {
    fontFamily: "poppins-medium",
    width: 350,
    marginTop: 30,
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  container2: {
    flex: 1,
    alignContent: "center"
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center"
  },
  tagScrollContainer: {
    overflow: "hidden"
  },
});

export default EditPassions;
