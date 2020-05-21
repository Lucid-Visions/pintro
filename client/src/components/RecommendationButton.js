import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image
} from "react-native";
import PropTypes from "prop-types";
import { LinearGradient } from "expo-linear-gradient";
import { WebView } from "react-native-webview";
import { Linking } from "expo";

/**
 * Represents a button that redirects the user to a given resource.
 * @param {string} title the title of recommendation.
 *
 * !!!! ARTICLE CHECK IS MISSING
 * If the title is an article, it should redirect to the article within the app.
 */
const RecommendationButton = ({
  title,
  resource,
  editView,
  secondaryResource,
  thumbnail
}) => {
  if (title == "empty" || title == null) {
    return (
      <TouchableOpacity style={styles.container} onPress={secondaryResource}>
          <ImageBackground
            source={ require("../assets/emptyRecommendation.png")}
            style={{ width: "100%", height: "100%" }}
            borderRadius={20 / 2}
          />
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => Linking.openURL(resource)}
    >
      <LinearGradient
        colors={["transparent", "black" ]}
        style={{ borderRadius: 15 }}
      >
        <ImageBackground
          source={thumbnail!=null ? {uri: thumbnail} : require("../assets/empty-profile-picture.png")}
          style={{ width: "100%", height: "100%" }}
          borderRadius={15}
          imageStyle={{ opacity: 0.65 }}
        >
          {editView && (
            <TouchableOpacity onPress={secondaryResource}>
              <Image
                source={require("../assets/editPenWhite.png")}
                style={styles.ediPen}
              />
            </TouchableOpacity>
          )}
          <View style={styles.text}>
            <Text
              style={{
                fontFamily: "poppins-medium",
                color: "white"
              }}
            >
              {title.length < 8 ? title : `${title.slice(0, 8)}...`}
            </Text>
            {!editView && (
              <Text
                style={{
                  fontFamily: "poppins-regular",
                  color: "white",
                  fontSize: 12
                }}
              >
                View →
              </Text>
            )}
          </View>
        </ImageBackground>
      </LinearGradient>
    </TouchableOpacity>
  );
};

// title checker
RecommendationButton.propTypes = {
  title: PropTypes.string.isRequired,
  resource: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  container: {
    height: 110,
    width: 110,
    borderRadius: 15,
    marginHorizontal: 10
  },
  text: {
    position: "absolute",
    bottom: 0,
    marginLeft: 10,
    marginBottom: 5
  },
  ediPen: {
    position: "absolute",
    resizeMode: "contain",
    height: 17,
    margin: 10,
    right: -15
  }
});

export default RecommendationButton;
