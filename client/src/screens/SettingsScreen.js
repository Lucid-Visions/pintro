import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  AsyncStorage,
  Dimensions
} from "react-native";

import ToggleSwitch from "toggle-switch-react-native";
import Slider from "react-native-slider";
import SlidingUpPanel from "rn-sliding-up-panel";

import { AuthContext } from "../navigation/AppNavigator";
import { useNavigation } from "@react-navigation/native";

import SettingsRow from "../components/SettingsRow";
import UpdatePanel from "../components/UpdatePanel";
import DeleteModal from "../components/DeleteAccountModal";
import { State } from "react-native-gesture-handler";

const { height } = Dimensions.get("window");

const SettingsScreen = () => {
  const { signOut } = React.useContext(AuthContext);
  const navigation = useNavigation();

  const [distanceValue, setDistanceValue] = useState(0);
  const [notificationsValue, setNotificationsValue] = useState(false);
  const [deleteModalVisible, setDeleteModal] = useState(false);
  const [updatePanel, setUpdatePanel] = useState("");
  const updateSlider = useRef();

  async function getUserData() {
    var myHeaders = new Headers();
    var userToken = await AsyncStorage.getItem("token");

    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", userToken);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    var response = await fetch(
      `http://${env.host}:${env.port}/api/v1/user/data`,
      requestOptions
    ).catch(() => {
      return null;
    });

    if (response == null) {
      return null;
    }

    var responseText = await response.text();
    var responseJson = JSON.parse(responseText);

    if (responseJson.err) {
      alert("Error");
      console.log(err);
      return;
    }

    return responseJson;
  }

  /**
   * Hide the update slider on componentDidMount()
   */
  useEffect(() => {
    updateSlider.current.hide();
  }, []);

  /**
   * when the update panel type updates
   * the update slider shows if there is type or hides if type=""
   */
  useEffect(() => {
    if (updatePanel.length > 0) {
      updateSlider.current.show();
    } else updateSlider.current.hide();
  }, [updatePanel]);

  const setDistance = d => {
    setDistanceValue(() => {
      return d;
    });
  };

  /**
   * Triggers the delete modal
   */
  const toggleDeleteModal = () => {
    setDeleteModal(() => {return !deleteModalVisible});
  };

  /**
   * Sets a type of the update panel, used to
   * show the correct labels and placeholders
   * @param {*} type can be email, password, or phone
   */
  const toggleModal = type => {
    setUpdatePanel(() => {
      return type;
    });
  };

  const setNotifications = () => {
    setNotificationsValue(prevState => {
      return !prevState;
    });
  };

  var sliderVal = 0;

  let ArrowComponent = () => {
    return (
      <Image
        style={{ width: 8, height: 20, resizeMode: "contain" }}
        source={require("../assets/rightArrow.png")}
      />
    );
  };

  let ToggleSwitchComponent = () => {
    return (
      <ToggleSwitch
        isOn={notificationsValue}
        onColor="#1A1A1A"
        offColor="#BABABA"
        size="small"
        onToggle={() => {
          setNotifications();
        }}
      />
    );
  };

  let SliderComponent = () => {
    return (
      <View>
        <Text style={styles.sliderText}>{Math.round(distanceValue)} km</Text>
        <Slider
          minimumValue={0}
          maximumValue={100}
          style={{ width: 100, marginTop: -10 }}
          minimumTrackTintColor="black"
          maximumTrackTintColor="black"
          thumbTintColor="#EEAE52"
          thumbStyle={{ width: 15, height: 15 }}
          onValueChange={x => {
            sliderVal = x;
          }}
          onSlidingComplete={() => {
            setDistance(sliderVal);
          }}
          value={distanceValue}
        />
      </View>
    );
  };

  const personalData = [
    {
      lbl: "Edit profile",
      rightComponent: <ArrowComponent />,
      action: async () => {
        const userData = await getUserData()
        navigation.navigate("Edit Profile", { user: userData });
      }
    },
    { lbl: "Push notifications", rightComponent: <ToggleSwitchComponent /> },
    { lbl: "Set nearby distance", rightComponent: <SliderComponent /> },
    { lbl: "Edit communities", rightComponent: <ArrowComponent /> }
  ];
  const aboutData = [
    { lbl: "Terms of use", rightComponent: <ArrowComponent /> },
    { lbl: "Privacy policy", rightComponent: <ArrowComponent /> },
    { lbl: "FAQ & Contact us", rightComponent: <ArrowComponent /> }
  ];
  const accountData = [
    {
      lbl: "Update password",
      rightComponent: <ArrowComponent />,
      action: () => {
        toggleModal("password");
      }
    },
    {
      lbl: "Update email",
      rightComponent: <ArrowComponent />,
      action: () => {
        toggleModal("email");
      }
    },
    {
      lbl: "Update phone number",
      rightComponent: <ArrowComponent />,
      action: () => {
        toggleModal("phone");
      }
    },
    {
      lbl: "Log out",
      rightComponent: <ArrowComponent />,
      action: () => {
        signOut();
      }
    },
    {
      lbl: "Delete my account",
      rightComponent: <ArrowComponent />,
      action: () => toggleDeleteModal()
    }
  ];

  const getRow = (x, i) => {
    let InnerComponent = () => {
      return (
        <SettingsRow
          lbl={x.lbl}
          key={x.lbl}
          rightComponent={x.rightComponent}
        />
      );
    };
    if (x.action) {
      return (
        <TouchableOpacity
          key={i}
          onPress={() => {
            x.action();
          }}
        >
          <InnerComponent />
        </TouchableOpacity>
      );
    } else {
      return <InnerComponent />;
    }
  };

  let personalButtons = personalData.map((x, i) => {
    return getRow(x, i);
  });
  let aboutButtons = aboutData.map((x, i) => {
    return getRow(x, i);
  });
  let accountButtons = accountData.map((x, i) => {
    return getRow(x, i);
  });

  return (
    <View>
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      {navigation.canGoBack() && (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{ marginTop: 20 }}
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
      <SafeAreaView style={styles.container}>
        <View style={styles.sectionContainer}>
          <Text style={styles.heading}>PERSONAL</Text>
          {personalButtons}
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.heading}>ABOUT</Text>
          {aboutButtons}
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.heading}>ACCOUNT</Text>
          {accountButtons}
        </View>
        
        <DeleteModal isVisible={deleteModalVisible} toggle={toggleDeleteModal} />
      </SafeAreaView>
    </ScrollView>
    <SlidingUpPanel
    ref={updateSlider}
    draggableRange={{ top: height / 1.2, bottom: 10 }}
    onBottomReached={() => toggleModal("")}
    showBackdrop={true}
    allowDragging={false}
  >
    {updatePanel.length > 0 && (
      <UpdatePanel type={updatePanel} modalRef={updateSlider.current} navigation={navigation}/>
    )}
  </SlidingUpPanel>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 100
  },
  heading: {
    fontFamily: "poppins-medium",
    fontSize: 10,
    color: "#A9A9A9",
    marginLeft: 30,
    marginTop: 30
  },
  sectionContainer: {
    width: "100%"
  },
  sliderText: {
    fontFamily: "poppins-medium",
    fontSize: 10,
    color: "#A9A9A9",
    position: "absolute",
    marginTop: -10,
    right: 0
  }
});
export default SettingsScreen;
