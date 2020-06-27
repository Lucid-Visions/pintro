import React from "react";

import {
  StyleSheet,
  View,
  AsyncStorage,
  FlatList,
} from "react-native";
import { withNavigationFocus } from '@react-navigation/compat';

import FeedItem from "../../components/FeedItem";
import WhiteFeedComponent from "../../components/WhiteFeedItem";
import FeedFilterModal from "../../components/FeedFilterModal";
import EmptyStateRefresh from "../../components/EmptyStateRefresh";

import { getFeed } from './actions'

// Logger
/**
 * Main screen of the Home tab.
 */
class LiveFeed extends React.Component {

  static navigationOptions = {
    headerLeft: "Arrow_back", // To be changed with an icon.
    headerRight: "Share_button", // To be changed with an icon.
  };
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      items: [],
      filter: -1,
      networkError: false,
      loadingMore:false,
      uid:null
    };
  }

  _onRefresh = () => {
    this.getUid()
    this.fetchData({});
  };

  componentDidMount() {
    this._onRefresh()
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      this._onRefresh()
    }
  }

  getUid = async () => {

    var myHeaders = new Headers();
    var userToken = await AsyncStorage.getItem("token");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", userToken);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    var response = await fetch(
      `http://${env.host}:${env.port}/api/v1/user/data`,
      requestOptions
    ).catch((err) => {
      if (err.message === "Network request failed") {
        this.setState({ networkError: true, refreshing: false });
      }
    });

    if (response==null || response.error) return 

    let responseJson = await response.json()
    this.setState({uid:responseJson._id})
  }

  fetchData = async ({limit, date_stamp, filter}) => {
    const response = await getFeed({limit, date_stamp, filter})
    if (response.error) {
        this.setState({ networkError: true, refreshing: false })
        return
    }

    this.setState({
        items: response.data,
        networkError: false,
        refreshing: false,
    })    
  }

  setFilter = (filter) =>  {
    if(!filter) filter = -1;
    this.fetchData({ filter })
  }

  getItem(x){
      if (x.author == null) return null;
      switch (x._type) {
        case "ACTION": {
          return (
            <WhiteFeedComponent
              name={x.author.name}
              photo={x.author.profile_picture}
              timeAgo={x.date_stamp}
              thisType={x.type}
              context={x.context}
              data={x}
            />
          );
        }
        case "ARTICLE": {
          return (
            <FeedItem
              name={x.author.name}
              photo={x.author.profile_picture}
              timeAgo={x.date_stamp}
              post={x.text}
              likes={x.likes.length}
              comments={x.comments.length}
              data={x}
              uid={this.state.uid}
            />
          );
        }
        case "STATUS": {
          return (
            <FeedItem
              name={x.author.author_id.name}
              photo={x.author.author_id.profile_picture}
              timeAgo={x.date_stamp}
              post={x.text}
              likes={x.likes.length}
              comments={x.comments.length}
              data={x}
              refresh={() => this._onRefresh(false)}
              uid={this.state.uid}
            />
          );
        }
      }
  
  }

  render() {
    const filterPopup = (
      <View>
        <FeedFilterModal onSetFilter={this.setFilter} />
      </View>
    )

    if (this.state.networkError) {
      return (
        <EmptyStateRefresh
          state={"internet"}
          onRefresh={this._onRefresh}
          refreshing={this.state.refreshing}
        />
      );
    } else {
      return (
        <FlatList
          ListHeaderComponent={filterPopup}
          data={this.state.items}
          renderItem={({item})=>this.getItem(item)}
          onRefresh={this._onRefresh}
          refreshing={this.state.refreshing}
          keyExtractor={(item) => item._id}
          numColumns={2}
          onEndReachedThreshold={0.5}
          initialNumToRender={4}
        />
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
});

export default withNavigationFocus(LiveFeed);
