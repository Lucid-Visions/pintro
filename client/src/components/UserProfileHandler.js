import React, { Component } from "react";
import ProfileScreen from "../modules/users/profile/index";
import env from "../env";
import {
  AsyncStorage,
  Text,
  View,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Image
} from "react-native";
import EmptyState from "./EmptyState";
import { TouchableOpacity } from "react-native-gesture-handler";
class UserProfileHandler extends Component {
  constructor(props) {
    let tempUid = props.uid;
    if (props.route.params && props.route.params.uid) {
      tempUid = props.route.params.uid;
    }
    super(props);
    this.state = {
      networkErr: "loading",
      uid: tempUid,
      username: "",
      interests: [],
      skills: [],
      bio: "",
      description: "",
      company: "",
      badges: [],
      recommendations: [],
      actions: [],
      name: "",
      previousCompanies: [],
      previousEducation: [],
      industry: "",
      refreshing: false,
      years: 0,
      mood: -1,
      relationshipData: null,
      profile_picture: "",
      academic_level: "",
      currentJobTitle: "",
      currentCompany: "",
      experience: {}
    };
  }

  componentDidMount() {
    this.fetchUserData();
  }

  async fetchUserData() {
    var myHeaders = new Headers();
    var userToken = await AsyncStorage.getItem("token");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", userToken);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    var response = await fetch(
      `http://${env.host}:${env.port}/api/v1/user/data?` +
        (this.state.uid ? `id=${this.state.uid}` : ""),
      requestOptions
    ).catch(err => {
      console.log(err)
      //display empty state
      this.setState({ networkErr: true });
      return null;
    });
    if (response == null) {
      return;
    }
    this.setState({ networkErr: false });
    var responseText = await response.text();
    var responseJson = JSON.parse(responseText);
    if (responseJson.err) {
      alert("Error");
      console.log(responseJson.err);
      return;
    }

    //TODO remove the hardcoded stuff
    var user = responseJson;
    var username = user.user
    var interests = user.tags;
    var skills = user.skills;
    var bio = user.bio;
    var description =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod"; //not in the user model
    var industry = "";
    var badges = user.badges;
    var recommendations = user.recommendations;
    var actions = user.action_buttons;
    var name = user.name;
    var previousCompanies = [];
    var previousEducation = [];
    var years = 0;
    var mood = user.mood;
    var relationshipData = user.relationshipData;
    var profile_picture = user.profile_picture;
    var academic_level = "";
    var currentJobTitle = "";
    var currentCompany = "";
    var experience = {};
    if (user.experience && user.experience.companies) {
      previousCompanies = user.experience.companies;
    }
    if (user.experience && user.experience.education) {
      previousEducation = user.experience.education;
    }
    if (user.experience) {
      experience = user.experience
      industry = user.experience.industry;
      years = user.experience.work_experience_years;
      academic_level = user.experience.academic_level;
      currentJobTitle = user.experience.currentJobTitle;
      currentCompany = user.experience.currentCompany;
    }
    var newState = {
      username: username,
      skills: skills || [],
      interests: interests || [],
      bio,
      description,
      badges: badges || [],
      recommendations: recommendations || [],
      actions: actions || [],
      name,
      previousCompanies: previousCompanies || [],
      previousEducation: previousEducation || [],
      industry,
      years,
      mood,
      relationshipData,
      profile_picture,
      academic_level,
      currentJobTitle,
      currentCompany,
      experience
    };
    this.setState({ ...newState });
  }

  _onRefresh = () => {
    this.fetchUserData();
    this.setState({ refreshing: false });
  };

  getContent() {
    if (this.state.networkErr) {
      return <EmptyState state={"internet"} />;
    } else {
      return (
        <View>
          <ProfileScreen
            uid={this.state.uid}
            username={this.state.username}
            interests={this.state.interests}
            skills={this.state.skills}
            bio={this.state.bio}
            description={this.state.description}
            badges={this.state.badges}
            recommendations={this.state.recommendations}
            actions={this.state.actions}
            name={this.state.name}
            previousCompanies={this.state.previousCompanies}
            previousEducation={this.state.previousEducation}
            navigation={this.props.navigation}
            industry={this.state.industry}
            years={this.state.years}
            mood={this.state.mood}
            relationshipData={this.state.relationshipData}
            profile_picture={this.state.profile_picture}
            academic_level={this.state.academic_level}
            currentJobTitle={this.state.currentJobTitle}
            currentCompany={this.state.currentCompany}
            experience={this.state.experience}
            refresh={()=>this.fetchUserData()}
          />
        </View>
      );
    }
  }
  render() {
    let content = this.getContent();
    return (
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        {!this.state.uid ? (
          <View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("SettingsStack", {screen: "Settings"})}
              style={{ zIndex: 99, width: "100%", height: 30, marginTop: 20 }}
            >
              <Image
                source={require("../assets/settings.png")}
                style={{
                  width: 30,
                  height: 30,
                  position: "absolute",
                  right: 20
                }}
              />
            </TouchableOpacity>
            {content}
          </View>
        ) : (
          content
        )}
      </ScrollView>
    );
  }
}

export default UserProfileHandler;
