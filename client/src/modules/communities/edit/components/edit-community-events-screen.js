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

  const initialState = helperConstructState(community.events);

  const [state, updateState] = useState({
    communityName: community.name,
    events: initialState,
    itemsArray: community.events || []
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
    console.log(recommendation.id)
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
        //console.log('next recommendations: ', nextRecommendations)
    } else {
        // search the index of the recommendation we are updating
        const idx = state.itemsArray.findIndex(item => item.id === recommendation.id)
        // copy the old recommendation array and replace the updated recommendation
        const tmpRecommendations = state.itemsArray.slice();
        tmpRecommendations[idx] = recommendation
        nextRecommendations = tmpRecommendations
    }
    
    console.log(nextRecommendations)

    // update the db with the updated recommendations array
    updateCommunity(
        community._id,
        {
          events: nextRecommendations,
        }
    );

    setState({itemsArray: nextRecommendations})
  };

  
  /**
   * Creates a row with existing recommendations or empty slots for new ones
   * @param {*} type the type of the recommendation row {articles, books, videos}
   */
  const recommendationRow = type => {
    return [...Array(6)].map((x, i) => {
      if (state.events.events[i] != null) {
        return (
          <RecommendationButton
          key={`item-${i}`}
            editView={true}
            title={state.events.events[i].title}
            resource={state.events.events[i].resource}
            thumbnail={state.events.events[i].photo}
            secondaryResource={() =>
              navigation.navigate("Add Community Event", {
                update,
                type,
                editMode: true,
                data: state.events.events[i]
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
