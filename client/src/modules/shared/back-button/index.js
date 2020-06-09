import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Image } from 'react-native'

import styles from './styles';

const BackButton = ({ navigation }) => (
    navigation.canGoBack() && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.image} source={require("../../../assets/leftArrow.png")} />
        </TouchableOpacity>
    )
);

BackButton.propTypes = {
    navigation: PropTypes.object.isRequired
}

export default BackButton;