import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const EventCard = ({ id, name, location, date, time, onPress, onLongPress}) => {

    return (
        <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
            <View style={{ borderRadius: 15, width: '100%', height: 100, backgroundColor: '#FFF', marginBottom: '3%', padding: '3%', flexDirection: 'row'}}>
                <View style={{ width: '45%', flex: 1, height: '80%', justifyContent: 'center' }}>
                    <Text style={{ fontFamily: "poppins-semi-bold", alignSelf:"flex-start" }}>{name}</Text>
                </View>
                <View style={{ width: '45%', flex: 1, height: '80%', justifyContent:'center' }}>
                    <Text style={{ fontFamily: "poppins-semi-bold", alignSelf: 'flex-end' }}>{location}</Text>
                    <Text style={{ fontSize: 10, alignSelf: 'flex-end' }}>{date} @ {time}</Text>         
                </View>
            </View>
        </TouchableOpacity>
    )
    
}

export default EventCard;