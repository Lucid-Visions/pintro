import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

import ImageCard from '../../../shared/image-card'

import { FollowMeButton } from "../../../../components/ProfileActionButtons";
import { MessageMeButton } from "../../../../components/ProfileActionButtons";
import { ExtrasButton } from "../../../../components/ProfileActionButtons";
import LatestPostComponent from "../../../../components/LatestPostButton";
import FollowersComponent from "../../../../components/Followers";
import Tag from "../../../../components/Tag";

import { getUser } from '../../../users/profile/actions'

import styles from './styles'

const CommunityProfileScreen = ({ navigation, route: {params} }) => {

  // Set whether the 'My Story' text is expanded.
  const [ textExpanded, setTextExpanded ] = useState(false);
  
  const [ admin, setAdmin ] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const user = await getUser(params.admins[0])
      setAdmin(user)
    }

    fetchData()
  }, [])

  /**
   * Expand the 'My story' text on press of the 'More' button.
   */
  const expandText = () => {
    setTextExpanded(prevState => { return !prevState });
  };

  const getCompanyTags = companyTags => {
    if (companyTags.length == 0) {
      return null;
    }
    return (  
      <View>
        <View style={styles.tagScrollContainer}>
          <ScrollView style={styles.tagScrollView} horizontal={true}>
            <View>
              <View style={{ ...styles.tags }}>
                {companyTags.slice(
                  0,
                  Math.trunc(companyTags.length / 2)
                )}
              </View>
              <View style={{ ...styles.tags }}>
                {companyTags.slice(Math.trunc(companyTags.length / 2))}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  };



  let companyTags = params.tags.map((tag, i) => (
    <Tag
      key={i}
      item={{ text: tag.toUpperCase(), disabled: true }}
      i={5}
    />
  ));

  const communityAdmins = admin && (
    <View>
      <Text style={{ fontFamily: "poppins-semi-bold", marginTop: "2%" }}>
        Community Admins
      </Text>
      <View style={{ marginTop: 10 }} >
        <ImageCard title={admin.name} subtitle={`${admin.experience.currentJobTitle} @ ${admin.experience.currentCompany}`} />
      </View>
    </View>
  )

  return (
    <View>
      <TouchableOpacity
                onPress={() => navigation.navigate("SettingsStack", {screen: "Edit Community", params })}
                style={{ zIndex: 99, width: "100%", height: 30, marginTop: 20 }}
      ></TouchableOpacity>
      <View>
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={{backgroundColor:"#F5F5F5"}}>
          <View style={{flexDirection: "column"}}>
        <View>
            <Image
                source={require("../../../../assets/Empty-profile-picture-semi.png")}
                style={{resizeMode: "cover", width:"100%"}}
            />
        </View>
          <View style={styles.container} >
            <View style={styles.myStory}>
                <Text style={{ fontFamily:'poppins-regular', color: 'grey' }}>{params.url}</Text>
                <Text style={styles.companyName}>{params.name}</Text>
            </View>
            <View style={styles.buttons}>
                <FollowMeButton onPress={()=>{}} text={"FOLLOW US"}/>
                <MessageMeButton onPress={()=>{}} text={"MESSAGE US"}/>
                <ExtrasButton />
            </View>
            <View style={styles.myStoryContainer}>
                <View style={styles.myStory}>
                    <Text style={{ fontFamily: "poppins-semi-bold", marginTop: "2%" }}>
                        Our Story
                    </Text>
                    <Text
                        style={{ fontFamily: "poppins-semi-bold", color: "grey" }}
                        numberOfLines={textExpanded ? 0 : 4}
                    >
                        {params.story} 
                    </Text>
                    <TouchableOpacity onPress={() => expandText()}>
                        <Text style={{ color: "orange", marginBottom: 8, marginTop: 3 }}>
                            {textExpanded ? "Less" : "More"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            {communityAdmins}
            <View style={{ marginTop: 10 }} >
              {getCompanyTags(companyTags)}
            </View>
            <View style={{flexDirection: "row" }}>
                <Text style={{ marginTop: "6%", fontFamily: "poppins-semi-bold", marginBottom: 8, marginLeft: 2 }}>
                    Latest Posts
                </Text>
                <TouchableOpacity>
                    <Text style={{ marginTop: "9%", fontFamily: "poppins-semi-bold", marginBottom: 8, marginLeft: 178, fontSize: 10, color: "#A9A9A9" }}>
                        See all posts
                    </Text>
                </TouchableOpacity>
            </View> 
            <LatestPostComponent post={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."} likes={"3"} comments={"5"} /> 
            <View paddingTop={10}>
              <FollowersComponent /> 
            </View>
          </View>
        </View>
        </ScrollView>
      </View>
    </View>
  )
}

export default CommunityProfileScreen