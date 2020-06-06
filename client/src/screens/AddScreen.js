import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { WGOModal } from '../components/WGOModal';
/**
 * Main screen of the add tab.
 */
export default class AddScreen extends React.Component {
  static navigationOptions = {
    headerLeft: "Arrow_back", // To be changed with an icon.
    headerRight: "Share_button" // To be changed with an icon.
  };

  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      isSelected: false
    }
  }

  render() {
    const toggleModal = () => {
      this.setState({
        isModalVisible: !this.state.isModalVisible
      })
    }

    return (
      <View style={styles.container}>
        <View>
          <View style={{ marginTop: 50 }}>
            <TouchableOpacity onPress={() => toggleModal()}>
              <Text style={{ textAlign: 'center' }}>Click to open the modal</Text>
            </TouchableOpacity>
            <WGOModal />
          </View>
        </View>
      </View>
    );
  }
}


