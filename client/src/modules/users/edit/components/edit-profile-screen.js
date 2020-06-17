import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import styles from "../styles"
import { useNavigation } from "@react-navigation/native";
import BackButton from "../../../shared/icons/back-button/lightTheme";

import SettingsRow from "../../../../components/SettingsRow";

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
        source={require("../../../../assets/rightArrow.png")}
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
      lbl: "Edit your interests",
      rightComponent: <ArrowComponent />,
      action: () => {
        navigation.navigate("Edit Interests", { interests });
      }
    },
    {
      lbl: "Edit your superpowers",
      rightComponent: <ArrowComponent />,
      action: () => {
        navigation.navigate("Edit Skills", { skills });
      }
    },
  //This functionality has been moved to MVP-2
  //   { lbl: "Edit your connections", 
  //   rightComponent: <ArrowComponent />,
  //   action: () => {
  //     navigation.navigate("Edit Connections");
  //   }
  //  },
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
      <ScrollView>
        <View style={styles.container}>
          
        <BackButton navigation={navigation} />
        </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.heading}>PROFILE</Text>
            {profileButtons}
          </View>
        
      </ScrollView>
  );
};

export default EditProfileScreen;
