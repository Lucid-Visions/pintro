import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import ElevatedView from 'react-native-elevated-view'
import PropTypes from 'prop-types';

/**
 * Renders an action button for the user's profile.
 * @param {string} post the start of the post.
 * @param {string} source the path to the picture of the post.
 * @param {string} likes the number of likes.
 * @param {string} comments the number of comments.

 */
const LatestPostComponent = ({ 
    post,
    source, 
    likes,
    comments
}) => (
    
    <ElevatedView style={styles.view} elevation={10}>
        <TouchableOpacity style={styles.container}>
            <View style={styles.outline}>
                <Image
                    style={styles.image}
                    source={source || require('../assets/empty-profile-picture.png')}
                />
            </View>
            <View style={styles.text}>
                <Text numberOfLines={2} style={styles.subtitle}>{post}</Text>
                <Text style={styles.goldenSubtitle}>{likes} likes · {comments} comments</Text>
            </View> 
        </TouchableOpacity>
    </ElevatedView>
);

// Type checker
LatestPostComponent.propTypes = {
    post: PropTypes.string,
    source: PropTypes.number,
    likes: PropTypes.string,
    comments: PropTypes.string
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        borderColor: 'red',
    },
    view: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 15,
        width: '100%',
        height: '12%',
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
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
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
        width: 40,
        height: 40,
        overflow: 'hidden'
    }
});

export default LatestPostComponent;
