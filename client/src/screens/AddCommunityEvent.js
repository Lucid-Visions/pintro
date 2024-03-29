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
  let editMode = route.params.editMode || false;
  let editData = route.params.data;

  const [state, updateState] = useState({
    id: editMode ? editData.id : route.params.id,
    title: editMode ? editData.title : "",
    link: editMode ? editData.resource : "",
    date: editMode ? editData.date : "",
    dateSort: editMode ? editData.dateSort : "",
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
    state.date = moment(date).format('Do MMMM YYYY')
    state.dateSort = moment(date).format('L')
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };
 
  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirmTime = (time) => {
    state.time = moment(time).format('LT')
    hideTimePicker();
  };

  const constructEvent = () => {
    return {
      id: state.id,
      title: state.title,
      resource: state.link,
      location: state.location,
      date: state.date,
      dateSort: state.dateSort,
      time: state.time
    };
  };

  /**
   * Check if fields are not empty
   */
  const checkFieldsEmpty = () => {
    const titleEmpty = state.title === "";
    const linkEmpty = state.link === "";
    const locationEmpty = state.location === "";
    const dateEmpty = state.date === "";
    const timeEmpty = state.time === "";

    if (titleEmpty || linkEmpty || locationEmpty || dateEmpty || timeEmpty) {
      return true;
    } else return false;
  };

  /**
   * checks if the update was successful and redirects to the Profile page
   */
  const updateCallBack = async () => {
    const event = constructEvent();

    callback(event);
    navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <BackButton navigation={navigation} />
        {!editMode ? 
          <Text style={styles.header}>Add an upcoming event</Text> 
          :
          <Text style={styles.header}>Edit event</Text>
        }
        {/* Title */}
        <View>
          <Text style={{...styles.categoryHeader, paddingTop: 30}}>Event Name</Text>
          <TextInput
            style={styles.placeholder}
            placeholderTextColor={"grey"}
            placeholder={"Insert name here"}
            defaultValue={state.title}
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
            placeholder={"Add eventbrite link"}
            defaultValue={state.link}
            onChangeText={(input) => setState({ link: input })}
          />
        </View>
        {/* Location */}
        <View>
          <Text style={styles.categoryHeader}>Event Location</Text>
          <TextInput
            style={styles.placeholder}
            placeholderTextColor={"grey"}
            placeholder={"Insert location here"}
            defaultValue={state.location}
            onChangeText={(locationInput) => setState({ location: locationInput })}
          />
        </View>
        <View>
          <Text style={styles.categoryHeader}>Event Date</Text>
          <TouchableOpacity onPress={showDatePicker}>
            <Text style={{...styles.placeholder, color: "black"}}>{state.date ? state.date : "Select Event Date"}</Text>
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
            <Text style={{...styles.placeholder, color: "black"}}>{state.time ? state.time : "Select Event Time"}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleConfirmTime}
            onCancel={hideTimePicker}
          />
        </View>
        <TouchableOpacity onPress={() => updateCallBack()} disabled={checkFieldsEmpty()}>
          <PostButton
            containerStyle={checkFieldsEmpty() ? {...styles.submitBtn, ...styles.btnDisabled} : styles.submitBtn}
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
    paddingTop: Constants.statusBarHeight +20,
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
  btnDisabled : {
    opacity: 0.4
  }
});

export default AddCommunityEvent;
