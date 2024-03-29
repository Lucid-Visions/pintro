import React from "react"
import { InAppNotificationProvider} from "react-native-in-app-notification"
import * as Font from "expo-font"
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';

import AppNavigator from "./src/navigation/AppNavigator"
import Redirect from "./src/components/HandleRedirect"
import reducers from './src/reducers'

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

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
        <Provider store={store}>
          <InAppNotificationProvider>
            <AppNavigator />
          </InAppNotificationProvider>
        </Provider>
      );
    } else {
      return null;
    }
  }
}
export default App;
