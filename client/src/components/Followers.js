import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import ElevatedView from 'react-native-elevated-view'
import PropTypes from 'prop-types';

/**
 * Renders an action button for the user's profile.
 * @param {string} source1 the path to the first member of a community.
 * @param {string} source2 the path to the second member of a community.
 * @param {string} source3 the path to the third member of a community.
 * @param {string} source4 the path to the fourth member of a community.
 * @param {string} source5 the path to the fifth member of a community.
 * @param {string} source6 the path to the sixth member of a community.
 * @param {string} followers the number of followers

 */
const FollowersComponent = ({ 
    source1,
    source2,
    source3,
    source4,
    source5,
    source6, 
    followers
}) => ( 
    
        <View style={styles.outline}>
            <View style={{flexDirection: "row" }}>
                <Text style={{ marginTop: "6%", fontFamily: "poppins-semi-bold", marginBottom: 8, marginLeft: 2 }}>
                    Followers
                </Text>
                <TouchableOpacity>
                    <Text style={{ marginTop: "9%", fontFamily: "poppins-semi-bold", marginBottom: 8, marginLeft: 200, fontSize: 10, color: "#A9A9A9" }}>
                        See all (45)
                    </Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.container}>
                <Image
                    style={styles.image}
                    source={source1 || require('../assets/empty-profile-picture.png')}
                />
                <Image
                    style={styles.image}
                    source={source2 || require('../assets/empty-profile-picture.png')}
                />
                <Image
                    style={styles.image}
                    source={source3 || require('../assets/empty-profile-picture.png')}
                />
                <Image
                    style={styles.image}
                    source={source4 || require('../assets/empty-profile-picture.png')}
                />
                <Image
                    style={styles.image}
                    source={source5 || require('../assets/empty-profile-picture.png')}
                />
                <Image
                    style={styles.image}
                    source={source6 || require('../assets/empty-profile-picture.png')}
                />
            </TouchableOpacity>
        </View>
);

// Type checker
FollowersComponent.propTypes = {
    source1: PropTypes.number,
    source2: PropTypes.number,
    source3: PropTypes.number,
    source4: PropTypes.number,
    source5: PropTypes.number,
    source6: PropTypes.number,
    followers: PropTypes.string,
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        borderColor: 'red',
        alignItems: 'center',
        flexDirection: 'row'
    },
    view: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 15,
        width: '95%',
        height: '14%',
        padding: 20
    },
    text: {
        flexDirection: 'column',
        left: 'auto',
        marginLeft: 5,
        marginRight: 50
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16
    },
    subtitle: {
        fontWeight: 'normal',
        fontSize: 11,
        marginTop: 5,
        width: 220
        
    },
    goldenSubtitle: {
        fontWeight: 'normal',
        fontSize: 11,
        marginTop: 5,
        color: "#F9A602"        
    },
    outline: {
        justifyContent: 'center',
        flexDirection: 'column',
        marginLeft: 0,
        padding: 2,
    },
    symbols: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginLeft: 60,
        padding: 2,
    },
    image: {
        borderRadius: 150 / 2,
        width: 43,
        height: 43,
        overflow: 'hidden',
        marginRight: 14
    }
});

export default FollowersComponent;
