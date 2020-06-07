import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Dimensions,
} from "react-native";
import * as React from "react";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import NotificationFeed from "../components/NotificationFeed"
import Chats from "./ChatsComponent";
const initialLayout = { width: Dimensions.get("window").width };

export default function ChatTabScreen({ navigation, route }) {

  const FirstRoute = () => (
    <NotificationFeed navigation={navigation} />
  );

  const SecondRoute = () => (
    <Chats navigation={navigation} />
  );
  const [index, setIndex] = React.useState(route.params?route.params.index || 0 :0);
  const [routes] = React.useState([
    { key: "notifications", title: "Notifications", icon: require("../assets/mapPin.png") },
    { key: "chats", title: "Chats", icon: require("../assets/mapPin.png") }
  ]);

  const renderScene = SceneMap({
    notifications: FirstRoute,
    chats: SecondRoute
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "black", }}
      style={{ backgroundColor: "#F0F0F0" }}

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
    <SafeAreaView style={styles.safeContainer}>
      <TabView
        renderTabBar={props => renderTabBar(props)}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
    </SafeAreaView>
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
    flex: 1,
  },
});

