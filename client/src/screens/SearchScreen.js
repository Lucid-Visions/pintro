import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  Image,
  AsyncStorage
} from "react-native";
import SlidingUpPanel from "rn-sliding-up-panel";

import SearchButtonList from "../components/SearchButtonList";
import BrowseScreen from "./BrowseScreen";

const { height } = Dimensions.get("window");

/**
 * Main screen of the Search tab.
 */
export default class SearchScreen extends React.Component {
  static navigationOptions = {
    headerLeft: "Arrow_back", // To be changed with an icon.
    headerRight: "Share_button" // To be changed with an icon.
  };
  constructor(props) {
    super(props);
    this.state = {
      networkErr: "loading",
      keywords: null,
      categories: [],
      searchResult: null,
      sliderDraggable: false
    };
  }

  setKeywords = newKeywords => {
    this.setState({ keywords: newKeywords });
  };

  addCategoryToSearch = (category, addCategory) => {
    // implement add/remove category logic
    if (!addCategory) {
      this.setState({
        categories: this.state.categories.filter(item => {
          return category != item;
        })
      });

      if (this.state.categories.length == 0) {
        this.setState({ searchResult: null });
        this._panel.hide();
        return;
      }
    } else {
      this.setState({ categories: this.state.categories.concat(category) });
    }

    this.setState({ keywords: null });
    this.fetchSearchResult("categories");
    return;
  };

  setSliderDraggable = draggable => {
    this.setState({ sliderDraggable: draggable });
  };

  async fetchSearchResult(searchType) {
    this.setState({ searchResult: null });
    let requestURL;
    let panelSlideHeight;

    if (searchType === "keywords" && this.state.keywords !== null) {
      requestURL = `http://${env.host}:${env.port}/api/v1/search?keywords=${this.state.keywords}`;
      panelSlideHeight = height / 1.1;
    } else if (
      searchType === "categories" &&
      this.state.categories.length > 0
    ) {
      requestURL = `http://${env.host}:${
        env.port
      }/api/v1/search?categories=${this.state.categories.join(" ")}`;

      panelSlideHeight = height / 3;
    }

    if (requestURL) {
      let myHeaders = new Headers();
      const userToken = await AsyncStorage.getItem("token");
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", userToken);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      const response = await fetch(requestURL, requestOptions).catch(err => {
        //display empty state
        this._panel.hide();
        this.setState({
          searchResult: null
        });
        this.setState({ networkErr: true });
        return;
      });

      if (response == null) {
        this._panel.hide();
        this.setState({
          searchResult: null
        });
        return;
      }

      this.setState({ networkErr: false });
      var responseText = await response.text();
      var responseJson = JSON.parse(responseText);

      if (responseJson.err) {
        this._panel.hide();
        this.setState({
          searchResult: null
        });
        return;
      }

      this.setState({
        searchResult: responseJson
      });

      this._panel.show({ toValue: panelSlideHeight });
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container2}>
        <View style={styles.container} showsVerticalScrollIndicator={false}>
          <View paddingHorizontal={20}>
            <Text style={styles.h1}>Browse</Text>
            <Text style={styles.h2}>Be inspired!</Text>
            <TextInput
              style={styles.placeholder}
              placeholderTextColor={"grey"}
              placeholder={
                this.state.categories.length > 0
                  ? `Searching for: ${this.state.categories.join(" ")}`
                  : "Type a keyword, tag or location"
              }
              paddingHorizontal={20}
              onChangeText={search => this.setState({ keywords: search })}
              value={this.state.keywords}
              returnKeyType="search"
              onSubmitEditing={() => this.fetchSearchResult("keywords")}
              editable={this.state.categories.length > 0 ? false : true}
            />
          </View>
          <View
            paddingTop={60}
            paddingHorizontal={20}
            style={{ alignItems: "center" }}
          >
            <Text style={styles.h2}>or Choose a Category</Text>
            <SearchButtonList searchCallback={this.addCategoryToSearch} />
          </View>

          <SlidingUpPanel
            ref={c => (this._panel = c)}
            draggableRange={{ top: height / 1.1, bottom: 70 }}
            snappingPoints={[height / 3, height / 1.1]}
            allowMomentum={true}
            showBackdrop={false}
            allowDragging={this.state.sliderDraggable}
          >
            <BrowseScreen
              searchKeywords={this.state.keywords}
              searchResult={this.state.searchResult}
              updateSearchCallback={() => this.fetchSearchResult("keywords")}
              updateSearchKeywords={this.setKeywords}
              setDraggable={this.setSliderDraggable}
            />
          </SlidingUpPanel>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  h1: {
    fontFamily: "poppins-bold",
    color: "white",
    margin: "auto",
    textAlign: "center",
    fontSize: 30,
    paddingTop: 50
  },
  h2: {
    fontFamily: "poppins-regular",
    color: "white",
    margin: "auto",
    textAlign: "center",
    alignItems: "baseline",
    fontSize: 11,
    padding: 25
  },
  slideUpBar: {
    width: 50,
    height: 50,
    resizeMode: "contain"
  },
  placeholder: {
    fontFamily: "poppins-regular",
    backgroundColor: "white",
    borderRadius: 50,
    margin: "auto",
    alignItems: "baseline",
    fontSize: 13,
    paddingVertical: 20
  },
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A",
    alignContent: "center"
  },
  container2: {
    flex: 1,
    backgroundColor: "#1A1A1A",
    justifyContent: "space-between"
  }
});
