import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
} from "react-native";
import styles from "../styles";
import RecommendationButton from "../../../../components/RecommendationButton";
import BackButton from "../../../shared/icons/back-button/lightTheme";
import { updateCommunity } from "../../actions";

const EditCommunityEvents = ({ navigation, route }) => {

  const community = route.params;

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
    let events = [];

    if (arrayRecommendations) {
      arrayRecommendations.map((item, i) => {
        events.push({ id: item.id, ...item });
      });
    }

    return {
      events
    };
  };

  const [state, updateState] = useState({
    communityName: community.name,
    events: community.events || []
  });

  const setState = newState => {
    updateState(prevState => {
      return { ...prevState, ...newState };
    });
  };

  /**
   * Updates the recommendations state with the new events,
   * after the update() function
   */
  useEffect(()=> {
      const deconstructedArr = helperConstructState(state.events)
      setState({recommendations: deconstructedArr});
  },[state.events])

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
        if (state.events.length > 0){
            let idList = state.events.map(a => a.id);
            newId = Math.max(...idList)+1
        }else newId = 1

        const newRecommendation = {
            ...recommendation,
            id: newId
        }

        // add the new recommendation to an array with the old ones
        nextRecommendations = state.events.concat([newRecommendation])
    } else {
        // search the index of the recommendation we are updating
        const idx = state.events.findIndex(item => item.id === recommendation.id)
        // copy the old recommendation array and replace the updated recommendation
        const tmpRecommendations = state.events.slice();
        tmpRecommendations[idx] = recommendation
        nextRecommendations = tmpRecommendations
    }

    // update the db with the updated recommendations array
    updateCommunity(
        community._id,
        {
          events: nextRecommendations,
        }
    );

    setState({events: nextRecommendations})
  };

  
  /**
   * Creates a row with existing recommendations or empty slots for new ones
   * @param {*} type the type of the recommendation row {articles, books, videos}
   */
  const recommendationRow = type => {
    return [...Array(6)].map((x, i) => {
      if (state.events[i] != null) {
        return (
          <RecommendationButton
          key={`item-${i}`}
            editView={true}
            title={state.events[i].title}
            resource={state.events[i].resource}
            thumbnail={state.events[i].photo}
            secondaryResource={() =>
              navigation.navigate("Add Community Event", {
                update,
                type,
                editMode: true,
                data: state.events[i]
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
              navigation.navigate("Add Community Event", {
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
    <ScrollView>
      <View style={styles.container1}>
        <View style={styles.container}>
          <BackButton navigation={navigation} />
          <View>
            <Text style={styles.headerTextRecommendations}>{state.communityName}'s</Text>
            <Text style={styles.headerRecommendations}>Events</Text>
            {/* Articles */}
            <View>
              <Text style={styles.categoryHeaderBold}>Upcoming Events</Text>
              <View style={styles.recommendationsRow}>
                {recommendationRow("articles").slice(0, 3)}
              </View>
              <View style={styles.recommendationsRow}>
                {recommendationRow("articles").slice(2, 5)}
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default EditCommunityEvents;
