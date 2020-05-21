import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from '../screens/SearchScreen';
import UserProfileHandler from '../components/UserProfileHandler'
import CompanyScreen from '../components/BusinessProfileHandler';
import ChatStack from "../navigation/ChatStack"


const Stack = createStackNavigator();

/**
 * Stack navigator for the search tab.
 */
function SearchStack() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="Profile" component={UserProfileHandler} />
            <Stack.Screen name="Business" component={CompanyScreen} />
            <Stack.Screen name="ChatStack" component={ChatStack} />
        </Stack.Navigator>
    );
};

export default SearchStack;