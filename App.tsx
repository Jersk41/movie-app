import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import BottomTabNavigator from './src/navigations/BottomTabNavigation'

export default function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  )
}
