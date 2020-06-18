import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  Button
} from "react-native";
import Constants from "expo-constants";
import PostButton from "../components/WideButtonRight";
import MultiSelect from "react-native-multiple-select";
import TagsPassions from "../assets/TagsPassions";
import BackButton from "../modules/shared/icons/back-button/lightTheme";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import moment from "moment";

import { useNavigation } from "@react-navigation/native";

const AddCommunityEvent = ({ route }) => {
  const navigation = useNavigation();
  const callback = route.params.update;
  const editMode = route.params.editMode || false;
  let editData;

  const [state, updateState] = useState({
    id: editMode ? editData.id : route.params.id,
    title: editMode ? editData.title : "",
    link: editMode ? editData.resource : "",
    date: editMode ? editData.date : "",
    time: editMode ? editData.time : "",
    location: editMode ? editData.location : ""
  });

  const setState = (newState) => {
    updateState((prevState) => {
      return { ...prevState, ...newState };
    });
  };

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
 
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    state.date = moment(date).format('dddd Do MMMM YYYY')
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };
 
  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirmTime = (time) => {
    hideTimePicker();
    state.time = moment(time).format('HH:mm')
  };

  if (editMode) editData = route.params.data;

  const constructRecommendation = () => {
    return {
      id: state.id,
      title: state.title,
      resource: state.link,
      location: state.location,
      date: state.date,
      time: state.time
    };
  };

  /**
   * Check if fields are not empty
   */
  const checkFieldsEmpty = () => {
    const titleEmpty = state.title === "";
    const linkEmpty = state.link === "";

    if (titleEmpty || linkEmpty) {
      return true;
    } else return false;
  };

  /**
   * checks if the update was successful and redirects to the Profile page
   */
  const updateCallBack = async () => {
    const fieldsEmpty = checkFieldsEmpty();

    if (fieldsEmpty) {
      alert("Please don't leave required fields empty!");
    } else {
      const recommendation = constructRecommendation();

      callback(recommendation);
      navigation.goBack();
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <BackButton navigation={navigation} />
        <Text style={styles.header}>Add an upcoming event</Text>
        {/* Title */}
        <View>
          <Text style={{...styles.categoryHeader, paddingTop: 30}}>Event Name</Text>
          <TextInput
            style={styles.placeholder}
            placeholderTextColor={"grey"}
            placeholder={editMode ? state.title : "Insert name here"}
            onChangeText={(nameInput) => setState({ title: nameInput })}
          />
        </View>
        {/* Link */}
        <View>
          <Text style={styles.categoryHeader}>
            Eventbrite Link{" "}
            <Text style={{ fontStyle: "italic" }}>
              (full https URL required)
            </Text>{" "}
          </Text>
          <TextInput
            style={styles.placeholder}
            placeholderTextColor={"grey"}
            placeholder={
              editMode ? state.link : "Add external eventbrite link"
            }
            onChangeText={(input) => setState({ link: input })}
          />
        </View>
        {/* Location */}
        <View>
          <Text style={styles.categoryHeader}>Event Location</Text>
          <TextInput
            style={styles.placeholder}
            placeholderTextColor={"grey"}
            placeholder={editMode ? state.location : "Insert location here"}
            onChangeText={(locationInput) => setState({ location: locationInput })}
          />
        </View>
        <View>
          <Text style={styles.categoryHeader}>Event Date</Text>
          <TouchableOpacity onPress={showDatePicker}>
            <Text style={{...styles.placeholder, color: "gray"}}>{state.date ? state.date : "Select Event Date"}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
        <View>
          <Text style={styles.categoryHeader}>Event Time</Text>
          <TouchableOpacity onPress={showTimePicker}>
            <Text style={{...styles.placeholder, color: "gray"}}>{state.time ? state.time : "Select Event Time"}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleConfirmTime}
            onCancel={hideTimePicker}
          />
        </View>
        <TouchableOpacity onPress={() => updateCallBack()}>
          <PostButton
            containerStyle={styles.submitBtn}
            textStyle={{ color: "white" }}
            value="Done"
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    marginHorizontal: 20,
  },
  header: {
    fontFamily: "poppins-bold",
    margin: "auto",
    textAlign: "left",
    alignItems: "baseline",
    fontSize: 24,
    paddingTop: 50,
  },
  headerText: {
    fontFamily: "poppins-regular",
    margin: "auto",
    textAlign: "left",
    alignItems: "baseline",
    fontSize: 12,
    paddingTop: 20,
    paddingBottom: 30,
  },
  categoryHeader: {
    fontFamily: "poppins-regular",
    margin: "auto",
    textAlign: "left",
    alignItems: "baseline",
    fontSize: 12,
    paddingBottom: 5,
  },
  placeholder: {
    fontFamily: "poppins-regular",
    borderBottomWidth: 0.2,
    margin: "auto",
    alignItems: "stretch",
    fontSize: 13,
    marginBottom: 50,
    paddingVertical: 15,
  },
  submitBtn: {
    backgroundColor: "black",
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "black",
    color: "black",
    width: 300,
    marginVertical: 30,
  },
});

export default AddCommunityEvent;
