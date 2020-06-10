import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  AsyncStorage,
} from "react-native";
import EmptyStateRefresh from "../components/EmptyStateRefresh";
import NotificationItemComponent from "../components/NotificationItem";
// import SwipeToDelete from 'react-swipe-to-delete-component';

/**
 * Main screen of the Home tab.
 */
class NotificationFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      feedData: [],
      networkErr: false,
    };
    this.onRefresh = this.onRefresh.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.onRefresh();
  }

  deleteNotification = async (id) => {
    var token = await AsyncStorage.getItem("token");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", token);
    var raw = JSON.stringify({ id });

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
    };
    let response = await fetch(
      `http://${env.host}:${env.port}/api/v1/notification`,
      requestOptions
    ).catch((error) => console.log("error", error));
    console.log(await response.json(), id);
    this.onRefresh()
  };

  async fetchData() {
    var myHeaders = new Headers();
    var userToken = await AsyncStorage.getItem("token");

    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", userToken);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    let response = await fetch(
      `http://${env.host}:${env.port}/api/v1/notification`,
      requestOptions
    ).catch((error) => {
      console.log("error", error);
      this.setState({ networkErr: true });
    });

    if (response == null) return;
    this.setState({ networkErr: false });
    const responseJson = await response.json();
    return responseJson;
  }

  onRefresh() {
    this.setState({ refreshing: true });
    this.fetchData()
      .then((feedData) => {
        if (!feedData) feedData = [];
        this.setState({ refreshing: false, feedData });
      })
      .catch((error) => console.log(error));
  }

  render() {
    let data = this.state.feedData.map((x, index) => {
      if (x.relationship || x.status) {
        return (
          <NotificationItemComponent
            key={index}
            text={x.text}
            timestamp={x.timestamp}
            notification_type={x.notification_type}
            data={x.relationship || x.status}
            id={x._id}
            deleteNotification={this.deleteNotification}
            refresh={()=>this.onRefresh()}
          />
        );
      } else {
        null;
      }
    });
    data = data.filter(item => item);

    if (this.state.networkErr == true) {
      return (
        <EmptyStateRefresh
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
          state={"internet"}
        />
      );
    } else if (data.length == 0) {
      return (
        <EmptyStateRefresh
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
          state={"notification"}
          onPress={()=>{this.props.navigation.navigate("Home")}}
        />
      );
    } else {
      return (
        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
        >
          {data}
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {},
});

export default NotificationFeed;
