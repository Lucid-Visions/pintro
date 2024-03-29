import {
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import Constants from "expo-constants";
import MapComponent from "../components/MapComponent";
import * as React from "react";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import LiveFeed from "../modules/live-feed"

const initialLayout = { width: Dimensions.get("window").width };

export default function HomeScreen({ navigation }) {

  const FirstRoute = () => (
    <MapComponent style={styles.mapStyle} navigation={navigation}/>
  );
  
  const SecondRoute = () => (
    <LiveFeed navigation={navigation}/>
  );
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "map", title: "Map", icon: require("../assets/mapPin.png") },
    { key: "feed", title: "Feed", icon: require("../assets/mapPin.png") }
  ]);

  const renderScene = SceneMap({
    map: FirstRoute,
    feed: SecondRoute
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "black"}}
      style={{ backgroundColor: "#F0F0F0"}}
      renderLabel={({ route }) => {
        return (
          <View>
            <Text
              style={{
                color: "black",
                margin: 8,
                fontFamily: "poppins-medium",
              }}
            >
              {route.title}
            </Text>
          </View>
        );
      }}
    />
  );


  return (
    <View style={styles.safeContainer}>
      <TabView
        renderTabBar={props => renderTabBar(props)}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1
  },
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
  safeContainer: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
});