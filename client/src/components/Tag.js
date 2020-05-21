import React, { useState } from "react"
import { Text, StyleSheet, TouchableOpacity } from "react-native";

/**
 * Represents a tag.
 * @param {item} the tag data prop 
 * @param {i} the tag style prop 
 * @param {callback}
 */
const Tag = ({ item, i, callback }) => {
    const [chosen, setChosen] = useState(item.chosen);
    return (
        <TouchableOpacity
            style={chosen ? getChosenStyle(i) : getStyle(i)}
            onPress={() => {if(!item.disabled){setChosen(!chosen); callback?callback(item.text, !chosen):null}}}
        >
            <Text style={chosen ? getChosenTextStyle(i) : getTextStyle(i)}>{item.text.toUpperCase()}</Text>
        </TouchableOpacity>
    )
};

const getStyle = (i) => {
    switch(i){
        case 1: {
            return styles.tagsFill
            break
        }
        case 2: {
            return styles.tagsOutline
            break
        }
        case 3: {
            return styles.tagsBW
            break
        }
        case 4: {
            return styles.tagsOutlineBW
            break
        }
        case 5: {
            return styles.tagsBlack
        }
        default: {
            return styles.tagsFill
            break
        }
    }
}

const getChosenStyle = (i) => {
    switch(i){
        case 1: {
            return styles.chosenTagsFill
            break
        }
        case 2: {
            return styles.chosenTagsOutline
            break
        }
        case 3: {
            return styles.chosenTagsBW
            break
        }
        case 4: {
            return styles.chosenTagsBW
            break
        }
        case 5: {
            return styles.chosenTagsBW
            break
        }
        default: {
            return styles.chosenTagsFill
            break
        }
    }
}

const getTextStyle = (i) => {
    switch(i){
        case 1: {
            return styles.text
            break
        }
        case 2: {
            return styles.text
            break
        }
        case 3: {
            return styles.textBW
            break
        }
        case 4:{
            return styles.textBW
            break
        }
        case 5 :{
            return styles.chosenTextBW
            break
        }
        default: {
            return styles.text
            break
        }
    }
}

const getChosenTextStyle = (i) => {
    switch(i){
        case 1: {
            return styles.chosenTextFill
            break
        }
        case 2: {
            return styles.chosenTextOutline
            break
        }
        case 3: {
            return styles.chosenTextBW
            break
        }
        case 4: {
            return styles.chosenTextBW
            break
        }
        case 5 :{
            return styles.chosenTextBW
            break
        }
        default: {
            return styles.chosenTextFill
            break
        }
    }
}

const styles = StyleSheet.create({
    text: {
        fontFamily: "poppins-regular",
        color: 'white',
        fontSize: 11,
        letterSpacing: 2
    },
    chosenTextFill: {
        fontFamily: "poppins-regular",
        color: '#313131',
        fontSize: 11,
        textDecorationColor: '#313131',
        letterSpacing: 2
    },
    chosenTextOutline: {
        fontFamily: "poppins-regular",
        color: '#F8AE39',
        fontSize: 11,
        textDecorationColor: '#F8AE39',
        letterSpacing: 2
    },
    textBW: {
        fontFamily: "poppins-regular",
        color: '#1A1A1A',
        fontSize: 11,
        letterSpacing: 2
    },
    chosenTextBW: {
        fontFamily: "poppins-regular",
        color: 'white',
        fontSize: 11,
        textDecorationColor: 'white',
        letterSpacing: 2
    },
    tagsFill: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: 32,
        backgroundColor: '#313131',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#313131',
        paddingVertical: 7,
        paddingHorizontal: 25,
        marginVertical: 5,
        marginHorizontal: 4,
    },
    chosenTagsFill: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: 32,
        backgroundColor: '#F8AE39',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#F8AE39',
        paddingVertical: 7,
        paddingHorizontal: 25,
        marginVertical: 5,
        marginHorizontal: 4
    },
    tagsOutline: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: 32,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'white',
        paddingVertical: 7,
        paddingHorizontal: 25,
        marginVertical: 5,
        marginHorizontal: 4
    },
    tagsOutlineBW: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: 32,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'black',
        color:"black",
        paddingVertical: 7,
        paddingHorizontal: 25,
        marginVertical: 5,
        marginHorizontal: 4
    },
    chosenTagsOutline: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: 32,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#F8AE39',
        paddingVertical: 7,
        paddingHorizontal: 25,
        marginVertical: 5,
        marginHorizontal: 4
    },
    tagsBlack: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: 32,
        backgroundColor: 'black',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'black',
        paddingVertical: 7,
        paddingHorizontal: 25,
        marginVertical: 5,
        marginHorizontal: 4
    },
    tagsBW: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: 32,
        backgroundColor: '#C1C1C3',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#C1C1C3',
        paddingVertical: 7,
        paddingHorizontal: 25,
        marginVertical: 5,
        marginHorizontal: 4
    },
    chosenTagsBW: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: 32,
        backgroundColor: '#1A1A1A',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#1A1A1A',
        paddingVertical: 7,
        paddingHorizontal: 25,
        marginVertical: 5,
        marginHorizontal: 4
    },
});

export default Tag;
