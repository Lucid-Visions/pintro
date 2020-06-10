import React, { Component } from "react";
import MapView, { PROVIDER_GOOGLE, Marker, Callout, AnimatedRegion } from "react-native-maps";
import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  AsyncStorage
} from "react-native";
import mapStyles from "../assets/mapStyles";
import MapCard from "./MapCard";
import ElevatedView from "react-native-elevated-view";
import EmptyStateRefresh from "./EmptyStateRefresh";
import MarkerComponent from "./MarkerComponent"

const { width } = Dimensions.get("window");

let tempRegion = null;
class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 51.509865,
        longitude: -0.118092,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      selected: -1,
      expanded: false,
      markers: [],
      networkError: false,
      refreshing: false
    };
    tempRegion = this.state.region;
    this.onRegionChange = this.onRegionChange.bind(this);
    this.refreshMap = this.refreshMap.bind(this);
    this.scrollToIndex = this.scrollToIndex.bind(this)
  }

  toggleExpanded() {
    this.setState({ expanded: !this.state.expanded, region: tempRegion });
  }
  onRegionChange(region) {
    tempRegion = region;
  }

  componentDidMount(){
    this.refreshMap()
  }

  scrollToIndex(i) {
    this.zoomToIndex(i)
    this.setState({ selected: i, region: tempRegion });
    this.scroller.scrollTo({ x: 320 * i, y: 0, animated: false });
  }

  distanceCal(lat1, lon1, lat2, lon2, unit) {
    if (lat1 == lat2 && lon1 == lon2) {
      return 0;
    } else {
      var radlat1 = (Math.PI * lat1) / 180;
      var radlat2 = (Math.PI * lat2) / 180;
      var theta = lon1 - lon2;
      var radtheta = (Math.PI * theta) / 180;
      var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit == "K") {
        dist = dist * 1.609344;
      }
      if (unit == "N") {
        dist = dist * 0.8684;
      }
      return dist;
    }
  }

  zoomToIndex(i){
    var region = {...this.state.markers[i].coordinate,latitudeDelta: 10,longitudeDelta: 10}
    this.mapView.animateToRegion(region, 1000)
  }

  async refreshMap() {
    this.setState({ refreshing: true, selected:-1,  expanded:false});
    let region = tempRegion;
    let corners = [
      {
        latitude: region.latitude + region.latitudeDelta / 2,
        longitude: region.longitude - region.longitudeDelta / 2,
        title: "topLeft"
      },
      {
        latitude: region.latitude - region.latitudeDelta / 2,
        longitude: region.longitude + region.longitudeDelta / 2,
        title: "bottomRight"
      }
    ];
    let farLeft = corners[0];
    let farRight = corners[1];

    let distance = this.distanceCal(
      farLeft.latitude,
      farLeft.longitude,
      farRight.latitude,
      farRight.longitude,
      "K"
    );
    let radius = distance / 2;
    radius = 150000
    let userToken = await AsyncStorage.getItem("token");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", userToken);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };
    let response = await fetch(
      `http://${env.host}:${env.port}/api/v1/map?long=${region.longitude}&lat=${
        region.latitude
      }&distance=${radius * 1000}`,
      requestOptions
    ).catch(error => {
      if (error.message === "Network request failed") {
        this.setState({ networkError: true, refreshing: false });
      }
    });
    if (response == null) {
      return;
    }
    let responseJson = await response.json();
    let navigation = this.props.navigation;

    if (responseJson == null || responseJson.map == null) return;

    let markers = responseJson.map((x, index) => {
      return {
        coordinate: {
          latitude: x.location.coordinates[1],
          longitude: x.location.coordinates[0]
        },
        id: x._id,
        description: x.bio,
        selected: false,
        card: <MapCard user={x} navigation={navigation} key={x._id}/>
      };
    });
    this.setState({
      markers,
      region: tempRegion,
      networkError: false,
      refreshing: false
    });
  }

  render() {
    let markerIcons = this.state.markers.map((marker, index) => (
      <MarkerComponent key={marker.id} id={marker.id} coordinate={marker.coordinate} index={index} selected={this.state.selected} scrollToIndex={this.scrollToIndex}/>
    ));

    let cardsArray = this.state.markers.map(marker => marker.card);
    let elevatedViewHeight = this.state.selected != -1 ? null : 0;
    let elevatedViewHeightExpanded = this.state.selected != -1 ? 450 : 0;

    if (this.state.networkError) {
      return (
        <EmptyStateRefresh
          state={"internet"}
          onRefresh={this.refreshMap}
          refreshing={this.state.refreshing}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {!this.state.expanded && (
            <ElevatedView
              style={{ ...styles.cardContainer, height: elevatedViewHeight }}
              elevation={10}
            >
              <ScrollView
                ref={scroller => {
                  this.scroller = scroller;
                }}
                scrollToOverflowEnabled={true}
                horizontal={true}
                decelerationRate={0}
                snapToInterval={320}
                snapToAlignment={"left"}
                pagingEnabled={true}
                scrollEventThrottle={5}
                onMomentumScrollEnd={() => {
                  var interval = 300; // WIDTH OF 1 CHILD COMPONENT
                  var snapTo = this.scrollingRight
                    ? Math.ceil(this.lastx / interval)
                    : Math.floor(this.lastx / interval);
                  var scrollTo = snapTo * interval;
                  var index = scrollTo / 300;
                  if (index > -1 && index < this.state.markers.length) {
                    this.setState({ selected: index, region: tempRegion });
                    this.scrollToIndex(index)
                  }
                }}
                showsHorizontalScrollIndicator={false}
                onScroll={event => {
                  var nextx = event.nativeEvent.contentOffset.x;
                  this.scrollingRight = nextx > this.lastx;
                  this.lastx = nextx;
                }}
              >
                {cardsArray}
              </ScrollView>
            </ElevatedView>
          )}
          {this.state.expanded && (
            <ElevatedView
              style={{
                ...styles.cardContainerVertical,
                height: elevatedViewHeightExpanded
              }}
              elevation={10}
            >
              <ScrollView>{cardsArray}</ScrollView>
            </ElevatedView>
          )}
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.mapStyle}
            onRegionChange={this.onRegionChange}
            customMapStyle={mapStyles}
            onLongPress={() => {
              this.setState({ selected: -1, region: tempRegion });
            }}
            //onRegionChangeComplete={this.refreshMap}
            //initialRegion={this.state.region}
            tracksViewChanges={false}
            ref={ref => (this.mapView = ref)}
          >
            {markerIcons}
          </MapView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
  cardContainer: {
    position: "absolute",
    zIndex: 99,
    width: "100%",
    padding: 10,
    bottom: 10
  },
  cardContainerVertical: {
    position: "absolute",
    zIndex: 99,
    height: 450
  }
});

export default MapComponent;
