import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView
} from "react-native";
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import { getCommunity } from '../../actions'

import styles from '../styles'

const CommunityProfileScreen = ({ route: { params } }) => {
  const dispatch = useDispatch()

  const {
    communities: { currentProfile },
  } =  useSelector(state => state, shallowEqual)

  useEffect(() => {
    const fetchData = async () => {
      await getCommunity(dispatch, params.id)
    }
    
    fetchData()
  }, [])

  return (
    <ScrollView>

      <View>
        <Text>TEST</Text>
        <Text>TEST</Text>
      </View>
    </ScrollView>
  )

}

export default CommunityProfileScreen