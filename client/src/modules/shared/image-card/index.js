import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

const ImageCard = ({ title, subtitle, onPress, imgSrc }) => {

    const img = imgSrc && imgSrc !== '' ? imgSrc : require("../../../assets/empty-profile-picture.png")
    
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={{ borderRadius: 15, width: '100%', backgroundColor: '#FFF', marginBottom: '3%', padding: '5%'}}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between" }}>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <Image
                            style={{ height: 50, width: 50, borderRadius: 25 }}
                            source={img}
                        />
                        <View style={{ marginLeft: 10, marginTop: 5 }}>
                            <Text style={{ fontFamily: "poppins-semi-bold" }}>{title}</Text>
                            <Text>{subtitle}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ImageCard