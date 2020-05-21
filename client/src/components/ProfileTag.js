import React, { useState } from "react"
import { Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import PropTypes from 'prop-types';

/**
 * Represents a tag in the profile page.
 * @param {string} title the text inside the tag.
 */
const ProfileTag = ({ title, isHelp }) => {
    return (
        <TouchableOpacity style={isHelp ? styles.isHelp : styles.tags} >
            <Text adjustsFontSizeToFit style={isHelp ? styles.isHelpText : styles.text}>{title.toLowerCase()}</Text>
        </TouchableOpacity>
    )
};

// Type checker
ProfileTag.propTypes = {
    title: PropTypes.string,
    isHelp: PropTypes.bool
};

const styles = StyleSheet.create({
    tags: {
        alignItems: 'center',
        backgroundColor: 'black',
        height: 25,
        borderRadius: 40 / 2,
        borderWidth: 1,
        margin: '2%',
        flexGrow: 1
    },
    text: {
        color: 'white',
        fontVariant: ['small-caps']
    },
    isHelp: {
        alignItems: 'center',
        height: 25,
        borderRadius: 40 / 2,
        borderWidth: 1,
        margin: '2%',
        flexGrow: 1
    },
    isHelpText: {
        color: 'black',
        fontVariant: ['small-caps']
    }
});

export default ProfileTag;
