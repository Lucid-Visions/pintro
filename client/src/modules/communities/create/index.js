import React from 'react';
import { ScrollView, Text, View, TextInput, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import WideButtonComponent from "../../../components/WideButtonRight";
import BackButton from '../../shared/back-button';

import {
  initialState,
  title1,
  subTitle1,
  nameLabel1,
  namePlaceholder1,
  storyLabel1,
  storyPlaceholder1,
  urlLabel1,
  urlPlaceholder1,
  ctaText1,
  nameRegex
} from './constants';
import  useForm from './hooks'

import styles from './styles';

const CreateCommunity = ({ navigation }) => {

  const [ fields, onChange ] = useForm(initialState)

  const { name, story, url } = fields;

  const isSubmitDisabled = () => {
    return !(name.length > 0 && story.length > 0 && isNameValid())
  }

  const isNameValid = () => {
    return true
  }

  let btnStyles = styles.btn

  if (isSubmitDisabled()) {
    btnStyles = { ...styles.btn, ...styles.btnDisabled }
  }

  let nameFieldStyles = styles.bottomBorder

  if (!isNameValid()) {
    nameFieldStyles = { ...styles.bottomBorder, ...styles.bottomBorderError }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        
        <BackButton navigation={navigation} />
        
        <View>
          <Text style={styles.h1}>{title1}</Text>
          <Text style={styles.h2}>{subTitle1}</Text>
        </View>

        <View style={nameFieldStyles}>
          <Text style={styles.prompt}>{nameLabel1}</Text>
            <TextInput
                style={styles.placeholder}
                placeholder={namePlaceholder1}
                onChangeText={text => onChange('name', text)}
                value={name}
            />
        </View>

        <View style={styles.bottomBorder}>
          <Text style={styles.prompt}>{storyLabel1}</Text>
          <TextInput
              style={{...styles.placeholder,height:100}}
              multiline={true}
              placeholder={storyPlaceholder1}
              onChangeText={text => onChange('story', text)}
              value={story}
          />
        </View>

        <View style={styles.bottomBorder}>
          <Text style={styles.prompt}>{urlLabel1}</Text>
            <TextInput
                style={styles.placeholder}
                placeholder={urlPlaceholder1}
                onChangeText={text => onChange('url', text)}
                value={url}
            />
        </View>

        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('CreateCommunityAddTags', fields)}
            disabled={isSubmitDisabled()}
          >
              <WideButtonComponent
                  value={ctaText1}
                  source={require("../../../assets/arrow-right-white.png")}
                  containerStyle={btnStyles}
                  textStyle={styles.btnText}
              />
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  )
};

CreateCommunity.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default CreateCommunity;