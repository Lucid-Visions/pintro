import React from 'react'
import { ScrollView, View, Text } from 'react-native'

import EventCard from '../../../shared/event-card'
import BackButton from '../../../shared/icons/back-button/lightTheme'

import styles from './styles'

const EventsList = ({ route: { params: { events }}, navigation }) => (
  <ScrollView>
    <View style={styles.container2}>
      <BackButton navigation={navigation} />
    </View>
    <View style={{paddingBottom:50, padding: 20}}>
      <Text style={styles.categoryHeaderBold}>Upcoming Events</Text>
      {events.map(event => (
        <EventCard
            id={event.id}
            name={event.title}
            location={event.location}
            date={event.date}
            time={event.time}
        />
      ))}
    </View>
  </ScrollView>
)

export default EventsList