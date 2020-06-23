import React from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";

import useForm from '../../../shared/hooks/use-form'
import BackButton from "../../../shared/icons/back-button/lightTheme";
import styles from "../styles";

import WideButton from "../../../../components/WideButton";

const updateRequest = require("../../../../assets/updateRequest").update;

const EditStory = ({ navigation, route: { params } }) => {

  const initialFields = {
    name: params.name || '',
    role: params.experience.currentJobTitle || '',
    company: params.experience.currentCompany || '',
    bio: params.bio || '',
  }

  const [ fields, onChange ] = useForm(initialFields)

  const isSubmitDisabled = () => {
    return Object.values(fields).some(f => f.length < 1)
  }

  const submit = async () => {

    await updateRequest({
      name: fields.name,
      "experience.currentJobTitle": fields.role,
      "experience.currentCompany": fields.company,
      bio: fields.bio
    });

    navigation.navigate('Profile')
  }

  let btnStyles = { ...styles.submitBtn }
  if (isSubmitDisabled()) {
    btnStyles = { ...styles.submitBtn, ...styles.btnDisabled }
  }

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS == "ios" ? "padding" : "height"}>
      <ScrollView>
        <View style={styles.container}>
          <BackButton navigation={navigation} />
          <Text style={styles.header}>Edit your story</Text>
          <Text style={styles.headerText}>Build your profile</Text>
          <View>
            <Text style={styles.categoryHeader}>Name</Text>
            <TextInput
              style={styles.placeholder}
              placeholderTextColor={"grey"}
              placeholder="Enter your full name..."
              defaultValue={fields.name}
              onChangeText={text => onChange('name', text)}
            />
          </View>
          <View>
            <Text style={styles.categoryHeader}>Current job title</Text>
            <TextInput
              style={styles.placeholder}
              placeholderTextColor={"grey"}
              placeholder="Enter your current position"
              defaultValue={fields.role}
              onChangeText={text => onChange('role', text)}
            />
          </View>
          <View>
            <Text style={styles.categoryHeader}>Current company</Text>
            <TextInput
              style={styles.placeholder}
              placeholderTextColor={"grey"}
              placeholder="Enter your current company..."
              defaultValue={fields.company}
              onChangeText={text => onChange('company', text)}
            />
          </View>
          <View>
            <Text style={styles.categoryHeader}>Your Story</Text>
            <TextInput
              style={styles.placeholder}
              placeholderTextColor={"grey"}
              placeholder="Enter your story..."
              defaultValue={fields.bio}
              multiline={true}
              scrollEnabled={false}
              onChangeText={text => onChange('bio', text)}
              multiline={true}
            />
          </View>
          <TouchableOpacity onPress={submit} disabled={isSubmitDisabled()}>
            <WideButton
              containerStyle={btnStyles}
              textStyle={{ color: "white" }}
              value="Done"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditStory;
