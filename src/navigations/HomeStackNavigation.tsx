import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home'
import MovieDetail from '../screens/MovieDetail'

const Stack = createNativeStackNavigator()

const HomeStackNavigator = (): React.JSX.Element => {
  return (
    <Stack.Navigator initialRouteName="Movie">
      <Stack.Screen
        name="Movie"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="MovieDetail" component={MovieDetail} />
    </Stack.Navigator>
  )
}

export default HomeStackNavigator
