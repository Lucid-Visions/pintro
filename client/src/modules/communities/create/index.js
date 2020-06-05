import React, { useReducer } from 'react';
import { ScrollView, SafeAreaView, Text, View, TextInput, TouchableOpacity } from "react-native"
import PropTypes from 'prop-types';

import WideButtonComponent from "../../../components/WideButtonRight";

import BackButton from '../../shared/back-button';

import {
  initialState,
  title,
  subTitle,
  nameLabel,
  namePlaceholder,
  storyLabel,
  storyPlaceholder,
  urlLabel,
  urlPlaceholder,
  ctaText
} from './constants';

import styles from './styles';

const reducer = (state, { field, value}) => {
  return {
    ...state,
    [field]: value
  }
};

const CreateCommunity = ({ navigation }) => {

  const [ state, dispatch ] = useReducer(reducer, initialState)
  
  const onChange = (field, value) => {
    dispatch({ field, value })
  };

  const { name, story, url } = state;

  return (
    <ScrollView>
      <SafeAreaView>
        <View style={styles.container}>
          
          <BackButton navigation={navigation} />
          
          <View>
            <Text style={styles.h1}>{title}</Text>
            <Text style={styles.h2}>{subTitle}</Text>
          </View>

          <View style={styles.bottomBorder}>
            <Text style={styles.prompt}>{nameLabel}</Text>
              <TextInput
                  style={styles.placeholder}
                  placeholder={namePlaceholder}
                  onChangeText={text => onChange('name', text)}
                  value={name}
              />
          </View>
  
          <View style={styles.bottomBorder}>
            <Text style={styles.prompt}>{storyLabel}</Text>
            <TextInput
                style={{...styles.placeholder,height:100}}
                multiline={true}
                placeholder={storyPlaceholder}
                onChangeText={text => onChange('story', text)}
                value={story}
            />
          </View>

          <View style={styles.bottomBorder}>
            <Text style={styles.prompt}>{urlLabel}</Text>
              <TextInput
                  style={styles.placeholder}
                  placeholder={urlPlaceholder}
                  onChangeText={text => onChange('url', text)}
                  value={url}
              />
          </View>
  
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('CreateCommunityPage2', { name, story, url })}>
                <WideButtonComponent
                    value={ctaText}
                    source={require("../../../assets/arrow-right-white.png")}
                    containerStyle={{
                    ...styles.btn
                    }}
                    textStyle={styles.btnText}
                />
            </TouchableOpacity>
          </View>

        </View>
      </SafeAreaView>
    </ScrollView>
  )
};

CreateCommunity.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default CreateCommunity;