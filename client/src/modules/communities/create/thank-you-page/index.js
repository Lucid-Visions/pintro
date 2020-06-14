import React from "react";
import { Text, View, TouchableOpacity} from "react-native";
import WideButton from "../../../../components/WideButton";
import WideButtonRight from "../../../../components/WideButtonRight";
import {
    title,
    subTitle,
    profileLinkText,
    inviteLinkText
} from './constants'

import styles from './styles'

const CreateCommunityThanks = ({ navigation, route: { params } }) => {
  return(
    <View style={styles.container}>
      <View style={styles.container}>
        <View>
          
        </View>
        <View >
          <Text style={styles.h1}>{title}</Text>
          <Text style={styles.h2}>{subTitle}</Text>
        </View>      
      
      <View paddingTop={20} alignSelf={'center'}>
          <TouchableOpacity
            onPress={() => navigation.navigate("CommunityProfile", params)}
            underlayColor="white"
          >
              <WideButtonRight
                  value={profileLinkText}
                  source={require("../../../../assets/arrow-right-white.png")}
                  containerStyle={{
                      ...styles.blackbtn
                  }}
                  textStyle={{ fontSize: 14, fontFamily: "poppins-light", color: 'white' }}
              />
        </TouchableOpacity>
        <TouchableOpacity underlayColor="white" style={{marginTop:5}}>
              <WideButton
                  value={inviteLinkText}
                  source={require("../../../../assets/linkedin_black.png")}
                  containerStyle={{
                      ...styles.whitebtn
                  }}
                  textStyle={{ fontSize: 14, fontFamily: "poppins-light", color: '#1A1A1A' }}
              />
        </TouchableOpacity>
      </View>
        
      </View>
    </View>
  )
}

export default CreateCommunityThanks
