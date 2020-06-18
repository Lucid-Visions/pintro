import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const Card = ({ title, subtitle, onPress, rightComponent = null }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={{ borderRadius: 15, width: '100%', backgroundColor: '#FFF', marginBottom: '3%', padding: '5%'}}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between" }}>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <View style={{ marginLeft: 10, marginTop: 5 }}>
                            <Text style={{ fontFamily: "poppins-semi-bold" }}>{title}</Text>
                            <Text>{subtitle}</Text>
                        </View>
                        {rightComponent}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default Card