import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import {WebView } from 'react-native-webview';
import {Linking} from 'expo';


class TeamComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isSelected1: false,
            isSelected2: false,
            isSelected3: false,
            isSelected4: false
        }
    }

    toggleState1 = () => {
        this.setState({
            isSelected1: !this.state.isSelected1,
            isSelected2: false,
            isSelected3: false,
            isSelected4: false
        })
    }

    toggleState2 = () => {
        this.setState({
            isSelected1: false,
            isSelected2: !this.state.isSelected2,
            isSelected3: false,
            isSelected4: false
        })
    }

    toggleState3 = () => {
        this.setState({
            isSelected1: false,
            isSelected2: false,
            isSelected3: !this.state.isSelected3,
            isSelected4: false
        })
    }

    toggleState4 = () => {
        this.setState({
            isSelected1: false,
            isSelected2: false,
            isSelected3: false,
            isSelected4: !this.state.isSelected4
        })
    }

    getMember(user){
        console.log(user.profile_picture)
        return(
            <TouchableOpacity style={styles.container} onPress={()=>this.props.navigation.navigate("Profile",{uid:user._id})}>
                    <ImageBackground 
                        source={{url:user.profile_picture} || require('../assets/empty-profile-picture.png')}
                        style={[styles.img, this.state.isSelected1 && styles.selectedImg]} borderRadius={20 / 2}>
                    </ImageBackground>
                </TouchableOpacity>
        )
    }


    render () {

        let users = this.props.team.map((x)=>this.getMember(x))
        return(
        <View style={styles.outline}>
            <View style={{flexDirection: "row" }}>
                <Text style={{ marginTop: "6%", fontFamily: "poppins-semi-bold", marginBottom: 8, marginLeft: 2 }}>
                    Team
                </Text>
                <TouchableOpacity>
                    <Text style={{ marginTop: "8%", fontFamily: "poppins-semi-bold", marginBottom: 8, marginLeft: 220, fontSize: 10, color: "#A9A9A9" }}>
                        See all team
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection: "row" }}>
                {users}
            </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 75,
        width: 75,
        borderRadius: 20 / 2,
        flexDirection: 'row',
        marginRight: 10,
    },
    outline: {
        justifyContent: 'center',
        flexDirection: 'column',
        marginLeft: 0,
        padding: 2,
    },
    img: {
        width: '100%', 
        height: '100%', 
        marginRight: 10, 
        opacity: 0.6
    },
    selectedImg: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 2,
        borderWidth: 2,
        borderColor: 'orange',
        borderRadius: 20 / 2

    }
});

export default TeamComponent;
