import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { FollowMeButton } from "../components/ProfileActionButtons";
import { MessageMeButton } from "../components/ProfileActionButtons";
import { ExtrasButton } from "../components/ProfileActionButtons";
import ActionButtonComponent from "../components/ActionButton";
import Tag from "../components/Tag";
import LatestPostComponent from "../components/LatestPostButton";
import FollowersComponent from "../components/Followers";
import TeamComponent from "../components/Team";
import CompanyStatusComponent from "../components/CompanyStatus";
import OurJourney from "../components/OurJourney";

/**
 * Main screen of the Profile tab.
 */

const CompanyScreen = ({
    companyID,
    tags,
    name,
    tagline,
    bio,
    seekingInvestment,
    currentlyHiring,
    dateFounded,
    location,
    companySize,
    funding,
    team,
    navigation,
    source,
    route
  }) => {

  // Set whether the 'My Story' text is expanded.
  const [textExpanded, setTextExpanded] = useState(false);

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

  let companyTags = tags.map((tag, i) => (
    <Tag
      key={i}
      item={{ text: tag.toUpperCase(), disabled: true }}
      i={5}
    />
  ));

        return (
          <SafeAreaView>
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{backgroundColor:"#F5F5F5"}}>
                <View style={{flexDirection: "column"}}>
                    <View>
                        <Image
                            source={source || require("../assets/Empty-profile-picture-semi.png")}
                            style={{resizeMode: "cover", width:"100%"}}
                        />
                    </View>
                    <View style={styles.container} >
                        <View style={styles.myStory}>
                            <Text style={{ fontFamily:'poppins-regular', color: 'grey' }}>{tagline}</Text>
                            <Text style={styles.companyName}>{name}</Text>
                        </View>
                        <View style={styles.buttons}>
                            <FollowMeButton onPress={()=>{}} text={"FOLLOW US"}/>
                            <MessageMeButton onPress={()=>{}} text={"MESSAGE US"}/>
                            <ExtrasButton />
                        </View>
                        <View paddingBottom={10}>
                          <CompanyStatusComponent seekingInvestment={seekingInvestment} currentlyHiring={currentlyHiring}/>
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
                                    {bio} 
                                </Text>
                                <TouchableOpacity onPress={() => expandText()}>
                                    <Text style={{ color: "orange", marginBottom: 8, marginTop: 3 }}>
                                        {textExpanded ? "Less" : "More"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                          {getCompanyTags(companyTags)}
                        </View>
                        <ScrollView style={styles.actionButtons} horizontal={true} paddingTop={10}>
                            <ActionButtonComponent type="help" context="Business modelling" />
                            <ActionButtonComponent type="introduce" context="Business modelling" />
                            <ActionButtonComponent type="talk" context="Business modelling" />
                        </ScrollView>
                        <View paddingVertical={10}>
                          <OurJourney
                            dateFounded={dateFounded}
                            location={location}
                            companySize={companySize}
                            funding={funding}
                          />
                        </View>
                        <View paddingBottom={10}>
                          <TeamComponent team={team} navigation={navigation}/>
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
          </SafeAreaView>
        );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      marginBottom: 30,
      borderRadius: 20 / 2,
      backgroundColor: "#F5F5F5",
      marginTop: -50,
      padding: 20
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      margin: "5%"
    },
    experienceContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center"
    },
    companyName: {
        fontFamily: 'poppins-bold', 
        fontSize: 24,
        marginBottom: 15,
        marginTop: 1
    },
    myStory: {
      marginRight: 25,
      marginTop: 5
    },
    myStoryContainer: {
      alignSelf: 'stretch',
      paddingBottom: 10
    },
    subTextExperience: { 
        fontFamily: "poppins-medium", 
        color: "#757575" 
    },
    experienceCircle: {
      height: 7,
      width: 7,
      backgroundColor: "#F3A33F",
      borderRadius: 25,
      marginRight: 20,
      position: "absolute",
      left: -20,
      top: 7
    },
    indentOne: {
      marginLeft: 20
    },
    headerText: {
      marginTop: "5%",
      marginLeft: "5%",
      flexDirection: "column",
      justifyContent: "center",
      flexShrink: 1
    },
    buttonContainer: {
      flexDirection: "column",
      alignContent: "center"
    },
    buttons: {
      flexDirection: "row",
      marginBottom: "5%"
    },
    actionButtons: {
      flexDirection: "row",
      minHeight: 120,
      margin: 0,
      padding: 0
    },
    experience: {
      flexDirection: "row"
    },
    recommendationsSection: {
      flexDirection: "column",
      flexWrap: "wrap",
      marginTop: 10
    },
    tags: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center"
    },
    tagScrollContainer: {
      height: 90,
      overflow: "hidden"
    },
    outline: {
      justifyContent: 'center',
      flexDirection: 'column',
      marginLeft: 0,
      padding: 2,
    },
    text: {
        fontSize: 9,
        marginLeft: 6, 
        marginTop: "4%", 
        fontFamily: "poppins-semi-bold", 
    },
    selectedText: {
        color: 'orange',
        marginLeft: 6, 
        marginTop: "4%", 
        fontFamily: "poppins-semi-bold", 
        fontSize: 9
    }
  });

  export default CompanyScreen;
