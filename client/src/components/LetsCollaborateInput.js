import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, Text, TextInput, Image } from 'react-native';
import ProfilePictureComponent from '../components/ProfilePicture';

class LetsCollaborateInput extends Component {
    constructor(props) {
        super(props)
        this.maxLength = 150

        this.state = {
            status: "",
            textLength: 0,
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
                    <Image
                        style={styles.statusIcon}
                        source={require("../assets/MessageIcon.png")}
                    />
                </View>
                <View style={styles.whiteSquare}>
                    <View 
                        width={Dimensions.get('screen').width / 1.2}
                        height={110}
                        alignSelf="center"
                        borderBottomWidth={1}
                        borderBottomColor="#A9A9A9"
                        justifyContent="space-evenly"
                    >
                        <Text style={styles.h1}>Let's Collaborate</Text>
                    </View>
                    <View alignSelf="flex-start">
                        <TextInput 
                            style={styles.textInput}
                            placeholderTextColor={"#B3B3B3"}
                            placeholder="Why do you want to be promoted?"
                            onChangeText={this.onChangeText.bind(this, this)}
                            value={this.state.status}
                            maxLength={150}
                        />
                    </View>
                </View>
                <Text style={styles.wordCount}>{this.state.textLength}/150 Characters</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    h1: {
        fontFamily: "poppins-bold",
        color: "#2E2E2E",
        margin: "auto",
        textAlign: "left",
        fontSize: 20,
        paddingTop: 60,
        paddingLeft: 10
    },
    container: {
        flexDirection: "column",
        alignItems: "center",
        margin: 0,
        shadowOffset:{ width: 5,  height: 5 },
        shadowColor: 'black',
        shadowOpacity: 0.1,
    },
    textInput: {
        zIndex: 1,
        fontFamily: "poppins-regular",
        color: "#B3B3B3",
        margin: 23,
        alignItems: "flex-start",
        fontSize: 14
    },
    whiteSquare: {
        zIndex: 0,
        backgroundColor: "white",
        height: 225,
        width: Dimensions.get('screen').width / 1.1,
        borderRadius: 20,
        margin: 30,
        alignItems: "flex-start",
        fontSize: 13
    },
    profPic: {
        alignItems: "center",
        position: "absolute",
        zIndex: 1,
        bottom: 200
    },
    statusIcon: {
        height: 40,
        width: 40,
        resizeMode: "center",
        borderRadius: 150 / 2,
        backgroundColor: "#F8AE39",
        overflow: "visible",
        position: "absolute",
        zIndex: 1,
        bottom: 0,
        left: 87
    },
    wordCount: {
        fontSize: 12,
        fontFamily: "poppins-regular",
        color: "#A9A9A9",
        alignItems: "center",
        position: "absolute",
        zIndex: 1,
        top: 220,
        left: Dimensions.get('screen').width / 1.6
    }
})

export default LetsCollaborateInput