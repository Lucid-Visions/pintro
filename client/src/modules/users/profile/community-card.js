import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image, TouchableOpacity } from 'react-native'

const CommunityCard = ({ community, navigation }) => {

  const stackedUserImgs = community.users.length > 3 && (
    <View style={{ display: 'flex', flexDirection: 'row', marginTop: 5 }}>
      <View style={{ backgroundColor: '#909091', height: 25, width: 25, borderRadius: 25 }}></View>
      <View style={{ backgroundColor: '#a9a9aa', height: 25, width: 25, borderRadius: 25, marginLeft: -15 }}></View>
      <View style={{ backgroundColor: '#c1c1c3', height: 25, width: 25, borderRadius: 25, marginLeft: -15 }}></View>
      <View style={{ backgroundColor: 'orange', height: 25, width: 25, borderRadius: 25, marginLeft: -15 }}>
        <Text style={{ fontSize: 11, top: 6, left: 4 }}>{`+${community.users.length - 3}`}</Text>
      </View>
    </View>
  )

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('CommunityProfile', {
        name: community.name, story: community.story, url: community.url, tags: community.tags
      })}
    >
      <View style={{ borderRadius: 15, width: '100%', backgroundColor: '#FFF', marginBottom: '3%', padding: '5%'}}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between" }}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Image
              style={{ height: 50, width: 50, borderRadius: 25 }}
              source={require("../../../assets/empty-profile-picture.png")}
            />
            <View style={{ marginLeft: 10, marginTop: 5 }}>
              <Text style={{ fontFamily: "poppins-semi-bold" }}>{community.name}</Text>
              <Text>{community.users.length} Members</Text>
            </View>
          </View>
          {stackedUserImgs}
        </View>
      </View>
    </TouchableOpacity>
  )
}

CommunityCard.propTypes = {
  community: PropTypes.shape({
    name: PropTypes.string.isRequired,
    story: PropTypes.string.isRequired,
    url: PropTypes.string,
    tags: PropTypes.array.isRequired
  })
}

export default CommunityCard