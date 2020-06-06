import {
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import Constants from "expo-constants";
import MapComponent from "../components/MapComponent";
import * as React from "react";
import { TabView, SceneMap, TabBar, Image } from "react-native-tab-view";
import LiveFeed from "../components/LiveFeed"

const initialLayout = { width: Dimensions.get("window").width };

export default function HomeScreen({ navigation }) {

  const FirstRoute = () => (
    <MapComponent style={styles.mapStyle} navigation={navigation}/>
  );
  
  const SecondRoute = () => (
    <LiveFeed/>
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

// /**
//  * Main screen of the Home tab.
//  */
// export default class HomeScreen extends React.Component {
//     static navigationOptions = {
//         headerLeft: "Arrow_back", // To be changed with an icon.
//         headerRight: "Share_button" // To be changed with an icon.
//     }
//     constructor(props) {
//         super(props);
//     };

//     render() {
//         return (
//             <SafeAreaView style={styles.container}>
//                 <MapComponent style={styles.mapStyle}/>
//             </SafeAreaView>
//         )
//     };
// }
