import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity } from 'react-native'

import { title, seeAllLabel } from '../constants'
import ImageCard from '../../../shared/image-card'

const CommunityPreview = ({ communities, navigation }) => {

  const seeAllBtn = communities && communities.length > 2 && (
    <TouchableOpacity onPress={() => navigation.navigate('CommunityList', { communities })}>
      <Text>{seeAllLabel}</Text>
    </TouchableOpacity>
  )

  const content = communities && communities.length > 0 ? (
    <View>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", marginVertical: "5%" }}>
        <Text style={{
          fontFamily: "poppins-semi-bold",
        }}>
          {title}
        </Text>
        {seeAllBtn}
      </View>
      {communities.slice(0, 2).map(c => (
        <ImageCard
          title={c.name}
          subtitle={`${c.users.length} Members`}
          onPress={() => navigation.navigate('CommunityProfile', {...c})}
        />
      ))}
    </View>
  ) : null

  return content
}

CommunityPreview.propTypes = {
  communties: PropTypes.arrayOf(PropTypes.object),
  navigation: PropTypes.object.isRequired
}

export default CommunityPreview