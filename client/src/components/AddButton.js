
import React from "react"
import { TouchableOpacity, Text, Image, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

class AddButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            image: './assets/addButton.png',
            action: props.action
        }
    }

    render() {
        return (
            <TouchableOpacity style={styles.btn} onPress={this.state.action}>
                <Ionicons name="ios-add-circle-outline" size={20} color="grey"/>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    btn: {
        alignItems: 'center',
        marginVertical: 10,
    }
});

export default AddButton