import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

import Card from '../../../shared/card'
import ImageCard from '../../../shared/image-card'
import EditButton from '../../../shared/edit-button'

import { FollowMeButton } from "../../../../components/ProfileActionButtons";
import { MessageMeButton } from "../../../../components/ProfileActionButtons";
import { ExtrasButton } from "../../../../components/ProfileActionButtons";
import LatestPostComponent from "../../../../components/LatestPostButton";
import RecommendationButton from "../../../../components/RecommendationButton";

import styles from './styles'

const CommunityProfileScreen = ({ navigation, route: {params} }) => {

  let recommendationsButtons = params.recommendations && params.recommendations.map((item, i) => {
    return (
      <RecommendationButton
        key={i}
        title={item.title}
        resource={item.resource}
        thumbnail={item.photo}
      />
    );
  });


  // Set whether the 'My Story' text is expanded.
  const [ textExpanded, setTextExpanded ] = useState(false);
  

  /**
   * Expand the 'My story' text on press of the 'More' button.
   */
  const expandText = () => {
    setTextExpanded(prevState => { return !prevState });
  };

  const profilePicture = (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate("SettingsStack", {screen: 'Edit Community Photo', params})}>
        <Image
          source={params.profile_picture ? {uri: params.profile_picture} : require("../../../../assets/Empty-profile-picture-semi.png")}
          style={params.profile_picture ? {
            alignSelf: 'stretch',
            height: 300,
            overflow: "hidden"} 
            : 
            {resizeMode: "cover", width:"100%"}}
        />
      </TouchableOpacity>
    </View>
  )

  const members = (
    <View>
      <View style={styles.editRow}>
        <Text style={{ fontFamily: "poppins-semi-bold", marginTop: "2%" }}>
          Members
        </Text>
        <EditButton />
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', marginTop: 20 }}>
        {params.members.map(member => (
          <TouchableOpacity onPress={() => { navigation.navigate('Home'); navigation.navigate("Profile", { uid: member._id }) }} >
            <Image
              style={{ height: 50, width: 50, borderRadius: 25, marginRight: 7 }}
              source={member.profile_picture ? { uri: member.profile_picture } : require("../../../../assets/empty-profile-picture.png")}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )

  const communityAdmins = (
    <View>
      <Text style={{ fontFamily: "poppins-semi-bold", marginTop: 30 }}>
        Community Admins
      </Text>
      {params.admins.slice(0, 2).map(admin => (
        <View style={{ marginTop: 10 }} >
          <ImageCard
            title={admin.name}
            subtitle={`${admin.experience.currentJobTitle} @ ${admin.experience.currentCompany}`}
            imgSrc={{ uri: admin.profile_picture }}
            onPress={() => navigation.navigate("Profile", { uid: admin._id })}
            />
        </View>
      ))}
    </View>
  )

  const articles = params.recommendations && (
    <View style={styles.recommendationsSection}>
      <View style={styles.editRow}>
        <Text
          style={{
            marginVertical: "5%",
            fontFamily: "poppins-bold",
            height: 30,
          }}
        >
          Articles
        </Text>
        <EditButton 
          navigation={navigation}
          screen="SettingsStack"
          params={{screen: "Edit Community Articles", params}}
        />
      </View>

      <View>
        <ScrollView
          style={{ height: 145, marginTop: -25 }}
          horizontal={true}
        >
          <View style={styles.articles}>
            {recommendationsButtons}
          </View>
        </ScrollView>
      </View>
    </View>
  )

  return (
    <View style={{paddingBottom: 120}}>
      <TouchableOpacity
                onPress={() => navigation.navigate("SettingsStack", {screen: "Edit Community", params })}
                style={{ zIndex: 99, width: "100%", height: 30, marginTop: 20 }}
      ><Image
      source={require("../../../../assets/settings.png")}
      style={{
        width: 30,
        height: 30,
        position: "absolute",
        right: 20
      }}
    /></TouchableOpacity>
      <View>
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={{backgroundColor:"#F5F5F5"}}>
          <View style={{flexDirection: "column"}}>
          {profilePicture}
          <View style={styles.container} >
            <View style={styles.myStory}>
              <View style={styles.editRow}>
                <Text style={{ fontFamily:'poppins-regular', color: 'grey' }}>{params.url}</Text>
                <View style={{paddingLeft:310}}>
                  <EditButton
                    navigation={navigation}
                    screen="SettingsStack"
                    params={{screen: "Edit Community Info", params}}
                  />
                </View>
              </View>
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
            {members}
            {communityAdmins}
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
            <View style={{ ...styles.editRow, marginTop: 20 }}>
              <Text style={{ fontFamily: "poppins-semi-bold" }}>
                Upcoming Events
              </Text>
              <EditButton />
              </View>

              <View style={{ marginTop: 10 }}>
                {[
                  { name: 'Meet & Greet', location: 'The Hub (LDN)', date: '28th February', time: '6pm'},
                  { name: 'Dev Conference', location: 'The Hub (LDN)', date: '5th March', time: '11am'}
                ].map(e => (
                  <Card
                    key={e.name}
                    title={e.name}
                    rightComponent={
                      <View>
                        <Text style={{ fontFamily: "poppins-semi-bold", fontSize: 10 }}>{e.location}</Text>
                        <Text style={{ fontSize: 10 }}>{`${e.date} @ ${e.time}`}</Text>
                      </View>
                    }
                  />
                ))}
              </View>
              {articles}
          </View>
        </View>
        </ScrollView>
      </View>
    </View>
  )
}

export default CommunityProfileScreen