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
const SmallActionComponent = ({ type, context }) => (

    <ElevatedView style={styles.view}>
        <TouchableOpacity style={styles.container}>
            <View style={styles.text}>
                <Text style={styles.title}>{resolveType(type)}</Text>
                <Text style={styles.subtitle}>{context.substring(0,35)+(context.length > 35?"...":"")}</Text>
            </View>
            <View style={styles.outline}>
                <View style={styles.icon}>
                    <Ionicons name="ios-chatbubbles" size={25} />
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
        case "talktomeabout": return "Talk to me about";
        case "promoteme": return "Promote me";
        case "letscollaborate": return "Let's collaborate";
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
            : new Error(`${propName} is not a valid input! Only ${validInputs.toString()} are permitted.`);
    }

    //Assume everything is ok
    return null;
}

// Type checker
SmallActionComponent.propTypes = {
    type: typeValidator,
    context: PropTypes.string,
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        borderColor: 'red',
    },
    view: {
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 15,
        width: '85%',
        marginTop: 17
    },
    text: {
        flexDirection: 'column',
        left: 0,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 13,
    },
    subtitle: {
        fontWeight: 'normal',
        fontSize: 10,
        color: 'grey',
        marginBottom: 10,
        width: 100
    },
    outline: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginLeft: 'auto',

    },
    icon: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginLeft: 'auto',
        backgroundColor: 'orange',
        width: 38,
        height: 38,
        borderRadius: 50 / 2,
        marginLeft: 160,
        marginTop: -5,
        marginBottom: 10
    }
});

export default SmallActionComponent;
