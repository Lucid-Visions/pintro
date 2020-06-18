import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  AsyncStorage,
} from "react-native";
import Constants from "expo-constants";
import ConnectionButton from "../../../../components/ConnectionButton";
import EmptyState from "../../../../components/EmptyState";
import BackButton from "../../../shared/icons/back-button/lightTheme";

import Animated from "react-native-reanimated";
import SwipeableItem from "react-native-swipeable-item";
import DraggableFlatList from "react-native-draggable-flatlist";
import { useNavigation } from "@react-navigation/native";
import ElevatedView from "react-native-elevated-view";

const updateRequest = require("../../../../assets/updateRequest").update;

const EditConnections = ({ route }) => {
  const navigation = useNavigation();
  const itemRefs = new Map();

  const [state, updateState] = useState({
    networkErr: true,
    updated: false,
    innerCircle: [],
    friendsCircle: [],
    followersCircle: [],
  });

  async function getUserData() {
    var myHeaders = new Headers();
    var userToken = await AsyncStorage.getItem("token");

    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", userToken);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
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
   * Remove relationship between logged user and another user
   * @param {*} uidToDelete user id of the user we want to remove our connection with
   */
  const deleteRelationShip = async (uidToDelete) => {
    const myHeaders = new Headers();
    const userToken = await AsyncStorage.getItem("token");

    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", userToken);

    const raw = {
      uid: uidToDelete,
    };

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: JSON.stringify(raw),
    };

    const response = await fetch(
      `http://${env.host}:${env.port}/api/v1/connection`,
      requestOptions
    ).catch((err) => {
      console.log(err);
      return;
    });

    const responseJson = await response.json();

    if (responseJson.err) {
      console.log("There was an error while deleting the relationship");
      return;
    }
  };

  const setState = (newState) => {
    updateState((prevState) => {
      return { ...prevState, ...newState };
    });
  };

  /**
   * when component is mounted fetch connections from db
   */
  useEffect(() => {
    fetchConnections();
  }, []);

  /**
   * when any of the circle state arrays update, update the db as well
   */
  useEffect(() => {
    if (state.updated) updateCircles();
  }, [state.updated]);

  /**
   * map users data from circles and update state
   */
  const fetchConnections = async () => {
    const user = await getUserData().catch((err) => console.log(err));

    if (user.circles) {
      const innerArray = user.circles.innerCircle.map((item) => {
        return {
          uid: item._id,
          name: item.name,
          position: item.experience.currentJobTitle,
          photo: item.profile_picture,
        };
      });

      const friendsArray = user.circles.friendsCircle.map((item) => {
        return {
          uid: item._id,
          name: item.name,
          position: item.experience.currentJobTitle,
          photo: item.profile_picture,
        };
      });

      const followersArr = user.circles.followersCircle.map((item) => {
        return {
          uid: item._id,
          name: item.name,
          position: item.experience.currentJobTitle,
          photo: item.profile_picture,
        };
      });

      setState({ innerCircle: innerArray });
      setState({ friendsCircle: friendsArray });
      setState({ followersCircle: followersArr });

      setState({ networkErr: false });
    }
  };

  /**
   * update db after every move of a row
   */
  const updateCircles = async () => {
    const result = updateRequest({
      circles: {
        innerCircle: state.innerCircle.map((item) => {
          return item.uid;
        }),
        friendsCircle: state.friendsCircle.map((item) => {
          return item.uid;
        }),
        followersCircle: state.followersCircle.map((item) => {
          return item.uid;
        }),
      },
    });
  };

  /**
   * Update the circles arrays without the user we deleted
   * @param {*} uidToRemove the user id we want to remove
   */
  const handleDelete = (uidToRemove) => {
    setState({ updated: false });

    const newInner = state.innerCircle.filter((x) => x.uid != uidToRemove);

    const newFriends = state.friendsCircle.filter((x) => x.uid != uidToRemove);

    const newFollowers = state.followersCircle.filter(
      (x) => x.uid != uidToRemove
    );

    setState({ innerCircle: newInner });
    setState({ friendsCircle: newFriends });
    setState({ followersCircle: newFollowers });
    setState({ updated: true });

    deleteRelationShip(uidToRemove);
  };

  // swipe right button -> Delete
  const rightButton = ({ item, percentOpen, close }) => (
    <Animated.View
      style={[
        styles.deleteBtnContainer,
        { marginVertical: 10, opacity: percentOpen },
      ]}
    >
      <ElevatedView style={styles.deleteBtnContainer} elevation={5}>
        <TouchableOpacity onPress={() => handleDelete(item.item.uid)}>
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontFamily: "poppins-regular",
              fontSize: 13,
            }}
          >
            Delete
          </Text>
        </TouchableOpacity>
      </ElevatedView>
    </Animated.View>
  );

  // the user button to display in each row
  const renderConnectionButton = ({
    item,
    openLeft,
    openRight,
    openDirection,
    close,
  }) => {
    const name = item.item.name;
    const position = item.item.position;
    const photo = item.item.photo;

    return (
      <ConnectionButton
        isActive={item.isActive}
        swipe={(openRight, openDirection, close)}
        onLongPress={item.drag}
        source={photo}
        name={name}
        text={position}
        onPress={() =>
          navigation.navigate("Connection Profile", {
            uid: item.item.uid,
          })
        }
      />
    );
  };

  // swipeable row that has a user button in the center,
  // when u swipe left it shows a delete button
  const swipableRows = ({ item, index, drag, isActive }) => {
    if (item.separator) {
      return <Text style={styles.categoryHeader}>{item.separator}</Text>;
    } else
      return (
        <SwipeableItem
          item={{ item, drag, isActive }}
          ref={(ref) => {
            if (ref && !itemRefs.get(item.uid)) {
              itemRefs.set(item.uid, ref);
            }
          }}
          onChange={({ open }) => {
            if (open) {
              // Close all other open items
              [...itemRefs.entries()].forEach(([key, ref]) => {
                if (key !== item.uid && ref) ref.close();
              });
            }
          }}
          overSwipe={30}
          renderUnderlayLeft={rightButton}
          snapPointsLeft={[0, 70]}
          renderOverlay={renderConnectionButton}
        />
      );
  };

  /**
   * Gets new order of people in the section list and updates states accordingly
   */
  const handleDragRow = ({ data }) => {
    setState({ updated: false });

    // get the index of the second section separator
    const indexFriends = data.findIndex((item) => {
      return item.separator == "Friends";
    });
    // get the index of the third section separator
    const indexFollowers = data.findIndex((item) => {
      return item.separator == "Followers";
    });

    // split the array to get the first section, removing the separator item from it
    const newInner = data.slice(0, indexFriends).filter((item) => {
      return item.separator == null;
    });
    // split the array to get the second section
    const newFriends = data.slice(indexFriends + 1, indexFollowers);
    // split the array to get the third section
    const newFollowers = data.slice(indexFollowers + 1);

    //update states
    setState({ innerCircle: newInner });
    setState({ friendsCircle: newFriends });
    setState({ followersCircle: newFollowers });
    // set updated to true so db is updated as well after that
    setState({ updated: true });
  };

  if (state.networkErr == true) {
    return <EmptyState state={"internet"} />;
  } else {
    return (
      <View style={styles.container}>
        <BackButton navigation={navigation} />
        <Text style={styles.header}>Edit your connections</Text>
        <Text style={styles.headerText}>
          Move between tiers or swipe to remove connections
        </Text>

        <View style={{ height: "100%" }}>
          <DraggableFlatList
            activationDistance={5}
            data={[
              { separator: "Inner Circle" },
              ...state.innerCircle,
              { separator: "Friends" },
              ...state.friendsCircle,
              { separator: "Followers" },
              ...state.followersCircle,
            ]}
            renderItem={swipableRows}
            keyExtractor={(item, index) => `draggable-item-${index}`}
            onDragEnd={handleDragRow}
          />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    marginHorizontal: 20,
  },
  header: {
    fontFamily: "poppins-bold",
    margin: "auto",
    textAlign: "left",
    alignItems: "baseline",
    fontSize: 24,
    paddingTop: 30,
  },
  headerText: {
    fontFamily: "poppins-regular",
    margin: "auto",
    textAlign: "left",
    alignItems: "baseline",
    fontSize: 12,
    paddingTop: 15,
    paddingBottom: 50,
  },
  categoryHeader: {
    fontFamily: "poppins-regular",
    margin: "auto",
    textAlign: "left",
    alignItems: "baseline",
    fontSize: 12,
    paddingTop: 30,
    paddingBottom: 5,
  },
  categoryHeaderBold: {
    fontFamily: "poppins-semi-bold",
    margin: "auto",
    textAlign: "left",
    alignItems: "baseline",
    fontSize: 14,
    padding: 20
  },
  placeholder: {
    fontFamily: "poppins-regular",
    borderBottomWidth: 0.2,
    margin: "auto",
    alignItems: "stretch",
    fontSize: 13,
    marginBottom: 50,
    paddingVertical: 15,
  },
  submitBtn: {
    backgroundColor: "black",
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "black",
    color: "black",
    width: 300,
    marginVertical: 30,
  },
  deleteBtnContainer: {
    flex: 1,
    width: 65,
    alignSelf: "flex-end",
    backgroundColor: "red",
    justifyContent: "center",
    borderRadius: 15,
  },
});

export default EditConnections;
