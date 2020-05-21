import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, Text, TextInput } from 'react-native';
import ProfilePictureComponent from '../components/ProfilePicture';

class StatusTextInput extends Component {
    constructor(props) {
        super(props)
        this.maxLength = 300

        this.state = {
            status: "",
            textLength: 0
        }
    }

    onChangeText(text, status){
        this.setState({
            textLength: text.length,
            status
        })

        if(this.props.onChange){
            this.props.onChange(status)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.profPic}>
                    <ProfilePictureComponent source={this.props.userData.profile_picture}/>
                </View>
                <View style={styles.blackSquare}>
                    <TextInput 
                        style={styles.textInput}
                        placeholderTextColor={"lightgrey"}
                        placeholder="Tell the world what's happening..."
                        onChangeText={this.onChangeText.bind(this, this)}
                        value={this.state.status}
                        maxLength={300}
                    />
                </View>
                <Text style={styles.wordCount}>{this.state.textLength}/300 Characters</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center",
        margin: 0
    },
    blackSquare: {
        zIndex: 0,
        backgroundColor: "#1A1A1A",
        height: 225,
        width: Dimensions.get('screen').width / 1.1,
        borderRadius: 20,
        margin: 30,
        alignItems: "flex-start",
        fontSize: 13
    },
    textInput: {
        zIndex: 1,
        fontFamily: "poppins-regular",
        color: "lightgrey",
        margin: 23,
        alignItems: "flex-start",
        fontSize: 14,
        paddingTop: 53
    },
    profPic: {
        alignItems: "center",
        position: "absolute",
        zIndex: 1,
        bottom: 200
    },
    wordCount: {
        fontSize: 12,
        fontFamily: "poppins-regular",
        color: "#ACACAC",
        alignItems: "center",
        position: "absolute",
        zIndex: 1,
        top: 220,
        left: Dimensions.get('screen').width / 1.6
    }
})

export default StatusTextInput