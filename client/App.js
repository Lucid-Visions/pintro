import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import * as Font from "expo-font";
import Redirect from "./src/components/HandleRedirect";
import { InAppNotificationProvider} from "react-native-in-app-notification";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
    };
  }


  async componentDidMount() {
    Redirect._addLinkingListener();

    await Font.loadAsync({
      "poppins-bold": require("./src/assets/poppins_font/Poppins-Bold.otf"),
      "poppins-black": require("./src/assets/poppins_font/Poppins-Black.otf"),
      "poppins-light": require("./src/assets/poppins_font/Poppins-Light.otf"),
      "poppins-medium": require("./src/assets/poppins_font/Poppins-Medium.otf"),
      "poppins-regular": require("./src/assets/poppins_font/Poppins-Regular.otf"),
      "poppins-semi-bold": require("./src/assets/poppins_font/Poppins-SemiBold.otf")
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    if (this.state.fontLoaded) {
      return (
        <InAppNotificationProvider>
          <AppNavigator />
        </InAppNotificationProvider>
      );
    } else {
      return null;
    }
  }
}
export default App;
