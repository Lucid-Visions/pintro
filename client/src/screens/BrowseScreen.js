import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity
} from "react-native";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";
import { filters } from "../assets/resultFilters";

//import all the components needed
import ProfilePictureComponent from "../components/ProfilePicture";
import CompaniesButtonComponent from "../components/CompaniesButton";
import HubsButtonComponent from "../components/HubsButton";
import FeedComponent from "../components/FeedItem";
import ResultFilterModal from "../components/ResultsFilterModal";
import NoResultModal from "../components/NoResultModal";

const BrowseScreen = ({
  searchKeywords,
  searchResult,
  updateSearchCallback,
  updateSearchKeywords,
  setDraggable
}) => {
  const navigation = useNavigation();
  if (searchResult) {
    // states
    const [noResultModalVisible, setVisible] = useState(true);
    const [result, updateResult] = useState({
      people: searchResult.people,
      companies: searchResult.companies,
      content: searchResult.content,
      hubs: searchResult.hubs,
      spaces: searchResult.spaces
    });
    const [expanded, setExpanded] = useState({
      people: false,
      companies: false,
      articles: false,
      hubs: false,
      spaces: false
    });
    const [filtering, setFilters] = useState({
      modalVisible: false,
      investment: false,
      hiring: false
    });

    // edit a field in the result state with key and value
    const editResultState = (key, value) => {
      updateResult(prevState => {
        return { ...prevState, [key]: value };
      });
    };

    //toggle the empty result modal
    const toggleNoResultModal = () => {
      setVisible(prevState => {
        return !prevState;
      });
    };

    // expand result container with key
    const expandContainer = key => {
      setExpanded(prevState => {
        return { ...prevState, [key]: !prevState[key] };
      });
    };

    // toggle the filters pop-up
    const toggleFiltersModal = () => {
      setFilters(prevState => {
        return { ...prevState, modalVisible: !prevState.modalVisible };
      });
    };

    // toggle a filter
    const toggleFilter = filter => {
      setFilters(prevState => ({ ...prevState, [filter]: !prevState[filter] }));
    };

    const applyFilters = () => {
      if (filtering.investment) {
        editResultState(
          "companies",
          result.companies.filter(company => {
            return company.seeking_investment === true;
          })
        );
      }

      if (filtering.hiring) {
        editResultState(
          "companies",
          result.companies.filter(company => {
            return company.currently_hiring === true;
          })
        );
      }
    };

    // apply filters after one is toggled
    useEffect(() => {
      // return result to initial state
      editResultState("companies", searchResult.companies);
      applyFilters();
    }, [filtering]);

    // component to render teh filters as text
    const FiltersTextComponent = () => {
      return (
        <ScrollView
          style={{ paddingLeft: 20, paddingTop: 5 }}
          horizontal={true}
        >
          <Text style={styles.filtersContainer}>
            Filters:{"  "}
            {filtering.investment &&
              `${filters["investment"].name} (${filters["investment"].type})`}{" "}
            {filtering.hiring &&
              `${filters["hiring"].name} (${filters["hiring"].type})`}
          </Text>
        </ScrollView>
      );
    };

    // Render all the people from the search results
    const renderPeople = result.people.map((user, index) => {
      return (
        <View style={{ paddingRight: 20 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Profile", { uid: user._id })}
          >
            <ProfilePictureComponent
              key={index}
              source={user.profile_picture}
              status={user.mood}
              onPress={() => navigation.navigate("Profile", { uid: user._id })}
            />
            <Text style={styles.profileName}>{user.name}</Text>
          </TouchableOpacity>
        </View>
      );
    });

    // Render all the companies from the search result
    const renderCompanies = result.companies.map((company, index) => {
      return (
        <View style={{ alignItems: "center", paddingBottom: 20 }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Business", {
                bio: company.bio,
                name: company.name
              })
            }
          >
            <CompaniesButtonComponent key={index} name={company.name} text={company.bio} />
          </TouchableOpacity>
        </View>
      );
    });

    // TODO: Render all the content from the search result
    const renderArticles = result.content.map((article, index) => {
      return (
        <View>
          <TouchableOpacity
            onPress={() => {
              console.log("Open article ", article.title);
              //navigation.navigate("Article")
            }}
          >
            <FeedComponent
            key={index}
              name={article.author.name}
              timeAgo={article.date_stamp}
              post={article.text}
              likes={article.likes.length}
              comments={article.comments.length}
              hashtag1={"#hey"}
              hashtag2={"#heyhey"}
              hashtag3={"#hello"}
              data={article}
            />
          </TouchableOpacity>
        </View>
      );
    });

    // Render all the hubs from the search result
    const renderHubs = result.hubs.map((hub, index) => {
      return (
        <View style={{ paddingRight: 20 }}>
          <TouchableOpacity
            onPress={
              () => console.log("Open hub ", hub.name)
              //   navigation.navigate("Hub");
            }
          >
            <HubsButtonComponent
            key={index}
              name={hub.name}
              number={hub.members.length}
              source={hub.profile_picture}
              firstMember={hub.members[0]}
              secondMember={hub.members[1]}
              thirdMember={hub.members[2]}
            />
          </TouchableOpacity>
        </View>
      );
    });

    // TODO: Render all the spaces from the search result
    const renderSpaces = result.spaces.map((space, index) => {
      return (
        <View>
          <TouchableOpacity
            onPress={() => {
              console.log("Open space", space.name);
              // navigation.navigate("Space");
            }}
          ></TouchableOpacity>
        </View>
      );
    });

    const resultSize =
      result.people.length +
      result.companies.length +
      result.content.length +
      result.hubs.length +
      result.spaces.length;

    if (resultSize === 0) {
      return (
        <NoResultModal
          isVisible={noResultModalVisible}
          toggle={toggleNoResultModal}
        />
      );
    }

    // Render the Browse page
    return (
      <View>
        <TouchableOpacity
          onPressIn={() => setDraggable(true)}
          onPressOut={() => setDraggable(false)}
        >
          <View style={styles.slidingContainer}>
            <Image
              style={styles.slideUpBar}
              source={require("../assets/SwipeUp.png")}
            />
          </View>
        </TouchableOpacity>
        <ScrollView
          style={styles.container}
          contentInsetAdjustmentBehavior="automatic"
        >
          <View marginBottom={200}>
            {searchKeywords != null && (
              <View>
                <Text style={styles.header}>Results ({resultSize})</Text>
                <Text style={styles.headerText}>
                  Found what you are looking for?
                </Text>
                <View style={styles.selectContainer}>
                  <TextInput
                    style={styles.placeholder}
                    placeholderTextColor={"grey"}
                    placeholder={searchKeywords}
                    paddingHorizontal={20}
                    onChangeText={search => updateSearchKeywords(search)}
                    value={searchKeywords}
                    returnKeyType="search"
                    onSubmitEditing={() => updateSearchCallback()}
                  />
                  <TouchableOpacity onPress={() => toggleFiltersModal()}>
                    <Image
                      style={{
                        height: 18,
                        width: 18
                      }}
                      source={require("../assets/filter.png")}
                    />
                  </TouchableOpacity>
                  <ResultFilterModal
                    toggle={toggleFiltersModal}
                    filterToggle={toggleFilter}
                    activeFilters={filtering}
                  />
                </View>
                {(filtering.hiring === true ||
                  filtering.investment === true) && <FiltersTextComponent />}
              </View>
            )}
            <View>
              {result.people.length > 0 && (
                <View style={{ paddingVertical: 30 }}>
                  <View style={styles.resultHeaderRowContainer}>
                    <Text style={styles.categoryHeader}>People</Text>
                    <TouchableOpacity onPress={() => expandContainer("people")}>
                      <Text style={{ color: "grey", fontSize: 11 }}>
                        {expanded.people ? "Less" : "See all"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <ScrollView horizontal={true}>
                    {expanded.people ? renderPeople : renderPeople.slice(0, 2)}
                  </ScrollView>
                </View>
              )}

              {result.companies.length > 0 && (
                <View style={{ paddingVertical: 30 }}>
                  <View style={styles.resultHeaderRowContainer}>
                    <Text style={styles.categoryHeader}>Companies</Text>
                    <TouchableOpacity onPress={() => expandContainer("companies")}>
                      <Text style={{ color: "grey", fontSize: 11 }}>
                        {expanded.companies ? "Less" : "See all"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <ScrollView>
                    {expanded.companies
                      ? renderCompanies
                      : renderCompanies.slice(0, 2)}
                  </ScrollView>
                </View>
              )}

              {result.content.length > 0 && (
                <View style={{ paddingVertical: 30 }}>
                  <View style={styles.resultHeaderRowContainer}>
                    <Text style={styles.categoryHeader}>Articles</Text>
                    <TouchableOpacity onPress={() => expandContainer("articles")}>
                      <Text style={{ color: "grey", fontSize: 11 }}>
                        {expanded.articles ? "Less" : "See all"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <ScrollView horizontal={true}>
                    {expanded.articles
                      ? renderArticles
                      : renderArticles.slice(0, 1)}
                  </ScrollView>
                </View>
              )}

              {result.spaces.length > 0 && (
                <View style={{ paddingVertical: 30 }}>
                  <View style={styles.resultHeaderRowContainer}>
                    <Text style={styles.categoryHeader}>Communities</Text>
                    <TouchableOpacity onPress={() => expandContainer("spaces")}>
                      <Text style={{ color: "grey", fontSize: 11 }}>
                        {expanded.spaces ? "Less" : "See all"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <ScrollView>
                    {expanded.spaces ? renderSpaces : renderSpaces.slice(0, 1)}
                  </ScrollView>
                </View>
              )}

              {result.hubs.length > 0 && (
                <View style={{ paddingVertical: 30 }}>
                  <View style={styles.resultHeaderRowContainer}>
                    <Text style={styles.categoryHeader}>Hubs</Text>
                    <TouchableOpacity onPress={() => expandContainer("hubs")}>
                      <Text style={{ color: "grey", fontSize: 11 }}>
                        {expanded.hubs ? "Less" : "See all"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <ScrollView>
                    {expanded.hubs ? renderHubs : renderHubs.slice(0, 1)}
                  </ScrollView>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  } else return null;
};

const styles = StyleSheet.create({
  header: {
    fontFamily: "poppins-bold",
    margin: "auto",
    textAlign: "center",
    fontSize: 30,
    paddingTop: 50
  },
  headerText: {
    fontFamily: "poppins-regular",
    margin: "auto",
    textAlign: "center",
    alignItems: "baseline",
    fontSize: 12,
    padding: 25
  },
  categoryHeader: {
    fontFamily: "poppins-semi-bold",
    margin: "auto",
    textAlign: "left",
    alignItems: "baseline",
    fontSize: 14,
    paddingBottom: 10
  },
  profileName: {
    fontFamily: "poppins-regular",
    margin: "auto",
    textAlign: "center",
    alignItems: "baseline",
    fontSize: 10,
    paddingTop: 10,
    paddingBottom: 10
  },
  slideUpBar: {
    width: 50,
    height: 50,
    resizeMode: "contain"
  },
  placeholder: {
    flex: 1,
    fontFamily: "poppins-regular",
    backgroundColor: "white",
    borderRadius: 50,
    margin: "auto",
    alignItems: "baseline",
    fontSize: 13,
    paddingVertical: 20
  },
  slidingContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    paddingVertical: 10
  },
  container: {
    height: "100%",
    width: "100%",
    maxWidth: "100%",
    flexDirection: "column",
    backgroundColor: "#F2F2F2",
    paddingLeft: "5%",
    paddingRight: "5%",
    borderRadius: 20
  },
  resultHeaderRowContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  selectContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 20,
    borderRadius: 50,
    backgroundColor: "white"
  },
  filtersContainer: {
    fontFamily: "poppins-regular",
    fontSize: 9,
    color: "grey",
    paddingRight: 5
  }
});

export default BrowseScreen;
