import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from "react-native-modal";


/**
 * FilterType enum
 */
const FilterType = {
    STATUS: 1,
    HELP_ME_WITH: 2,
    INTRODUCE_ME: 3,
    TALK_TO_ME_ABOUT: 4,
    PROMOTE_ME: 5
}

class FeedFilterModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isSelected: false,
            isModalVisible: true,
            isStatus: false, // 1
            isHelpMeWith: false, // 2
            isIntroduceMe: false, //3
            isTalkToMeAbout: false, //4
            isPromoteMe: false, //5
        }
    }
    
    toggleModal = () => {
        this.setState({
            isModalVisible: !this.state.isModalVisible
        })
    }

    toggleState = () => {
        this.setState({
            isSelected: !this.state.isSelected,
        })
    }

    toggleStatus = () => {
        this.props.onSetFilter(!this.state.isStatus ? FilterType.STATUS : null)
        this.setState({
            isStatus: !this.state.isStatus,
            isHelpMeWith: false,
            isIntroduceMe: false,
            isSelected: false, 
            isTalkToMeAbout: false,
            isPromoteMe: false,
        })

    }

    toggleHelpMeWith = () => {
        this.props.onSetFilter(!this.state.isHelpMeWith ? FilterType.HELP_ME_WITH : null)
        this.setState({
            isHelpMeWith: !this.state.isHelpMeWith,
            isStatus: false,
            isIntroduceMe: false,
            isSelected: false,
            isTalkToMeAbout: false,
            isPromoteMe: false,
        })
    }

    toggleIntroduceMe = () => {
        this.props.onSetFilter(!this.state.isIntroduceMe ? FilterType.INTRODUCE_ME : null)
        this.setState({
            isIntroduceMe: !this.state.isIntroduceMe,
            isStatus: false,
            isHelpMeWith: false,
            isSelected: false,
            isTalkToMeAbout: false,
            isPromoteMe: false,
        })
    }

    toggleTalkToMeAbout = () => {
        this.props.onSetFilter(!this.state.isTalkToMeAbout ? FilterType.TALK_TO_ME_ABOUT : null)
        this.setState({
            isTalkToMeAbout: !this.state.isTalkToMeAbout,
            isStatus: false,
            isHelpMeWith: false,
            isSelected: false,
            isIntroduceMe: false,
            isPromoteMe: false,
        })
    }

    togglePromoteMe = () => {
        this.props.onSetFilter(!this.state.isPromoteMe ? FilterType.PROMOTE_ME : null)
        this.setState({
            isPromoteMe: !this.state.isPromoteMe,
            isStatus: false,
            isHelpMeWith: false,
            isSelected: false,
            isIntroduceMe: false,
            isTalkToMeAbout: false,
        })
    }

    render () {
        return(
        <View style={styles.outline} >
            <View style={{flexDirection: "row" }}>
                {!this.state.isSelected && this.state.isStatus ? 
                    <TouchableOpacity style={styles.container} onPress={this.toggleState}>
                        <View style={{flexDirection: "column", marginTop: 15, marginLeft: 12 }}>
                            <View style={{flexDirection: "row" }}>
                                <Image
                                    style={{height: 30, width: 30, marginTop: -5}}
                                    source={require('../assets/StatusIcon.png')}>
                                </Image>
                                <Text style={{fontFamily: "poppins-semi-bold", color: "black", fontSize: 12, marginTop: 5, marginLeft: 10, marginBottom: 20}}>
                                    Status
                                </Text>
                                <Image 
                                    style={{height: 18, width: 18, marginLeft: 210, marginTop: 4}}
                                    source={require('../assets/filter.png')}>
                                </Image>
                            </View>
                        </View>
                    </TouchableOpacity> :
                    !this.state.isSelected && this.state.isHelpMeWith ?
                    <TouchableOpacity style={styles.container} onPress={this.toggleState}>
                    <View style={{flexDirection: "column", marginTop: 15, marginLeft: 12 }}>
                        <View style={{flexDirection: "row" }}>
                            <Image
                                style={{height: 33, width: 21, marginLeft: 4, marginRight: 10, marginBottom: 10}}
                                source={require('../assets/HelpIcon.png')}>
                            </Image>
                            <Text style={{fontFamily: "poppins-semi-bold", color: "black", fontSize: 12, marginTop: 7, marginLeft: 3, marginBottom: 10}}>
                                Help me with    
                            </Text>
                            <Image 
                                style={{height: 18, width: 18, marginLeft: 173, marginTop: 7}}
                                source={require('../assets/filter.png')}>
                            </Image>
                        </View>
                    </View>
                </TouchableOpacity> :
                !this.state.isSelected && this.state.isIntroduceMe ?
                <TouchableOpacity style={styles.container} onPress={this.toggleState}>
                    <View style={{flexDirection: "column", marginTop: 15, marginLeft: 12 }}>
                        <View style={{flexDirection: "row" }}>
                            <Image
                                style={{height: 30, width: 30, marginRight: 10}}
                                source={require('../assets/IntroRequestIcon.png')}>
                            </Image>
                            <Text style={{fontFamily: "poppins-semi-bold", color: "black", fontSize: 12, marginTop: 5, marginBottom: 20}}>
                                Introduce me to
                            </Text>
                            <Image 
                                style={{height: 18, width: 18, marginLeft: 153, marginTop: 7}}
                                source={require('../assets/filter.png')}>
                            </Image>
                        </View>
                    </View>
                </TouchableOpacity> :
                !this.state.isSelected && this.state.isTalkToMeAbout ?
                <TouchableOpacity style={styles.container} onPress={this.toggleState}>
                    <View style={{flexDirection: "column", marginTop: 15, marginLeft: 12 }}>
                        <View style={{flexDirection: "row" }}>
                            <Image
                                style={{height: 30, width: 30, marginRight: 10}}
                                source={require('../assets/MessageIcon.png')}>
                            </Image>
                            <Text style={{fontFamily: "poppins-semi-bold", color: "black", fontSize: 12, marginTop: 5, marginBottom: 20}}>
                                Talk to me about
                            </Text>
                            <Image 
                                style={{height: 18, width: 18, marginLeft: 153, marginTop: 7}}
                                source={require('../assets/filter.png')}>
                            </Image>
                        </View>
                    </View>
                </TouchableOpacity> :
                !this.state.isSelected && this.state.isPromoteMe ?
                <TouchableOpacity style={styles.container} onPress={this.toggleState}>
                    <View style={{flexDirection: "column", marginTop: 15, marginLeft: 12 }}>
                        <View style={{flexDirection: "row" }}>
                            <Image
                                style={{height: 30, width: 30, marginRight: 10}}
                                source={require('../assets/MessageIcon.png')}>
                            </Image>
                            <Text style={{fontFamily: "poppins-semi-bold", color: "black", fontSize: 12, marginTop: 5, marginBottom: 20}}>
                                Promote me
                            </Text>
                            <Image 
                                style={{height: 18, width: 18, marginLeft: 153, marginTop: 7}}
                                source={require('../assets/filter.png')}>
                            </Image>
                        </View>
                    </View>
                </TouchableOpacity> :
                    !this.state.isSelected ?
                    <TouchableOpacity style={styles.container} onPress={this.toggleState}>
                    <View style={{flexDirection: "column", marginTop: 15, marginLeft: 12 }}>
                        <View style={{flexDirection: "row" }}>
                            <Text style={{fontFamily: "poppins-semi-bold", color: "gray", fontSize: 11, marginTop: 6, marginLeft: 5, marginBottom: 20}}>
                                Tap to filter by..
                            </Text>
                            <Image 
                                style={{height: 18, width: 18, marginLeft: 200, marginTop: 5}}
                                source={require('../assets/filter.png')}>
                            </Image>
                        </View>
                    </View>
                </TouchableOpacity> :
                <Modal isVisible={this.state.isSelected} >
                    <View style={styles.secondContainer}>
                        <View style={{flexDirection: "column", marginTop: 15, marginLeft: 12}}>
                            <View style={{flexDirection: "row" }}>
                                <View style={{flexDirection: "column"}}> 
                                    <Text style={{fontFamily: "poppins-semi-bold", color: "gray", fontSize: 11, marginTop: 6, marginLeft: 5, marginBottom: 20}}>
                                        Select a filter..
                                    </Text>
                                    <TouchableOpacity onPress={this.toggleStatus}> 
                                        <View style={{flexDirection: "row" }}>
                                            <Image
                                                style={{height: 30, width: 30, marginTop: -5}}
                                                source={require('../assets/StatusIcon.png')}>
                                            </Image>
                                            <Text style={{fontFamily: "poppins-semi-bold", color: "black", fontSize: 12, marginTop: 5, marginLeft: 10, marginBottom: 10}}>
                                                Status
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={this.toggleHelpMeWith}>
                                        <View style={{flexDirection: "row" }}> 
                                            <Image
                                                style={{height: 33, width: 21, marginTop: 5, marginLeft: 4, marginRight: 10, marginBottom: 5}}
                                                source={require('../assets/HelpIcon.png')}>
                                            </Image>
                                            <Text style={{fontFamily: "poppins-semi-bold", color: "black", fontSize: 12, marginTop: 15, marginLeft: 5, marginBottom: 10}}>
                                                Help me with    
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={this.toggleIntroduceMe}>
                                        <View style={{flexDirection: "row", marginTop: 5 }}>
                                            <Image
                                                style={{height: 30, width: 30, marginRight: 10}}
                                                source={require('../assets/IntroRequestIcon.png')}>
                                            </Image>
                                            <Text style={{fontFamily: "poppins-semi-bold", color: "black", fontSize: 12, marginTop: 6, marginBottom: 10}}>
                                                Introduce me to
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={this.toggleTalkToMeAbout}>
                                        <View style={{flexDirection: "row", marginTop: 5 }}>
                                            <Image
                                                style={{height: 30, width: 30, marginRight: 10}}
                                                source={require('../assets/MessageIcon.png')}>
                                            </Image>
                                            <Text style={{fontFamily: "poppins-semi-bold", color: "black", fontSize: 12, marginTop: 6, marginBottom: 10}}>
                                                Talk to me about
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={this.togglePromoteMe}>
                                        <View style={{flexDirection: "row", marginTop: 5 }}>
                                            <Image
                                                style={{height: 30, width: 30, marginRight: 10}}
                                                source={require('../assets/MessageIcon.png')}>
                                            </Image>
                                            <Text style={{fontFamily: "poppins-semi-bold", color: "black", fontSize: 12, marginTop: 6, marginBottom: 10}}>
                                                Promote Me
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity onPress={this.toggleState} >
                                    <Image 
                                        style={{height: 18, width: 18, marginLeft: 100, marginTop: 5}}
                                        source={require('../assets/CloseButton.png')}>
                                    </Image>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View> 
                </Modal>
                }
            </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'flex-start',
        flex:1,
        borderRadius: 100 / 2,
        flexDirection: 'row',
        backgroundColor: 'white',
        margin:15
    },
    secondContainer: {
        width: 335,
        height: 320,
        borderRadius: 50 / 2,
        alignSelf:'center',
        backgroundColor: 'white',
        marginTop: 15,
        marginBottom: 320,
        padding:'5%'
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

export default FeedFilterModal;
