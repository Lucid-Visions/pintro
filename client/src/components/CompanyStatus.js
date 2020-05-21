import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

class CompanyStatusComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            seekingInvestment: props.seekingInvestment,
            currentlyHiring: props.currentlyHiring
        }
    }

    toggleState1 = () => {
        this.setState({
            seekingInvestment: !this.state.seekingInvestment
        })
    }

    toggleState2 = () => {
        this.setState({
            currentlyHiring: !this.state.currentlyHiring
        })
    }

    //took out toggle states from onPress because not everyone should be able to toggle it
    render () {
        return(
        <View style={styles.outline}>
            <View style={{flexDirection: "row", marginLeft: 5, marginBottom: 5 }}>
                <TouchableOpacity style={{flexDirection: "row" }} onPress={ () => {} }>
                    <Image
                        source={this.state.seekingInvestment ? require('../assets/thumbUpYellow.png') : require('../assets/thumbDownBlack.png')}
                        style={{resizeMode: 'contain', width: 25, height: 25}} >
                    </Image>
                    <Text style={[styles.text, this.state.seekingInvestment && styles.selectedText]}>
                        S E E K I N G  I N V E S T M E N T 
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection: "row" }} onPress={ () => {} }>
                    <Image
                        source={this.state.currentlyHiring ? require('../assets/thumbUpYellow.png') : require('../assets/thumbDownBlack.png')}
                        style={{resizeMode: 'contain', width: 25, height: 25, marginLeft: 18}}>
                    </Image>
                    <Text style={[styles.text, this.state.currentlyHiring && styles.selectedText]}>
                        C U R R E N T L Y  H I R I N G
                    </Text>
                </TouchableOpacity>
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
        marginRight: 10
    },
    outline: {
        justifyContent: 'center',
        flexDirection: 'column',
        marginLeft: 0,
        padding: 2,
    },
    text: {
        fontSize: 9,
        marginLeft: 6, 
        marginTop: "4%", 
        fontFamily: "poppins-semi-bold", 
    },
    selectedText: {
        color: 'orange',
        marginLeft: 6, 
        marginTop: "4%", 
        fontFamily: "poppins-semi-bold", 
        fontSize: 9

    }
});

export default CompanyStatusComponent;
