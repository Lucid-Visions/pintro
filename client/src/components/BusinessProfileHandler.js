import React, { Component } from "react";
import CompanyScreen from "../screens/CompanyScreen";
import env from "../env";
import {
  AsyncStorage,
  Text,
  View,
  ScrollView,
  RefreshControl,
  Image,
} from "react-native";
import EmptyState from "./EmptyState";
import { TouchableOpacity } from "react-native-gesture-handler";

class BusinessProfileHandler extends Component {
  constructor(props) {
    super(props);
    let tempCompanyID = props.route.params.id;
    this.state = {
      networkErr: "loading",
      companyID: tempCompanyID,
      tags: [],
      name: "",
      tagline: "",
      bio: "",
      seekingInvestment: false,
      currentlyHiring: false,
      location: "",
      companySize: "",
      funding: "",
      team: [],
      refreshing: false,
      followStatus: "PENDING"
    };
  }

  componentDidMount() {
    this.getCompany();
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.route.params.id != this.props.route.params.id) {
      await this.setState({ companyID: nextProps.route.params.id })
      this.getCompany()
    }
  }

  async getCompany() {
    var token = await AsyncStorage.getItem("token");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };
    var response = await fetch(
      `http://${env.host}:${env.port}/api/v1/business?` +
      (this.props.route.params.id ? `_id=${this.props.route.params.id}` : ""),
      requestOptions
    ).catch(err => {
      //display empty state
      console.log(err)
      this.setState({ networkErr: true, refreshing: false });
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

    var company = responseJson[0]
    var tags = company.tags
    var name = company.name
    var tagline = company.tagline
    var bio = company.bio
    var seekingInvestment = company.seeking_investment
    var currentlyHiring = company.currently_hiring
    var dateFounded = company.date_founded
    var location = company.location
    var companySize = company.company_size
    var funding = company.funding
    var team = company.team

    var newState = {
      tags: tags || [],
      name,
      tagline,
      bio,
      seekingInvestment,
      currentlyHiring,
      dateFounded,
      location,
      companySize,
      funding,
      team: team || []
    };
    this.setState({ ...newState });
  }

  _onRefresh = () => {
    this.getCompany();
    this.setState({ refreshing: false });
  };

  getContent() {
    if (this.state.networkErr) {
      return <EmptyState state={"internet"} />;
    } else if (this.state.networkErr == "loading") {
      return <Text>Loading</Text>;
    } else {
      return (
        <View>
          <CompanyScreen
            companyID={this.state.companyID}
            tags={this.state.tags}
            name={this.state.name}
            tagline={this.state.tagline}
            bio={this.state.bio}
            seekingInvestment={this.state.seekingInvestment}
            currentlyHiring={this.state.currentlyHiring}
            dateFounded={this.state.dateFounded}
            location={this.state.location}
            companySize={this.state.companySize}
            funding={this.state.funding}
            team={this.state.team}
            navigation={this.props.navigation}
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
        {!this.state.companyID ? (
          <View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Settings")}
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

export default BusinessProfileHandler;
