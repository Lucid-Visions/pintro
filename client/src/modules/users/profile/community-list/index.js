import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView, View } from 'react-native'

import ImageCard from '../../../shared/image-card'
import BackButton from '../../../shared/icons/back-button/lightTheme'

import styles from './styles'

const CommunityList = ({ route: { params: { communities }}, navigation }) => (
  <ScrollView>
    <View style={styles.container}>
      <BackButton navigation={navigation} />
    </View>
    <View>
      {communities.map(c => (
        <ImageCard
          key={c.name}
          title={c.name}
          subtitle={`${c.users.length} Members`}
          onPress={() => navigation.navigate('CommunityProfile', {...community} )}
        />
      ))}
    </View>
  </ScrollView>
)

CommunityList.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      communities: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          story: PropTypes.string.isRequired,
          url: PropTypes.string,
          tags: PropTypes.array.isRequired
        })
      )
    })
  })
}

export default CommunityList