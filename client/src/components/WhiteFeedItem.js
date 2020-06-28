import React from 'react';
import { View,Dimensions, Text, Image, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import SmallActionComponent from '../components/SmallActionButton';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { deleteHelpRequest } from '../modules/live-feed/actions'

TimeAgo.addLocale(en)
const timeAgo = new TimeAgo()

class WhiteFeedComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    deleteRequest = () => {
        Alert.alert(
            "Delete Help Request?",
            "Are you sure?",
            [
              {
                text: "No",
                onPress: () => console.log('Canceled'),
                style: "cancel"
              },
              { text: "Yes", onPress: () => {
                deleteHelpRequest(this.props.data._id)
                this.props.refresh()
              }}
            ],
            { cancelable: true }
        );
    }

    resizeToFit = () => {
        return (this.props.name.length > 20 ? 
                    5 : this.props.name.length > 17 ? 
                        8 : this.props.name.length > 10 ? 
                            10 : 11)
    }

    specifyTime = () => {
        const time = this.props.timeAgo
        return timeAgo.format(time)
    }
    

    render () {
        const size = this.resizeToFit()
        const time = this.specifyTime()
        return(
        <View style={styles.outline}>
            <View style={{flexDirection: "row" }}>
                <View style={styles.container}>
                    <View style={{flexDirection: "column", marginTop: 15, marginLeft: 12 }}>
                        <TouchableOpacity style={{flexDirection: "row" }}>
                            <Image 
                                style={{height: 45, width: 45, borderRadius: 200 / 2}}
                                source={this.props.photo ? {uri: this.props.photo} : require('../assets/empty-profile-picture.png')} />
                            <View style={{flexDirection: "column" }} > 
                                <Text style={{fontFamily: "poppins-semi-bold", color: "black", fontSize: size, marginTop: 5, marginLeft: 8}}>
                                    {this.props.name}
                                </Text>
                                <Text style={{fontFamily: "poppins-semi-bold", color: "gray", fontSize: 10, marginLeft: 8}}>
                                    {time}
                                </Text>
                            </View>
                            {this.props.isAuthor &&
                                <TouchableOpacity onPress={() => this.deleteRequest()}>
                                    <Image source={require('../assets/blackCross.png')} style={{height: 15, width: 15}}></Image>
                                </TouchableOpacity>
                            }
                        </TouchableOpacity>
                        <View
                                style={{
                                borderBottomColor: '#DCDCDC',
                                borderBottomWidth: 1,
                                width: 150,
                                marginTop: 8
                                }}/>
                        <View>
                            <SmallActionComponent type={this.props.thisType} context={this.props.context} />
                        </View>
                    </View>
                </View>
            </View>
        </View>
        )
    }
}

const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
    container: {
        alignSelf: 'flex-start',
        width: (screenWidth/2)-10,
        borderRadius: 40 / 2,
        flexDirection: 'row',
        backgroundColor: 'white',
        padding:5,
        height:140,
        marginLeft:5,
        marginTop:2
    },
    outline: {
        flexDirection: 'column',
        padding: 2,
    },
    img: {
        width: '100%', 
        height: '100%', 
        marginRight: 10, 
        opacity: 0.6
    },
    hashtag: {
        fontFamily: "poppins-semi-bold", 
        color: "orange", 
        fontSize: 10,
        marginTop: 10,
        marginLeft: 3
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

export default WhiteFeedComponent;
