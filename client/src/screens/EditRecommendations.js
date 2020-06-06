import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image
} from "react-native";
import Constants from "expo-constants";
import RecommendationButton from "../components/RecommendationButton";
import { useNavigation } from "@react-navigation/native";

const updateRequest = require("../assets/updateRequest").update;

const EditRecommendations = ({ route }) => {
  const navigation = useNavigation();
  const user = route.params;

  /**
   * Deconstruct the updated recommendation array 
   * for easy use in the program
   * recommendations :{
   *    articles: {},
   *    books: {},
   *    videos: {}
   * }
   */
  const helperConstructState = arrayRecommendations => {
    let articles = [];
    let books = [];
    let videos = [];

    if (arrayRecommendations) {
      arrayRecommendations.map((item, i) => {
        if (item.type.toLowerCase() === "articles")
          articles.push({ id: item.id, ...item });
        else if (item.type.toLowerCase() === "books")
          books.push({ id: item.id, ...item });
        else if (item.type.toLowerCase() === "videos")
          videos.push({ id: item.id, ...item });
      });
    }

    return {
      articles,
      books,
      videos
    };
  };

  const initialState = helperConstructState(user.recommendations);

  const [state, updateState] = useState({
    userName: user.name,
    recommendations: initialState,
    itemsArray: user.recommendations
  });

  const setState = newState => {
    updateState(prevState => {
      return { ...prevState, ...newState };
    });
  };

  /**
   * Updates the recommendations state with the new itemsArray,
   * after the update() function
   */
  useEffect(()=> {
      const deconstructedArr = helperConstructState(state.itemsArray)
      setState({recommendations: deconstructedArr});
  },[state.itemsArray])

  /**
   * creates a new recommendation or updates an existing one
   * @param {*} recommendation a recommendation object returned from the
   * add recommendation screen
   */
  const update = recommendation => {
      let nextRecommendations

    // check if the recommendation is new, or updated one
    if(recommendation.id == 0){
        let newId;
        // construct the new id of the recommendation
        if (state.itemsArray.length > 0){
            let idList = state.itemsArray.map(a => a.id);
            newId = Math.max(...idList)+1
        }else newId = 1

        const newRecommendation = {
            ...recommendation,
            id: newId
        }

        // add the new recommendation to an array with the old ones
        nextRecommendations = state.itemsArray.concat([newRecommendation])
    } else {
        // search the index of the recommendation we are updating
        const idx = state.itemsArray.findIndex(item => item.id === recommendation.id)
        // copy the old recommendation array and replace the updated recommendation
        const tmpRecommendations = state.itemsArray.slice();
        tmpRecommendations[idx] = recommendation
        nextRecommendations = tmpRecommendations
    }

    // update the db with the updated recommendations array
    updateRequest({recommendations: nextRecommendations})

    setState({itemsArray: nextRecommendations})
  };

  
  /**
   * Creates a row with existing recommendations or empty slots for new ones
   * @param {*} type the type of the recommendation row {articles, books, videos}
   */
  const recommendationRow = type => {
    return [...Array(6)].map((x, i) => {
      if (state.recommendations[type][i] != null) {
        return (
          <RecommendationButton
          key={`item-${i}`}
            editView={true}
            title={state.recommendations[type][i].title}
            resource={state.recommendations[type][i].resource}
            thumbnail={state.recommendations[type][i].photo}
            secondaryResource={() =>
              navigation.navigate("Add Recommendation", {
                update,
                type,
                editMode: true,
                data: state.recommendations[type][i]
              })
            }
          />
        );
      } else
        return (
          <RecommendationButton
          key={`item-${i}`}
            title={"empty"}
            resource={""}
            secondaryResource={() =>
              navigation.navigate("Add Recommendation", {
                update,
                type,
                id: 0
              })
            }
          />
        );
    });
  };

  return (
    <ScrollView style={styles.container2} showsVerticalScrollIndicator={false}>
      <View style={styles.container1}>
        <View style={styles.container}>
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
          <View>
            <Text style={styles.subTitle}>{state.userName}'s</Text>
            <Text style={styles.title}>Recommendations</Text>
            {/* Articles */}
            <View>
              <Text style={styles.categoryHeader}>Articles</Text>
              <View style={styles.recommendationsRow}>
                {recommendationRow("articles").slice(0, 3)}
              </View>
              <View style={styles.recommendationsRow}>
                {recommendationRow("articles").slice(2, 5)}
              </View>
            </View>
            {/* Books */}
            <View>
              <Text style={styles.categoryHeader}>Books</Text>
              <View style={styles.recommendationsRow}>
                {recommendationRow("books").slice(0, 3)}
              </View>
            </View>
            {/* Videos */}
            <View>
              <Text style={styles.categoryHeader}>Videos</Text>
              <View style={styles.recommendationsRow}>
                {recommendationRow("videos").slice(0, 3)}
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

styles = StyleSheet.create({
  title: {
    fontFamily: "poppins-bold",
    color: "black",
    margin: "auto",
    textAlign: "left",
    fontSize: 26,
    padding: 20,
    paddingTop: 0
  },
  subTitle: {
    fontFamily: "poppins-regular",
    color: "grey",
    margin: "auto",
    alignItems: "baseline",
    fontSize: 12,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 0
  },

  categoryHeader: {
    fontFamily: "poppins-semi-bold",
    margin: "auto",
    textAlign: "left",
    alignItems: "baseline",
    fontSize: 14,
    padding: 20
  },
  btn: {
    fontFamily: "poppins-medium",
    width: 350,
    marginTop: 30,
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  container2: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    alignContent: "center"
  },
  recommendationsRow: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    paddingBottom: 15
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center"
  },
  tagScrollContainer: {
    overflow: "hidden"
  }
});

export default EditRecommendations;
