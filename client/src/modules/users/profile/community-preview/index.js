import React, { useEffect } from 'react'
import { View, Text, Image } from 'react-native'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'

import { getCommunities } from '../actions'
import { title, seeAllLabel } from '../constants'

const CommunityPreview = () => {
  const dispatch = useDispatch()

  const {
    userProfile: { communities },
  } =  useSelector((state) => state, shallowEqual)

  useEffect(() => {
    async function fetchData() {
      await getCommunities(dispatch)
    }

    if (communities.length === 0) {
      fetchData()
    }
    
  }, [ communities ])

  const communityCards = communities && communities.slice(0, 2).map(o => {
    const userCountText = o.users.length > 3 ? `+${o.users.length - 3}` : ''

    return (
      <View style={{ borderRadius: 15, width: '100%', backgroundColor: '#FFF', marginBottom: '3%', padding: '5%'}}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between" }}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Image
              style={{ height: 50, width: 50, borderRadius: 25 }}
              source={require("../../../../assets/empty-profile-picture.png")}
            />
            <View style={{ marginLeft: 10, marginTop: 5 }}>
              <Text style={{ fontFamily: "poppins-semi-bold" }}>{o.name}</Text>
              <Text>{o.users.length} Members</Text>
            </View>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', marginTop: 5 }}>
            <View style={{ backgroundColor: '#909091', height: 25, width: 25, borderRadius: 25 }}></View>
            <View style={{ backgroundColor: '#a9a9aa', height: 25, width: 25, borderRadius: 25, marginLeft: -15 }}></View>
            <View style={{ backgroundColor: '#c1c1c3', height: 25, width: 25, borderRadius: 25, marginLeft: -15 }}></View>
            <View style={{ backgroundColor: 'orange', height: 25, width: 25, borderRadius: 25, marginLeft: -15 }}>
              <Text style={{ fontSize: 11, top: 6, left: 4 }}>{userCountText}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  })

  return (
    <View>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", marginVertical: "5%" }}>
        <Text style={{
          fontFamily: "poppins-semi-bold",
        }}>
          {title}
        </Text>
        <Text>{seeAllLabel}</Text>
      </View>
      {communityCards}
    </View>
  )
}

export default CommunityPreview