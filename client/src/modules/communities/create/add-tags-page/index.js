import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native'

import { createCommunity } from '../actions'
import BackButton from '../../../shared/icons/back-button/lightTheme'
import WideButtonRight from "../../../../components/WideButtonRight";
import TagsData from "../../../../assets/TagsData";
import Tag from "../../../../components/Tag";
import {
    title2,
    subtitle2,
    ctaText2,
    fieldTitle2
} from '../constants';
import useForm from '../hooks'

import styles from "./styles";

// TODO: https://lucidvisions.atlassian.net/browse/PIN-86 - Move this somewhere more generic
Array.prototype.chunk = function(n) {
  if (!this.length) {
    return [];
  }
  return [this.slice(0, n)].concat(this.slice(n).chunk(n));
};

const CreateCommunityAddTags = ({ navigation, route: { params } }) => {

    const [ fields, onChange ] = useForm({ ...params, tags: [] })

    const onTagChange = (tag, isChosen) => {
      tags = [ ...fields.tags ]

      if (isChosen) {
        tags.push(tag)
      } else {
        const i = tags.indexOf(tag)
        tags.splice(i, 1)
      }

      onChange('tags', tags)
    }

    const onCreateCommunity = async () => {
      const resp = await createCommunity(fields)

      if (!resp.ok) {
        alert(resp.data.error.message)
        return
      }

      navigation.navigate("CreateCommunityThanks", {id: resp.data.insertedId })
    }

    const isSubmitDisabled = () => {
      return !(fields.tags.length > 2)
    }

    let btnStyles = { ...styles.btn }

    if (isSubmitDisabled()) {
      btnStyles = { ...styles.btn, ...styles.btnDisabled }
    }

    const tagsItems = TagsData.map((item, index) => (
      <Tag key={index} item={item} i={3} callback={onTagChange} />
    ));

    return ( 
        <ScrollView>
          <View style={styles.container}>
            <BackButton navigation={navigation} />

            <View>
              <Text style={styles.h1}>{title2}</Text>
              <Text style={styles.h2}>{subtitle2}</Text>
            </View>

            <View paddingTop={70}>
              <Text style={styles.h2}>{fieldTitle2}</Text>
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
              <TouchableOpacity
                onPress={onCreateCommunity} underlayColor="white"
                disabled={isSubmitDisabled()}
                >
                  <WideButtonRight
                      value={ctaText2}
                      source={require("../../../../assets/arrow-right-white.png")}
                      containerStyle={btnStyles}
                      textStyle={{ fontSize: 14, fontFamily: "poppins-light", color: 'lightgrey' }}
                  />
              </TouchableOpacity>
            </View>
          </View>
      </ScrollView>
    )
}

export default CreateCommunityAddTags