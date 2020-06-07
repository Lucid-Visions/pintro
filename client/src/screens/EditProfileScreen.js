import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";

import SettingsRow from "../components/SettingsRow";

const EditProfileScreen = ({ route }) => {
  const user = route.params.user

  const interests = user.tags;
  const skills = user.skills;
  const bio = user.bio;
  const recommendations = user.recommendations;
  const name = user.name;
  const experience = user.experience;

  const navigation = useNavigation();
  
  /**
   * Right arrow component
   */
  let ArrowComponent = () => {
    return (
      <Image
        style={{ width: 8, height: 20, resizeMode: "contain" }}
        source={require("../assets/rightArrow.png")}
      />
    );
  };

  /**
   * Define the screen tab rows
   */
  const profileData = [
    {
      lbl: "Edit your photo",
      rightComponent: <ArrowComponent />,
      action: () => {
        navigation.navigate("Edit Photo");
      }
    },
    {
      lbl: "Edit your story",
      rightComponent: <ArrowComponent />,
      action: () => {
        navigation.navigate("Edit Story", { name, experience, bio });
      }
    },
    {
      lbl: "Edit your experience",
      rightComponent: <ArrowComponent />,
      action: () => {
        navigation.navigate("Edit Experience", { experience });
      }
    },
    {
      lbl: "What are your passions",
      rightComponent: <ArrowComponent />,
      action: () => {
        navigation.navigate("Edit Passions", { interests });
      }
    },
    {
      lbl: "How can you help others?",
      rightComponent: <ArrowComponent />,
      action: () => {
        navigation.navigate("Edit Skills", { skills });
      }
    },
    { lbl: "Edit your connections", 
    rightComponent: <ArrowComponent />,
    action: () => {
      navigation.navigate("Edit Connections");
    }
   },
    {
      lbl: "Edit your Recommendations",
      rightComponent: <ArrowComponent />,
      action: () => {
        navigation.navigate("Edit Recommendations", { name, recommendations });
      }
    }
  ];

  /**
   * create a settings tab row with a label, tight arrow, and action
   */
  const getRow = (item, index) => {
    let InnerComponent = () => {
      return (
        <SettingsRow
          key={index}
          lbl={item.lbl}
          key={item.lbl}
          rightComponent={item.rightComponent}
        />
      );
    };
    if (item.action) {
      return (
        <TouchableOpacity
          onPress={() => {
            item.action();
          }}
        >
          <InnerComponent />
        </TouchableOpacity>
      );
    } else {
      return <InnerComponent />;
    }
  };

  let profileButtons = profileData.map((btn, i) => {
    return getRow(btn, i);
  });

  return (
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={{paddingTop: Constants.statusBarHeight}}>
        {navigation.canGoBack() && (
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{ paddingTop: Constants.statusBarHeight }}
          >
            <Image
              source={require("../assets/leftArrow.png")}
              style={{
                height: 20,
                width: 25,
                resizeMode: "contain",
                alignSelf: "flex-start",
                marginHorizontal: 20
              }}
            />
          </TouchableOpacity>
        )}
        <View style={styles.container}>
          <View style={styles.sectionContainer}>
            <Text style={styles.heading}>PROFILE</Text>
            {profileButtons}
          </View>
        </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  sectionContainer: {
    width: "100%"
  },
  heading: {
    fontFamily: "poppins-medium",
    fontSize: 10,
    color: "#A9A9A9",
    marginLeft: 30,
    marginTop: 30
  },
});

export default EditProfileScreen;
