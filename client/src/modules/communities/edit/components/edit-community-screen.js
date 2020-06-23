import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert
} from "react-native";
import styles from "../styles"
import BackButton from "../../../shared/icons/back-button/lightTheme";
import { deleteCommunity } from "../../actions";

import SettingsRow from "../../../../components/SettingsRow";

const EditCommunityScreen = ({navigation, route: {params}}) => {

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
        navigation.navigate("Edit Community Info", params);
      }
    },
    {
      lbl: "Edit community photo",
      rightComponent: <ArrowComponent />,
      action: () => {
        navigation.navigate("Edit Community Photo", params);
      }
    },
    {
      lbl: "Edit community tags",
      rightComponent: <ArrowComponent />,
      action: () => {
        navigation.navigate("Edit Community Tags", params);
      }
    },
    {
      lbl: "Edit community articles",
      rightComponent: <ArrowComponent />,
      action: () => {
        navigation.navigate("Edit Community Articles", params);
      }
    },
    {
      lbl: "Edit community events",
      rightComponent: <ArrowComponent />,
      action: () => {
        navigation.navigate("Edit Community Events", params);
      }
    },
    {
      lbl: "Edit community members",
      rightComponent: <ArrowComponent />,
      // action: () => {
      //   navigation.navigate("Edit Members");
      // }
    },
    {
      lbl: "Delete Community",
      action: () => {
        Alert.alert(
          "You are about to DELETE this community forever!",
          "Once deleted, you cannot restore this community. Are you sure you wish to proceed?",
          [
            {
              text: "Cancel",
              onPress: () => console.log('Canceled'),
              style: "cancel"
            },
            { text: "Confirm", onPress: () => {
              deleteCommunity(params._id)
              navigation.navigate('Profile')
              navigation.navigate('Home')
            }}
          ],
          { cancelable: true }
        );
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
