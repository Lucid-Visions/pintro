import React from 'react'
import renderer from 'react-test-renderer'
import ProfileScreen from '../components/profile-screen'

describe('<ProfileScreen />', () => {

  let wrapper = {}

  const jsx = renderer.create(<ProfileScreen />)

  describe('Snapshot test', () => {
    it('matches snapshot', () => {
      expect(jsx).toMatchSnapshot()
    })
  })

  describe('', () => {
    
  })
})