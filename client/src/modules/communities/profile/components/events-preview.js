import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import { eventsTitle, seeAllLabel } from '../../constants'
import EventCard from '../../../shared/event-card'

const EventsPreview = ({ events, navigation }) => {

  const seeAllBtn = events && events.length > 2 && (
    <TouchableOpacity onPress={() => navigation.navigate('EventsList', { events })}>
      <Text>{seeAllLabel}</Text>
    </TouchableOpacity>
  )

  const content = events && events.length > 0 ? (
    <View>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", paddingTop: 30, paddingBottom:10 }}>
        <Text style={{
          fontFamily: "poppins-semi-bold",
        }}>
          {eventsTitle}
        </Text>
        {seeAllBtn}
      </View>
      <View>
        {events.slice(0, 2).map(event => (
            <EventCard
                id={event.id}
                name={event.title}
                location={event.location}
                date={event.date}
                time={event.time}
            />
        ))}
      </View>
    </View>
  ) : null

  return content
}

export default EventsPreview