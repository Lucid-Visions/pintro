import React from 'react';
import { StyleSheet, View, TextInput, Image } from 'react-native';

/**
 *
 */
export default class ChatSearchToolbar extends React.Component {
  constructor(props) {
      super(props);

      // this.state = {
      //   searchInput: ""
      // }

      this.onChangeTextHandler = this.onChangeTextHandler.bind(this);
  };

  onChangeTextHandler(newValue){
    // this.setState({ searchInput: newValue });
    this.props.onTyping(newValue);
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.innerContainer}>

          <Image source={require('../assets/SearchIcon.png')}  style={styles.searchIcon}/>

          <TextInput
              style={{ flex: 1 }}
              onChangeText={this.onChangeTextHandler}
              placeholder={"Search..."}
          />

        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    borderColor: 'lightgray',
    // borderBottomWidth: 1.0,
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 15,
    marginRight: 10,
    marginLeft: 10,
    borderColor: 'gray',
    borderWidth: 1.2,
    borderRadius: 30,
    backgroundColor: "#f2f2f2" //"white"
  },
  searchIcon: {
    height: 25,
    width: 25,
    margin: 10,
    opacity: 0.5
  }
});
