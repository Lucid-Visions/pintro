import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { StyleSheet } from "react-native";

const EditButton = ({ navigation, screen, params }) => {
    return (
        <TouchableOpacity onPress={() => navigation ? navigation.navigate(screen, params) : null }>
            <Image
                source={require("../../assets/editPen.png")}
                style={styles.editPen}
            />
        </TouchableOpacity>
    );
};

EditButton.propTypes = {
    screen: PropTypes.string.isRequired,
    params: PropTypes.object
}

const styles = StyleSheet.create({
    editPen: {
        resizeMode: "contain",
        marginTop: 10,
        height: 17,
    }
})

export default EditButton