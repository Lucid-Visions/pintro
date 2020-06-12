import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChatScreen from '../screens/ChatScreen';
import ChatTabScreen from "../components/ChatTabScreen";
import ProfileScreen from '../modules/users/profile/index';
import Chats from '../components/ChatsComponent';
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
        <Stack.Navigator>
            <Stack.Screen name="ChatTabScreen" component={ChatTabScreen} options={{headerShown: false}} />
            <Stack.Screen name="ChatList" component={Chats} options={{headerShown: false}} />
            <Stack.Screen name="Chat" component={ChatScreen} options={{headerShown: false /*the screen has a custom header*/}} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
    );
};

export default ChatStack;
