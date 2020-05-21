import React from "react"
import {TouchableOpacity, Text, Image, View, StyleSheet } from 'react-native';

class MoodButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: props.checked,
            image: props.item.image, 
            text: props.item.text,
            id:props.id
            
        }
        this.handleState = this.handleState.bind(this)

    }

    handleState = () => {
        this.props.method(this.state.id)
    }


    render() {
        return(
        <TouchableOpacity style={styles.btn} onPress={this.handleState}>
            <View style={[styles.circle, this.props.checked && styles.selectedCircle]}>
                <Image source={this.state.image}  style={styles.img}/>
            </View>
            <View style={styles.absoluteView}>
                <Text style={[styles.text, this.props.checked && styles.selectedText]}>
                    {this.state.text}
                </Text>
            </View>
            
        </TouchableOpacity>
        )
    }
}
  

const styles = StyleSheet.create({
    absoluteView: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    text: {
        fontFamily: "poppins-medium",
        fontSize: 10,
        paddingTop:15,
        paddingBottom: 15, 
        color:"white",
    },
    selectedText: {
        fontFamily: "poppins-medium",
        color: '#E1963D',
        textDecorationLine: 'underline',
        textDecorationColor: '#E1963D'
    },
    img: {
        width: 30,
        height: 30,
        aspectRatio: 1,
        overflow: 'hidden',
        resizeMode: "contain"
    },
    btn: {
        marginLeft: 6,
        marginRight: 6,
        alignItems: "center"
    },
    circle: {
        backgroundColor: "white", 
        borderRadius: 60/2,
        width: 60,
        height: 60,
        justifyContent: "center",
        alignItems: "center"
    },
    selectedCircle: {
        backgroundColor: "orange", 
        borderRadius: 60/2,
        width: 60,
        height: 60,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default MoodButton