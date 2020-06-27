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
        <View style={styles.text}>
            <TouchableOpacity>
                <Text style={styles.title}>{resolveType(type)}</Text>
                <Text style={styles.subtitle}>{context.substring(0,45)+(context.length > 45?"...":"")}</Text>
            </TouchableOpacity>
        </View>
    
        <View style={styles.outline}>
            <TouchableOpacity>
                <View style={styles.icon}>
                    <Ionicons name="ios-chatbubbles" size={25} />
                </View>
            </TouchableOpacity>
        </View>   
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
        flex:1,
        flexDirection: 'row',
        borderColor: 'red',
        borderWidth: 1,
        width: '90%'
    },
    view: {
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 15,
        width: '85%',
        marginTop: 17
    },
    title: {
        fontWeight: 'bold',
        fontSize: 13,
    },
    subtitle: {
        fontWeight: 'normal',
        fontSize: 11,
        color: 'black',
        marginBottom: 10
    },
    outline: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 'auto'
    },
    icon: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 'auto',
        backgroundColor: 'orange',
        width: 38,
        height: 38,
        borderRadius: 50 / 2,
        marginTop: -5,
        marginBottom: 10
    }
});

export default SmallActionComponent;
