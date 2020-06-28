import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChatScreen from '../screens/ChatScreen';
import ChatTabScreen from "../components/ChatTabScreen";
import ChatList from '../components/ChatList';
import ProfileStack from './ProfileStack';
const Stack = createStackNavigator();

/**
 * Stack navigator for the chat tab.
 */
function ChatStack({navigation, route}) {

    if (route.state && route.state.index > 0) {
     navigation.setOptions({tabBarVisible: false});
     } else {
     navigation.setOptions({tabBarVisible: true});
    }

    return (
        <Stack.Navigator 
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="ChatTabScreen" component={ChatTabScreen} />
            <Stack.Screen name="ChatList" component={ChatList} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="ProfileStack" component={ProfileStack} />
        </Stack.Navigator>
    );
};

export default ChatStack;
