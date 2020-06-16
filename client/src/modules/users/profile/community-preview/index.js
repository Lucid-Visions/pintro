import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity } from 'react-native'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'

import { getCommunities } from '../actions'
import { title, seeAllLabel } from '../constants'
import CommunityCard from '../community-card'

const CommunityPreview = ({ navigation }) => {
  const dispatch = useDispatch()

  const {
    userProfile: { communities },
  } =  useSelector((state) => state, shallowEqual)

  useEffect(() => {
    async function fetchData() {
      await getCommunities(dispatch)
    }

    fetchData()
    
  }, [ communities ])

  const content = communities ? (
    <View>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", marginVertical: "5%" }}>
        <Text style={{
          fontFamily: "poppins-semi-bold",
        }}>
          {title}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('CommunityList', { communities })}>
          <Text>{seeAllLabel}</Text>
        </TouchableOpacity>
      </View>
      {communities.slice(0, 2).map(c => (
        <CommunityCard key={c.name} community={c} navigation={navigation} />
      ))}
    </View>
  ) : null

  return content
}

CommunityPreview.propTypes = {
  navigation: PropTypes.object.isRequired
}

export default CommunityPreview