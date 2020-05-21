import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SearchStack from "./SearchStack";
import AddStack from "./AddStack";
import ChatStack from "./ChatStack";
import ProfileStack from "./ProfileStack";
import SettingsStack from "./SettingsStack";
import HomeStack from "./HomeStack";
import BusSignUpStack from "./BusSignUpStack";
import { Ionicons } from "@expo/vector-icons";
import WGOModal from "../components/WGOModal";
import ActionSheet from "react-native-actionsheet";
import BusinessProfileHandler from "../components/BusinessProfileHandler";
import { withInAppNotification } from 'react-native-in-app-notification';
import NotificationService from "../assets/NotificationService"
import { View, Image, TouchableOpacity, Text, StyleSheet, AsyncStorage, SafeAreaView } from "react-native";
import { Notifications } from "expo";

const Tab = createBottomTabNavigator();


function _handleNotification(showNotification, notification){
  NotificationService(showNotification, notification)
}
/**
 * This is the main tab navigator of the app.
 * It redirects to stack navigators that contain the
 * different screens used in that tab.
 */
function TabMenu({ navigation, showNotification }) {
  //add notification listener
  Notifications.addListener(
    (notification)=>_handleNotification(showNotification, notification)
  );

  const [companiesRaw, setCompanies] = useState([]);
  const updateCompanies = (x) => {
    setCompanies(prevState => x);
  };

  useEffect(() => {
    // return result to initial state
    getCompanies()

  }, []);

  const getCompanies = async () => {
    var myHeaders = new Headers();
    var token = await AsyncStorage.getItem("token");

    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    let response = await fetch(`http://${env.host}:${env.port}/api/v1/business/my`, requestOptions)
      .catch(error => console.log('error', error));

    let responseJson = await response.json()
    if(responseJson==null || responseJson.error){
      return
    }
    const companyData = responseJson.map((x)=>{return {title: x.name, id:x._id}})
    updateCompanies(companyData)
  }

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "black",
        showLabel: false,
        style: {
          paddingBottom: 20
        }
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          //Temporary icons until we get custom ones.
          if (route.name === "Home")
            iconName = require("../assets/HomeIcon.png");
          else if (route.name === "Search")
            iconName = require("../assets/SearchIcon.png");
          else if (route.name === "Add")
            iconName = require("../assets/blackPlus.png");
          else if (route.name === "Chat")
            iconName = require("../assets/MessageIcon.png");
          else if (route.name === "Profile")
            iconName = require("../assets/ProfileIcon.png");

          return (
            <Image style={{ width: size, height: size }} source={iconName} />
          );
        }
      })}
      tabBar={props => (
        <MyTabBar
          {...props}
          state={{ ...props.state, routes: props.state.routes.slice(0, 5) }}
          companiesRaw = {companiesRaw}
          refreshCompanies={()=>getCompanies()}
        />
      )}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Search" component={SearchStack} />
      <Tab.Screen name="Add" component={AddStack} />
      <Tab.Screen name="Chat" component={ChatStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
      <Tab.Screen name="Settings" component={SettingsStack} />
      <Tab.Screen name="BusSignUp" component={BusSignUpStack} />
      <Tab.Screen name="BusinessScreen" component={BusinessProfileHandler} />
    </Tab.Navigator>
  );
}

function getIcon(name) {
  switch (name) {
    case "Home": {
      return require("../assets/HomeIcon.png");
      break;
    }
    case "Search": {
      return require("../assets/SearchIcon.png");
      break;
    }
    case "Add": {
      return require("../assets/blackPlus.png");
      break;
    }
    case "Chat": {
      return require("../assets/MessageIcon.png");
      break;
    }
    case "Profile": {
      return require("../assets/ProfileIcon.png");
      break;
    }
  }
}

function MyTabBar({ state, descriptors, navigation, companiesRaw , refreshCompanies}) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prevState => {
      return !prevState;
    });
  };

  return (
    <SafeAreaView style={{ flexDirection: "row" }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        let actionSheetRef = null;
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = async () => {
          if (label == "Add") {
            toggleModal();
            return;
          }
          const event = navigation.emit({
            type: "tabPress",
            target: route.key
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = async () => {
          if (label == "Profile") {
            actionSheetRef.show();
          }
        };


        let actionSheetOptions = [
          { title: "Cancel" , onPress:()=>refreshCompanies()}, // cancel must be index 0
          ...companiesRaw,
          {
            title: "Add a Company",
            onPress: () => navigation.navigate("BusSignUp")
          }
        ];

        const actionSheetLables = actionSheetOptions.map(x => x.title);
        return (
          <View style={styles.touchableContainer}>
            <ActionSheet
              ref={actionSheet => {
                actionSheetRef = actionSheet;
              }}
              title={"Available Companies"}
              options={actionSheetLables}
              cancelButtonIndex={0}
              onPress={index => {
                /* do something */
                let actionObj = actionSheetOptions[index];
                actionObj.onPress
                  ? actionObj.onPress()
                  : navigation.navigate("BusinessScreen", { id: actionObj.id });
              }}
            />
            {label == "Add" ? (
              <Image
                source={require("../assets/curve.png")}
                style={styles.curve}
              />
            ) : null}
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityStates={isFocused ? ["selected"] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={label == "Add" ? styles.circle : null}
            >
              <WGOModal
                visible={showModal}
                toggle={toggleModal}
                navigation={navigation}
              />

              <Image source={getIcon(label)} style={styles.navIcon} />
            </TouchableOpacity>
          </View>
        );
      })}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  touchableContainer: {
    flex: 1,
    height: 60,
    width: 40,
    justifyContent: "center",
    flexDirection: "column",
    alignContent: "center"
  },
  circle: {
    height: 50,
    width: 50,
    marginTop: -28,
    alignSelf: "center",
    justifyContent: "center",
    flexDirection: "column",
    alignContent: "center",
    backgroundColor: "#F8A144",
    borderRadius: 100
  },
  navIcon: {
    height: 25,
    width: 25,
    resizeMode: "contain",
    alignSelf: "center"
  },
  curve: {
    position: "absolute",
    height: 38,
    width: 100,
    resizeMode: "stretch",
    top: -19.2,
    alignSelf: "center"
  }
});

export default withInAppNotification(TabMenu);
