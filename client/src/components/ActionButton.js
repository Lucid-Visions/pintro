import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import ElevatedView from 'react-native-elevated-view'
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';

/**
 * Renders an action button for the user's profile.
 * @param {string} type the type of the button.
 * @param {string} context the specific topic related to the type. 
 */
const ActionButtonComponent = ({ type, context }) => (

    <ElevatedView style={styles.view} elevation={10}>
        <TouchableOpacity style={styles.container}>
            <View style={styles.text}>
                <Text style={styles.title}>{resolveType(type)}</Text>
                <Text style={styles.subtitle}>{context}</Text>
            </View>
            <View style={styles.outline}>
                <View style={styles.icon}>
                    <Ionicons name="ios-chatbubbles" size={32} />
                </View>
            </View>
        </TouchableOpacity>
        </ElevatedView>
);

/**
 * Displays text according to the input type.
 * @param {string} type the type of the button.
 */
function resolveType(type) {
    switch (type) {
        case "help": return "Help me with";
        case "introduce": return "Introduce me to";
        case "talk": return "Talk to me about";
    }
}

/**
 * Custom validator for the type input.
 */
const typeValidator = (props, propName, componentName) => {
    let component = componentName || 'ANONYMOUS';
    let validTypes = ["help", "introduce", "talk"];

    if (props[propName]) {
        let value = props[propName];
        return validTypes.includes(value)
            ? null
            : new Error(`${value} is not a valid type! Only ${validTypes.toString()} are permitted.`);
    }

    //Assume everything is ok
    return null;
}

// Type checker
ActionButtonComponent.propTypes = {
    type: typeValidator,
    context: PropTypes.string,
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    view: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 15,
        width: 350,
        height: '10%',
        padding: 20,
        minHeight: 100,
        margin: 4,
    },
    text: {
        flexDirection: 'column',
        left: 'auto',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 22
    },
    subtitle: {
        fontWeight: 'normal',
        fontSize: 18,
        color: 'grey'
    },
    outline: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:-5,
        flexDirection: 'row',
        right:20,
        position:"absolute",
        padding: 2,
        borderWidth: 2,
        borderColor: 'orange',
        borderRadius: 150 / 2
    },
    icon: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginLeft: 'auto',
        backgroundColor: 'orange',
        width: 50,
        height: 50,
        borderRadius: 50 / 2,

    }
});

export default ActionButtonComponent;