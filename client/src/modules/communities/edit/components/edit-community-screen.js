import React from "react";
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

const EditCommunityScreen = ({ route }) => {
  const community = route.params.community

  const name = community.name;
  const story = community.story;
  const url = community.url;

//   const interests = user.tags;
//   const skills = user.skills;
//   const bio = user.bio;
//   const recommendations = user.recommendations;
//   const name = community.name;
//   const experience = user.experience;

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
  const communityData = [
    {
      lbl: "Edit community information",
      rightComponent: <ArrowComponent />,
      action: () => {
        navigation.navigate("Edit Info", {name, story, url});
      }
    },
    {
      lbl: "Edit community photo",
      rightComponent: <ArrowComponent />,
      action: () => {
        navigation.navigate("Edit Photo");
      }
    },
    {
      lbl: "Edit community tags",
      rightComponent: <ArrowComponent />,
      action: () => {
        navigation.navigate("Edit Tags");
      }
    },
    {
      lbl: "Edit community articles",
      rightComponent: <ArrowComponent />,
      action: () => {
        navigation.navigate("Edit Articles");
      }
    },
    {
      lbl: "Edit community events",
      rightComponent: <ArrowComponent />,
      action: () => {
        navigation.navigate("Edit Events");
      }
    },
    {
      lbl: "Edit community members",
      rightComponent: <ArrowComponent />,
      action: () => {
        navigation.navigate("Edit Members");
      }
    },
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

  let communityButtons = communityData.map((btn, i) => {
    return getRow(btn, i);
  });

  return (
      <ScrollView>
        <View style={styles.container}>
          
        <BackButton navigation={navigation} />
        </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.heading}>COMMUNITY</Text>
            {communityButtons}
          </View>
        
      </ScrollView>
  );
};

export default EditCommunityScreen;
