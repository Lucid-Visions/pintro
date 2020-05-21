import React, { Component } from "react"
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import ProfilePictureComponent from '../components/ProfilePicture';
import { FollowMeButton } from '../components/ProfileActionButtons';
import { MessageMeButton } from '../components/ProfileActionButtons';
import { ExtrasButton } from '../components/ProfileActionButtons';
import ActionButtonComponent from '../components/ActionButton';
import Tag from "../components/Tag"
import TagsData from "../assets/TagsData"

export default class TagScreen extends Component {
    static navigationOptions = {
        headerLeft: "Arrow_back", // To be changed with an icon.
        //headerRight: "Share_button" // To be changed with an icon.
    }
    render() {
        // Prepare all tags for rendering.
        const tagsItems = TagsData.map(item => <Tag item={item} i={3} />)
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <Text style={styles.header}>How can you help others?</Text>
                    <Text style={styles.text}>Choose your superpowers (6 minimum)</Text>
                    <View style={styles.viewContainer}>
                    {tagsItems}
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        fontFamily: "poppins-bold",
        color: "white",
        margin: "auto",
        textAlign: "left",
        fontSize: 30,
        fontWeight: "bold",
        padding: 10
    },
    text: {
        fontFamily: "poppins-regular",
        color: "white",
        margin: "auto",
        textAlign: "left",
        fontSize: 15,
        padding: 10
    },
    container: {
        backgroundColor: '#1A1A1A',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    viewContainer:{
        flex: 1,
        flexDirection: 'row',
        flexWrap: "wrap",
        padding: 10
    }
})