import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
  Image,
} from "react-native";
import styles from './styles';
import ProfilePictureComponent from "../../../components/ProfilePicture";
import {
  FollowMeButton,
  MessageMeButton,
  ExtrasButton,
  ViewConnectionsButton,
  NewPostButton,
} from "../../../components/ProfileActionButtons";
import ActionButtonComponent from "../../../components/ActionButton";
import RecommendationButton from "../../../components/RecommendationButton";
import BadgeComponent from "../../../components/BadgeComponent";
import Tag from "../../../components/Tag";
import Experience from "../../../components/Experience";
import MoodButtonCard from "../../../components/MoodButtonCard";
import AcceptRequestModal from "../../../components/followRequestModal";
import ConnectModal from "../../../components/ConnectModal";
import ChatConnectPopup from "../../../components/ChatConnectPopup";
import CommunityPreview from './community-preview'

const updateRequest = require("../../../assets/updateRequest").update;


/**
 * Main screen of the Profile tab.
 */
const ProfileScreen = ({
  uid, //if you are looking at your own profile, uid is null
  username,
  email,
  actions,
  interests,
  skills,
  recommendations,
  bio,
  description,
  company,
  badges,
  name,
  previousCompanies,
  previousEducation,
  navigation,
  industry,
  years,
  mood,
  relationshipData,
  profile_picture,
  academic_level,
  currentJobTitle,
  currentCompany,
  experience,
  refresh,
  communities
}) => {
  // Set whether the 'My Story' text is expanded.
  const [textExpanded, setTextExpanded] = useState(false);
  const [moodSelector, setMoodSelector] = useState(false);
  const [moodState, setMoodState] = useState(mood);
  const [acceptRequestModal, setAcceptRequestModal] = useState(false);
  const [acceptRequest, setAcceptRequest] = useState(false);

  const relationshipStatus = relationshipData ? relationshipData.status : null;

  const [messagePopup, setMessagePopup] = useState(false);
  const [followPopup, setFollowPopup] = useState(false);
  /**
   * Expand the 'My story' text on press of the 'More' button.
   */
  const expandText = () => {
    setTextExpanded((prevState) => {
      return !prevState;
    });
  };

  /**
   * Toggles the accept request modal
   * @param {*} x true or false to display the modal, default is the opposite of current state
   */
  const toggleAcceptRequestModal = (x = !acceptRequestModal) => {
    setAcceptRequestModal(() => {
      return x;
    });
    setAcceptRequest(false);
  };

  const toggleFollowPopup = () => {
    setFollowPopup((prevState) => {
      return !prevState;
    });
  };

  const toggleMoodSelector = (selectedMood) => {
    setMoodSelector((prevState) => {
      return !prevState;
    });
    if (selectedMood) {
      updateRequest({ mood: selectedMood });
      editMoodState(selectedMood);
      //update mood on server
    }
  };

  const toggleMessagePopup = () => {
    setMessagePopup((prevState) => {
      return !prevState;
    });
  };

  const editMoodState = (i) => {
    setMoodState(() => {
      return i;
    });
  };

  useEffect(
    function () {
      editMoodState(mood);
    },
    [mood]
  );

  /* BUTTONS */

  // Render all action buttons.
  let actionButtons = actions.map((x, i) => {
    return <ActionButtonComponent key={i} type={x.type} context={x.context} />;
  });

  // Render all recommendation buttons.
  let recommendationsButtons = recommendations.map((item, i) => {
    return (
      <RecommendationButton
        key={i}
        title={item.title}
        resource={item.resource}
        thumbnail={item.photo}
      />
    );
  });

  // Render all 'talk to me' buttons.
  let talkToMeButtons = interests.map((interest, i) => (
    <Tag
      key={i}
      item={{ text: interest.toUpperCase(), disabled: true }}
      i={1}
    />
  ));

  // Render all 'help me with' buttons.
  let helpMeWithButton = skills.map((skill, i) => (
    <Tag
      key={i}
      item={{
        text: skill.toUpperCase(),
        disabled: true,
      }}
      i={4}
    />
  ));

  // Render all badge buttons.
  let badgeButtons = badges.map((x, i) => {
    return <BadgeComponent key={i} title={x.title} timesEarned={x.amount} />;
  });

  /**
   * Edit button next to sections in your profile page,
   * shows only in logged user profile
   * @param {*} screen screen to redirect to
   * @param {*} props any props to pass to the screen
   */
  const editBtn = (screen, props) => {
    if (uid) {
      return null;
    } else
      return (
        <TouchableOpacity onPress={() => navigation.navigate(screen, props)}>
          <Image
            source={require("../../../assets/editPen.png")}
            style={styles.editPen}
          />
        </TouchableOpacity>
      );
  };

  /* COMPONENTS */

  let moodSelectorComponent = () => {
    if (true) {
      return (
        <MoodButtonCard
          visible={moodSelector}
          toggle={toggleMoodSelector}
          selected={moodState}
        />
      );
    } else {
      return null;
    }
  };

  const myStoryContainer = () => {
    if (bio) {
      return (
        <View style={styles.myStoryContainer}>
          <View style={styles.myStory}>
            <View style={styles.editRow}>
              <Text
                style={{
                  fontFamily: "poppins-semi-bold",
                  marginVertical: "5%",
                }}
              >
                My Story
              </Text>
              {editBtn("SettingsStack", {screen: "Edit Story", params: { name, experience, bio }})}
            </View>
            <Text
              style={{ fontFamily: "poppins-semi-bold", color: "grey" }}
              numberOfLines={textExpanded ? 0 : 4}
            >
              {bio}
            </Text>

            <TouchableOpacity onPress={() => expandText()}>
              <Text style={{ color: "orange" }}>
                {textExpanded ? "Less" : "More"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return null;
    }
  };

  /**
   * Render the 'help me with' button.
   * @param {React.Component} helpMeWithButton the button to render.
   */
  const getICanHelpYouWith = (helpMeWithButton) => {
    if (helpMeWithButton.length == 0) {
      return null;
    }
    return (
      <View>
        <View style={styles.editRow}>
          <Text
            style={{ fontFamily: "poppins-semi-bold", marginVertical: "5%" }}
          >
            I can help with
          </Text>
          {editBtn("SettingsStack", {screen: "Edit Skills", params: { skills }})}
        </View>

        <View style={styles.tagScrollContainer}>
          <ScrollView style={styles.tagScrollView} horizontal={true}>
            <View>
              <View style={{ ...styles.tags }}>
                {helpMeWithButton.slice(
                  0,
                  Math.trunc(helpMeWithButton.length / 2)
                )}
              </View>
              <View style={{ ...styles.tags }}>
                {helpMeWithButton.slice(
                  Math.trunc(helpMeWithButton.length / 2)
                )}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  };

  /**
   * Render the 'talk to me' buttons.
   * @param {React.Component} talkToMeButtons the butotn to render.
   */
  const getTalkToMeButtons = (talkToMeButtons) => {
    if (talkToMeButtons.length == 0) {
      return null;
    }
    return (
      <View>
        <View style={styles.editRow}>
          <Text
            style={{ fontFamily: "poppins-semi-bold", marginVertical: "5%" }}
          >
            Talk to me about
          </Text>
          {editBtn("SettingsStack", {screen:"Edit Interests", params: { interests }})}
        </View>

        <View style={styles.tagScrollContainer}>
          <ScrollView style={styles.tagScrollView} horizontal={true}>
            <View>
              <View style={{ ...styles.tags }}>
                {talkToMeButtons.slice(
                  0,
                  Math.trunc(talkToMeButtons.length / 2)
                )}
              </View>
              <View style={{ ...styles.tags }}>
                {talkToMeButtons.slice(Math.trunc(talkToMeButtons.length / 2))}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  };

  const recommendationsSection = () => {
    if (recommendationsButtons.length > 0) {
      return (
        <View style={styles.recommendationsSection}>
          <View style={styles.editRow}>
            <Text
              style={{
                marginVertical: "5%",
                fontFamily: "poppins-bold",
                height: 30,
              }}
            >
              Recommendations
            </Text>
            {editBtn("SettingsStack", {screen: "Edit Recommendations", params: { name, recommendations }})}
          </View>

          <View>
            <ScrollView
              style={{ height: 145, marginTop: -25 }}
              horizontal={true}
            >
              <View style={styles.recommendationsAndBadges}>
                {recommendationsButtons}
              </View>
            </ScrollView>
          </View>
        </View>
      );
    } else {
      return null;
    }
  };

  /**
   * Accept request modal, plus choose connection circle modal
   */
  const getAcceptRequestModal = () => {
    if (relationshipStatus == "RESPONSE" || relationshipStatus == "CONNECTED") {
      const connection = {
        startTime: relationshipData.startTime,
        intent: relationshipData.intent || "",
        message:
        relationshipData.message || "",
      };

      return (
        <AcceptRequestModal
          visible={acceptRequestModal}
          toggle={toggleAcceptRequestModal}
          accepted={acceptRequest}
          data={relationshipData}
          connection={connection}
          respond={respond}
          profilePicture={{ uri: relationshipData.follower.profile_picture }}
          onModalHide={() => {}}
          connectModal={
            <ConnectModal
              visible={acceptRequestModal && acceptRequest}
              accepted={acceptRequest}
              respond={addToCircle}
            />
          }
        />
      );
    } else return null;
  };

  let followComponent = () => {
    return (
      <ChatConnectPopup
        visible={followPopup}
        toggle={toggleFollowPopup}
        name={name}
        chat={"Connect"}
        onPress={followUser}
      />
    );
  };

  let messageMeComponent = () => {
    return (
      <ChatConnectPopup
        visible={messagePopup}
        toggle={toggleMessagePopup}
        name={name}
        chat={"Chat"}
        onPress={messageUser}
      />
    );
  };

  /* REQUESTS */

  const followUser = async (intent, message) => {
    var token = await AsyncStorage.getItem("token");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", token);

    var raw = JSON.stringify({
      followeeType: "USER",
      followee: uid,
      intent: intent,
      message: message,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    let response = await fetch(
      `http://${env.host}:${env.port}/api/v1/connection`,
      requestOptions
    )
      .then((response) => response.text())
      .catch((error) => console.log("error", error));

    if (refresh) refresh();
  };

  /**
   * Respond to follow request, called from first accept request modal
   * @param {*} isAccepted true or false, if the user accepted or declined
   */
  const respond = async (isAccepted) => {
    setAcceptRequest(isAccepted);

    const token = await AsyncStorage.getItem("token");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", token);

    const raw = JSON.stringify({
      follower: relationshipData.follower._id,
      response: isAccepted,
      circle: 0,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    const response = await fetch(
      `http://${env.host}:${env.port}/api/v1/connection/respond`,
      requestOptions
    ).catch((error) => console.log("error", error));
    let responseJson = await response.json()
    if (!isAccepted) toggleAcceptRequestModal(false);
    if (refresh) refresh();
  };

  /**
   * Add the user who requested to follow you to one of your connection circles,
   * followee is in followersCircle of the follower by default
   * @param {*} circle the circle you want to put in the requesting user
   */
  const addToCircle = async (circle) => {
    toggleAcceptRequestModal();

    const token = await AsyncStorage.getItem("token");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", token);

    const raw = JSON.stringify({
      follower: relationshipData.follower._id,
      circle,
    });

    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
    };

    const response = await fetch(
      `http://${env.host}:${env.port}/api/v1/user/circle`,
      requestOptions
    ).catch((error) => console.log("error", error));

    const responseJson = await response.json();

    if (responseJson.error) {
      console.log(responseJson.error);
    }
    console.log(responseJson.message);
  };

  const messageUser = async (intent, content) => {
    //put this chat in db
    var token = await AsyncStorage.getItem("token");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", token);

    let user = JSON.parse(await AsyncStorage.getItem("user"));
    let userdoc = user.doc;

    const getChatResp = await fetch(`http://${env.host}:${env.port}/api/v1/chat`, { method: 'GET', headers: myHeaders })
    const chats = await getChatResp.json()

    // Set up for POST
    let method = 'POST'
    let uri = `http://${env.host}:${env.port}/api/v1/chat`
    let messageData = {
          type: 'help',
          intent,
          userIds: [ userdoc._id, uid],
          messages: [{ content, sentto: uid, sentby: userdoc._id }]
        }

    const [ chat ] = chats.data.filter(chat => chat.userIds.includes(uid))

    // If chat exists, change some arguments
    if (chat) {
      method = 'PATCH'
      uri = `${uri}/${chat.id}`
      messageData = { content, sentto: uid, sentby: userdoc._id }
    }

    var requestOptions = {
      method,
      headers: myHeaders,
      body: JSON.stringify(messageData),
    };

    // Perform request
    let response = await fetch(uri, requestOptions)
      .catch((error) => console.log("error", error));


    //navigate to chat screen
    navigation.navigate("ChatStack", {screen:"ChatTabScreen", params:{index:1}});
  };

  // Render the main profile screen container.
  return (
    <View style={styles.container}>
      {uid && (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{ marginTop: 20 }}
        >
          <Image
            source={require("../../../assets/leftArrow.png")}
            style={{
              height: 20,
              width: 25,
              resizeMode: "contain",
              alignSelf: "flex-start",
              marginBottom: 10,
            }}
          />
        </TouchableOpacity>
      )}

      {uid && getAcceptRequestModal()}

      {moodSelectorComponent()}
      <View style={styles.header}>
          <ProfilePictureComponent
            status={moodState ? moodState : -1}
            source={profile_picture}
            onPress={() => {
              !uid ? toggleMoodSelector() : null
            }}
            onLongPress={() => {
              !uid ? navigation.navigate("SettingsStack", {screen: "Edit Photo", params: {profile_picture}}) : null;
            }}
          />
        <View style={styles.headerText}>
          <View style={styles.editRow}>
            <Text style={styles.name}>{name}</Text>
            {editBtn("SettingsStack", {screen: "Edit Story", params: { name, experience, bio }})}
          </View>

          <Text style={{ fontFamily: "poppins-bold", marginBottom: "3%" }}>
            {currentJobTitle}{" "}
            <Text style={{ color: "orange" }}>
              {currentCompany ? `@${currentCompany}` : ""}
            </Text>
          </Text>
          <Text style={{ fontSize: 10, color: "grey" }}>
            {bio.substring(0, 80) + "..."}
          </Text>
        </View>
      </View>

      {uid ? (
        <View style={styles.buttons}>
          {followComponent()}
          <FollowMeButton
            onPress={() => {
              relationshipStatus == "RESPONSE"
                ? toggleAcceptRequestModal()
                : (relationshipStatus == "NOT CONNECTED"
                ? toggleFollowPopup()
                : followUser());
            }}
            text={
              relationshipStatus == "RESPONSE"
                ? "RESPOND TO REQUEST"
                : relationshipStatus
            }
          />
          {messageMeComponent()}
          <MessageMeButton onPress={() => {toggleMessagePopup()}} />
          <ExtrasButton
            action={() => {
              null;
            }}
          />
        </View>
      ) : (
        <View style={styles.buttons}>
          <NewPostButton
            onPress={() =>
              navigation.navigate("WriteStatus", {
                user: { name, user: username },
              })
            }
          />
          <ViewConnectionsButton
            onPress={() => navigation.navigate("Settings",{screen: "Edit Connections"})}
          />
          <ExtrasButton
            action={() => {
              null;
            }}
          />
        </View>
      )}

      {actionButtons.length > 0 && (
        <ScrollView style={styles.actionButtons} horizontal={true}>
          {actionButtons}
        </ScrollView>
      )}
      {myStoryContainer()}
      <View>
        {getTalkToMeButtons(talkToMeButtons)}
        {getICanHelpYouWith(helpMeWithButton)}
      </View>
      <View style={styles.editRow}>
        <Experience
          previousCompanies={previousCompanies}
          previousEducation={previousEducation}
          yearsOfExperience={years}
          industry={industry}
          academicLevel={academic_level}
        />
        {editBtn("SettingsStack", {screen: "Edit Experience", params: { experience }})}
      </View>
      <CommunityPreview communities={communities} navigation={navigation} />

      {recommendationsSection()}
      <View style={styles.badgesSection}>
        <Text style={{ marginVertical: "5%", fontFamily: "poppins-bold" }}>
          Badges
        </Text>
        <View style={styles.recommendationsAndBadges}>{badgeButtons}</View>
      </View>
    </View>
  );
};

export default ProfileScreen;
