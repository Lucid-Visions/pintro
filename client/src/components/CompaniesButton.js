import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import ElevatedView from 'react-native-elevated-view'
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';

/**
 * Renders an action button for the user's profile.
 * @param {string} name the type of the button.
 * @param {string} context the specific topic related to the company. 
 * @param {string} source the company picture path.
 */
const CompaniesButtonComponent = ({ name, text, source }) => (

    <ElevatedView style={styles.view} elevation={10}>
        <TouchableOpacity style={styles.container}>
            <View style={styles.outline}>
                <Image
                    style={styles.image}
                    source={source || require('../assets/empty-profile-picture.png')}
                />
            </View>
            <View style={styles.text}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.subtitle}>{text}</Text>
            </View>
        </TouchableOpacity>
    </ElevatedView>
);

// Type checker
CompaniesButtonComponent.propTypes = {
    name: PropTypes.string,
    text: PropTypes.string,
    source: PropTypes.number,
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
        backgroundColor: 'white',
        borderRadius: 15,
        width: '85%',
        resizeMode: 'contain',
        padding: 20
    },
    text: {
        flexDirection: 'column',
        left: 'auto',
        marginLeft: 5,
        marginTop: 5
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16
    },
    subtitle: {
        fontWeight: 'normal',
        fontSize: 12,
        color: 'grey'
    },
    outline: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginLeft: 0,
        padding: 2,
    },
    image: {
        borderRadius: 150 / 2,
        width: 40,
        height: 40,
        overflow: 'hidden'
    }
});

export default CompaniesButtonComponent;